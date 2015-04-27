import Base from 'ember-validations/validators/base';

export default Base.extend({
  regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  call: function() {
    if (!this.get('regex').test(this.model.get(this.property))) {
      this.errors.pushObject(this.options.message || 'Invalid email address.');
    }
  }
});
