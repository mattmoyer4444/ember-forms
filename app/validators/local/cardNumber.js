import Base from 'ember-validations/validators/base';

export default Base.extend({

  call: function() {
    if (jQuery.payment.validateCardNumber(this.model.get(this.property)) === false) {
      this.errors.pushObject(this.options.message || 'Your credit card number is invalid.');
    }
  }
});
