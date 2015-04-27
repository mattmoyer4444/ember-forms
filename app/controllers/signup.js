import Ember from 'ember';

function stripeResponseHandler(status, response) {

  if (response.error) {
    // Show the errors
    console.log((response.error.message))
  } else {
    // response contains id and card, which contains additional card details
    var token = response.id;
    // Insert the token into the form so it gets submitted to the server
    console.log(status)
    console.log(response)
    console.log(token);
  }
}


export default Ember.Controller.extend({

  actions: {

    signup: function (name, email, password, cardnumber, cardexp, cardcvc) {
      //alert([name, email, password, cardnumber, cardexp, cardcvc].join(', '));
      //alert([name, email, password, cardnumber, jQuery.payment.cardExpiryVal(cardexp)['month'], jQuery.payment.cardExpiryVal(cardexp)['year'], cardcvc].join(', '));
      Stripe.card.createToken({
        number: cardnumber,
        cvc: cardcvc,
        exp_month: jQuery.payment.cardExpiryVal(cardexp)['month'],
        exp_year: jQuery.payment.cardExpiryVal(cardexp)['year']
      }, stripeResponseHandler);
    }
  }



});
