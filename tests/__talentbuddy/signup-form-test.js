import Ember from 'ember';

import {
  moduleForComponent,
  test
} from 'ember-qunit';

import { module } from 'qunit';

var originalAlert;

moduleForComponent('signup-form', '_talentbuddy_checker: signup-form', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
  beforeEach: function() {
    originalAlert = window.alert;
  },
  afterEach: function() {
    window.alert = originalAlert;
  }
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

test('it has the fields name, email, password, passwordConfirmation with default value \'\' set', function(assert) {
  var component = this.subject();
  assert.equal(component.get('name'), '', 'You must define the "name" field on your component with initial value \'\'.');
  assert.equal(component.get('email'), '', 'You must define the "email" field on your component with initial value \'\'.');
  assert.equal(component.get('password'), '', 'You must define the "password" field on your component with initial value \'\'.');
  assert.equal(component.get('passwordConfirmation'), '', 'You must define the "passwordConfirmation" field on your component with initial value \'\'.');
});

test('it renders the form', function(assert) {
  var component = this.subject();
  this.render();

  assert.ok(this.$('form'), 'You haven\'t implemented a form in your component template.');

  var inputs = this.$('form input');
  assert.equal(inputs.length, 5, 'Your form needs to have 5 inputs: one for each field and the fifth for the Sign up button.');

  var name = this.$('form input')[0];
  assert.equal(this.$(name).attr('type'), 'text', 'The name field must have type text.');

  var email = this.$('form input')[1];
  assert.equal(this.$(email).attr('type'), 'email', 'The email field must have type email.');

  var password = this.$('form input')[2];
  assert.equal(this.$(password).attr('type'), 'password', 'The password field must have type password.');

  var passwordConfirmation = this.$('form input')[3];
  assert.equal(this.$(passwordConfirmation).attr('type'), 'password', 'The passwordConfirmation field must have type password.');

  var submit = this.$('form input')[4];
  assert.equal(this.$(submit).attr('type'), 'submit', 'The Sign up button must be an input of type submit.');
});


test('it binds the 4 fields to input values', function(assert) {
  var component = this.subject();
  this.render();

  Ember.run(function() {
    component.setProperties({
      name: 'John',
      email: 'john@acme.co',
      password: 'pwd',
      passwordConfirmation: 'pwwd'
    });
  });

  var inputs = this.$('form input');

  var name = this.$('form input')[0];
  assert.equal(this.$(name).val(), 'John', 'The value of the name field isn\'t bound to the name property on the component.');

  var email = this.$('form input')[1];
  assert.equal(this.$(email).val(), 'john@acme.co', 'The value of the email field isn\'t bound to the email property on the component.');

  var password = this.$('form input')[2];
  assert.equal(this.$(password).val(), 'pwd', 'The value of the password field isn\'t bound to the password property on the component.');

  var passwordConfirmation = this.$('form input')[3];
  assert.equal(this.$(passwordConfirmation).val(), 'pwwd', 'The value of the confirm password field isn\'t bound to the passwordConfirmation property on the component.');
});

test('it calls the signup action on button press', function(assert) {
  assert.expect(1);

  var component = this.subject();
  this.render();

  Ember.run(function() {
    component.setProperties({
      name: 'John',
      email: 'john@acme.co',
      password: 'pwd',
      passwordConfirmation: 'pwwd'
    });
  });


  var calledAlert = false;
  window.alert = function(text) {
    calledAlert = true;
  };

  this.$('form input[type="submit"]').click();

  assert.ok(calledAlert, 'The signup action isn\'t triggered on button click.');
});


test('it calls the signup action on enter', function(assert) {
  assert.expect(1);

  var component = this.subject();
  this.render();

  Ember.run(function() {
    component.setProperties({
      name: 'John',
      email: 'john@acme.co',
      password: 'pwd',
      passwordConfirmation: 'pwwd'
    });
  });


  var calledAlert = false;
  window.alert = function(text) {
    calledAlert = true;
  };

  this.$('form').submit();

  assert.ok(calledAlert, 'The signup action isn\'t triggered when pressing enter on an input.');
});
