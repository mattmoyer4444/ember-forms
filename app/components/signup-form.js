import Ember from 'ember';

export default Ember.Component.extend({
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',

  actions: {
    signup: function() {
      var properties = ['name', 'email', 'password', 'passwordConfirmation'];
      alert(properties.map(property => this.get(property)).join(', '));

    }
  }


});
