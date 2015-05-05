import Base from 'ember-validations/validators/base';
import Ember from 'ember';

export default Base.extend({
  call: function() {
    var cardExpiry = Ember.$.payment.cardExpiryVal(this.model.get(this.property));
    if (!Ember.$.payment.validateCardExpiry(cardExpiry.month, cardExpiry.year)) {
      this.errors.pushObject(this.options.message || 'Invalid expiration date!');
    }
  }
});
