import Ember from "ember";
import { test } from 'ember-qunit';
import { module } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('_talentbuddy_checker: Page titles', {
  beforeEach: function() {
    App = startApp();
  },
  afterEach: function() {
    Ember.run(App, App.destroy);
  }
});

test("signup page uses the form component", function(assert) {
  var url = "/";
  visit(url).then(function() {
    assert.equal(find('form').length, 1, "The signup route doesn't use the form component.");
  });
});
