// Generated by CoffeeScript 1.7.1

/*
 * LENOVO.ENV module
 * -----------------
 * Dependencies: LENOVO.MAIN
 *
 * This module standardizes and stores application URL references to important
 * workflows and templates on Lenovo.com. It registers its methods under
 * LENOVO.ENV and on initialization, saves an object to store and reference in
 * other modules.
 */
(function(app, $) {
  var applyBase, self, _M, _debug, _devUrls, _prodUrls, _staticUrls, _version;
  _M = "ENV";
  _version = "2014-06-24";
  _debug = window.debugAllowed || /(\.leni2\.)/i.test(window.location.hostname) || false;
  _staticUrls = {
    builder: {
      templates: {
        builderCallback: "/WW/site/templates/configurator/owv2/builderCallback.html",
        configData: "/WW/site/templates/configurator/owv2/configData.html",
        openConfigCallback: "/WW/site/templates/configurator/owv2/openConfigCallback.html",
        transition: "/WW/site/templates/configurator/owv2/transition.html",
        interstitialCallback: "/WW/site/templates/configurator/owv2/interstitialCallback.html"
      },
      workflow: {
        loadBuilderTemplate: "/builder.workflow:LoadBuilderTemplate",
        enter: "/builder.workflow:Enter",
        exit: "/builder.workflow:Exit",
        hmd: "/builder.workflow:HMD",
        navigate: "/builder.workflow:Navigate",
        update: "/builder.workflow:Update",
        itemDetails: "/builder.workflow:ItemDetails",
        undo: "/builder.workflow:Undo"
      }
    },
    wci: {
      workflow: {
        friendlyload: "/wci.workflow:friendlyload",
        load: "/wci.workflow:load"
      }
    },
    handlebars: "/WW/site/templates/handlebars/owv2/"
  };
  _prodUrls = {};
  _devUrls = {
    seutil: {
      workflow: {
        debugBOM: "/seutil.workflow:DebugBOM"
      }
    }
  };
  applyBase = function(base, hash) {
    var key, value;
    if (!base) {
      return hash;
    }
    for (key in hash) {
      if (!hash.hasOwnProperty(key)) {
        continue;
      }
      value = hash[key];
      if ($.isPlainObject(value)) {
        value = applyBase(base, value);
      } else if (value.indexOf(".workflow") > -1) {
        value = base + value;
      }
      hash[key] = value;
    }
    return hash;
  };
  self = app[_M] = {};

  /*
   * LENOVO.ENV.urls -- Method to save URLs based on several parameters like
   *   production mode and environment.
   * @param  {String} base  Base URL to concatenate workflow URLs
   * @param  {String} mode  Prod or Dev mode
   * @return {Object}       URLs
   */
  self.urls = function(base, mode) {
    var urls;
    if (!base) {
      base = window.long_url || "";
    }
    if (!mode) {
      mode = (_debug ? "dev" : "prod");
    }
    mode = mode.toLowerCase();
    urls = {};
    if (mode === "dev") {
      $.extend(true, urls, _staticUrls, _prodUrls, _devUrls);
    } else {
      $.extend(true, urls, _staticUrls, _prodUrls);
    }
    return applyBase(base, urls);
  };
})(window.LENOVO = window.LENOVO || {}, jQuery);
