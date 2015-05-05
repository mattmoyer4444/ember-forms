import Ember from 'ember';
import EmberValidations from 'ember-validations';
import layout from '../templates/components/signup-form';

export default Ember.Component.extend(EmberValidations.Mixin, {
  layout: layout,
  error: '',
  cardNumber: '',
  cardExpiry: '',
  cardCVC: '',
  waiting: false,

  formatPaymentInputs: function() {
    this.$('input[name="cardNumber"]').payment('formatCardNumber');
    this.$('input[name="cardExpiry"]').payment('formatCardExpiry');
    this.$('input[name="cardCVC"]').payment('formatCardCVC');
  }.on('didInsertElement'),

  validateForm: function() {
    var fields = ['name', 'email', 'password', 'passwordConfirmation', 'cardNumber', 'cardExpiry', 'cardCVC'];
    var firstInvalidField;

    for (var i = 0; i < fields.length && !firstInvalidField; i++) {
      var field = fields[i];
      if (this.get('errors').get(field).get('firstObject')) {
        firstInvalidField = field;
      }
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

  waitCallback: function (err) {
    console.log('Error:' + err)
    this.set('waiting', false);

  },

  createStripeToken: function(next) {
    var number = this.get('cardNumber').replace(/ /g, '');
    var parsedCardExpiry = Ember.$.payment.cardExpiryVal(this.get('cardExpiry'));
    var cvc = this.get('cardCVC');

    Stripe.card.createToken({
      number: number,
      cvc: cvc,
      exp_month: parsedCardExpiry.month,
      exp_year: parsedCardExpiry.year,
      waiting: true

    }, (status, response) => {
      if (response.error) {
        this.set('error', response.error.message);
        return next();
      } else {

        return next(response);
      }
    });
  },

  actions: {
    signup: function() {
      if (!this.validateForm()) {
        return;
      }

      this.createStripeToken(token => {
        if (token) {
          this.sendAction('submit', this.get('name'),
            this.get('email'), this.get('password'), token, this.waitCallback(this.error));
        }
      });
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
