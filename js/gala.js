var gala = (function() {
  var LEFT_BTN = '<span class="fa fa-fw fa-backward gala-nav"></span>';
  var RIGHT_BTN = '<span class="fa fa-fw fa-forward gala-nav"></span>';
  var FIGURE = '<figure class="gala-figure"></figure>';
  var CAPTION = '<figcaption></figcaption>';

  var addButtons = function($gala, $images) {
    moveImages($images, 0); // First transition is ignored w/o this

    $gala.before(LEFT_BTN).prev().click(getOnNavLeft($gala, $images));
    $gala.after(RIGHT_BTN).next().click(getOnNavRight($gala, $images));

    updateButtonState($gala, 0, $images.length);
  };

  var addCaption = function($gala, $images) {
    $gala.wrap(FIGURE).after(CAPTION);
    updateCaptionText($gala, $images, 0);
  };

  var addKeyboardNav = function($gala, $images) {
    if ($('.gala').length != 1) {
      return; // Keyboard navigation works if there is only one gala
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

    $gala.css('display', 'inline-block');
    resize($gala, $images);
  };

  var getCurrentImage = function($gala) {
    return $gala.attr('data-index') || 0;
  };

  var getImageOffset = function($images) {
    return parseInt($images.first().css('left'), 10);
  };

  var getOnNavLeft = function($gala, $images) {
    return function() {
      var width = getRenderWidth($images);
      var offset = getImageOffset($images);
      var totalImages = $images.length;
      if (offset % width != 0 || totalImages <= 1 || offset >= 0) {
        return;
      }
      var currentImage = -offset/width-1;
      navigate($gala, $images, currentImage);
    };
  };

  var getOnNavRight = function($gala, $images) {
    return function() {
      var width = getRenderWidth($images);
      var offset = getImageOffset($images);
      var totalImages = $images.length;
      if (offset % width != 0 || totalImages <= 1 || offset <= -(width * (totalImages-1))) {
        return;
      }
      var currentImage = 1-offset/width;
      navigate($gala, $images, currentImage);
    };
  };

  var getRenderHeight = function($images) {
    return $images.first().height();
  };

  var getRenderWidth = function($images) {
    return $images.first().width();
  };

  var moveImages = function($images, currentImage) {
    var position = -(currentImage * getRenderWidth($images));
    $images.css('left', position+'px');
  };

  var navigate = function($gala, $images, currentImage) {
    var totalImages = $images.length;
    moveImages($images, currentImage);
    saveCurrentImage($gala, currentImage);
    updateButtonState($gala, currentImage, totalImages);
    updateCaptionText($gala, $images, currentImage);
  };

  var resize = function($gala, $images) {
    $gala.css('max-width', getRenderWidth($images)+'px');

    moveImages($images, getCurrentImage($gala));

    var height = getRenderHeight($images) + 'px';
    $gala.prev().css('line-height', height);
    $gala.next().css('line-height', height);
  };

  var saveCurrentImage = function($gala, currentImage) {
    $gala.attr('data-index', currentImage);
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
    },
    resize: function() {
      $('.gala').each(function(index, gala) {
        var $gala = $(gala);
        var $images = $gala.children('img');
        resize($gala, $images);
      });
    }
  }
})();

$(window).load(gala.initialize).resize(gala.resize);
