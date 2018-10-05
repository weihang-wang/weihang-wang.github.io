/*
 * LENOVO.MEDIA module
 * --------------------------
 * Dependencies: jQuery, LENOVO.MAIN, LENOVO.UTILS, LENOVO.TEMPLATES, LENOVO.MODAL
 */

;(function(app, $, undefined) {

  var _M = "MEDIA";
  var _version = "2014-06-27";

  var _baseurl = window.long_url || "";
  var _debug = window.debugAllowed || false;
  var _verbose = false;
  var _initialized = false;

  var $window = $(window);
  var $document = $(document);
  var $body = null;

  var _urlParams = null;
  var _domain = document.domain;
  var _protocol = window.location.protocol;
  var _hostname = window.location.hostname;
  var _pathname = window.location.pathname;

  //encodeURIComponent helper
  var __e = function(string) {
    return encodeURIComponent(string);
  };
  //ratio/proportion calculator helper
  var __r = function(w, h, n, d) {
    var value = null;
    if (typeof n === "number" && typeof d === "number") {
      var scalar = (n / (d > 0 ? d : 1));
      if (typeof w !== "undefined") {
        //solve for width
        value = Math.round(w / scalar);
      } else if (typeof h !== "undefined") {
        //solve for height
        value = Math.round(h * scalar);
      }
    }
    return value;
  };

  var self = app[_M.toUpperCase()] = {

    shouldRun: function() {
      //only run automatically if UTILS and MODAL are loaded
      return app.hasOwnProperty("UTILS") && app.hasOwnProperty("MODAL");
    },

    init: function(options) {
      if (!_initialized) {
        //output status in console on dev domains
        if (_debug) {
          console.info("LENOVO.MEDIA: init");
        }

        //prevent multiple init calls
        _initialized = true;

        //set $body reference (just in case)
        $body = $("body");

        //check for forced debug/verbose/defaults settings
        _debug = app.UTILS.isDebug(); //triggers automatically on *.leni2.com domain, or can trigger in production with &debug=true param
        _verbose = app.UTILS.isVerbose(); //need to add &verbose=true (_debug must be true as well; can set &debug=verbose to set both to true)

        //store urlParams to private var for later access
        _urlParams = $.extend(true, {}, app.UTILS.urlParams);

        //open video in modal only if Brightcove video ID in the URL
        if ("bctid" in urlParams) {
          //pass video ID into videoModal method
          self.videoModal(urlParams.bctid);
        }
      }
    },

    videoModal: function(videoId) {
      //output status to console if verbose mode
      if (_verbose == true) {
        console.info("LENOVO.MEDIA: videoModal(" + urlParams.bctid + ")");
      }
      //start building iframe url
      var iframeUrl = "http://www.lenovo.com/media/videos/watch/?autoStart=true";
      iframeUrl += ("&bctid=" + videoId);
      iframeUrl += ("&linkBaseHost=" + __e(_domain));
      iframeUrl += ("&linkBaseURL=" + __e(_protocol + "//" + _hostname + _pathname));
      //get viewport dimensions
      var winW = $window.width();
      var winH = $window.height();
      //iframe dimenstions should be ~86% of window (margin/padding, etc)
      var iW = winW * 0.86;
      var iH = winH * 0.86;
      //set iframe+video sizes based on current viewport
      //keep 16:9 ratio; maxheight=360px, maxwidth=640px
      if (iW > 640) {
        iW = 640;
        if (iH > 360) {
          iH = 360;
        } else {
          iW = __r(undefined, iH, 16, 9);
        }
      } else {
        iH = __r(iW, undefined, 16, 9);
      }
      iframeUrl += ("&width=" + iW + "&height=" + iH);
      //call openModal method via app.MODAL
      if ("openModal" in app.MODAL) app.MODAL.openModal(iframeUrl, {
        contentType: "iframe", //force iframe content
        modalType: "overlay" //force overlay method
      });
      $body.find(".lnvmodal .lnvmodal-content").addClass("lnvmodal-video")
        .find("iframe").width(iW).height(iH);
    }
  };
})(window.LENOVO = window.LENOVO || {}, jQuery);
