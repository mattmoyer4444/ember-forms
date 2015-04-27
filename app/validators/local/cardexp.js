import Base from 'ember-validations/validators/base';

export default Base.extend({
  call: function() {

    var expVal = String(this.model.get(this.property))

    if (jQuery.payment.validateCardExpiry(jQuery.payment.cardExpiryVal(expVal)) === false) {

      this.errors.pushObject(this.options.message || 'Your credit card expiry date is invalid.');
    }
  }
});
