//= require jquery
//= require jquery_ui_1.12.1/jquery-ui.min

(function($, document, window) {
  var navList = [];
  var isScrolling = false;
  $(document).ready(function() {
    
    /* Check location hash and smoothly scroll there on page ready */
    setTimeout(function() {
      if (location.hash) {
        window.scrollTo(0, 0);
        var target = location.hash.split('#');
        smoothScroll($('#'+target[1]));
      } else {
        $('.jsNavLink[href="#top"]').addClass('isCurrent');
      }
    }, 1);
    
    /* Grab each nav link, create an object and attatch a click even */
    $('.jsNavLink').each(function() {
      var $this = $(this);
      var sectionId = $this.attr('href');
      var $section = $(sectionId);
      var headerDisplacement = $('.jsHeader').outerHeight();
      navList.push({
        'anchor': $this,
        'id': sectionId,
        'target': $section
      });
      
      $this.click(function(e) {
        e.preventDefault();
        closeNav();
        smoothScroll(sectionId);
      });
    });
    
    /* On scroll and resize, add current section to window history (if not already there) and set nav link to current */
    /* Also smooth scroll on popstate (if the user hits the back button) */
    $(window)
      .on('scroll resize', function(e) {
        closeNav();
        
        if(!isScrolling) {
          var headerHeight = $('.jsHeader').outerHeight();
          var elementTest = document.getElementById('typography').getBoundingClientRect();
          
          $.each(navList, function(e, elem) {
            var placement = elem.target[0].getBoundingClientRect();
            
            if(placement.top <= headerHeight && placement.bottom > headerHeight && !elem.anchor.hasClass('isCurrent')) {
              window.history.pushState({}, '', elem.id);
              $('.jsNavLink.isCurrent').removeClass('isCurrent');
              elem.anchor.addClass('isCurrent');
              return false;
            }
          });
        }
      })
      .on('popstate', function(e) {
        var target = location.hash.split('#');
        smoothScroll($('#'+target[1]));
      });
    
    /* smooth scroll function */
    function smoothScroll(hash) {
      var $scrollToElement = $(hash);
      if($scrollToElement.length > 0) {
        var elementOffset = $scrollToElement.offset().top;
        var headerDisplacement = $('.jsHeader').outerHeight();
        
        isScrolling = true;
        
        $('html, body').stop().animate({ 'scrollTop': elementOffset - headerDisplacement }, 300, function() {
          isScrolling = false;
        });
      }
    }
    
    /* Mobile nav functionality */
    $('.jsBurger').click(function() {
      $('.jsHeader').toggleClass('isOpen');
      $('body').toggleClass('noscroll');
    });
    
    $('.jsNavOverlay').click(function() {
      closeNav();
    });
    
    function closeNav() {
      $('.jsHeader').removeClass('isOpen');
      $('body').removeClass('noscroll');
    }
  });
})(jQuery, document, window);
