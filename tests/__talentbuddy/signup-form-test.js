import Ember from 'ember';

import {
  moduleForComponent,
  test
} from 'ember-qunit';

window.Stripe = {card: {createToken: function(cardDetails, stripeResponseHandler) {
  stripeResponseHandler(null, "token");
}}};

moduleForComponent('signup-form', '_talentbuddy_checker: signup-form', {
  needs: ['service:validations',
          'ember-validations@validator:local/presence',
          'ember-validations@validator:local/confirmation',
          'ember-validations@validator:local/format',
          'ember-validations@validator:local/length',
          'validator:local/email',
          'validator:local/cardNumber',
          'validator:local/cardExpiry',
          'validator:local/cardCvc'
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

test('it has the fields cardNumber, cardExpiry, cardCVC with default value \'\' set', function(assert) {
  var component = this.subject();
  assert.equal(component.get('cardNumber'), '', 'You must define the "cardNumber" field on your component with initial value \'\'.');
  assert.equal(component.get('cardExpiry'), '', 'You must define the "cardExpiry" field on your component with initial value \'\'.');
  assert.equal(component.get('cardCVC'), '', 'You must define the "cardCVC" field on your component with initial value \'\'.');
});

test('it renders the form', function(assert) {
  var component = this.subject();
  this.render();

  assert.ok(this.$('form'), 'You haven\'t implemented a form in your component template.');

  var inputs = this.$('form input');
  assert.equal(inputs.length, 8, 'Your form needs to have 8 inputs: the previous 5, plus the 3 new credit card fields.');

  var cardNumber = this.$('form input')[4];
  assert.equal(this.$(cardNumber).attr('name'), 'cardNumber', 'cardNumber must be the 5th input and must have the name "cardNumber".');

  var cardExpiry = this.$('form input')[5];
  assert.equal(this.$(cardExpiry).attr('name'), 'cardExpiry', 'cardExpiry must be the 5th input and must have the name "cardExpiry".');

  var cardCVC = this.$('form input')[6];
  assert.equal(this.$(cardCVC).attr('name'), 'cardCVC', 'cardCVC must be the 5th input and must have the name "cardCVC".');

  var submit = this.$('form input')[7];
  assert.equal(this.$(submit).attr('type'), 'submit', 'The Sign up button must be the last input and have type "submit".');
});


test('it binds the 3 fields to input values', function(assert) {
  var component = this.subject();
  this.render();

  Ember.run(function() {
    component.setProperties({
      cardNumber: '4242 4242 4242 4242',
      cardExpiry: '11 / 2016',
      cardCVC: '123'
    });
  });

  var inputs = this.$('form input');

  var cardNumber = this.$('form input')[4];
  assert.equal(this.$(cardNumber).val(), '4242 4242 4242 4242', 'The value of the cardNumber field isn\'t bound to the cardNumber property on the component.');

  var cardExpiry = this.$('form input')[5];
  assert.equal(this.$(cardExpiry).val(), '11 / 2016', 'The value of the cardExpiry field isn\'t bound to the cardExpiry property on the component.');

  var cardCVC = this.$('form input')[6];
  assert.equal(this.$(cardCVC).val(), '123', 'The value of the cardCVC field isn\'t bound to the cardCVC property on the component.');
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
      cardNumber: '4242 4242 4242 4242',
      cardExpiry: '11 / 2016',
      cardCVC: '123'
    });
  });

  this.$('form').submit();
  assert.equal(
    component.$('form .error').length,
    0,
    "You must not show the error div when the form is filled correctly."
  );
});

test('it validates the cardNumber field', function(assert) {
  var component = this.subject();
  this.render();

  Ember.run(function() {
    component.setProperties({
      name: 'John',
      email: 'john@acme.co',
      password: '12345678W',
      passwordConfirmation: '12345678W',
      cardNumber: '4242 4242 4242 4243'
    });
  });

  this.$('form').submit();
  assert.equal(
    component.$('form .error').html(),
    "Your credit card number is invalid.",
    "You must show an error when the cardNumber field is invalid."
  );
});

test('it validates the cardExpiry field', function(assert) {
  var component = this.subject();
  this.render();

  Ember.run(function() {
    component.setProperties({
      name: 'John',
      email: 'john@acme.co',
      password: '12345678W',
      passwordConfirmation: '12345678W',
      cardNumber: '4242 4242 4242 4242',
      cardExpiry: '11 / 2014'
    });
  });

  this.$('form').submit();
  assert.equal(
    component.$('form .error').html(),
    "Your credit card expiry date is invalid.",
    "You must show an error when the card expiry date is not valid."
  );
});

test('it validates the cardCVC field', function(assert) {
  var component = this.subject();
  this.render();

  Ember.run(function() {
    component.setProperties({
      name: 'John',
      email: 'john@acme.co',
      password: '12345678W',
      passwordConfirmation: '12345678W',
      cardNumber: '4242 4242 4242 4242',
      cardExpiry: '11 / 2016',
      cardCVC: '11'
    });
  });

  this.$('form').submit();
  assert.equal(
    component.$('form .error').html(),
    "Your CVC code is invalid.",
    "You must show an error when the CVC field is invalid."
  );
});

test('it sends the action "submit" on form submit with valid input fields', function(assert) {
  assert.expect(5);

  var component = this.subject();
  this.render();

  Ember.run(function() {
    component.setProperties({
      name: 'John',
      email: 'john@acme.co',
      password: '12345678W',
      passwordConfirmation: '12345678W',
      cardNumber: '4242 4242 4242 4242',
      cardExpiry: '11 / 2016',
      cardCVC: '123'
    });
  });

  var calledExternalAction = false;

  var targetObject = {
    externalAction: function(name, email, password, stripeToken) {
      calledExternalAction = true;
      assert.equal(name, 'John', 'You don\'t send the "name" field as an argument to the external action.');
      assert.equal(email, 'john@acme.co', 'You don\'t send the "email" field as an argument to the external action.');
      assert.equal(password, '12345678W', 'You don\'t send the "password" field as an argument to the external action.');
      assert.equal(stripeToken, 'token', 'You don\'t send the Stripe token as an argument to the external action.');
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
      passwordConfirmation: '12345678W',
      cardNumber: '4242 4242 4242 4242',
      cardExpiry: '11 / 2016',
      cardCVC: '11'
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
