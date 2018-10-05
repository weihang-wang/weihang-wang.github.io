(function() {
  var app = window.LENOVO = window.LENOVO || {},
    self = app.MAIN = {
      //define breakpoints used in the application
      breakPoints: {
        supported: "(min-width: 0)",
        paginateSubseriesListing: "(min-width: 32em)",
        exposeBar1Labels: "(min-width: 38em)",
        verticalGallery: "(min-width: 44em)",
        smallExpandable: "(max-width: 44em)",
        onCanvas: "(min-width: 51em)",
        exposeLeftSidebar: "(min-width: 60em)",
        exposeRightSidebar: "(min-width: 65em)",
        columnSliderMediumOneUp: "(min-width: 35em)",
        columnSliderFourUp: "(min-width: 55em)",
        splitterCarousel: "(max-width: 45em)",
		accesorieslist: "(min-width: 32em)",
		compareModalSmall: "(max-width: 55em)"
      },

      //track the status for all breakpoints in/out
      activeBreakPoints: {},

      //return a handler to use with mediaCheck
      getBreakPointHandler: function(prop, value) {
        return function() {
          self.activeBreakPoints[prop] = value;
        };
      },

      start: function(options) {
        var breakPointName, moduleName, module;

        if (!self.initialized) {
          self.initialized = true;

          self.fontFaceCheck();

          //set a flag for each breakpoint on entry/exit
          for (breakPointName in self.breakPoints) {
            if (self.breakPoints.hasOwnProperty(breakPointName)) {
              mediaCheck({
                media: self.breakPoints[breakPointName],
                entry: self.getBreakPointHandler(breakPointName, true),
                exit: self.getBreakPointHandler(breakPointName, false)
              });
            }
          }

          //start any required modules for the page
          for (moduleName in app) {
            if (app.hasOwnProperty(moduleName)) {
              module = app[moduleName];

              //determine if the module should be initialized
              if (module.init && (!module.shouldRun || module.shouldRun())) {
                if (options[moduleName.toLowerCase() + "_options"]) {
                  module.init(options[moduleName.toLowerCase() + "_options"]);
                } else {
                  module.init();
                }
              }
            }
          }

          self.$window.on("resize", self.triggerDebouncedResize);
        }
      },

      resizeTimeout: null,

      resizeEventName: "debounced-resize",

      resizeEventDelay: 200,

      $window: $(window),

      //trigger a debounced resize event that is fired initially and after events stop for x ms
      triggerDebouncedResize: function() {
        if (!self.resizeTimeout) {
          //trigger initially (needed for things like adding no-transitions class on resize)
          self.$window.trigger(self.resizeEventName);

          //no-op for initial timer, replaced if there is a subsequent resize event
          self.resizeTimeout = setTimeout($.noop, self.resizeEventDelay);
        }
        else {
          //clear the existing timer and reset it
          clearTimeout(self.resizeTimeout);
          self.resizeTimeout = setTimeout(self.resizeCallback, self.resizeEventDelay);
        }
      },

      resizeCallback: function() {
        self.$window.trigger(self.resizeEventName);
        self.resizeTimeout = null;
      },

      isIE: function() {
        // Unfortunately needed to disable swiping in IE as hammer has an issue with it
        // We should be using Modernizr for just about everything else
        return (/msie/i).test(navigator.userAgent);
      },

      isAndroid: function() {

        var isAndroid = false, androidVersion;

        // for media gallery in subseries we need to test older android version to fix click bug
        if(navigator.userAgent.indexOf("Android") >= 0 ) {
          androidVersion = parseFloat(navigator.userAgent.slice(navigator.userAgent.indexOf("Android")+8));
          if (androidVersion <= 2.4) {
              isAndroid = true;
          }
        }

        return isAndroid;
      },

      //correct fontface detection for Windows Phone 7 (https://github.com/Modernizr/Modernizr/issues/538)
      fontFaceCheck: function() {
        if (/Windows Phone OS 7/.test(navigator.userAgent)) {
          Modernizr.fontface = false;
          $("html").removeClass("fontface").addClass("no-fontface");
        }
      }
    };

})();