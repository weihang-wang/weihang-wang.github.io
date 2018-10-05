(function() {

  var app = window.LENOVO = (window.LENOVO || {}),

    self = app.SHOWDIFFERENCES = {
      

		init: function() {

			//Show Model diff
			$(".tabbedBrowse-productListings").on("click", ".subseries-show-diff", this.freezeColumn);
			//reset state on a resize
			$(window).on("debounced-resize", self.onResize);
		    self.hideIfOne(); 
			self.initModeldiff();		

		},
	  
	  hideIfOne: function(){
			var productListlen = $(".tabbedBrowse-productListing-container").length;
			if(productListlen == 1){$(".subseries-showModelDiff-container").remove();}
		},
		
		
		freezeColumn: function(e){
			var $parent_li = $(this).parents("li.tabbedBrowse-productListing-container");
			if($parent_li.data("show-diff") != true){
				$(this).find('.btn-label').text($(this).data('hide-label'));
				$(this).find('.btn-icon').text('x');
				$parent_li.data("show-diff",true);
				self.showConfigurationDiffs($parent_li.parent());
			}else{
				$(this).find('.btn-label').text($(this).data('show-label'));
				$(this).find('.btn-icon').text('>');
				$parent_li.data("show-diff",false).removeClass('freeze-product-column').css({'left':''}).parent().css({'padding-left':''});
				$parent_li.siblings('li').find("dl:not(.pricingSummary-details)").children().css('background-color','');
			}
			e.preventDefault();
		},

		showConfigurationDiffs: function($parent){
			$parent.children('li:not(:first-child)').each(function(index, item){		
				var $base_configs = $parent.children('li:first-child').find("dl:not(.pricingSummary-details)");			
				$(item).find("dl:not(.pricingSummary-details)").children().each(function(child_index, child_item){
					if(child_item.tagName == 'DT'){
						var dt_txt = $(child_item).text();
						var base_dt = $base_configs.find('dt:contains('+dt_txt+')'); 
						if($(child_item).next('dd').text() != $(base_dt).next('dd').text()){
							$(child_item).css('background-color','#F5F0D0');
							$(child_item).next('dd').css('background-color','#F5F0D0');
						}
					}
				})
			});
		},
		
		initModeldiff: function(){
			//Align the configuration details top margin if the the model diff enabled		
			var listItem = $("li.tabbedBrowse-productListing-container").eq(0);		
			if($(listItem).find('a.subseries-show-diff').length > 0){			
				$(listItem).siblings().find('div.tabbedBrowse-productListing-button-container').addClass('subseries-showModelDiff-align');
			}		
		},
		
		/** This function is calls from tabbedBrowse.js from line 280 to perform pagination on Show differences is enabled **/
		showDifferencesPagination: function($items, $parent, $productToFocus, newPosition, shouldAnimate, navAnimationDuration){
			if($items.eq(0).data("show-diff") == true){
				if(!$items.eq(0).hasClass('freeze-product-column')) $items.eq(0).addClass('freeze-product-column');
				if($productToFocus.index() == 0){
					$parent.css({'padding-left':$items.eq(0).width()})[shouldAnimate ? "animate" : "css"]({ left:0}, navAnimationDuration);
					$items.eq(0)[shouldAnimate ? "animate" : "css"]({left:0},navAnimationDuration);
				}
				else{
					$parent.css({'padding-left': $items.eq(0).width()})[shouldAnimate ? "animate" : "css"]({ left: -newPosition}, navAnimationDuration);
					$items.eq(0)[shouldAnimate ? "animate" : "css"]({left:newPosition}, navAnimationDuration);
				}
				return false; // Show differences pagination
			}
			return true; // regular pagination
		},
		
		//actions on resize
		onResize: function() {
			var _li = $("li.tabbedBrowse-productListing-container").get(0);			
			//If show differences is enabled and resizsed to mobile width reset the show differences
			if($(_li).data("show-diff") == true && !app.MAIN.activeBreakPoints.paginateSubseriesListing){
				$(_li).removeClass('freeze-product-column').css({'left':''}).parent().css({'padding-left':''});
			} else if($(_li).data("show-diff") == true){
				self.showConfigurationDiffs($(_li).parent());
			}
		}

    };

})();