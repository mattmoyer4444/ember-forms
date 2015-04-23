import Ember from 'ember';


export default Ember.Controller.extend({

  actions: {
    signup: function (name, email, password) {
      alert([name, email, password].join(', '));
    }
  }

})
