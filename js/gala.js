var gala = (function() {
  var LEFT_BTN = '<span class="fa fa-fw fa-backward gala-nav"></span>';
  var RIGHT_BTN = '<span class="fa fa-fw fa-forward gala-nav"></span>';
  var FIGURE = '<figure class="gala-figure"></figure>';
  var CAPTION = '<figcaption></figcaption>';

  var addButtons = function($gala, $images) {
    var height = $gala.height() + 'px';

    moveImages($images, 0); // First transition is ignored w/o this
    $gala.before(LEFT_BTN).prev().css('line-height', height).click(getOnNavLeft($gala, $images));
    $gala.after(RIGHT_BTN).next().css('line-height', height).click(getOnNavRight($gala, $images));

    updateButtonState($gala, 0, $images.length);
  };

  var addCaption = function($gala, $images) {
    $gala.wrap(FIGURE).after(CAPTION);
    updateCaptionText($gala, $images, 0);
  };

  var addKeyboardNav = function($gala, $images) {
    if ($('.gala').length != 1) {
      return; // Keyboard navigation only works if there is only one gala
    }

    $(document).keydown(function(e) {
      switch (e.which) {
        case 37: // left
          (getOnNavLeft($gala, $images))();
          break;
        case 39: // right
          (getOnNavRight($gala, $images))();
          break;
        default:
          return;
      }
      e.preventDefault();
    });
  };

  var create = function(gala) {
    var $gala = $(gala);
    var $images = $gala.children('img');

    addCaption($gala, $images);
    if ($images.length > 1) {
      addButtons($gala, $images);
      addKeyboardNav($gala, $images);
    }
  };

  var getImageOffset = function($images) {
    return parseInt($images.first().css('left'), 10);
  };

  var getOnNavLeft = function($gala, $images) {
    return function() {
      var width = $gala.width();
      var offset = getImageOffset($images);
      var totalImages = $images.length;
      if (offset % width != 0 || totalImages <= 1 || offset >= 0) {
        return;
      }
      moveImages($images, offset+width);
      var currentImage = -offset/width-1;
      updateButtonState($gala, currentImage, totalImages);
      updateCaptionText($gala, $images, currentImage);
    };
  };

  var getOnNavRight = function($gala, $images) {
    return function() {
      var width = $gala.width();
      var offset = getImageOffset($images);
      var totalImages = $images.length;
      if (offset % width != 0 || totalImages <= 1 || offset <= -(width * (totalImages-1))) {
        return;
      }
      moveImages($images, offset-width);
      var currentImage = 1-offset/width;
      updateButtonState($gala, currentImage, totalImages);
      updateCaptionText($gala, $images, currentImage);
    };
  };

  var moveImages = function($images, position) {
    $images.css('left', position+'px');
  };

  var updateButtonState = function($gala, currentImage, totalImages) {
    if (currentImage <= 0) {
      $gala.prev().addClass('gala-disabled');
    } else {
      $gala.prev().removeClass('gala-disabled');
    }

    if (currentImage >= totalImages-1) {
      $gala.next().addClass('gala-disabled');
    } else {
      $gala.next().removeClass('gala-disabled');
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
