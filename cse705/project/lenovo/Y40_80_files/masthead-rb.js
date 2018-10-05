$(document).ready(function(){
    $('.main_Menu').on('click', function(e) {
      $('.nav .menu>li>a.has-submenu').parent().removeClass('opened');
      $('.prd_Menu').toggleClass("opened");
      e.preventDefault();
    });

    $('.nav .menu>li>a.has-submenu').on('click', function(e) {
      $('.nav .menu>li>a.has-submenu').not(this).parent().removeClass('opened');
      if($(this).parent().parent().hasClass('general_Menu')){
        $('.nav .menu>li>a.has-submenu').not(this).parent().parent().removeClass('opened');
      }
      $(this).parent().toggleClass("opened");
      equalheight('.deals_menu .menu_2 .menu_level_2');
      e.preventDefault();
    });

    $('.nav .search_menu a.has-submenu').on('click', function(e) {
      $(this).next().find('input.searchInput-text').focus();
      e.preventDefault();
    });

    $(window).scroll(function(){
      $('.masthead div.nav, .bar_2, .logoWrapper').toggleClass('scrolled animate', $(this).scrollTop() > 25);
    });

	$(window).resize(function(){
	  equalheight('.deals_menu .menu_2 .menu_level_2');
	});


    viewport = function(){
	    var e = window, a = 'inner';
	    if (!('innerWidth' in window )) {
	        a = 'client';
	        e = document.documentElement || document.body;
	    }
	    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
	}

	equalheight = function(container){
	var currentTallest = 0,
	     currentRowStart = 0,
	     rowDivs = new Array(),
	     $el,
	     topPosition = 0;
	 $(container).each(function() {

	   $el = $(this);
	   $($el).height('auto')
	   topPostion = $el.position().top;

	   if (currentRowStart != topPostion) {
	     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
	       rowDivs[currentDiv].height(currentTallest);
	     }
	     rowDivs.length = 0; // empty the array
	     currentRowStart = topPostion;
	     currentTallest = $el.height();
	     rowDivs.push($el);
	   } else {
	     rowDivs.push($el);
	     currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
	  }
	   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
	     rowDivs[currentDiv].height(currentTallest);
	   }
	 });
	}
});


