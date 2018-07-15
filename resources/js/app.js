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


  // scroll the page according to clicked navigation item
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

});