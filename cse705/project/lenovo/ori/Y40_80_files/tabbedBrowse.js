(function() {

  var app = window.LENOVO = (window.LENOVO || {}),
    navAnimationDuration = 400,

    self = app.TABBEDBROWSE = {
      $productListings: null,
      $modelsToSwipe: null,

      //tab related properties
      firstShownTabIndex: 0,
      selectedTabIndex: 0,
      totalTabCount: null,
      $tabs: null,
      $tabContent: null,
      $tabDots: null,
      $tabArrows: null,
      swipeOn: true,
      tabWidths: [],

      //features media
      $featuresMediaItems: null,
      $featuresWrapper: null,

      shouldRun: function() {
        return $(".tabbedBrowse-carousel").length > 0;
      },

      init: function() {
        // store models in nav to watch for swipe
        this.$modelsToSwipe = $("#models-cto, #models-mtm");

        //tab-related handlers
        this.setupTabs();

        //cache configurator price nodes
        this.$totalPriceNodes = $(".pricingSummary-details-price");
        this.$adjustedPriceNodes = $(".pricingSummary-details-final-price, .configuratorItem-summary-priceText-value");
        this.$savingsAmountNodes = $(".pricingSummary-savings-amount");

        //open features tab (can't rely on hashchange in IE7
        $(".mediaGallery-productDescription-body").on("click.tabbedBrowse", "a[href=#features]", this.activateTabByHash);

        //reset state on a resize
        $(window).on("debounced-resize", self.onResize);

        //run once on initialization
        self.onResize();
      },

      //add handlers and cache selectors related to tabs
      setupTabs: function() {
        //cache the tab content containers
        self.$tabs = $(".tabbedBrowse-carousel .tabs-item");
        self.$tabs.parent().css("position", "relative");
        self.$tabContent = $(".tabbedBrowse-module");
        self.totalTabCount = self.$tabs.length;
        self.$tabArrows = $(".arrows-tabs").on("click.tabbedBrowse", ".arrows-tabs-arrow", this.tabScrollerEventMonitor);
        self.$tabDots = $(".tabbedBrowse-carousel .carouselDots span");
        self.$tabScroller = $(".tabs-wrapper .scroll-wrapper");

        //handle tab clicks
        self.$tabs.parent().on("click.tabbedBrowse", ".tabs-item", this.tabClickHandler);
        self.$tabDots.parent().on("click.tabbedBrowse", "span", this.tabDotClickHandler);

        //handle product listing navigation
        $(".tabbedBrowse-productListings-controls").on("click.tabbedBrowse", ".js-previous, .js-next", this.productNavigationHandler);

        // handle tab swipe
        // Note: this is disabled in IE due to a bug in the hammer library
        //       https://github.com/EightMedia/hammer.js/issues/310
        if (!app.MAIN.isIE()) {
          self.$tabScroller
            .hammer({ 
              swipe_velocity: 0.5,
              "stop_browser_behavior": false
            })

            .on("swipeleft", function(e) {
              if (self.swipeOn) {
                if (e.gesture) {
                  e.gesture.preventDefault();
                }
                // don't allow right swipe on last
                if (self.getFinalShownTabIndex() !== self.$tabs.length) {
                  self.tabScrollerEventMonitor(e);
                }
              }
            })
            .on("swiperight", function(e) {
              if (self.swipeOn) {
                if (e.gesture) {
                  e.gesture.preventDefault();
                }
                // don't allow right swipe on first
                if (self.firstShownTabIndex !== 0) {
                  self.tabScrollerEventMonitor(e);
                }
              }
            })
            .on("dragleft", function(e) {
              if (self.swipeOn) {
                if (e.gesture) {
                  e.gesture.preventDefault();
                }
              }
            })
            .on("dragright", function(e) {
              if (self.swipeOn) {
                if (e.gesture) {
                  e.gesture.preventDefault();
                }

              }
            });
        }

        // This enables browser navigation (back button, forward button) in most browsers
        // IE 7 and below doesn't have this, but users can still click on the tab they want
        // This also allows for links in the page to go directly to the tab outside of the tab bar
        $(window).on("hashchange.tabbedBrowse", self.activateTabFromCurrentHash);

        //initialize to current tab based on hash (or first tab)
        self.activateTabFromCurrentHash();

        // handle external links to tabs
        $("body").on("click.tabbedBrowse", ".js-activates-tab", self.externalTabLinkHandler);



        // watch swipe actions on items in nav
        self.watchNavSwipe(self.$modelsToSwipe);
      },

      watchNavSwipe: function(models) {
        // swipe left/right on models in nav

        // Note: this is disabled in IE due to a bug in the hammer library
        //       https://github.com/EightMedia/hammer.js/issues/310
        if (!app.MAIN.isIE()) {
          $(models)
            .hammer()
            .on("swipeleft", function() {
              if (self.swipeOn) {
                self.updateProductListing($(this).closest(".tabbedBrowse-module"), true, "right");
              }
            })
            .on("swiperight", function() {
              if (self.swipeOn) {
                self.updateProductListing($(this).closest(".tabbedBrowse-module"), true, "left");
              }
            });
        }
      },

      //match heights between columns for various elements
      matchHeights: function() {
        self.updateProductListingHeights(".tabbedBrowse-productListing-featureList", "dd");
        self.updateProductListingHeights(".tabbedBrowse-productListing-header", ".tabbedBrowse-productListing-title");
        self.updateProductListingHeights(".tabbedBrowse-productListing", ".tabbedBrowse-productListing-body");

        // Accessories tab

        self.updateProductListingHeights(".tabbedBrowse-accessories-item-container", ".tabbedBrowse-accessories-item-title");
        self.updateProductListingHeights(".tabbedBrowse-accessories-item-container", ".tabbedBrowse-accessories-item-description");
		self.updateProductListingHeights(".tabbedBrowse-accessories-item-container", ".pricingSummary");
      },

      //update row heights appropriately within each product listing
      updateProductListingHeights: function(columnSelector, rowSelector) {
        self.$productListings = self.$productListings || $(".tabbedBrowse-module");
        self.$productListings.each(self.updateRowHeights, [columnSelector, rowSelector]);
      },

      //make row heights consistent within a set of containers
      updateRowHeights: function(columnSelector, rowSelector) {
        var columns = $(columnSelector, this),
          length = columns.eq(0).find(rowSelector).length,
          index;

        //remove height overrides
        columns.find(rowSelector).css("height", "");

        //when listings are stacked, just clear any overrides
        if (!app.MAIN.activeBreakPoints.paginateSubseriesListing) {
          return;
        }

        //reset correct matching heights
        for (index = 0; index < length; index++) {
          self.updateRowHeight(columns.find(rowSelector + ":eq(" + index + ")"));
        }

        //ensure that product listings are updated on resize
        self.updateProductListing($(this));
      },

      //set a consistent height for a set of elements
      updateRowHeight: function(elements) {
        var height, hasDifference, index, length,
          maxHeight = 0;

        for (index = 0, length = elements.length; index < length; index++) {
          height = elements.eq(index).height();

          //track whether there is actually a difference
          if (maxHeight && height !== maxHeight) {
            hasDifference = true;
          }

          maxHeight = Math.max(height, maxHeight);
        }

        //only override height, if it is necessary
        if (hasDifference) {
          elements.height(maxHeight);
        }
      },

      //scroll the product listing
      updateProductListing: function($container, shouldAnimate, direction) {
        var maxProductsCanShow, totalProducts, maxStartingIndex, moveCount, newIndex,
          $items = $container.find(".tabbedBrowse-productListing-container"),
          currentIndex = ($items.parent().data("currentIndex")) || 0;
		  if(currentIndex < 0) currentIndex = 0; //FIX: If it is negative value then it should be 

        if (!$items.length) {
          return;
        }

        //get max products we can show and the maximum starting index
        maxProductsCanShow = self.getMaxProductsToShow($container);
        totalProducts = $container.find(".tabbedBrowse-productListing-container").length;
        maxStartingIndex = totalProducts - maxProductsCanShow + (totalProducts > 1 ? 0 : 1); //if we can only fit 1, then still allow movement
		if(maxStartingIndex < 0) maxStartingIndex=0; //FIX: If it is negative value then it should be 

        //can be called with no direction to update on resize
        moveCount = direction ? (maxProductsCanShow - 1 || 1) : 0;

        newIndex = currentIndex + (direction === "right" ? moveCount : -moveCount);


        //index needs to be between 0 and the max starting index
        newIndex = Math.min(Math.max(0, newIndex), maxStartingIndex);


        //move to the appropriate index
        self.focusProductListing($items, newIndex, shouldAnimate);

        //update the previous/next buttons
        $container.find(".js-previous").attr("disabled", newIndex === 0 ? "disabled" : null);
        $container.find(".js-next").attr("disabled", newIndex >= maxStartingIndex ? "disabled" : null);
      },

      //determine the maximum number of products that can currently be shown at current size
      getMaxProductsToShow: function($container) {
        var productWidth = $container.find(".tabbedBrowse-productListing-container").width(),
          containerWidth = $container.find(".tabbedBrowse-productListings-scroller").width();

        return Math.floor(containerWidth / productWidth);
      },

      //focus (show first in container) a specific product listing within a group of products
      focusProductListing: function($items, index, shouldAnimate) {
        var newPosition, $parent,
          $productToFocus = $items.eq(index || 0);


        if ($productToFocus.length) {
			newPosition = $productToFocus.length && $productToFocus.position().left;
			$parent = $items.parent();

			//store new index
			$parent.data("currentIndex", index).css("position", "relative");
			if(app.SHOWDIFFERENCES.showDifferencesPagination($items, $parent, $productToFocus, newPosition, shouldAnimate, navAnimationDuration)){
				$parent[shouldAnimate ? "animate" : "css"]({ left: -newPosition }, navAnimationDuration);
			}
		
        }
      },

      activateTabFromCurrentHash: function() {
        var hash = unescape(window.location.hash);
		if (hash == '#features') hash = "#tab-features";
        var index = hash ? self.getTabIndexFromUrl(hash) : 0; //if no hash activate the first tab

        if (index >= 0) {
          self.activateTab(index, !hash);
        }
      },

      //see if the hash from a url matches a tab (can pass just hash too)
      getTabIndexFromUrl: function(url) {
        var hash = url && url.match(/(#.+)$/);
        return hash ? self.$tabs.has("a[href=" + hash[1] + "]").index() : -1;
      },

      //active a tab using the hash to retrieve the index
      externalTabLinkHandler: function(e) {
        var $el = $(this),
          index = self.getTabIndexFromUrl($el.prop("href"));

        if (index >= 0) {
          //activate the appropriate index
          self.activateTab(index);

          //scroll to the top of the tabs
          $(document).scrollTop(self.$tabs.offset().top);

          e.preventDefault();
        }
      },

      //select a tab
      activateTab: function(index, keepHash) {
        var $el,
          selectedClass = "tabs-item-currentTab";

        //update selected class of the tab element
        $el = self.$tabs.eq(index || 0);
        $el.addClass(selectedClass).siblings().removeClass(selectedClass);

        //update the hash, without scrolling the page
        if (!keepHash) {
          self.updateHash($el.find("a").attr("href").replace("#", ""));
        }

        //show the appropriate content
        self.$tabContent.hide().eq(index).show();
		
		/* commenting this, to prevent the page from scrolling on tabclick
		if (!keepHash) {
			$('html, body').animate({ scrollTop: self.$tabContent.eq(index).offset().top}, 0);
		}*/

        //cache the index
        self.selectedTabIndex = index;

        self.updateTabDots();

        //scroll tab into view
        self.focusTab($el.index(), true, true);

        //make sure that heights and image placements are proper when displayed
        self.onResize();
      },

      //show/hide the tab arrows depending on whether all tabs are shown
      toggleTabArrows: function() {
        var showArrows,
          totalTabWidth = 0;

        //need to find the width of all tabs, as container is not useful for this comparison
        self.$tabs.each(function() {
          totalTabWidth += $(this).width();
        });

        showArrows = totalTabWidth > self.$tabScroller.width();

        self.$tabScroller[showArrows ? "addClass" : "removeClass"]("has-arrows");
        self.$tabArrows[showArrows ? "show" : "hide"]();
        self.$tabDots.parent()[showArrows ? "show" : "hide"]();

        //clear scrolling, if all fit
        if (!showArrows) {
          self.$tabs.parent().css("left", 0);
          self.firstShownTabIndex = 0;
        }

        return showArrows;
      },

      //make a tab the first tab shown
      focusTab: function(index, shouldAnimate, normalizeIndex) {
        var tab, tabLeft, tabContainerWidth,
          newIndex = normalizeIndex ? self.normalizeTabIndex(index) : index;

        tab = self.$tabs.eq(newIndex);
        tabLeft = (tab.length && tab.position().left) || 0;
        tabContainerWidth = $(".scroll-wrapper").width();

        // if on last item or in final index of tabs and it is the new tab, animate to last item so no gap is revealed
        if (((index + 1) === self.$tabs.length || (self.getFinalShownTabIndex() === self.$tabs.length) && (newIndex === self.firstShownTabIndex))) {
          tabLeft = (self.$tabs.last().position().left) - (tabContainerWidth - self.$tabs.last().outerWidth());
        }

        self.$tabs.parent()[shouldAnimate ? "animate" : "css"]({ left: -tabLeft }, navAnimationDuration);

        self.firstShownTabIndex = newIndex;

        self.updateTabs();
      },

      //determine the final tab that is completely shown (no scrolling required)
      getFinalShownTabIndex: function() {
        var finalShownIndex, containerWidth, index, length;

        //get the width of each tab (widths are different)
        self.tabWidths = self.$tabs.map(function() {
          return $(this).outerWidth();
        }).get();

        finalShownIndex = self.tabWidths.length;
        containerWidth = self.$tabScroller.width();

        //determine the final tab that is completely shown
        for (index = self.firstShownTabIndex, length = self.tabWidths.length; index < length; index++) {
          containerWidth -= self.tabWidths[index];

          if (containerWidth < 0) {
            finalShownIndex = index - 1;
            break;
          }
        }

        return finalShownIndex;
      },

      //given an intended final index to show, determine the index we need to scroll to display it
      normalizeTabIndex: function(intendedFinalIndex) {
        var currentFinalIndex, containerWidth, index,
          firstIndex = 0;


        //if this is the first tab, then see if can scroll one to the left to match media gallery functionality
        if (intendedFinalIndex && intendedFinalIndex === self.firstShownTabIndex) {
          return intendedFinalIndex - 1;
        }

        currentFinalIndex = self.getFinalShownTabIndex();

        //no action necessary, if the new tab is already shown
        if (intendedFinalIndex <= currentFinalIndex && intendedFinalIndex >= self.firstShownTabIndex) {
          return self.firstShownTabIndex;
        }

        containerWidth = self.$tabScroller.width();

        //determine the final tab that is completely shown
        for (index = intendedFinalIndex; index >= 0; index--) {
          containerWidth -= self.tabWidths[index];

          if (containerWidth < 0) {
            firstIndex = index + 1;
            break;
          }
        }

        return firstIndex;
      },

      //hide/show arrows and scroll tabs
      updateTabs: function(shouldAnimate, direction) {
        var finalShownIndex;

        //if all are shown, then nothing else is necessary
        if (!self.toggleTabArrows()) {
          return;
        }

        finalShownIndex = self.getFinalShownTabIndex();

        if (direction === "right") {
          //focus the finalShownIndex unless maxCanShow is 1
          self.firstShownTabIndex = self.firstShownTabIndex + 1;
          // determining updated final index before focus to help detect end gap
          finalShownIndex = self.getFinalShownTabIndex();
          self.focusTab(self.firstShownTabIndex, shouldAnimate);
        }

        if (direction === "left") {
          self.firstShownTabIndex = self.firstShownTabIndex - 1;
          // determining updated final index before to help detect end gap
          finalShownIndex = self.getFinalShownTabIndex();
          self.focusTab(self.firstShownTabIndex, shouldAnimate);
        }

        //enable/disable tab arrows
        self.$tabArrows.find(".js-arrow-prev").attr("disabled", self.firstShownTabIndex === 0 ? "disabled" : null);
        self.$tabArrows.find(".js-arrow-next").attr("disabled", finalShownIndex >= self.$tabs.length - 1 ? "disabled" : null);
      },

      //update the hash without scrolling
      updateHash: function(id) {
        if (id) {
          var $el = $("#" + id).attr("id", id + "-temp");
          window.location.hash = id;
          $el.attr("id", id);
        }
      },

      updateTabDots: function() {
        var $previousTab, $currentTab;

        $previousTab = self.$tabDots.filter(".carouselDots-active");
        $currentTab = self.$tabDots.eq(self.selectedTabIndex);
        if ($previousTab[0] !== $currentTab[0]) {
          $previousTab.add($currentTab).toggleClass("carouselDots-inactive carouselDots-active");
        }
      },

      tabDotClickHandler: function(e) {
        self.activateTab(self.$tabDots.index(this));

        e.preventDefault();
      },

      //handle clicking on a tab
      tabClickHandler: function(e) {
        self.activateTab(self.$tabs.index(this));

        e.preventDefault();
      },

      tabScrollerEventMonitor: function(e) {
        var isLeft =  $(this).hasClass("js-arrow-prev") || e.type === "swiperight";

        self.updateTabs(true, isLeft ? "left" : "right");

        e.preventDefault();
      },

      //clicking on next/previous in product listing
      productNavigationHandler: function(e) {
        var $el = $(this),
          isLeft = $el.hasClass("js-previous"),
          container = $el.closest(".tabbedBrowse-module");

        self.updateProductListing(container, true, isLeft ? "left" : "right");

        e.preventDefault();
      },

      //actions on resize
      onResize: function() {
        //adjust tabs
        self.updateTabs();

        //adjust row heights, as necessary
        self.matchHeights();
	},

    };

})();
