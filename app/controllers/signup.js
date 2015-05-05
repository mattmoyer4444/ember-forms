import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    signup: function (name, email, password, token) {
      //alert([name, email, password, token].join(', '));
      Ember.$.ajax('/api/signup', {
        "type": 'POST', // HTTP method
        "dataType": 'JSON', // type of data expected from the API response
        "data": { // Begin data payload
          "name" : name,
          "email": email,
          "password": password,
          "stripeToken": token

        }, // End data payload
        "success": function () {
          alert('Success!');
        },
        "error": function (errorThrown) {
          console.log(errorThrown);
        }
      });

    }
  }

});
