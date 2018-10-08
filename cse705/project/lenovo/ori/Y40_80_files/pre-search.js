/**
	Author: Prathap Puppala <pkpuppala@lenovo.com>
	Description: Search auto fill keywords on type ahead.
*/
(function () {

	var app = window.LENOVO = window.LENOVO || {};

	var self = app.PRESEARCH = {
		url: "/SEUILibrary/lenovo-portal/jsp/util/PreSearch.jsp",
		wrapper: $("<div class=\"preSearchWrapper\">"),
		content: $("<div class=\"preSearchContent\">"),		
		host: "",
		el:	null,

		shouldRun: function () {
			return !!$("input[name='q']").length;
		},

		init: function () {
			var _url = window.location.hostname;
			if(_url.indexOf("cddotcom") != -1 || _url.indexOf("www.lenovo.com") != -1){
				self.host = "http://shop.lenovo.com";			
			}
	
			$("input[name='q']").on("keyup", self.searchAutoSuggestions);			
		},
		
		linkHighlite: function(e){
			$(this).addClass("highlight");
		},
		
		linkLowlite: function(){
			$(this).removeClass("highlight");
		},
		
		getUrl: function(){
			return self.host+self.url;
		},

		searchAutoSuggestions: function (e) {
			self.el = $(this);
			if(!(this.value != null && this.value.length > 1)){return;}
			$.get(self.getUrl(), {q: this.value, ts: new Date().getTime(), v: "owv2"}, function(data) {
				var _data = $.trim(data);
				if(_data.length > 0){self.renderContent(eval(_data));}
				self.content.closest(".bar_1").css("overflow","visible");
			});
		},
		
		renderContent: function(data){
			self.content.html("");
			$.each(data, function(i, o){				
				if(i > 1 && o != null && o.length>0){
					self.content.append("<a href=\"#\" class=\"preSearch-fillLink\" title=\""+o+"\">"+o+"</a>");	
				}
			});
			self.content.width(self.el.width());
			self.el.after(self.wrapper.html(self.content.show()));
			$(".preSearch-fillLink").hover(self.linkHighlite, self.linkLowlite);
			$(".preSearch-fillLink").click(self.submitSearch);	
		},
		
		submitSearch: function(e){
			$("input[name='q']").val($(this).attr("title"));
			$("form[name='site_search']").submit();
			self.wrapper.slideUp("fast");			
		}

	};

}());
