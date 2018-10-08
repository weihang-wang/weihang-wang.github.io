$(function(){	
/*---Detect Page Type and Expand/Collapse Side Bar Nav Section on Page Load---*/
var metaPageType = $('meta[name]').filter(function() {
		return $(this).attr('name').toLowerCase() == "taxonomytype"
	}).attr('content');

//Prevent event bubbling on title arrow
$(".sidebarNav .greyArrow-link").click(function(e) {
        e.stopPropagation();
});
	
var isSystemx = $(".sidebarNav").attr("data-type");
if(isSystemx == 'nonsystemx' || typeof isSystemx == 'undefined'){
var currentURL = window.location.pathname;
if(metaPageType != "SplitterPage"){
	$(".brandLink a").each(function(){
		var brandLink = $(this).attr("href");
		var indexOfLink = currentURL.indexOf(brandLink);
		if(indexOfLink < 0){	
			$(this).parent(".expandableHeading").removeClass("expandableHeading-is-expanded");
			$(this).parent(".expandableHeading").next(".expandableContent").addClass("expandableContent-is-collapsed").hide();
		}	
	});
}

/*---Remove Series Title if no Subseries---*/
	$("ul.subSeries").each(function(){
	var lenOfSubSeries = $(this).find("li").length;
	if(lenOfSubSeries == 0){$(this).parent(".series").parent().remove();}
	});

/*---Remove Brand Title if no Series---*/	
	$("div.series").each(function(){
	var lenOfSeries = $(this).find(".seriesLink").length;
		if(lenOfSeries == 0){$(this).prev(".brandLink").addClass("no-series");}
		if(lenOfSeries == 0){$(this).hide();}
	});
	}
});