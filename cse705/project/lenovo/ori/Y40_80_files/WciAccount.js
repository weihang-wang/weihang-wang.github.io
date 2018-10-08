if(typeof(window.wci) === 'undefined')
{
  window.wci = {};
}

(function (wci) {
  if(!wci.account)
  {
    account = {};
    wci.account = account;
    wci.account.pendingUrl = null;
    wci.account.loginUrl = '';
    wci.account.checkLoginUrl = '';
  }
  
  wci.account.escapeId = function( id )
  {
    return id.replace(/([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g, "\\$1");
  }
  
  wci.account.popupsubmit = function (formId, url)
  {
    formId = wci.account.escapeId(formId);
    var mainFrm = $("#"+formId);
    wci.ajaxEx({
      crossDomain: true,
      url: url,
      data: mainFrm.serialize(),
      async: true,
      type: "POST",
      dataType: 'html',
      xhrFields: {
        withCredentials: true
      },
      error: function(xhr, textStatus, errorThrown) {
        console.log('error!');
      },
      success: function (data, status) {
    	  if( status == 'success' )
          {
    		var errorInfoMsg=$(data).find("msg").text();
            if( errorInfoMsg != null && errorInfoMsg != '' )
            {
              $("#systemErrorMsgTable").show();
              $("#popuperrorMsg").text(errorInfoMsg);
            }
            else
            {
            	wci.account.loginTried();
            }
          }
    	}
    });
    mainFrm.action="#"
  }
  
  wci.account.submit = function (formId, url)
  {
    formId = wci.account.escapeId(formId);
    var mainFrm = $("#"+formId);
    mainFrm.removeAttr('onsubmit')
    mainFrm.attr('action', url);
    mainFrm.submit();	
  }
  
  wci.account.runLoginInOverlay = function (targetUrl,hideCloseButton)
  {
    wci.account.pendingUrl = targetUrl;
    wci.account.runCmdInOverlay( wci.account.loginUrl,hideCloseButton );
  };

  wci.account.loginTried = function ()
  {
    if( wci.account.pendingUrl )
    {
      var runningNextUrl = wci.account.pendingUrl;
      wci.account.pendingUrl = null;
      wci.account.runInOverlay( runningNextUrl, true )
    }
  }

  wci.account.runCmdInOverlay = function ( url, hideCloseButton )
  {
    wci.ajaxEx({
      dataType: 'html',
      crossDomain: true,
      url: url, 
      async: true,
      xhrFields: {
        withCredentials: true
      },
      success: function(data , status) 
      {
        if( status == 'success' )
        {
          openFloatingPopup(data, null);
          if(url == wci.account.loginUrl || typeof(hideCloseButton) == 'undefined' || hideCloseButton == false)
          {
              floatingPopupShowCloseButton();
          }
        }
      }
    });
  }
      
  wci.account.runInOverlay = function ( url, checkLogin, updateReturnWf, hideCloseButton )
  {
    if( checkLogin )
    {
      if( updateReturnWf )
      {
        wci.ajaxEx({
          dataType: 'html',
          crossDomain: true,
          url: updateReturnWf, 
          async: true,
          xhrFields: {
            withCredentials: true
          },
          success: function(response) 
          {  }
        });
      }
      wci.ajaxEx({
        dataType: 'html',
        crossDomain: true,
        url: wci.account.checkLoginUrl, 
        async: true,
        xhrFields: {
          withCredentials: true
        },
        success: function(data, status) 
        {
          if( status == 'success' )
          {
            var jdata = $.parseJSON(data);
            if( !jdata || jdata.loggedIn != true )
            {
              wci.account.runLoginInOverlay(url,hideCloseButton);
            } 
            else
            {
              wci.account.runCmdInOverlay(url,hideCloseButton);
            }
          }
        }
      });
    }
  }

   wci.account.resetPassword = function (formId, url)
    {
      formId = wci.account.escapeId(formId);
      $('<input>').attr({
  	    type: 'hidden',
  	    id: 'Account.LoginName',
  	    name: 'Account.LoginName',
  	    value:  $('input[name=EmailAsLoginName]').val()
  	}).appendTo('#' + formId);
  	
  	$('<input>').attr({
  	    type: 'hidden',
  	    id: 'Account.Email',
  	    name: 'Account.Email',
  	    value: $('input[name=Email]').val()
  	}).appendTo('#' + formId);
  	
      var mainFrm = $("#"+formId);
      mainFrm.attr('action', url);
      mainFrm.submit();	
    }

  wci.account.navigateToUrl = function( url )
  {
    window.location = url;
  }

  wci.account.takeMeToSSOOVP = function(data, textStatus, jqXHR)
  {
	var myStatus = data.internalStatus;
	var myResponse = data.response;

	var token;
	var url;

 	if (myStatus == 200) {
 		token = myResponse;
 		url = wci.account.SSOOVPUrl;
 	 	url = url.replace("_TOKEN_", token);
 	 	window.open(url);
 	} else {
 		setErrorMessage(myResponse);
 	}
  }

  wci.account.ViewSSOOVPOrders = function(url, loginMsg, SSOOVPUrl)
  {
	wci.account.getExternalOrderStatusSSOToken(url, loginMsg, wci.account.takeMeToSSOOVP);
	wci.account.SSOOVPUrl = SSOOVPUrl;
  }

  wci.account.getExternalOrderStatusSSOToken = function(url, loginMsg, fnSuccess)
  {
	showNoMessage();
	startGauge(loginMsg);

	wci.ajaxEx({
		url: url,
		async: true,
		type: "GET",
		dataType: "json",
		success: fnSuccess,
		complete: function() { stopGauge(); }
	});
  }
  
  wci.account.isJWSInstalled = function () {     
      // For Internet Explorer.
      if (navigator.userAgent.indexOf('MSIE') > -1) {
          try {
              var jws = new ActiveXObject('JavaWebStart.isInstalled');
              return true;
          }
          catch (e) {
              return false;
          }
      }

      return navigator.mimeTypes &&
             navigator.mimeTypes.length &&
                 (navigator.mimeTypes['application/x-java-jnlp-file'] != null ||
                  navigator.mimeTypes['application/x-java-vm'] != null);
  }
  
  wci.account.startJLNP = function (url, installationPage, requiredMsg) {
	  if (wci.account.isJWSInstalled()) {
		  window.open(url, 'Maintenance', 'toolbar=yes,location=yes,resizable=yes,scrollbars=yes,width=600,height=480');
	  } else {
		  alert(requiredMsg);
		  window.open(installationPage);
	  }
  }
  
  wci.account.getCookieLoginName = function(cookieName)
  {
	var aCookies = document.cookie.split(';');
	var x,y;
	
	for (i=0;i<aCookies.length;i++) {
		x = aCookies[i].substr(0,aCookies[i].indexOf("="));
		y = aCookies[i].substr(aCookies[i].indexOf("=")+1);
		x = x.replace(/^\s+|\s+$/g,"");
		if (x == cookieName)
		{
		   return decodeURIComponent(y);
		}
	}
  }
    wci.account.setLoginNameCookie = function(cookieName, loginName, days) {
	  if (cookieName) {
		  var today = new Date();
		  var expire = new Date();
		  expire.setTime(today.getTime() + 3600000*24*days);
		  document.cookie = cookieName + "=" + escape(loginName) + ";expires=" + expire.toGMTString();
	  }
  }
 
   wci.account.decodeString = function(str) {
   
    		var tagsToReplace = {
   		  		    '‰' :'&auml;',
   				    'ƒ' :'&Auml;',
   				    'ˆ' :'&ouml;',
   				    '÷' :'&Ouml;',
   				    'Â' :'&aring;',
   				    '≈' :'&Aring;',
   				    '¯' :'&oslash;',
   				    'ÿ' :'&Oslash;',
   				    '¸' :'&uuml;',
   				    '‹' :'&Uuml;',
   				    'ﬂ' :'&szlig;',
   				    '£' :'&#163;',
   				    '<' :'&lt;',
   				    '>' :'&gt;',
   				    '&' :'&amp;',
   				    '"': '&quot;',
   				    '\'' :'&#39;',
   				    '≠' :'&shy;',
   				    '\\' :'&#92;'
     
   		  		};
   
   		 function replaceTag(tag) {
   		   		    return tagsToReplace[tag] || tag;
     		}
   
     		    return str.replace(/[‰ˆ÷Â≈¯ÿ¸‹ﬂ£<>&"\≠\\]/g, replaceTag);
}
   
   wci.account.saveCartpopup = function(sharedcarttype, defaultcarttype, savelink,blankalertmessage,longdescriptionmessage)
   {
	   var savedescription= document.getElementById("cart-description").value.trim();
	   
 	  if(savedescription ==''){
 			
 			 alert(blankalertmessage);
 			 return false;
 			}
 			
 			if(wci.account.getUTF8Length(savedescription)> 254){
 				
 				 alert(longdescriptionmessage);
 				 return false;
 			}
 			
 			var decodedSavedescription = wci.account.decodeString(savedescription);
 			 var createSharedCart = false;
 			  if( document.getElementById("CreateSharedCart") )
 			  {
 				  createSharedCart = (document.getElementById("CreateSharedCart").checked == true);
 			  }
 			  
 			
 			
 			var mainFrm = $("#mainForms");
 		    mainFrm.append('<input type="hidden" name="cart-description" value="'+decodedSavedescription+'" />');
 		    
 		    if (createSharedCart)
 		    {
 		    
 		      mainFrm.append('<input type="hidden" name="cart-type" value="'+sharedcarttype+'" />');
 		    }
 		    else{
 		     mainFrm.append('<input type="hidden" name="cart-type" value="'+defaultcarttype+'" />');
 		    }
 		    
 		    mainFrm.attr('action', savelink);
 		    mainFrm.submit();
 		    
   }
   
   wci.account.closeSavePopup= function()  {
   	closeFloatingPopup(floatingPositiveResponse);
   }
   
   wci.account.getUTF8Length=function(str) {
	    var utf8length = 0;
	    for (var n = 0; n < str.length; n++) {
	        var c = str.charCodeAt(n);
	        if (c < 128) {
	            utf8length++;
	        }
	        else if((c > 127) && (c < 2048)) {
	            utf8length = utf8length+2;
	        }
	        else {
	            utf8length = utf8length+3;
	        }
	    }
	    return utf8length;
	 }


    
  wci.account.addItemToWishlist = function(url, updateReturnWfUrl, isPopup)
  {
    if(isPopup) {
      wci.account.runInOverlay(url, true, updateReturnWfUrl);
    } else {
      window.location.href = url;
    }  
  };
    
  wci.account.generateQuickQuote = function(url, updateReturnWfUrl)
  {
      wci.account.runInOverlay(url, true, updateReturnWfUrl, true);
  };
  
  /**
   * Parses layout based profile data provided by the REST framework and converts it to a single profile object.
   */
  wci.account.convertLayoutToProfileObject = function(data) {
    var profile = {};
    var profile_rows = [];
    if(data.Row.length) {
      profile_rows = data.Row;
    }
    else {
      profile_rows[0] = data.Row;
    }
    
    for(var i = 0; i < profile_rows.length; i++) {
      var element = profile_rows[i].Element;
      var field = element.Field;
      if($.isArray(field)) {
        for(var j = 0; j < field.length; j++) {
          var elemName = field[j].Name;
          var elemValue = field[j].Value;
          var elemDisplayValue = field[j].DisplayValue;
          profile[elemName] = elemDisplayValue && elemDisplayValue !== '' ? elemDisplayValue : elemValue;
        }
      }
      else {
        profile[field.Name] = field.DisplayValue && field.DisplayValue !== '' ? field.DisplayValue : field.Value;
      }
    }
    return profile;
  };

}(window.wci));