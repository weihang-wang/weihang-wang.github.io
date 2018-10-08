(function (win) {
  if(!win.wci)
  {
    var wciLib = {};
    window.wci = wciLib;
  }

  if(!win.wci.ajax)
  {
    win.wci.ajax = function (strURL, paramData, fnSuccess, dataType, ignoreErrors)
    {
      //$.post(strURL, paramData, fnSuccess, dataType); 
      if(ignoreErrors==true)
      {
        $.ajax({
          url: strURL,
          type: "POST",
          data: paramData,
          dataType: dataType,
          async: true,
          cache: false,
          // The success call back.
          success: fnSuccess
        });            
      }
      else
      {
        $.ajax({
          url: strURL,
          type: "POST",
          data: paramData,
          dataType: dataType,
          async: true,
          cache: false,
         // The success call back.
          success: fnSuccess,
          // The error handler.
          error: function( xhr, textStatus, errorThrown ) {
            var pageContent = xhr.responseText;

            // Check for a custom header that indicates an error that overrides any error handling here
            if ((xhr.getResponseHeader('X-Render-Full') && xhr.getResponseHeader('X-Render-Full') === 'true')
            		|| (xhr.getResponseHeader('X-Bot-Check'))) {
              // Show error on page
              $('#output').html(pageContent);
              //Following is the temporary fix...Can be done efficiently. onload method is not invoked hence reloading
              window.location.reload();
            }
            else if(typeof(console) !== 'undefined') {
              console.error('[' + textStatus + ']: ' + pageContent); 
              console.error(errorThrown.message );
            }
          }
        });
      }
    };
  }
  
  if(!win.wci.ajaxEx) {
    /**
     * This is an extended version of wci.ajax that supports more call parameters.
     * 
     * Example:
     * wci.ajaxEx({
     *   url: 'example.com',
     *   type: 'get',
     *   success: function() { alert('Hello World!') }
     * });
     * 
     * @param {Object} options Options for ajax call.
     * @param {Boolean} [options.async] See jQuery.ajax documentation.
     * @param {Function} [options.complete] See jQuery.ajax documentation.
     * @param {String} [options.data] See jQuery.ajax documentation.
     * @param {String} [options.dataType] See jQuery.ajax documentation.
     * @param {Function} [options.error] A function that is executed on error responses. A response with a JSON object { "importantError": "true", "content": "<Your error message>" } is prioritized above this error callback. This is for errors that must be always shown, session timeouts for example.
     * @param {Boolean} [options.ignoreErrors] Ignore error responses.
     * @param {Function} [options.success] See jQuery.ajax documentation.
     * @param {Number} [options.timeout] See jQuery.ajax documentation.
     * @param {String} [options.type] See jQuery.ajax documentation.
     * @param {String} options.url See jQuery.ajax documentation.
     */
    win.wci.ajaxEx = function(options) {
      // Default options
      // Can be overridden by setting in options variable
      var defaults = {
        async: true,
        complete: function() {},
        data: '',
        dataType: '',
        headers: {},
        ignoreErrors: false,
        success: function() {},
        timeout: '',
        type: 'post',
        url: '',
        beforeSend: '',
        cache: false,
        traditional: false,
        xhrFields: {},
        isRestRequest: false
      };
      
      // Override defaults with given options
      options = $.extend({}, defaults, options);
      
      // Options that we'd like to keep unchanged
      var constants = {
          errorHandler: getErrorHandler()
      };
      
      // Override options with constants
      $.extend(options, constants);
      
      // Set custom header for distinguishing WCI ajax requests from other (ajax) requests
      $.extend(options.headers, {'X-WCI-AJAX': 'true'});
      
      if (options.dataType && options.dataType.indexOf('xml') !== -1 && window.ActiveXObject !== undefined)
      {
        // Set IE 10 related responseType to make sure xml data is returned as correct object
        $.extend(options.xhrFields, { responseType: 'msxml-document' });
      }

      // Take a copy of the options object
      var jQueryOptions = $.extend({}, options);
      if (!options.isRestRequest) {
        jQueryOptions.data = addPersistenceId(options.data);
      }
      jQueryOptions.error = options.errorHandler;
      
      // Make the ajax request
      var jqxhr = $.ajax(jQueryOptions);
      
      
      // Returns error handler
      function getErrorHandler() {
        // Add a callback for error handling
        var errorFn = function() {};
        if (!options.ignoreErrors) {
          errorFn = function(xhr, textStatus, errorThrown) {
            // Check for a custom header that indicates an error that overrides any error handling here
            if ((xhr.getResponseHeader('X-Render-Full') && xhr.getResponseHeader('X-Render-Full') === 'true')
            		|| (xhr.getResponseHeader('X-Bot-Check'))) {
              var pageContent = xhr.responseText;
              // Show error on page
              document.open();
              document.write(pageContent);
              document.close();
            } 
            else if(typeof(options.error) === 'function') {
              // Call user defined function
              options.error(xhr, textStatus, errorThrown);
            }
            // REST error handling
            else if((xhr.getResponseHeader('X-REST-Error') && xhr.getResponseHeader('X-REST-Error') === 'true')) {
              wci._int.handleRestError(xhr, textStatus, errorThrown);
            }
            else if(typeof(console) !== 'undefined') {
              console.error('[' + textStatus + ']: ' + xhr.responseText); 
            }
          };
        }
        return errorFn;
      }
      
      // Add persistenceId for wci:ajaxcontainer
      function addPersistenceId(data) {
        if(wci.persistenceId !== undefined) {
          if(typeof(data) === 'string') {
            if(data.indexOf('persistenceid') == -1) {
              // Check do we have values there already
              if(data.indexOf('=') != -1 || data.indexOf('&') != -1) {
                data += "&persistenceid=" + wci.persistenceId;
              }
              else {
                data = "persistenceid=" + wci.persistenceId;
              }
            }
          }
          else if(typeof(data) === 'object') {
            data['persistenceid'] = wci.persistenceId;
          }
        }
        return data;
      }
      
      return jqxhr;
    };
    
  }
  
  // Controls if the parent page is reloaded on 403 response from the server
  wci.globalAjaxOptions = {
    rest: {
      forceReloadOnForbidden: false
    }
  };
  
  // Namespace for internal properties
  if(!wci._int) { wci._int = {}; }
  
  wci._int.handleRestError = function(xhr, status, responseText) {
    if(xhr.status === 403) 
    {
      var loginRequired = xhr.getResponseHeader("X-Requires-Login");
      if(loginRequired || wci.globalAjaxOptions.rest.forceReloadOnForbidden) 
      {
        window.location.reload();
      }
    }
    else {
      // Handle other REST errors
      var contentType = xhr.getResponseHeader("content-type") || '';
      
      var errorObj = {};
      if(contentType.indexOf('application/json') !== -1) {
        errorObj = JSON.parse(xhr.responseText);
      }
      else if(contentType.indexOf('application/xml') !== -1) {
        var $errorDetails = $(xhr.responseText).find('ErrorDetails');
        errorObj.ErrorDetails = {
          ErrorCode: $errorDetails.find('ErrorCode').text(),
          ErrorDescription: $errorDetails.find('ErrorDescription').text(),
          ErrorStack: $errorDetails.find('ErrorStack').text()
        };
      }
      else {
        errorObj.ErrorDetails = {
          ErrorCode: status,
          ErrorDescription: responseText
        };
      }
      
      var details = errorObj.ErrorDetails;
      if(typeof(details) === 'object') {
        wci._int.renderRestError(details.ErrorCode, details.ErrorDescription, details.ErrorStack);
      }
    }
  };
  
  wci._int.renderRestError = function(errorCode, errorDesc, errorStack) {
    var doc = wci._int.restErrorTemplate;
    $('body').html(doc);
    $('#errorDesc').text(errorDesc);
    $('#errorStack').text(errorStack);
  };
  
  wci._int.restErrorTemplate = '<html><head></head><body><div id="errorDescContainer"><h1><span id="errorDesc"></span></h1></div><div><a href="" onclick="$(\'#errorStackContainer\').toggle(); return false;">Show/hide stack trace</a></div><div id="errorStackContainer" style="display:none;"><pre><span id="errorStack"></span></pre></div></body></html>';
  
})(window);