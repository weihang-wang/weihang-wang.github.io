(function($) {
	$.fn.extend({
		centerSlide : function(options) {
			var options = $.extend({
				attach : window, // element to center within (window = viewport)
				position: 'right', // which side? ('right' or 'left')
				tab : '#sliderTab', // element used for tab control 
				content : '#sliderContent', // element that contains content
				fixed : true, // boolean, should item scroll or stay in place?
				speedX : 'fast', // string or number, transition time of horizontal movement in milliseconds or standard jQuery keyword (ie- 'fast')
				speedY : 'fast', // string or number, transition time of vertical movement in milliseconds or standard jQuery keyword (ie- 'fast')
				top : 'center', // string or number, either a pixel, percentage, or 'center'
				resize : true, // boolean, reposition/recenter on window resize event
				comparetemplate: '/site/compare/CompareTemplate.html', //default template for loading comparison content
				slidertemplate: '/site/compare/SliderTemplate.html' //default template for loading cookie handler content
			}, options);
			
			if(typeof(setCompareTemplate) != "undefined")
			{
				setCompareTemplate(options.comparetemplate); //tell ISS which template to use for rendering compare content
			}
			
			// do once
			$('head').prepend('<style type="text/css"></style>');
			
			// do for each instance of selector
			return this.each(function() {
				var tab = $(options.tab),
					cw = $(options.content).outerWidth(),
					id = $(this).attr('id'),
					props = {}

				$(this).css({
					position : (options.fixed)?'fixed':'absolute',
					display : '' // clear display property
					
				});
				function calculatePos(_this, _attach, _tab, _top, _speed) {					
					if (_top == 'center') { // center the box based on tab
						var pos = ($(_attach).height() - $('#'+_this).find(_tab).outerHeight()) / 2;
						$.extend(props, {
							top : pos + 'px'
						});
					} else if (_top.indexOf('%') > 0) { // % offset
						$.extend(props, {
							top : _top
						});
					} else { // px offset
						var px = parseInt(_top);
						$.extend(props, {
							top : px + 'px'
						});
					}
					
					$('#'+_this).stop(true).animate(props, {queue:false, duration:_speed, complete:function(){ $(this).addClass('positioned'); }});
				}
				
				calculatePos(id, options.attach, options.tab, options.top, options.speedY);
				$(options.tab).toggle(function() {
					
					if (options.position.toLowerCase() == 'left') {
						$(this).parent().removeClass('closed').animate({left:'0px'}, {queue:false, duration: options.speedX});
					} else {
						
						//load content from cookie
						loadCookieSlider(options.slidertemplate);
						
						$(this).parent().removeClass('closed').animate({right:'0px'}, {queue:false, duration: options.speedX});
					}
				}, function() {
					if (options.position.toLowerCase() == 'left') {
						$(this).parent().animate({left:'-'+cw+'px'}, {queue:false, duration: options.speedX, complete:function(){ $(this).addClass('closed'); }});
					} else {
						$(this).parent().animate({right:'-'+cw+'px'}, {queue:false, duration: options.speedX, complete:function(){ $(this).addClass('closed'); }});
					}
				});
				
				if (options.resize) {
					$(window).resize(function() {						
						calculatePos(id, options.attach, options.tab, options.top, options.speedY);
					});
				}

				
				return $(this);
			});
		}
	});
})(jQuery);