import Base from 'ember-validations/validators/base';
import Ember from 'ember';

export default Base.extend({
  call: function() {
    var cardNumber = this.model.get(this.property);
    if (!Ember.$.payment.validateCardNumber(cardNumber)) {
      this.errors.pushObject(this.options.message || 'Invalid card number!');
    }
  }
});
