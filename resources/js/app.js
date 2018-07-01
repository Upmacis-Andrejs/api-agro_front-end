// Responsive design widths
var $tablet_width = 1359;
var $mobile_width = 767;


  // Script to change url querystrings
  //Define variable
  var objQueryString={};

  //Get querystring value
  function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  //Add or modify querystring
  function changeUrl(key,value) {
    //Get query string value
    var searchUrl=location.search;
    if(searchUrl.indexOf("?")== "-1") {
      var urlValue='?'+key+'='+value;
      history.pushState({state:1, rand: Math.random()}, '', urlValue);
    }
    else {
      //Check for key in query string, if not present
      if(searchUrl.indexOf(key)== "-1") {
        var urlValue=searchUrl+'&'+key+'='+value;
      }
      else {  //If key present in query string
        oldValue = getParameterByName(key);
        if(searchUrl.indexOf("?"+key+"=")!= "-1") {
          urlValue = searchUrl.replace('?'+key+'='+oldValue,'?'+key+'='+value);
        }
        else {
          urlValue = searchUrl.replace('&'+key+'='+oldValue,'&'+key+'='+value); 
        }
      }
      history.pushState({state:1, rand: Math.random()}, '', urlValue);
      //history.pushState function is used to add history state.
      //It takes three parameters: a state object, a title (which is currently ignored), and (optionally) a URL.
    }
    objQueryString.key=value;
    //sendAjaxReq(objQueryString);
  }

  //Used to display data in webpage from ajax
  /*function sendAjaxReq(objQueryString) {
    $.post('test.php', objQueryString, function(data) {
      //alert(data);
    })
  }*/


  //Function used to remove querystring
  function removeQString(key) {
    var urlValue=document.location.href;
    
    //Get query string value
    var searchUrl=location.search;
    
    if(key!="") {
      oldValue = getParameterByName(key);
      removeVal=key+"="+oldValue;
      if(searchUrl.indexOf('?'+removeVal+'&')!= "-1") {
        urlValue=urlValue.replace('?'+removeVal+'&','?');
      }
      else if(searchUrl.indexOf('&'+removeVal+'&')!= "-1") {
        urlValue=urlValue.replace('&'+removeVal+'&','&');
      }
      else if(searchUrl.indexOf('?'+removeVal)!= "-1") {
        urlValue=urlValue.replace('?'+removeVal,'');
      }
      else if(searchUrl.indexOf('&'+removeVal)!= "-1") {
        urlValue=urlValue.replace('&'+removeVal,'');
      }
    }
    else {
      var searchUrl=location.search;
      urlValue=urlValue.replace(searchUrl,'');
    }
    history.pushState({state:1, rand: Math.random()}, '', urlValue);
  }
  // /Script to change url querystrings


$(document).ready(function() {
  'use strict';

  // Trigger window resize when DOM has been loaded
  $(window).trigger('resize');

  // Reduce margin bottom if element before list in .editor-wrapper ends with ':'
  if( $('.editor-wrapper').length ) {
    $('.editor-wrapper').each(function() {
      var $this = $(this);
        if( $this.find('ul').length || $this.find('ol').length ) {
          var $ul_ol = $this.find('ul, ol');
          var $prev = $ul_ol.prev();
          var last_char = $prev.html().slice(-1);
          if( last_char == ':' ) {
            $prev.addClass('before-list');
          }
      }
    });
  }

  // Wrap branch-office-blocks
  $('.contacts-block').each(function() {
    var $this = $(this);
    $this.find('.branch-office-block').wrapAll('<div class="branch-office-wrapper"></div>');
  });

  // Add class to contacts-block with only main-office-block or branch-office-block
  $('.contacts-block').each(function() {
    var $this = $(this);
    if(!($this.find('.main-office-block').length && $this.find('.branch-office-block').length)) {
      $this.addClass('only-one-type');
    }
  });

  // Add class to page-contacts-wrapper main-office-block with more than 2 children
  $('.page-contacts-wrapper .main-office-block').each(function() {
    var $this = $(this);
    var $children = $this.children();
    if( $children.length > 2 ) {
      $this.addClass('more-than-2-children');

      // if contacts block has only main-office-block as child, split it's children into two blocks
      if( $this.parents('.only-one-type').length ) {
        var $wrap_count = Math.ceil($children.length / 2);
        var $cut = 0;
        $children.slice($cut, $cut+$wrap_count).wrapAll("<div class='inner-block'></div>");
        $children.slice($cut+$wrap_count, $children.length).wrapAll("<div class='inner-block'></div>");
      }
    }
  });

  // Initialize slider
  function initialize_sliders() {
    var $slider = 0;
    $(".lightslider").each(function() {
      $slider += 1;
      var $this = $(this);
      if( !$this.hasClass('lightslider-loaded') ) {
        var $this_slider = $('#lightslider-'+$slider);
        if ( $this_slider.find('li').length < 2 ) {
          $this_slider.addClass('one-item');
          $this_slider.lightSlider({
                item      : 1,
                auto      : false,
                loop      : false,
                enableTouch: false,
                enableDrag: false,
                freeMove: false,
                pager: false,
                onSliderLoad: function() {
                  $this_slider.removeClass('cS-hidden');
                  $this.addClass('lightslider-loaded');
                },
            });
        } else {
          $this_slider.lightSlider({
                item      : 1,
                auto      : true,
                loop      : true,
                pauseOnHover  : true,
                speed: 600,
                pause: 3000,
                pager: true,
                onSliderLoad: function() {
                  $this_slider.removeClass('cS-hidden');
                  $this.addClass('lightslider-loaded');
                },
          });
        }
      }
    });
  }
  initialize_sliders();

  // Script for "load more" button
  $(document).on('click', '.js-load-more', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $this_load_more = $this.parent();
    var $load_more_text = $this_load_more.siblings('.loading-text').html();
    var $this_posts = $('.js-posts');
    var $this_popups = $('.js-popups');
    var $link = $this.attr('href');
    $this.html($load_more_text+'...');
    jQuery.get($link, function(data) {
        var $popup = $(".js-popups .js-popup ", data);
        $this_popups.append($popup);
        initialize_sliders();
    });
    jQuery.get($link, function(data) {
        var $post = $(".js-posts .js-post ", data);
        $this_posts.append($post);
    });
    $this_load_more.load($link+' .js-load-more');
    return false;
  });


(function() {

       /**
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

       /**
        * Read cookie
        * @param string name
        *@returns {*}
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

       $('#cookies-close').click(function() {
           $('#cookies').remove();
           createCookie('seen-cookie-message','yes',cookieExpiry,cookiePath);
       });

   })();

  // Toggle mobile menu
  $("#mobile-menu-icon").click(function(e) {
    var $this = $(this);
    if ( $this.hasClass("open") ) {
      $(".header-menu .sub-menu").stop(true, true).slideUp().css("display", '');
      $('.header-menu .menu-item-has-children > a > .menu-item-has-children-ghost').removeClass('hidden');
      $('.header-menu .menu-item-has-children > a').css({'color' : '', 'background-color' : ''});
    }
    $(this).toggleClass('open');
    $("#site-header .wrapper-for-mobile-menu").stop(true, true).slideToggle();
    return false;
  });

  //hide mobile menu when clicked outside of it
  $(document).mouseup(function (e) {
    if ( $("#mobile-menu-icon").hasClass('open') ) {
        var container = $("#site-header");  
        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0 ) // ... nor a descendant of the container
        {
        $(".header-menu .sub-menu").stop(true, true).slideUp().css("display", '');
        $('.header-menu .menu-item-has-children > a > .menu-item-has-children-ghost').removeClass('hidden');
        $('.header-menu .menu-item-has-children > a').css({'color' : '', 'background-color' : ''});
        $("#mobile-menu-icon").removeClass("open");
        $("#site-header .wrapper-for-mobile-menu").stop(true, true).slideUp();
        return false;
        }
    }
  });

  // Toggle first level sub-menus for desktop
  $(".menu-item-has-children").mouseenter(function(e) {
    var $this = $(this);
    if ( $(window).width() > $tablet_width ) {
      $this.children(".sub-menu").stop(true, true).slideDown();
      return false;
    }
  });

  $(".header-menu > .menu-item-has-children").mouseleave(function(e) {
    var $this = $(this);
    if ( $(window).width() > $tablet_width ) {
      $this.children(".sub-menu").stop(true, true).css("display", 'none');
      //$(".sub-menu").slideUp();
      return false;
    }
  });

  // Toggle lang switcher
  $(".js-toggle-lang-switcher").mouseenter(function(e) {
    var $this = $(this);
    if ( $(window).width() > $tablet_width ) {
      $this.find(".not-active-lang-wrapper").stop(true, true).slideDown();
      $this.addClass('open');
      return false;
    }
  });

  $(".js-toggle-lang-switcher").mouseleave(function(e) {
    var $this = $(this);
    if ( $(window).width() > $tablet_width ) {
      $this.find(".not-active-lang-wrapper").stop(true, true).css("display", 'none');
      $this.removeClass('open');
      return false;
    }
  });

  // Toggle mobile menu sub-menus
    // First level sub-menus
  $('.header-menu > .menu-item-has-children > a > .menu-item-has-children-ghost').click(function(event) {
    if ( $(window).width() <= $tablet_width ) {
      var $this = $(this);
       event.preventDefault();
      // Close sub-menus below first level
      $('.header-menu .sub-menu .sub-menu').slideUp();
      // Restore ghost element above the links for sub-menus below first level
      $('.header-menu .sub-menu .menu-item-has-children .menu-item-has-children-ghost').removeClass('hidden');
      // Close first level sub-menus, but NOT THIS
      $('.header-menu > .menu-item-has-children > a > .menu-item-has-children-ghost').not(this).parent().siblings('.sub-menu').slideUp();
      // Restore ghost element above the links for first level sub-menus, but NOT THIS
      $('.header-menu > .menu-item-has-children > a > .menu-item-has-children-ghost').not(this).removeClass('hidden');
      // Slide toggle sub-menu for THIS item
      $this.parent().siblings('.sub-menu').stop(true, true).slideToggle();
      // Hide ghost element above the link for THIS item
      $this.addClass("hidden");
      // Remove active menu item style for inactive items
      $('.header-menu .menu-item-has-children-ghost').not(this).parent().css({'color' : '', 'background-color' : ''});
      // Add active menu item style for THIS item
      $this.parent().css({'color' : '#fff', 'background-color' : '#ED1844'});
      return false;
    }
  });
    // Sub-menus below first level
  $('.header-menu .sub-menu .menu-item-has-children .menu-item-has-children-ghost').click(function(event) {
    if ( $(window).width() <= $tablet_width ) {
      var $this = $(this);
       event.preventDefault();
      // Close sub-menus below first level, but NOT THIS
      $('.header-menu .sub-menu .menu-item-has-children .menu-item-has-children-ghost').not(this).parent().siblings('.ul-sub-menu').slideUp();
      // Restore ghost element above the links for sub-menus below first level, but NOT THIS
      $('.header-menu .sub-menu .menu-item-has-children .menu-item-has-children-ghost').not(this).removeClass('hidden');
      // Slide toggle sub-menu for THIS item
      $this.parent().siblings('.sub-menu').stop(true, true).slideToggle();
      // Hide ghost element above the link for THIS item
      $this.addClass("hidden");
      // Remove active menu item style for below first level sub-menu inactive items
      $('.header-menu .sub-menu .menu-item-has-children-ghost').parent().not(this).css({'color' : '', 'background-color' : ''});
      // Add active menu item style for THIS item
      $this.parent().css({'color' : '#fff', 'background-color' : '#ED1844'});
      return false;
    }
  });

  // Add .active class on hover
  $(".switch-active").mouseenter(function(e) {
    $(this).find(".active").removeClass("active").addClass("was-active");
  });

  $(".switch-active").mouseleave(function(e) {
    $(this).find("a").removeClass("active");
    $(this).find(".was-active").addClass("active").removeClass("was-active");
  });

  // Add CSS class to Site Header when scrollTop position of the document is not 0
  var $window = $(window);
  var $lastY = $window.scrollTop();
  var $document = $(document);
  var $body = $("body");
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

  // Open, Close and Switch Projects Popups

    // Close references, when clicked outside popup container
  $(document).mouseup(function(e) {
      var container_1 = $(".references-popup");
      var container_2 = $(".references-block");

      if ( !container_1.is(e.target) // if the target of the click isn't the container...
          && container_1.has(e.target).length === 0 // ... nor a descendant of the container
          && !container_2.is(e.target) // if the target of the click isn't the container...
          && container_2.has(e.target).length === 0 // ... nor a descendant of the container
          && $('html').hasClass('references-popups-open') ) 
      {
        // Remove querystring
        removeQString('');
        var $html_top = Math.abs(parseInt($('html').css('top'), 10));
        $('html').css("top",  '');
        $('#references-popup-wrapper').removeClass('active');
        $('.references-popup').removeClass('active-reference');
        $('html').removeClass('references-popups-open no-scroll');
        $(window).scrollTop( $html_top );
        return false;
      }

  });

    // Open popup, when clicked on according references block
  $('body').on('click', '.references-block', function() {
    $('html').css("top",  - $(window).scrollTop() );
    var $this_id = $(this).attr('href');
    var $this_popup = $this_id.replace("#", "");
    $('html').addClass('references-popups-open no-scroll');
    $('#references-popup-wrapper').addClass('active');
    $($this_id).addClass('active-reference');

    // Add querystring
    changeUrl('popup', $this_popup);

    return false;
  });

    // Switch popups, when right arrow is clicked
  $('body').on('click', '.references-arrow.arrow-right', function() {
    var $this_project = $(this).closest('.references-popup');
    $('.references-popup').removeClass('active-reference');
    if( $this_project.is(':last-of-type') ) {
        var $next_project = $('.references-popup').first();
        var $next_popup = $next_project.attr('id');
        $next_project.addClass('active-reference');
        // Add querystring
        removeQString('');
        changeUrl('popup', $next_popup);
    } else {
        var $next_project = $this_project.next();
        var $next_popup = $next_project.attr('id');
        $next_project.addClass('active-reference');
        // Add querystring
        changeUrl('popup', $next_popup);
    }
    return false;
  });

    // Switch popups, when left arrow is clicked
  $('body').on('click', '.references-arrow.arrow-left', function() {
    var $this_project = $(this).closest('.references-popup');
    $('.references-popup').removeClass('active-reference');  
    if( $this_project.is(':first-of-type') ) {
        var $prev_project = $('.references-popup').last();
        var $prev_popup = $prev_project.attr('id');
        $prev_project.addClass('active-reference');
        // Add querystring
        removeQString('');
        changeUrl('popup', $prev_popup);
    } else {
        var $prev_project = $this_project.prev();
        var $prev_popup = $prev_project.attr('id');
        $prev_project.addClass('active-reference');
        // Add querystring
        changeUrl('popup', $prev_popup);
    }
    return false;
  });

  // Script for deprecated browser notification
  $('#close_announcement').click(function(e) {
      e.preventDefault();
      $('#update_browser_container').addClass('hidden');
  });

  // Replace all .svg to .png, in case the browser does not support the format
  if(!Modernizr.svg) {
      $('img[src*="svg"]').attr('src', function() {
          return $(this).attr('src').replace('.svg', '.png');
      });
  }

});


$(window).resize(function() {

  // Responsive design widths
  var $tablet_width = 1359;
  var $mobile_width = 767;
  var $window_width = $(window).width();

  // Mobile Menu For Tablet and Mobile Script
  var $wrapper_for_mobile_menu = $("#site-header .wrapper-for-mobile-menu");

  if ( $window_width <= $tablet_width ) {
    var $menu_item_has_children = $(".header-menu .menu-item-has-children > a");
    if( !$menu_item_has_children.has('.menu-item-has-children-ghost').length ) {
      $menu_item_has_children.append("<span class='menu-item-has-children-ghost'></span>");
    }
    $("#site-header .wrapper-for-mobile-menu").removeClass('block-important');
  } else {
    $(".menu-item-has-children-ghost").detach();
    $('.header-menu .menu-item-has-children > a').css({'color' : '', 'background-color' : ''});
    $(".header-menu .sub-menu").stop(true, true).slideUp().css("display", '');
    //$('.header-menu > .menu-item-has-children > .sub-menu').css("display", 'none');   
    if ( $wrapper_for_mobile_menu.css("display") == 'none' ) {
      $wrapper_for_mobile_menu.addClass('block-important');
    }
    $("#mobile-menu-icon").removeClass("open");
  }

  // Reduce padding for .img-with-text-wrapper if text is not fitting in the div
  function reduce_padding() {
    var $iwtw = $(".img-with-text-wrapper");
    var $iwtw_contents = $iwtw.find(".container");
    $iwtw.css("padding-top", '');
    var $iwtw_padding_top = $iwtw.css("padding-top");
    var $iwtw_padding_top = $iwtw_padding_top.replace("px", "");

    if ( $iwtw.height() < $iwtw_contents.outerHeight() ) {
      $iwtw.css("padding-top", $iwtw_padding_top * 0.65);
    } else {
      $iwtw.css("padding-top", "");
    }
    $iwtw.removeClass("opacity-0");
  }

  if( $(".img-with-text-wrapper").length ) {
    reduce_padding();
  }

});