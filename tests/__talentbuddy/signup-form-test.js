import Ember from 'ember';

import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('signup-form', '_talentbuddy_checker: signup-form', {
  needs: ['service:validations',
          'ember-validations@validator:local/presence',
          'ember-validations@validator:local/confirmation',
          'ember-validations@validator:local/format',
          'ember-validations@validator:local/length',
          'validator:local/email'
          ]
});

test('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('it shows no error when the form is filled correctly', function(assert) {
  var component = this.subject();
  this.render();

  Ember.run(function() {
    component.setProperties({
      name: 'John',
      email: 'john@acme.co',
      password: '12345678W',
      passwordConfirmation: '12345678W',
    });
  });


  this.$('form').submit();
  assert.equal(
    component.$('form .error').length,
    0,
    "You must not show the error div when the form is filled correctly."
  );
});

test('it validates the name field', function(assert) {
  var component = this.subject();
  this.render();

  this.$('form').submit();
  assert.equal(
    component.$('form .error').html(),
    "Please provide your full name.",
    "You must show an error when the name field is empty."
  );
});

test('it validates the email field', function(assert) {
  var component = this.subject();
  this.render();

  Ember.run(function() {
    component.setProperties({
      name: 'John',
      email: 'john@acme.c'
    });
  });

  this.$('form').submit();
  assert.equal(
    component.$('form .error').html(),
    "Please provide a valid email address.",
    "You must show an error when the email field is not valid. For example: a@a.c"
  );
});

test('it validates the password field', function(assert) {
  var component = this.subject();
  this.render();

  Ember.run(function() {
    component.setProperties({
      name: 'John',
      email: 'john@acme.co',
      password: ''
    });
  });

  this.$('form').submit();
  assert.equal(
    component.$('form .error').html(),
    "Please provide a password.",
    "You must show an error when the password field is empty."
  );

  Ember.run(function() {
    component.setProperties({
      name: 'John',
      email: 'john@acme.co',
      password: 'w'
    });
  });

  this.$('form').submit();
  assert.equal(
    component.$('form .error').html(),
    "Your password must be at least 8 characters long.",
    "You must show an error when the password field is too short."
  );

  Ember.run(function() {
    component.setProperties({
      name: 'John',
      email: 'john@acme.co',
      password: '12345678'
    });
  });

  this.$('form').submit();
  assert.equal(
    component.$('form .error').html(),
    "Your password must contain at least 1 uppercase letter.",
    "You must show an error when the password field does not have at least 1 uppercase letter."
  );

  Ember.run(function() {
    component.setProperties({
      name: 'John',
      email: 'john@acme.co',
      password: '12345678W'
    });
  });

  this.$('form').submit();
  assert.equal(
    component.$('form .error').html(),
    "Please confirm your password.",
    "You must show an error when the passwordConfirmation field does not match the password field."
  );
});

test('it send the action "submit" on form submit with valid input fields', function(assert) {
  var component = this.subject();
  this.render();

  Ember.run(function() {
    component.setProperties({
      name: 'John',
      email: 'john@acme.co',
      password: '12345678W',
      passwordConfirmation: '12345678W',
    });
  });

  var calledExternalAction = false;

  var targetObject = {
    externalAction: function(name, email, password) {
      calledExternalAction = true;
    }
  };

  component.set('submit', 'externalAction');
  component.set('targetObject', targetObject);

  this.$('form').submit();

  assert.ok(calledExternalAction, 'The external action isn\'t triggered on form submit.');
});

test('it does not send the action "submit" on form submit with invalid input fields', function(assert) {
  var component = this.subject();
  this.render();

  Ember.run(function() {
    component.setProperties({
      name: 'John',
      email: 'john@acme.co',
      password: '12345678W',
      passwordConfirmation: '12345678',
    });
  });

  var calledExternalAction = false;

  var targetObject = {
    externalAction: function(name, email, password) {
      calledExternalAction = true;
    }
  };

  component.set('submit', 'externalAction');
  component.set('targetObject', targetObject);

  this.$('form').submit();

  assert.ok(!calledExternalAction, 'The external action should not be triggered on form submit with invalid inputs.');
});
