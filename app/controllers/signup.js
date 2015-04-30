import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    signup: function (name, email, password, token) {
      alert([name, email, password, token].join(', '));
    }
  }

});
