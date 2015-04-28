import Ember from 'ember';
import Stripe from 'stripe';
import jQuery from 'jquery';
import EmberValidations from 'ember-validations';
import layout from '../templates/components/signup-form';

export default Ember.Component.extend(EmberValidations.Mixin, {
  layout: layout,
  error: '',
  cardNumber: '',
  cardExpiry: '',
  cardCVC: '',

  validateForm: function () {
    var firstInvalidField;

    if (this.get('errors.name.firstObject')) {
      firstInvalidField = 'name';
    } else if (this.get('errors.email.firstObject')) {
      firstInvalidField = 'email';
    } else if (this.get('errors.password.firstObject')) {
      firstInvalidField = 'password';
    } else if (this.get('errors.passwordConfirmation.firstObject')) {
      firstInvalidField = 'passwordConfirmation';
    } else if (this.get('errors.cardNumber.firstObject')) {
      firstInvalidField = 'cardNumber';
    } else if (this.get('errors.cardExpiry.firstObject')) {
      firstInvalidField = 'cardExpiry';
    } else if (this.get('errors.cardCVC.firstObject')) {
      firstInvalidField = 'cardCVC';
    }

    if (firstInvalidField) {
      this.$('input[name="%@"]'.fmt(firstInvalidField)).focus();
      this.set('error', this.get('errors').get(firstInvalidField).get('firstObject'));
      return false;
    } else {
      this.set('error', '');
      return true;
    }
  },

  actions: {

    signup: function () {
      if (this.validateForm()) {

        // define card data
        var ccData = {
          number: this.get('cardNumber'),
          cvc: this.get('cardCVC'),
          exp_month: jQuery.payment.cardExpiryVal(this.get('cardExpiry'))['month'],
          exp_year: jQuery.payment.cardExpiryVal(this.get('cardExpiry'))['year']
        };

        Stripe.card.createToken(ccData, this.stripeResponseHandler.bind(this));
      }
    }
  },

  stripeResponseHandler: function (status, response) {
      if (response.error) {
          // Show the errors
          console.log(response.error.message);
      } else {
          // response contains id and card, which contains additional card details
          var token = response;
          this.sendAction('submit', token, this.get('name'), this.get('email'), this.get('password'));
    }
  },

  validations: {
    name: {
      presence: {message: 'Please provide your full name.'}
    },

    email: {
      email: {message: 'Please provide a valid email address.'}
    },

    password: {
      presence: {message: 'Please provide a password.'},
      confirmation: {message: 'Passwords do not match.'},
      length: {
        minimum: 8,
        messages: {tooShort: 'Your password must be at least 8 characters long.'}
      },
      format: {
        with: /[A-Z]/,
        message: 'Your password must contain at least 1 uppercase letter.'
      }
    },

    cardNumber: {
      cardNumber: {message: 'Your credit card number is invalid.'}
    },

    cardExpiry: {
      cardExpiry: {message: 'Your credit card expiry date is invalid.'}
    },

    cardCVC: {
      cardCVC: {message: 'Your CVC code is invalid.'}
    }
  }
});

