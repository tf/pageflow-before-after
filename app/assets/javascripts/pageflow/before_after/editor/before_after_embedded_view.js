pageflow.beforeAfter.BeforeAfterEmbeddedView = Backbone.Marionette.View.extend({
  modelEvents: {
    'change': 'update'
  },

  render: function() {
    this.beforeImageView = new pageflow.BackgroundImageEmbeddedView({
      el: this.$el.find('.before_image'),
      model: this.model,
      propertyName: 'before_image_id',
      dataSizeAttributes: true
    });

    this.afterImageView = new pageflow.BackgroundImageEmbeddedView({
      el: this.$el.find('.after_image'),
      model: this.model,
      propertyName: 'after_image_id',
      dataSizeAttributes: true
    });

    this.update();
    return this;
  },

  update: function() {
    this.beforeImageView.update();
    this.afterImageView.update();
    this.$el.before_after();
    this.$el.before_after('refresh');
  }
});