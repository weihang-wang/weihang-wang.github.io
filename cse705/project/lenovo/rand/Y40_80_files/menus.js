(function() {
  var app = window.LENOVO = window.LENOVO || {},
    MAIN = app.MAIN,
    isOpenSuffix = "-is-open",
    navKey = "offcanvas",
    isExpandedClass = "is-expanded",
    noTransitionClass = "no-transitions",
    transitionEndEvents = "webkitTransitionEnd oTransitionEnd otransitionend transitionend",
    allMenus = ".productMenu, .generalMenu, .offCanvas-bar_3-left, .offCanvas-bar_3-left",
    levelOneMenus = ["productMenu", "generalMenu"],
    levelTwoMenus = ["offCanvas-bar_3-left", "offCanvas-bar_3-right"],
    leftSidebarMenu = levelTwoMenus[0],
    rightSidebarMenu = levelTwoMenus[1],
    headerBoxToggleClasses = ".js-toggles-searchBox, .js-toggles-callBox",
    resizeTimeoutDuration = 500,
    toggleDuration = 200,
    navAnimationDuration = 400,
    $body, $header, $searchInput, $searchContainers, $espots, $espotsContainers,

  self = app.MENUS = {
    //build a stack of currently open off canvas navs
    currentlyOpen: [],
    lastClosed: null,

    //track the latest nested menu, so it can be kept open if browser resize
    latestNestedMenu: null,

    contentHeight: null,

    //timer to remove class while resizing
    resizeNoTransitionTimeout: null,

    //initialize the page
    init: function() {
      $header = $("header");
      $body = $("body");
      $searchInput = $(".searchInput");
      $searchContainers = $("[data-set=search-container]");
      // Note: the espots are in offCanvas-bar_3-left at large size, but it the 
      // content when filetermenu is not visible... while perhaps not ideal, 
      // we're putting the JS to handle that change here.
      $espots = $(".espot-sidebar-list");
      $espotsContainers = $("[data-set=espots]");

      if (self.initialized) {
        return;
      }

      self.initialized = true;

      //open off-canvas navs when clicking on headings
      $header.on("click", ".js-opensOffCanvasMenu", self.openOffCanvasMenuHandler);

      // toggle search/call/etc box toggling
      $header.on("click", headerBoxToggleClasses, self.toggleHeaderBox);

      //toggle children in nested menus
      $header.on("click", ".menuLevel_1 .link-hasChildren", self.nestedMenuHeaderHandler);

      //close latest nested menu
      $body.on("click", ".js-closeNestedMenu", self.closeLatestNestedMenu);

      //close latest off canvas nav when clicking in overlay or specific areas that close navs
      $body.on("click", ".offCanvas-closeOverlay, .js-closesOffCanvasMenu", self.closeOffCanvasMenuHandler);

      //toggle children in expandable menus
      $body.on("click", ".expandableHeading, .expandableHeading-onlySmall", self.expandableMenuHeaderHandler);

      self.hideInitialExpandableMenus();

      //handler for any transition ending
      $body.on(transitionEndEvents, self.transitionEndHandler);

      //add breakpoint specific code
      self.addBreakpointHandlers();

      //handle anything specific to resizing the browser
      $(window).on("debounced-resize", self.onResize);
      self.onResize();
    },

    //determine if a specific nav is open
    isNavOpen: function(navName) {
      return navName && $body.hasClass(navName + isOpenSuffix);
    },

    //get the last menu to be opened
    getLatest: function() {
      return self.currentlyOpen[self.currentlyOpen.length - 1];
    },

    //open/close a specific menu
    toggleOffCanvas: function(navData) {
      var main, navClosedCallback,
        latest = self.getLatest(),
        opening, isLevelTwo, offset, $menu;

      //remove previous direction
      if (latest) {
        $body.removeClass("offCanvas-" + latest.direction + isOpenSuffix);
      }

      //if no navData is passed, close latest nav
      navData = navData || latest;

      if (navData) {
        isLevelTwo = navData.name.indexOf("offCanvas") > -1;
        $menu = $("." + navData.name);

        //add or remove the nav from the stack
        if (!self.isNavOpen(navData.name)) {
          //if direction has changed, then first close old nav
          if (latest && latest.direction !== navData.direction) {
            //close old nav
            self.toggleOffCanvas(latest);

            //open the nav, after previous is closed (async), if transitions are supported
            main = $(".mainContent");

            //add a one-time handler to open the requested nav after the latest is closed
            navClosedCallback = function() {
              self.toggleOffCanvas(navData);
              main.off(transitionEndEvents, navClosedCallback);
            };

            main.on(transitionEndEvents, navClosedCallback);

            return;
          }

          opening = true;
          self.currentlyOpen.push(navData);
        }
        else {
          self.lastClosed = self.currentlyOpen.pop();
        }

        //toggle nav specific class
        $body.toggleClass(navData.name + isOpenSuffix);

        self.addAnimationFallback(navData);

        //adjust level two menus
        if (isLevelTwo) {
          offset = $(".bar_3").height();
          $menu.css("margin-top", navData.clearOffset ? "" : -offset);
          $body.removeClass("hide-offCanvas-bar_3");
        }
        else if (opening && self.currentlyOpen.length === 1) {
          $body.addClass("hide-offCanvas-bar_3");
        }

        // make sure page is tall enough to handle menus
        if ($body.hasClass(navData.name + isOpenSuffix)) {
          self.resizeContentForSidebar(navData);
        } else {
          self.undoResizeContentForSidebar();
        }

        //see if there is still a currently open nav
        latest = self.getLatest();

        //add current direction
        if (latest) {
          $body.removeClass("hide-offCanvas");
          $body.addClass("offCanvas-" + latest.direction + isOpenSuffix);
        }

        //add/remove and position overlay
        self.toggleOverlay(latest);
      }
    },

    resizeContentForSidebar: function(navData, animate) {
      // When a sidebar opens (or a sub-item), we need to make sure 
      // the page content is tall enough to handle menus otherwise 
      // they will get cut off

      var l2Menus, l2MenuHeight,
          contentHeight = 0,
          heightOffset = 0,
          wrapper = $(".body-inner-wrapper"),
          menu = $("." + navData.name);

      if ($.inArray(navData.name, levelOneMenus) > -1) {
        heightOffset = $(".bar_1").height();

        contentHeight = menu.height() + heightOffset;

        if (MAIN.activeBreakPoints.onCanvas) {
          // if we're in a large size then our levelOne sub menus are absolutely
          // positioned, meaning we won't be able to get the height correctly,
          // so we'll grab the sub menu height and add it to the content height

          contentHeight += (menu.find(".is-expanded .menuLevel_2").outerHeight() + 5); // +5 for bottom shadow
        }

        l2Menus = self.findClasses(levelTwoMenus);
        if (l2Menus.is(":visible")) {
          // If levelTwo menus are visible, need to make sure the level two menus are visible
          l2MenuHeight = heightOffset + $(".bar_2").height() + l2Menus.height();

          contentHeight = Math.max(contentHeight, l2MenuHeight);
        }

      } else if ($.inArray(navData.name, levelTwoMenus) > -1 && menu.is(":visible")) {
        heightOffset = $(".bar_1").height() + $(".bar_2").height();
        contentHeight = menu.height() + heightOffset;
      }

      wrapper.animate({ "min-height": contentHeight }, ((animate === false) ? 0 : 500));

      self.resizeLevelOneMenus();
    },

    undoResizeContentForSidebar: function() {
      var l2Menus,
          contentHeight = 0;

      l2Menus = self.findClasses(levelTwoMenus);
      if (MAIN.activeBreakPoints.onCanvas || l2Menus.is(":visible")) {
        // .height() of the two menus in the jQuery will actually be the height of the largest
        contentHeight = $(".bar_1").height() + $(".bar_2").height() + l2Menus.height();
      }

      $(".body-inner-wrapper").animate({ "min-height": contentHeight });

      self.resizeLevelOneMenus();
    },

    //make sure that bar two menus are as tall as the main content
    resizeLevelOneMenus: function() {
      self.contentHeight = $("body").height() - $(".bar_1").height();
      self.findClasses(levelOneMenus).each(self.resizeLevelOneMenu);
    },

    resizeLevelOneMenu: function() {
      $(this).css({ "min-height": self.contentHeight });
    },

    removeLevelOneMenuStyles: function() {
      self.contentHeight = null;
      self.findClasses(levelOneMenus).each(self.resizeLevelOneMenu);
    },

    //move content to the first visible container
    moveContent: function($content, $containers) {
      var parent = $content.parent();

      //using display:none (instead of :visible) as container may not currently have height/width (small search box)
      if (parent.css("display") === "none") {
        $containers.not(parent).each(self.checkContainer, [$content]);
      }
    },

    checkContainer: function($content) {
      var container = $(this);

      //using display:none (instead of :visible) as container may not currently have height/width (small search box)
      if (container.css("display") !== "none") {
        container.html($content);
        return false; //break each loop
      }
    },

    //for browsers that don't support CSS transitions, add a fallback
    addAnimationFallback: function(navData) {
      if (!Modernizr.csstransitions) {
        var shouldBeOpen = $body.hasClass(navData.name + isOpenSuffix),
          $menu = $("." + navData.name),
          isLevelOne = $menu.parent().hasClass("bar_2"),
          $parent = isLevelOne ? $menu.parent() : $(".bar_3"),
          factor = isLevelOne ? 70 : 35,
          maxFactor = 105,
          menuProps = {
            maxWidth: factor + "%",
            width: factor + "%"
          },
          barProps, mainProps;

        //animate the affected menu
        menuProps[navData.direction] = (shouldBeOpen ? "-" + factor : "-300") + "%";
        $menu.animate(menuProps, shouldBeOpen ? 0 : navAnimationDuration * 2, self.triggerTransitionEnd);

        //animate main content and header bar
        barProps= {
          left: !shouldBeOpen ? "0" : (navData.direction === "left" ? factor : "-" + factor) + "%"
        };

        //animate parent of menu
        $parent.animate(barProps, navAnimationDuration, self.triggerTransitionEnd);

        //adjust the factor for the main content/footer depending on if one, both, or no menus are open on a side
        if (self.currentlyOpen.length) {
          //there is still one open, but not this one, so flip the value (will be 35)
          if (!shouldBeOpen) {
            factor = maxFactor - factor;
          }
          //multiple menus are now open, move to max %
          else if (self.currentlyOpen.length > 1) {
            factor = maxFactor;
          }
        }
        //no menus are open, so need to move to 0
        else {
          factor = 0;
        }

        mainProps = {
          left: (navData.direction === "left" ? "" : "-") + factor + "%"
        };

        $(".mainContent, .mainFooter").css({ position: "relative" }).animate(mainProps, navAnimationDuration, self.triggerTransitionEnd);
      }
    },

    //have fallback animations trigger transitionend event, so response is consistent
    triggerTransitionEnd: function() {
      $(this).trigger("transitionend");
    },

    //create/remove an overlay and set top properly
    toggleOverlay: function(currentNav) {
      var nav, navOffset, width,
        overlay = $(".offCanvas-closeOverlay");

      currentNav = currentNav || self.getLatest();

      if (currentNav) {
        //add an overlay, if it does not already exist
        if (!overlay.length) {
          overlay = $("<div />", { "class": "offCanvas-closeOverlay" }).appendTo(document.body);
        }

        nav = $("." + currentNav.name);
        width = $body.width() - nav.width();
        navOffset = nav.offset();

        overlay.css({
          top: navOffset ? navOffset.top : 0,
          width: width + "px"
        });
      }
      else {
        overlay.remove();
      }
    },

    //click handler for opening an off-canvas menu
    openOffCanvasMenuHandler: function(e) {
      var $el = $(this),
        navInfo = $el.data(navKey);

      if (navInfo) {
        navInfo = navInfo.split(" ");
        self.toggleOffCanvas({
          name: navInfo[0],
          direction: navInfo[1]
        });
      }

      e.preventDefault();
    },

    //click handler for closing an off-canvas menu
    closeOffCanvasMenuHandler: function(e) {
      self.toggleOffCanvas();

      e.preventDefault();
    },

    //resize content for the latest or closest menu
    resizeForLatestMenu: function() {
      var navData;

      if (self.currentlyOpen.length) {
        navData = self.getLatest();
      } else {
        navData = {
          name: $(this).closest(allMenus).prop("class"),
          direction: "onscreen"
        };
      }

      self.resizeContentForSidebar(navData);

      //toggle an overlay at large size, to allow closing menu by clicking/touching off of it
      if (MAIN.activeBreakPoints.onCanvas) {
        self.toggleNestedMenuOverlay();
      }
    },

    //click handler for expanding children in a nested menu
    nestedMenuHeaderHandler: function(e) {
      var $el = $(this),
        parentListItem = $el.closest("li"),
        latest = self.latestNestedMenu;
		
	  if(typeof isRWD == 'undefined'){isRWD = "rwd"};//set pagetype to rwd if undefined
      //at larger size, only allow one menu to be open
      if (parentListItem.parent().hasClass("menuLevel_1")) {
		if ((!MAIN.activeBreakPoints.supported || MAIN.activeBreakPoints.onCanvas || isRWD == 'nonrwd') && latest && latest[0] !== $el[0]) {
          latest.parent().next("ol").hide();
          latest.closest("li").removeClass(isExpandedClass);
        }

        //add/remove based on whether it is currently open
        self.latestNestedMenu = parentListItem.hasClass(isExpandedClass) ? null : $el;
      }
      else {
        //bindings only apply beyond top-level at small size
        if (MAIN.activeBreakPoints.onCanvas) {
          return;
        }
      }

      $el.parent().next("ol").slideToggle(toggleDuration, self.resizeForLatestMenu);
      parentListItem.toggleClass(isExpandedClass);

      e.preventDefault();
    },

    closeLatestNestedMenu: function() {
      var latest = self.latestNestedMenu;

      if (latest) {
        latest.parent().next("ol").slideUp(toggleDuration, self.resizeForLatestMenu);
        latest.closest("li").removeClass(isExpandedClass);
      }
    },

    //toggle a full-width overlay for the nested menu's at large size
    toggleNestedMenuOverlay: function() {
      var overlay = $(".offCanvas-closeOverlay"),
        nestedMenuHeader = $(".menuLevel_1 ." + isExpandedClass),
        nestedMenu;

      //add an overlay, if necessary
      if (nestedMenuHeader.length) {
        nestedMenu = nestedMenuHeader.find("ol").first();

        if (!overlay.length) {
          overlay = $("<div />", { "class": "offCanvas-closeOverlay js-closeNestedMenu" }).appendTo(document.body);
        }

        overlay.css({
          top: nestedMenu.offset().top + nestedMenu.outerHeight(),
          width: "100%"
        });
      }

      //remove the overlay in the opposite case
      if (overlay.length && !nestedMenuHeader.length) {
        overlay.remove();
        self.toggleOverlay();
      }
    },

    // we need to hide the expandable menu options by default, showing only 
    // the first one. This allows the menu to be seen in case of no JS or JS issues
    hideInitialExpandableMenus: function() {
      var $menus = $(".expandableMenu");

      //IE7/IE8 were getting infinite loop with "h3:first, h3.default-open" selector in one line
      $menus.find("h3:first").addClass("expandableHeading-is-expanded");
      $menus.find("h3.default-open").addClass("expandableHeading-is-expanded");
      $menus.find(".expandableMenu-list:gt(0):not(.default-open)").addClass("is-visuallyhidden");
    },

    //click handler for toggling content in an expandable menu
    expandableMenuHeaderHandler: function(e) {
      var $content,
          $trigger = $(this);

      if ($trigger.hasClass("expandableHeading-onlySmall") && !MAIN.activeBreakPoints.smallExpandable) {
        return true;
      }

      $content = $trigger.next(".expandableMenu-list");
      if (!$content.length) {
        $content = $trigger.next(".expandableContent");
      }

      // reverse the CSS class hiding so that slideToggle works (if necessary)
      if ($content.hasClass("is-visuallyhidden")) {
        $content
          .hide()
          .removeClass("is-visuallyhidden");
      }

      // slide toggle the associated content
      $content.slideToggle(
        toggleDuration,
        (($content.hasClass("expandableMenu-list")) ? self.afterExpandableMenuToggle : self.afterExpandableContentToggle)
      );

      //now toggle the class after slideToggle is kicked off
      $trigger.toggleClass("expandableHeading-is-expanded");

      e.preventDefault();
    },

    //toggle the header class when animation is complete
    afterExpandableMenuToggle: function() {
      self.resizeForLatestMenu();
      self.toggleExpandableMenuHiddenClass($(this));
    },

    //toggle the content expanded class after animation
    afterExpandableContentToggle: function() {
      $(this).toggleClass("expandableContent-is-collapsed").css("display", "");
      self.toggleExpandableMenuHiddenClass($(this));
    },

    toggleExpandableMenuHiddenClass: function(content) {
      // for accessibility we apply a class to hide the content versus using
      // display: none (which is what jQuery does)
      if (content.is(":visible")) {
        content.removeClass("is-visuallyhidden");
      } else {
        content
          .addClass("is-visuallyhidden") // hide with CSS class
          .show(); // remove the "display:none;"
      }
    },

    //remove the left/right styles added by animation fallbacks
    clearFallbackStyles: function(selector) {
      $(selector).css({
        left: "",
        right: "",
        width: "",
        maxWidth: ""
      });
    },

    //callback when animation finishes
    transitionEndHandler: function(e) {
      if (!self.getLatest()) {
        $body.removeClass("hide-offCanvas");
      }

      if (!Modernizr.cssTransitions && self.lastClosed) {
        if ((MAIN.activeBreakPoints.exposeLeftSidebar && self.lastClosed.name === "offCanvas-bar_3-left") ||
            (MAIN.activeBreakPoints.exposeRightSidebar && self.lastClosed.name === "offCanvas-bar_3-right")) {

          self.clearFallbackStyles(e.target);
        }
      }
    },

    //close all open menus
    closeOpenNestedMenus: function() {
      $header.find("." + isExpandedClass).removeClass(isExpandedClass).find("ol").first().hide();

      //clear override margin-top on level two menus
      self.findClasses(levelTwoMenus).css("margin-top", "");

      self.toggleNestedMenuOverlay();
    },

    handleNoTransitionClass: function() {
      if (self.resizeNoTransitionTimeout) {
        clearTimeout(self.resizeNoTransitionTimeout);
      }
      else {
        $body.addClass(noTransitionClass);
      }

      self.resizeNoTransitionTimeout = setTimeout(self.removeNoTransitionClass, resizeTimeoutDuration);
    },

    removeNoTransitionClass: function() {
      $body.removeClass(noTransitionClass);
      self.resizeNoTransitionTimeout = null;
    },

    //functionality to execute when the browser resizes
    onResize: function() {
      self.moveContent($searchInput, $searchContainers);
      self.moveContent($espots, $espotsContainers);
      self.handleNoTransitionClass();
    },

    //handle browser moving to a large size
    enterLargeSizeHandler: function() {
      var navData;

      self.closeOpenNestedMenus();

      //remove body level classes
      while(self.currentlyOpen.length) {
        navData = self.getLatest();
        navData.clearOffset = true;
        self.toggleOffCanvas(navData);
      }

      //clear any styles added by fallback animations to the main menus
      if (!Modernizr.cssTransitions) {
        self.clearFallbackStyles(allMenus);
      }

      //resize content for (now) onscreen menus
      self.resizeContentForSidebar({ name: "offCanvas-bar_3-left", direction: "onscreen" }, false);
    },

    //handle browser moving to a smaller size
    exitLargeSizeHandler: function() {
      self.closeOpenNestedMenus();
    },

    clearRightSidebarFallbackStyles: function() {
      self.clearFallbackStyles("." + rightSidebarMenu);
    },

    //close menu when left is exposed
    enterLeftSidebarExposed: function() {
      if (self.isNavOpen(leftSidebarMenu)) {
        self.toggleOffCanvas({
          name: leftSidebarMenu,
          clearOffset: true
        });
      }
    },

    //when browser is at its largest size with the right sidebar always shown
    enterRightSidebarExposed: function() {
      if (self.isNavOpen(rightSidebarMenu)) {
        self.toggleOffCanvas({
          name: rightSidebarMenu,
          clearOffset: true
        });
      }

      //ensure that fallback styles are removed even if menu open/close is in progress
      setTimeout(self.clearRightSidebarFallbackStyles, navAnimationDuration);
    },

    //attach handlers for various breakpoints
    addBreakpointHandlers: function() {
      mediaCheck({
        media: MAIN.breakPoints.onCanvas,
        entry: self.enterLargeSizeHandler,
        exit: self.exitLargeSizeHandler
      });

      mediaCheck({
        media: MAIN.breakPoints.exposeLeftSidebar,
        entry: self.enterLeftSidebarExposed
      });

      mediaCheck({
        media: MAIN.breakPoints.exposeRightSidebar,
        entry: self.enterRightSidebarExposed
      });
    },

    toggleHeaderBox: function(e) {
      e.preventDefault();
      var m = $(this).prop("class").match(/js\-toggles\-([^\s]+)/);
      if (m) {
        $header
          // close any open boxes, except for the one selected
          .find(".disclosureBox")
            .not("."+m[1])
              .slideUp()
              .end()
            // now show the one selected
            .filter("."+m[1])
              .slideToggle();
      }
    },

    //given an array of classes, build a selector and return the result set
    findClasses: function( arrayOfClasses ) {
      var selector = "";
      for (var i = 0, j = arrayOfClasses.length || []; i < j; i++ ) {
        selector += ( i ? ", ." : "." ) + arrayOfClasses[i];
      }

      return $(selector);
    }
  };

})();
