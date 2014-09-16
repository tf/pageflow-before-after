//= require jquery.ui.draggable
//= require ./before_after/widget

pageflow.pageType.register('before_after', _.extend({

  prepareNextPageTimeout: 0,

  enhance: function(pageElement, configuration) {
    pageElement.addClass('hide_content_with_text');

    pageElement.find('.play_button').on('mousedown touchstart', function() {
      pageflow.hideText.activate();
    });

    pageElement.find('.close_button').on('click', function(e) {
      pageflow.hideText.deactivate();
      e.stopPropagation();
    });
  },

  prepare: function(pageElement, configuration) {
  },

  resize: function(pageElement, configuration) {
    pageElement.find(".before_after").before_after("refresh");
    pageElement.find('.scroller').scroller("refresh");
  },

  preload: function(pageElement, configuration) {
    return pageflow.preload.backgroundImage(pageElement.find('.background_image'));
  },

  activating: function(pageElement, configuration) {
    pageElement.find(".before_after").before_after();
    pageElement.find(".before_after").before_after("refresh");
    pageElement.find('.scroller').scroller("refresh");
  },

  activated: function(pageElement, configuration) {
  },

  deactivating: function(pageElement, configuration) {},

  deactivated: function(pageElement, configuration) {},

  update: function(pageElement, configuration) {

    pageElement.find('h2 .tagline').text(configuration.get('tagline') || '');
    pageElement.find('h2 .title').text(configuration.get('title') || '');
    pageElement.find('h2 .subtitle').text(configuration.get('subtitle') || '');
    pageElement.find('p').html(configuration.get('text') || '');

    this.updateInfoBox(pageElement, configuration);
    this.updateCommonPageCssClasses(pageElement, configuration);

    pageElement.find('.shadow').css({
      opacity: configuration.get('gradient_opacity') / 100
    });
  },

  embeddedEditorViews: function() {
    return {
      '.background_image': {
        view: pageflow.BackgroundImageEmbeddedView,
        options: {propertyName: 'background_image_id'}
      },
      '.before_after': {
        view: pageflow.beforeAfter.BeforeAfterEmbeddedView
      }
    };
  }
}, pageflow.commonPageCssClasses, pageflow.infoBox));