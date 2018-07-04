$(document).ready(function() {
  'use strict';

  var $window = $(window);
  var $document = $(document);
  var $body = $("body");

  /*
  * Set cookie
  *
  * @param string name
  * @param string value
  * @param int days
  * @param string path
  * @see http://www.quirksmode.org/js/cookies.html
  */
  function createCookie(name,value,days,path) {
     if (days) {
         var date = new Date();
         date.setTime(date.getTime()+(days*24*60*60*1000));
         var expires = "; expires="+date.toGMTString();
     }
     else var expires = "";
     document.cookie = name+"="+value+expires+"; path="+path;
  }

  /*
  * Read cookie
  * @param string name
  * @returns {*}
  * @see http://www.quirksmode.org/js/cookies.html
  */
  function readCookie(name) {
     var nameEQ = name + "=";
     var ca = document.cookie.split(';');
     for(var i=0;i < ca.length;i++) {
         var c = ca[i];
         while (c.charAt(0)==' ') c = c.substring(1,c.length);
         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
     }
     return null;
  }

  var cookieMessage = document.getElementById('cookies');
  if (cookieMessage == null) {
     return;
  }
  var cookie = readCookie('seen-cookie-message');
  if (cookie != null && cookie == 'yes') {
     cookieMessage.style.display = 'none';
  } else {
     cookieMessage.style.display = 'block';
  }

  // Set/update cookie
  var cookieExpiry = cookieMessage.getAttribute('data-cookie-expiry');
  if (cookieExpiry == null) {
     cookieExpiry = 30;
  }
  var cookiePath = cookieMessage.getAttribute('data-cookie-path');
  if (cookiePath == null) {
     cookiePath = "/";
  }

  // Close cookie
  $('.js-cookies-close').click(function() {
     $('#cookies').remove();
     createCookie('seen-cookie-message','yes',cookieExpiry,cookiePath);
  });

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

  // Script for full-width row
  function row_full_w () {
    var $body_w = $body.width();
    var $row_full_w = $('.row-full-w');
    var $js_row_full_w = $('.js-row-full-w');

    $js_row_full_w.css({
      'width': $body_w,
      'margin-left': parseInt(-$body_w / 2)
    });
    
    if($row_full_w) {
      $js_row_full_w.addClass('row-full-w');
    }
  }
  row_full_w();
  $(window).resize(function() {
    row_full_w();
  });

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