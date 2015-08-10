orion.attributes.registerAttribute('updatedAt', {
  previewTemplate: 'updatedAtPreview',
  getSchema: function(options) {
    return {
      type: Date,
      autoform: {
        omit: true
      },
      autoValue: function() {
        if (this.isUpdate || this.isInsert) {
          return new Date();
        } else if (this.isUpsert) {
          return {$setOnInsert: new Date()};
        } else {
          this.unset();
        }
      }
    };
  }
});

if (Meteor.isClient) {
  ReactiveTemplates.helpers('attributePreview.updatedAt', {
    date: function() {
      return this.value && moment(this.value).format('LLL');
    }
  });
}
