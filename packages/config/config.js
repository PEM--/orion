/**
 * Definition of the config object
 */
orion.config = {
  collection: new Meteor.Collection('orion_config'),
  object: {}
};

/**
 * Allows to set some fields on simple schema
 */
SimpleSchema.extendOptions({
  category: Match.Optional(String),
  public: Match.Optional(Boolean),
  secret: Match.Optional(Boolean),
  name: Match.Optional(String)
});

/**
 * Register the action for the permissions
 */
orion.roles.registerAction('config.update', true);

/**
 * Permissions for the dictionary.
 */
orion.config.collection.allow({
  /**
   * No one can insert a config object
   * becouse it only uses one and its created
   * automatically.
   */
  'insert': function(userId, doc) {
    return false;
  },
  /**
   * No one can remove a config object
   * becouse it only uses one.
   */
  'remove': function(userId, doc) {
    return false;
  }
});

orion.config.collection.allow({
  'update': function(userId, doc, fields, modifier) {
    return orion.roles.allow(userId, 'config.update', userId, doc, fields, modifier);
  }
});

orion.config.collection.deny({
  'update': function(userId, doc, fields, modifier) {
    return orion.roles.deny(userId, 'config.update', userId, doc, fields, modifier);
  }
})

/**
 * Function to add a config.
 * This just modifies the schema of the config object
 * and adds the form in the admin panel.
 */
orion.config.add = function(name, category, options) {
  var newSchema = (this.collection.simpleSchema() && _.clone(this.collection.simpleSchema()._schema)) || {};

  newSchema[name] = _.extend({
    type: String,
    secret: false,
    label: name,
    public: false,
    category: category,
    name: name
  }, options || {});

  if (newSchema[name].secret) {
    newSchema[name].autoform = {
      type: 'password',
      'data-type': 'secret',
    }
  }

  this.collection.attachSchema(new SimpleSchema(newSchema));
};

/**
 * Returns the value of the config.
 * If the config doesn't exists it 
 * returns the defaultValue
 */
orion.config.get = function(path, defaultValue) {
  // Sets empty string to avoid problems on templates
  defaultValue = !defaultValue || defaultValue instanceof Spacebars.kw ? '' : defaultValue;
  return orion.helpers.searchObjectWithDots(this.collection.findOne(), path) || defaultValue;
}

/**
 * Returns the public options
 */
orion.config.getPublicFields = function() {
  var atts = _.where(this.collection.simpleSchema()._schema, { public: true });
  return _.pluck(atts, 'name');
}