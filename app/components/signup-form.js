import Ember from 'ember';
//import EmberValidations from 'ember-validations';
import layout from '../templates/components/signup-form';


export default Ember.Component.extend({
  layout: layout,
  //validations: {
  //  name: {
  //    presence: {message: 'Please provide your full name.'}
  //  },
  //
  //  email: {
  //    presence: { message: 'Please provide a valid email address.'},
  //    format: { with:  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
  //    },
  //
  //    password: {
  //      presence: { message: 'Please provide a password.' },
  //      length: { minimum: 8 },
  //      //presence: { message: 'Your password must contain at least 1 uppercase letter.'},
  //      //presence: { message: 'Please confirm your password.'}
  //
  //    }
  //  },

  actions: {
      signup: function() {
        this.sendAction('submit', this.get('name'), this.get('email'), this.get('password'));
      }
    }
});
