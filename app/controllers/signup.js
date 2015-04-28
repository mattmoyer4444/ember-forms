import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    signup: function (token) {
      //console.log('In CONTROLLER');
      console.log('CONTROLLER TOKEN: ' + token);
    }
  }

});
