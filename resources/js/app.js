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
  function add_not_top() {
    $body.addClass("not--top");
  }
  function remove_not_top() {
    $body.removeClass("not--top");
  }
  var $timeout_add_not_top;
  var $timeout_remove_not_top;

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
    } else if ( $document.scrollTop() <= 100 && y == 'up' ) {
      $timeout_remove_not_top = setTimeout(remove_not_top, 150);
    }

  });

});