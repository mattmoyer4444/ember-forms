import Base from 'ember-validations/validators/base';
import Ember from 'ember';

export default Base.extend({
  call: function() {
    var cardCVC = this.model.get(this.property);
    if (!Ember.$.payment.validateCardCVC(cardCVC)) {
      this.errors.pushObject(this.options.message || 'Invalid CVC number!');
    }
  }
});
