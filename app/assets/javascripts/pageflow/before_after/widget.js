(function($) {
  $.widget('pageflow.before_after', {
    _create: function() {
      /*
       * jQuery beforeafter plugin
       * forked for Codevise Pageflow by Christoph Merkelbach
       *
       * @author admin@catchmyfame.com - http://www.catchmyfame.com
       * @version 1.4
       * @date September 19, 2011
       * @category jQuery plugin
       * @copyright (c) 2009 admin@catchmyfame.com (www.catchmyfame.com)
       * @license CC Attribution-NonCommercial-ShareAlike 3.0 Unported (CC BY-NC-SA 3.0) - http://creativecommons.org/licenses/by-nc-sa/3.0/
       */
      var defaults =
      {
        animateIntro : true,
        introDelay : 1000,
        introDuration : 1000,
        introPosition : 0.65,
        clickSpeed: 600,
        linkDisplaySpeed: 200,
        keypressAmount: 20,
        onReady: function(){},
        onInitialized: function(){},
        onSlide: function(){}
      };
      var options = defaults;
      var randID =  Math.round(Math.random()*100000000);

      var o=options;
      var obj = $(this.element);

      var beforeImg = $('.before_image', obj);
      var afterImg = $('.after_image', obj);

      var section = $(obj).parentsUntil(".backgroundArea").last();

      var imgWidth;
      var imgHeight;

      var refresh = function() {
        var resizeAndPositionContainer = function() {
          var screenRatio = section.width() / section.height();

          if(screenRatio < imgRatio) {
            $(obj).parent().css({'width':'100%','height':'auto'});
            var topOffset = (section.height() - $(obj).parent().height()) / 2;
            $(obj).css({'top':topOffset+'px','left':'0'});
          }
          else {
            $(obj).parent().css({'width': (section.height() * imgRatio)  + 'px','height':'100%'});
            var leftOffset = (section.width() - $(obj).parent().width()) / 2;
            $(obj).css({'top':'0','left':leftOffset+'px'});
          }
        };

        imgWidth = beforeImg.attr("data-width");
        imgHeight = beforeImg.attr("data-height");
        var imgRatio = imgWidth / imgHeight;


        $(obj).parent().toggleClass('image-is-landscape', imgRatio > 1);
        $(obj).parent().toggleClass('image-is-portrait', imgRatio <= 1);

        var containerHeight = imgHeight / imgWidth * 100;
        $(obj)
          .css({'overflow':'visible','position':'relative','padding':'0','width':'100%', 'padding-top': containerHeight+"%"});

        resizeAndPositionContainer();

        bb = obj.get()[0].getBoundingClientRect();
        barOffset =  0;
        dragwrapper.draggable();
        dragwrapper.draggable('option', {axis: 'x', containment:[bb.left-barOffset, bb.top, bb.right-barOffset, bb.bottom],drag:drag,stop:drag });
      };

      this.refresh = refresh;

      beforeImg.attr('id','beforeimage'+randID);
      afterImg.attr('id','afterimage'+randID);

      var bb;
      var barOffset;
      var beforeWrapper = $('.before_wrapper', obj);

      // Create an inner div wrapper (dragwrapper) to hold the images.

      var dragwrapper = $('<div class="dragwrapper" />');
      dragwrapper.attr('id', 'dragwrapper' + randID);
      dragwrapper.attr('title', I18n.t('pageflow.public.before_after.drag_hint', {
        locale: pageflow.seed.locale
      }));
      $(obj).prepend(dragwrapper);

      var dragHandle = $('<span class="draghandle" />');
      dragHandle.attr('id', 'draghandle' + randID);
      dragwrapper.append(dragHandle);

      var dragInner = $('<div class="drag" />');
      dragInner.attr('id', 'drag' + randID);
      dragwrapper.append(dragInner);

      dragwrapper.css({'opacity':1,'position':'absolute','padding':'0','left':o.introPosition * 100 +'%'}).height("100%");

      var afterWrapper = $('.after_wrapper', obj);

      beforeWrapper.css({'width': '100%', 'height':'100%', 'position':'absolute','left':'0px','z-index':'1','top':'0'}); // Set CSS properties of the before image div
      afterWrapper.css({'width':'100%','height':'100%','position':'absolute','overflow':'hidden','right':'0px','top':'0','text-align':'right'});  // Set CSS properties of the after image div
      $('#drag'+randID).height("100%");

      $(obj).append('<div class="ba_left_indicator ba_indicator" id="lt-arrow'+randID+'"></div><div class="ba_right_indicator ba_indicator" id="rt-arrow'+randID+'"></div>');
      $('.ba_indicator', obj).css('opacity', 0);
      refresh();

      $('img', obj).on('dragstart', function(event) { event.preventDefault(); });


      function drag()
      {
        var bb = obj.get()[0].getBoundingClientRect();
        dragwrapper.draggable( {axis: 'x', containment:[bb.left-barOffset, bb.top, bb.right-barOffset, bb.bottom],drag:drag,stop:drag });
        var leftPos = parseInt( $(this).css('left'), 10 ) + barOffset;
        var relPos = leftPos / bb.width;
        if(relPos >= 1) { relPos = 1; }

        beforeWrapper.css('width',relPos * 100 + '%');
        o.onSlide.call(this,  relPos);
        $('#lt-arrow'+randID+', #rt-arrow'+randID).stop().css('opacity',0);
      }

      o.onInitialized.call(this);

      if(o.animateIntro)
      {
        beforeWrapper.width(bb.width);
        dragwrapper.css('left',imgWidth-barOffset+'px');
        setTimeout(function(){
          dragwrapper.css({'opacity':1}).animate({'left':(100*o.introPosition)+'%'},o.introDuration,function(){dragwrapper.animate({'opacity':1},1000);});
          beforeWrapper.width(bb.width).animate({'width':o.introPosition*100+'%'},o.introDuration,function(){clickit();o.onReady.call(this);});
          o.onSlide.call(this, o.introDelay);
        },o.introDelay);
      }
      else
      {
        clickit();
        o.onReady.call(this);
      }

      function clickit()
      {
        bb = obj.get()[0].getBoundingClientRect();
        $(obj).hover(function(){
            $('#lt-arrow'+randID).stop().css({'z-index':'20','position':'absolute','top':bb.height/2-$('#lt-arrow'+randID).height()/2+'px','left':parseInt(dragwrapper.css('left'), 10)-14+'px'}).animate({opacity:1,left:parseInt($('#lt-arrow'+randID).css('left'), 10)-6+'px'},200);
            $('#rt-arrow'+randID).stop().css({'position':'absolute','top':bb.height/2-$('#lt-arrow'+randID).height()/2+'px','left':parseInt(dragwrapper.css('left'), 10)+10+'px'}).animate({opacity:1,left:parseInt($('#rt-arrow'+randID).css('left'), 10)+6+'px'},200);
          },function(){
            $('#lt-arrow'+randID).animate({opacity:0,left:parseInt($('#lt-arrow'+randID).css('left'),10)-6+'px'},350);
            $('#rt-arrow'+randID).animate({opacity:0,left:parseInt($('#rt-arrow'+randID).css('left'),10)+6+'px'},350);
          }
        );

        // When clicking in the container, move the bar and imageholder divs
        $(obj).on('click touchmove touchstart', function(e){
          bb = obj.get()[0].getBoundingClientRect();
          var pageX = e.pageX || e.originalEvent.touches[0].pageX;
          var moveSpeed = o.clickSpeed;
          if(e.type == "touchmove") {
            moveSpeed = 10;
          }
          var clickX = pageX - $(this).offset().left;
          var percentualLeft = clickX / $(this).width() * 100;
          var percentualLeftDragger = (clickX - barOffset) / $(this).width() * 100;
          if (pageX < bb.left || pageX > bb.right) { return; }

          dragwrapper.stop().animate({'left':percentualLeftDragger+'%'},moveSpeed);
          beforeWrapper.stop().animate({'width':percentualLeft+'%'},moveSpeed, function() {
            var pos = (parseInt( $('> div:eq(2)', obj).css('width'), 10 )) / imgWidth;
            o.onSlide.call(this, pos);
          });
          $('#lt-arrow'+randID+',#rt-arrow'+randID).stop().animate({opacity:0},50);
        });
        $(obj).one('mousemove', function(){dragwrapper.stop().animate({'opacity':1},500);}); // If the mouse is over the container and we animate the intro, we run this to change the opacity when the mouse moves since the hover event doesnt get triggered yet
      }
    }
  });
}(jQuery));
