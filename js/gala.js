var gala = (function() {
  var LEFT_BTN = '<span class="fa fa-fw fa-backward gala-nav"></span>';
  var RIGHT_BTN = '<span class="fa fa-fw fa-forward gala-nav"></span>';
  var FIGURE = '<figure class="gala-figure"></figure>';
  var CAPTION = '<figcaption></figcaption>';

  var addButtons = function($gala, $images) {
    var height = $gala.height() + 'px';

    $images.css('left', 0); // First transition is ignored w/o this
    $gala.before(LEFT_BTN).prev().css('line-height', height).click(getOnClickLeft($gala, $images));
    $gala.after(RIGHT_BTN).next().css('line-height', height).click(getOnClickRight($gala, $images));

    updateButtonState($gala, 0, $images.length);
  };

  var addCaption = function($gala, $images) {
    $gala.wrap(FIGURE).after(CAPTION);
    updateCaptionText($gala, $images, 0);
  };

  var create = function(gala) {
    var $gala = $(gala);
    var $images = $gala.children('img');

    addCaption($gala, $images);
    if ($images.length > 1) {
      addButtons($gala, $images);
    }
  };

  var getOnClickLeft = function($gala, $images) {
    return function() {
      var width = $gala.width();
      var offset = parseInt($images.css('left'), 10);
      var totalImages = $images.length;
      if (offset % width != 0 || totalImages <= 1 || offset <= -(width * (totalImages-1))) {
        return;
      }
      $images.css('left', (offset-width)+'px');
      var currentImage = 1-offset/width;
      updateButtonState($gala, currentImage, totalImages);
      updateCaptionText($gala, $images, currentImage);
    };
  };

  var getOnClickRight = function($gala, $images) {
    return function() {
      var width = $gala.width();
      var offset = parseInt($images.css('left'), 10);
      var totalImages = $images.length;
      if (offset % width != 0 || totalImages <= 1 || offset >= 0) {
        return;
      }
      $images.css('left', (offset+width)+'px');
      var currentImage = -offset/width-1;
      updateButtonState($gala, currentImage, totalImages);
      updateCaptionText($gala, $images, currentImage);
    };
  };

  var updateButtonState = function($gala, currentImage, totalImages) {
    if (currentImage <= 0) {
      $gala.next().addClass('gala-disabled');
    } else {
      $gala.next().removeClass('gala-disabled');
    }

    if (currentImage >= totalImages-1) {
      $gala.prev().addClass('gala-disabled');
    } else {
      $gala.prev().removeClass('gala-disabled');
    }
  };

  var updateCaptionText = function($gala, $images, currentImage) {
    var $caption = $gala.siblings('figcaption');
    $caption.fadeOut(200, function() {
      $caption.text($images[currentImage].getAttribute('alt')).fadeIn(200);
    });
  };

  return {
    initialize: function() {
      $('.gala').each(function(index, gala) {
        create(gala);
      });
    }
  }
})();

$(document).ready(gala.initialize);
