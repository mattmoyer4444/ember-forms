import Base from 'ember-validations/validators/base';

export default Base.extend({
  // $.payment.validateCardCVC('123', 'amex'); //=> true
  //cvc: $.payment.validateCardCVC(get('cardCVC')), //=> true

  call: function() {
    //console.log(jQuery.payment.validateCardCVC(this.model.get(this.property)))
    if (jQuery.payment.validateCardCVC(this.model.get(this.property)) === false) {
      this.errors.pushObject(this.options.message || 'Your CVC code is invalid.');
    }
  }
});
