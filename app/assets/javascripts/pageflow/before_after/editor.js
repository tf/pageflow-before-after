//= require_self
//= require ./editor/before_after_embedded_view

pageflow.beforeAfter = {};

pageflow.ConfigurationEditorView.register('before_after', {
  configure: function() {
    this.tab('general', function() {
      this.group('general');

      this.input('control_bar_text', pageflow.TextInputView, {
        placeholder: I18n.t('pageflow.before_after.page.start', {
          locale: pageflow.entry.configuration.get('locale')
        })
      });
      this.input('additional_title', pageflow.TextInputView);
      this.input('additional_description', pageflow.TextAreaInputView, {size: 'short'});
    });

    this.tab('files', function() {
      this.input('before_image_id', pageflow.FileInputView, {
        collection: pageflow.imageFiles,
        imagePositioning: false
      });
      this.input('after_image_id', pageflow.FileInputView, {
        collection: pageflow.imageFiles,
        imagePositioning: false
      });
      this.input('thumbnail_image_id', pageflow.FileInputView, {
        collection: pageflow.imageFiles,
        imagePositioning: false
      });
    });

    this.tab('options', function() {
      this.group('options');
    });
  }
});
