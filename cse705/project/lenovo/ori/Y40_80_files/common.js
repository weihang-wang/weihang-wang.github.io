$(function() {

  //Init Galleria with proper theme if gallery markup is present on page
  if (!!window.Galleria && $('.galleria').length) {
    Galleria.loadTheme('/ISS_Static/WW/site/scripts/galleria/themes/lenovorwd/galleria.lenovorwd.js');
    Galleria.run('.galleria');
  }

  //To hide limited offers when not exists
  if($(".calloutBox-mediaGallery").length > 0 && $(".calloutBox-mediaGallery div.calloutBox-item").length < 1 && $(".calloutBox-mediaGallery #standard-on").length < 1){
    $(".offCanvas-bar_3-right").empty();
  }

  //To hide the links when OffCanvas left section is empty
  if(!$.trim($('.offCanvas-bar_3-left').html()).length){
    $(".bar_3-leftLink").hide();
  }

  //show 'offers' when Offcanvas right section is not empty
  if($.trim($('.offCanvas-bar_3-right').text()).length){
    $(".bar_3-rightLink").addClass("offerShow");
  }

  //For Sidebar Navigation Fix
  var txt = $('.sidebarNav-section .sidebarNav-heading');
  $.each(txt,function(){
    if($(this).text().length > 18){
      $(this).parent('.expandableHeading.has-arrowLink, .has-arrowLink.unexpandableHeading').addClass('twolines');
    }
  });

  //To hide the narrow results off canvas link if no faceted browse or sidebarnav
  var facetBrowserWrapper = $('div.offCanvas-bar_3-left div#facetedBrowseWrapper');
  var sidebarNav  = $('div.offCanvas-bar_3-left div.sidebarNav');
  if(facetBrowserWrapper.length == 0 && sidebarNav.length == 0){
    $(".bar_3-leftLink").hide();
  }

  //To hide the espots in navigation when no espot is present
  var espots = $(".productList .espots");
  $.each(espots,function(){
    if($(this).find("li[itemprop='itemOffered'], div[itemprop='itemOffered']" ).length < 1){
      $(this).remove();
    }
  });


/*
  //To hide the show differences button when only one model in subseries page
  var showDifference = $(".tabbedBrowse-productListings");
  $.each(showDifference,function(){
    if($(this).find(".tabbedBrowse-productListing-container" ).length < 2){
      $(".subseries-showModelDiff-container").remove();
    }
  });
*/



  //Stop event bubbling on links in IE8
  if($('html').hasClass('lt-ie9') && $("#splitterPage").length){
    $(".mainContent a").click(function(event){event.stopPropagation();});
    $(".bar_3-offCanvas-heading").removeClass("js-closesOffCanvasMenu");
  }

  //To adjust the height of two columns in myaccount login page
  var highestBox = 0;
  $('.signInModule .signInModule-content').each(function(){
    if($(this).height() > highestBox){
      highestBox = $(this).height();
    }
  });
  $('.signInModule .signInModule-content').height(highestBox);

  //Add to cart accessories
  $(".accessories-add-to-cart").click(function(){
    var $this = $(this), btn_label = $this.text(), cache = $this.children(), $parent = $this.parents(".tabbedBrowse-accessories-and-services-wrapper");
    $parent.addClass("configuratorAjax");
    $.get($this.data('url')).done(function() {
      $this.text(AddedToCart).append(cache).animate({disabled:true}).addClass("button-standard").removeClass("button-called-out");
      //setTimeout(function(){$this.text(btn_label).append(cache).animate({disabled:false}).removeClass("button-called-out-alt")},3000);
    }).always(function() {
      $parent.removeClass("configuratorAjax");
    });
  });


  //FP1912- To toggle the tabbed navigation
  $(".productList .menuLevel_2").each(function(){
    $(".menu_with_tabs > li > ul > li:first").addClass("selected");
    $(".menu_with_tabs .menu_tabs > ol:last").hide();
      $(".menu_with_tabs > li > ul > li:first").click(function(event){
      $(this).addClass("selected");
      $(this).siblings('li').removeClass("selected");
      $(".menu_with_tabs .menu_tabs > ol:last").hide();
      $(".menu_with_tabs .menu_tabs > ol:first").show();
      return false;
    });
    $(".menu_with_tabs > li > ul > li:last").click(function(event){
      $(this).addClass("selected");
      $(this).siblings('li').removeClass("selected");
      $(".menu_with_tabs .menu_tabs > ol:last").show();
      $(".menu_with_tabs .menu_tabs > ol:first").hide();
	  if($(".promo_links").attr("style") !== typeof undefined){
		 $(".menu_with_tabs .menu_tabs > ol:last").height($(".promo_links").height()-80);
	  }
      return false;
    });
  });

  //FP1912 - To adjust the height in navigation for grey column
  $(".link-wrapper > a").each(function(){
    $(this).click(function(){
	var menu_with_tabs = $(this).parent('.link-wrapper').siblings('.menuLevel_2').find('.menu_with_tabs');
	if($(menu_with_tabs).length = 1){
		setTimeout(function(){
			var tab_menu = menu_with_tabs.children('.menu_tabs:nth-child(1)');
			var tab_content = menu_with_tabs.children('.menu_tabs:nth-child(2)');
			var promo_links = menu_with_tabs.find('.tabpromo .promo_links');
				if((tab_content.height() + tab_menu.outerHeight()) > promo_links.height()){
					promo_links.height(tab_content.height()+tab_menu.outerHeight());
				}else{
					tab_content.height(promo_links.height()-tab_menu.outerHeight());
				}
		}, 200);
	}
    });
  });

  //To hide the tabs when only one is present
    if($(".tabbedBrowse .tabs-main .tab-item a.sytems-tab").length < 2){
      $(".tabbedBrowse .tabs-main .tab-item a.sytems-tab").remove();
	  if($(window).width() > 896){
	  $(".tabbedBrowse .tabs-main .tab-item .tabbedBrowse-Xsystems").css('margin-top','-75px');
	  }
    }
});