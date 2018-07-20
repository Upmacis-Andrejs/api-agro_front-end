$(document).ready(function() {
  'use strict';

  var $window = $(window);
  var $document = $(document);
  var $body = $("body");

  // Script for deprecated browser notification
  $('.close_announcement').click(function(e) {
      e.preventDefault();
      $('.update_browser_container').addClass('hidden');
  });

  // Replace all .svg to .png, in case the browser does not support the format
  if(!Modernizr.svg) {
      $('img[src*="svg"]').attr('src', function() {
          return $(this).attr('src').replace('.svg', '.png');
      });
  }

  // Position shadow for .newsletter-block
  function positionShadow() {
    if( $('.newsletter-block .shadow').length > 0 ) {
      var $windowWidth = $(window).outerWidth();
      var $shadow = $('.newsletter-block .shadow');
      var $width = $('.newsletter-block').innerWidth();
      if ( $windowWidth >= 1200 ) {
        $shadow.css('bottom', -parseInt($width * 0.06));
      } else if ( $windowWidth < 1200 && $windowWidth >= 768 ) {
        $shadow.css('bottom', -parseInt($width * 0.085));
      } else {
        $shadow.css('bottom', -parseInt($width * 0.12));
      }
    }
  }
  positionShadow();
  $(window).resize(function() {
    positionShadow();
  });

  // Position #map element
  function positionMap() {
    if( $('#map').length > 0 ) {
      var $map = $('#map');
      var $body_w = $body.width();
      $map.addClass('row row-full-w');
      if( $(window).outerWidth() >= 1200 ) {
        $map.parent().css('padding-bottom', '');
        var $height = $map.closest('.contact-form-and-map').innerHeight();
        $map.css({
          'position' : 'absolute',
          'top' : 0,
          'bottom' : 0,
          'width': $body_w,
          'height' : $height,
          'padding-top' : '',
          'margin-left': parseInt(-$body_w / 2)
        });
      } else {
        $map.css({
          'position' : 'absolute',
          'top' : 'auto',
          'bottom' : 0,
          'width': $body_w,
          'height' : '',
          'padding-top' : parseInt($body_w * 0.84635),
          'margin-left': parseInt(-$body_w / 2)
        });
        $map.parent().css('padding-bottom', parseInt($body_w * 0.84635));
      }
    }
  }
  positionMap();
  $(window).resize(function() {
    positionMap();
  });

  // Calculate height for .contact-wrap decoration element (triangle)
  function decorHeight() {
    if( $('#decor-triangle').length > 0 ) {
      var $decorTriangle = $('#decor-triangle');
      if( $(window).outerWidth() >= 1200 ) {
        var $height = $decorTriangle.closest('.contact-form-and-map').innerHeight();
        $decorTriangle.css({
          'border-top-width' : $height,
          'border-right-width' : 228,//parseInt($height * 0.35),
        });
      } else {
        $decorTriangle.css({
          'border-top-width' : '',
          'border-right-width' : '',
        });
      }
    }
  }
  decorHeight();
  $(window).resize(function() {
    decorHeight();
  });

  // Add CSS class to Site Header when scrollTop position of the document is not 0
  var $lastY = $window.scrollTop();
  var $document = $(document);
  function add_not_top() {
    $body.addClass("not--top");
  }
  function remove_not_top() {
    $body.removeClass("not--top");
  }
  function add_not_top_down() {
    $body.addClass("not--top-down");
  }
  function remove_not_top_down() {
    $body.removeClass("not--top-down");
  }
  var $timeout_add_not_top
  var $timeout_remove_not_top
  var $timeout_add_not_top_down
  var $timeout_remove_not_top_down


  if( $lastY > 50 ) {
    add_not_top();
  }

  $(window).scroll(function() {

    var $currentY = $window.scrollTop();
    if ( $currentY > $lastY ) {
      var y = 'down';
    } else if ( $currentY < $lastY ) {
      var y = 'up';
    }
    $lastY = $currentY;
    if ( $document.scrollTop() > 50 && y == 'down' ) {
      $timeout_add_not_top = setTimeout(add_not_top, 150);
    } else if ( $document.scrollTop() <= 80 && y == 'up' ) {
      $timeout_remove_not_top = setTimeout(remove_not_top, 150);
    }
    if ( $document.scrollTop() > 300 && y == 'down' ) {
      $timeout_add_not_top_down = setTimeout(add_not_top_down, 150);
    } else if  ( y == 'up' ) {
      $timeout_add_not_top_down = setTimeout(remove_not_top_down, 150);
    }

  });


  // Scroll the page according to clicked navigation item
  $(".header-menu a").click(function() {
    var $href = $(this).attr('href');
      $("html, body").animate({
          scrollTop: $($href).offset().top + 1
      }, 400);
    $(".mobile-menu-icon").removeClass("open");
    $("body").removeClass("mobile-menu-open");
    $(".mobile-menu-wrap").stop(true, true).slideUp();
  });

  // Toggle mobile menu
  $(".mobile-menu-icon").click(function() {
    $(this).toggleClass('open');
    $("body").toggleClass('mobile-menu-open');
    $(".mobile-menu-wrap").stop(true, true).slideToggle();
    return false;
  });

  // Hide mobile menu when clicked outside of it
  $(document).mouseup(function (e) {
    if ( $(".mobile-menu-icon").hasClass('open') ) {
      var $container = $(".site-header");
      if (
          !$container.is(e.target) // if the target of the click isn't the container...
          && $container.has(e.target).length === 0 // ... nor a descendant of the container
        )
      {
        $(".mobile-menu-icon").removeClass("open");
        $("body").removeClass("mobile-menu-open");
        $(".mobile-menu-wrap").stop(true, true).slideUp();
        return false;
      }
    }
  });

  // Close mobile menu when resized to desktop device
  $(window).resize(function() {
    var $windw_width = $(window).width();
    if( $windw_width >= 1200 ) {
      $(".mobile-menu-icon").removeClass("open");
      $('body').removeClass('mobile-menu-open');
      $(".mobile-menu-wrap").css('display', '');
    }
  });

  // Calculate div height for vertical 3 column layout
  function heightFor2Col() {
    if( $('.js-height-for-2-col').length > 0 ) {

      var $windowWidth = $(window).outerWidth();
      var $calcHeight = $('.js-height-for-2-col');

      // For desktop and tablet devices
      if( $windowWidth >= 768 ) {

        $calcHeight.each(function () {

          $(this).addClass('flex-t-column height-for-2-col');
          var totalHeight = 0;
          var $calcHeightBlock = $(this).children('li, .js-calc-height');
          $calcHeightBlock.each(function () {
              totalHeight += parseInt($(this).outerHeight(true), 10)
          });
          var setHeight = 0;
          var setHeightReverse = 0;
          var halfHeight = totalHeight / 2;

          $calcHeightBlock.each(function () {
              setHeight += parseInt($(this).outerHeight(true), 10)
              if (setHeight >= halfHeight) {
                  return false
              }
          });
          $($calcHeightBlock.get().reverse()).each(function () {
              setHeightReverse += parseInt($(this).outerHeight(true), 10)
              if (setHeightReverse >= halfHeight) {
                  return false
              }
          });

          if (setHeight < setHeightReverse) {
              $(this).css('height', parseInt(setHeight + 2))
          } else {
              $(this).css('height', parseInt(setHeightReverse + 2))
          }

        });

      // For mobile devices (1 column)
      } else {

        $calcHeight.each(function () {
            $(this).css('height', '');
        });

      }
    }

  }
  heightFor2Col();
  $(window).resize(function() {
    heightFor2Col();
  });

  // Calculate div height for vertical 3 column layout
  function heightFor3Col() {
    if( $('.js-height-for-3-col').length > 0 ) {

      var $windowWidth = $(window).outerWidth();
      var $calcHeight = $('.js-height-for-3-col');

      // For desktop and tablet devices
      if( $windowWidth >= 768 ) {

        $calcHeight.each(function () {
            $(this).addClass('flex-t-column height-for-3-col');
            var totalHeight = 0;
            var $calcHeightBlock = $(this).children('li, .js-calc-height');
            $calcHeightBlock.each(function () {
                totalHeight += parseInt($(this).outerHeight(true), 10)
            });
            var setHeight = 0;
            var setHeightReverse = 0;
            var setHeightMiddle = 0;

            // For desktop devices (3 columns)
            if( $windowWidth >= 1200 ) {

              var thirdHeight = totalHeight / 3;
              var countThird = Math.ceil($calcHeightBlock.length / 3);
              var $array = $calcHeightBlock.toArray();
              var $middleArrayBlock = $array.slice(parseInt(countThird), parseInt(countThird * 2));

              $calcHeightBlock.each(function () {
                  setHeight += parseInt($(this).outerHeight(true), 10)
                  if (setHeight >= thirdHeight) {
                      return false
                  }
              });
              var i;
              for (i = 0; i < $middleArrayBlock.length; i++) {
                setHeightMiddle += parseInt($($middleArrayBlock[i]).outerHeight(true), 10)
              };
              $($calcHeightBlock.get().reverse()).each(function () {
                  setHeightReverse += parseInt($(this).outerHeight(true), 10)
                  if (setHeightReverse >= thirdHeight) {
                      return false
                  }
              });

              var min_value = Math.min(setHeight, setHeightReverse, setHeightMiddle);

//console.log('count third: '+countThird);
//console.log('total height: '+totalHeight);
//console.log('set height: '+setHeight);
//console.log('set height middle: '+setHeightMiddle);
//console.log('set height reverse: '+setHeightReverse);
//console.log('min value: '+min_value);

              $(this).css('height', parseInt(min_value + 2))

            // For tablet devices (2 columns)
            } else {

              var halfHeight = totalHeight / 2;
              $calcHeightBlock.each(function () {
                  setHeight += parseInt($(this).outerHeight(true), 10)
                  if (setHeight >= halfHeight) {
                      return false
                  }
              });
              $($calcHeightBlock.get().reverse()).each(function () {
                  setHeightReverse += parseInt($(this).outerHeight(true), 10)
                  if (setHeightReverse >= halfHeight) {
                      return false
                  }
              });

              if (setHeight < setHeightReverse) {
                  $(this).css('height', parseInt(setHeight + 2))
              } else {
                  $(this).css('height', parseInt(setHeightReverse + 2))
              }

            }

        });

      // For mobile devices (1 column)
      } else {

        $calcHeight.each(function () {
            $(this).css('height', '');
        });

      }
    }

  }
  heightFor3Col();
  $(window).resize(function() {
    heightFor3Col();
  });

  // Match specific element heights within parent
  function matchHeights() {
    if( $('.js-equal-height-wrap').length > 0 ) {

      if( $(window).outerWidth() >=768 ) {
        $('.js-equal-height-wrap').each(function() {
          var $equalHeightBlock = $(this).find('.js-equal-height');
          var $heights = $equalHeightBlock.map(function() {
            return $(this).outerHeight()
          }).get();
          var $maxHeight = parseFloat(Math.max.apply(null, $heights));
          $equalHeightBlock.css('height', $maxHeight);
        });
      } else {
        $('.js-equal-height-wrap').each(function() {
          $(this).find('.js-equal-height').css('height', '');
        });
      }
    }
  }
  matchHeights();
  $(window).resize(function() {
    matchHeights();
  });

  // Position newsletter block and contents
  function positionNewsletter() {
    if( $('.newsletter-block').length > 0 ) {
      var $newsletterBlock = $('.newsletter-block');
      var $newsletterHeight = $newsletterBlock.height();
      var $space = parseInt($newsletterHeight / 2);
      $newsletterBlock.css('margin-bottom', -$space);
      $('.contacts').css('padding-top', $space);

      var $upperWrap = $newsletterBlock.find('.upper-wrap');
      var $blockTitle = $upperWrap.find('.block-title');
      var $contentsWrap = $upperWrap.find('.contents-wrap');

      if( $(window).outerWidth() >= 1200 ) {
      	var $blockWidth = $upperWrap.width();
      	$blockTitle.css('width', '');
      	var $blockTitleWidth = $blockTitle.outerWidth();
		$blockTitle.css('width', $blockTitleWidth);
      	$contentsWrap.css('width', parseInt($blockWidth - $blockTitleWidth));
      } else {
      	$blockTitle.css('width', '');
      	$contentsWrap.css('width', '');
      }
    }
  }
  positionNewsletter();
  $(window).resize(function() {
    positionNewsletter();
  });

  // Position .what-we-do section's small decor image in responsive views
  function positionSmallDecorImg() {
    if( $('.what-we-do-block .design-img-wrap .small-img').length > 0 ) {
      var $windowWidth = $(window).outerWidth();
      var $img = $('.what-we-do-block .design-img-wrap .small-img');
      var $width = $img.innerWidth();
      if ( $windowWidth < 1200 ) {
        $img.css('margin-top', -parseInt($width * 0.2875));
      } else {
        $img.css('margin-top', '');
      }
    }
  }
  positionSmallDecorImg();
  $(window).resize(function() {
    positionSmallDecorImg();
  });

  // Position block's decoration elements
  function positionBlockDecoration() {
    if( $('.list-box .box-decor').length > 0 ) {
      $('.list-box').each(function() {
        var $this = $(this);
        var $windowWidth = $(window).outerWidth();
        var $block_1 = $this.find('.box-decor-1');
        var $block_2 = $this.find('.box-decor-2');
        var $height_1 = $block_1.innerHeight();
        var $height_2 = $block_2.innerHeight();
        if ( $windowWidth >= 1200 ) {
          $block_1.css('top', -parseInt($height_1 * 0.16234));
          $block_2.css('bottom', -parseInt($height_2 * 0.37931));
        } else if ( $windowWidth < 1200 && $windowWidth >= 768 ) {
          $block_1.css('top', -parseInt($height_1 * 0.14279));
          $block_2.css('bottom', -parseInt($height_2 * 0.34167));
        } else {
          $block_1.css('top', -parseInt($height_1 * 0.16216));
          $block_2.css('bottom', -parseInt($height_2 * 0.37143));
        }
      });
    }
  }
  positionBlockDecoration();
  $(window).resize(function() {
    positionBlockDecoration();
  });

});