import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    signup: function (name, email, password, stripeToken) {
      console.log('In CONTROLLER');
      alert([name, email, password, stripeToken].join(', '));
    }
  }

});
