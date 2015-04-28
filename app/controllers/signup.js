import Ember from 'ember';

export default Ember.Controller.extend({

  //actions: {
  //
  //  signup: function (name, email, password, cardNumber, cardExpiry, cardCVC) {
  //    //alert([name, email, password, cardnumber, cardexp, cardcvc].join(', '));
  //    //alert([name, email, password, cardnumber, jQuery.payment.cardExpiryVal(cardexp)['month'], jQuery.payment.cardExpiryVal(cardexp)['year'], cardcvc].join(', '));
  //    Stripe.card.createToken({
  //      number: cardNumber,
  //      cvc: cardCVC,
  //      exp_month: jQuery.payment.cardExpiryVal(cardExpiry)['month'],
  //      exp_year: jQuery.payment.cardExpiryVal(cardExpiry)['year']
  //    }, stripeResponseHandler);
  //  }
  //}

  actions: {

    signup: function (token) {
      console.log('In CONTROLLER')
      console.log('Token: ' + [token].join(', '));
    }
  }

});
