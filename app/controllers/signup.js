import Ember from 'ember';
import Stripe from 'stripe';
import jQuery from 'jquery';

function stripeResponseHandler(status, response) {

  if (response.error) {
    // Show the errors
    console.log((response.error.message));
  } else {
    // response contains id and card, which contains additional card details
    var token = response;
    var token2 = response.id;
    // Insert the token into the form so it gets submitted to the server
    console.log(status);
    //console.log(response)
    console.log(token);
    console.log(token2);

    //$form.append($('<input type="hidden" name="stripeToken" />').val(token2));
    //// and submit
    //$form.get(0).submit();
  }
}

export default Ember.Controller.extend({

  actions: {

    signup: function (name, email, password, cardNumber, cardExpiry, cardCVC) {
      //alert([name, email, password, cardnumber, cardexp, cardcvc].join(', '));
      //alert([name, email, password, cardnumber, jQuery.payment.cardExpiryVal(cardexp)['month'], jQuery.payment.cardExpiryVal(cardexp)['year'], cardcvc].join(', '));
      Stripe.card.createToken({
        number: cardNumber,
        cvc: cardCVC,
        exp_month: jQuery.payment.cardExpiryVal(cardExpiry)['month'],
        exp_year: jQuery.payment.cardExpiryVal(cardExpiry)['year']
      }, stripeResponseHandler);
    }
  }



});
