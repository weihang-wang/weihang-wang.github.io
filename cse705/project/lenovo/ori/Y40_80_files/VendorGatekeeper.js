/**
 * Checks if given vendor function is allowed to show on given page.
 * If target page is not given current page url is used for check.
 * Parameters:
 * xFunction = functionality name, e.g. "chat", "opinionlab"...
 * xUrl = target page url. If null current page is used.
 * v2 - recoded to use json cookie
*/
(function($){
  $.vgk = {};
  /*
   * Access control setting.
   * level =  page/session.
   *          If page, access for a vendor is checked per page. A vendor popup can be shown once per page.
   *          If session access for a vendor is checked once per session. A vendor popup can be shown once per session.
   * mode = auto/custom
   *          If auto, "isVendorAllowed" will perform vendor access check and if vendor is allowed to continue will mark vendor access was used on this page
   *          regardless if vendor actually displayed anything.
   *          If custom, "isVendorAllowed" will perform vendor access check and if vendor is allowed to continue will NOT mark vendor access was used on this page.
   *          Vendor must invoke "vendorAccessed" function is vendor content is shown to mark vendor access to this page as used.
   * maxshow = max number of unique popups in a session
   */
  $.vgk.control = {
    level : 'session',
    mode : 'custom',
    maxshow : '2',
    delay : 10
  };


  /*
   * Used to store parameters from vendorAccess call until timeout trigger has been met
   */

  $.vgk.params = {
    vendorcb : null,
    current : '',
    pending : '',
    entry: null,
    xVendor: null,
    xUrl: null,
    xMessage: null,
    vendormax: {"oracle":999},
    exceptions: {"entrypage":{"oracle":"true"}}
  };

  $.vgk.check = {
    cn : function() {
      return 'vgk2'+$("meta[name='Site']").attr("content");
    },
    rc : function() {
      var xCookie=$.vgk.check.cn()+'=';
      for(var a=document.cookie.split(/;\s*/),i=a.length-1;i>=0;i--)
      {
        if(!a[i].indexOf(xCookie))
          return a[i].replace(xCookie,'');
      }
      return '';
    },
    collapsec : function(xJson) {
		  //converts json object to String (serialize)
		  return JSON.stringify(xJson);
    },
    expandc : function() {
	    //converts json string to object
      var xCookie = $.vgk.check.rc();
      return (xCookie != null && xCookie != "")?$.parseJSON(xCookie):{};
    },
    sjc : function(xJson) {
   		//sets json as whole cookie value
      var xCollapsed = $.vgk.check.collapsec(xJson);
      document.cookie=$.vgk.check.cn()+'='+xCollapsed+'; path=/';
    },
    sc : function(xValue, xVendor) {
		//sets cookie
      var xJson = $.vgk.check.expandc();
      var xVendorData = xJson[xValue];
      if(xVendorData == null)
      {
        xVendorData = {"v":xVendor};
        xJson[xValue] = xVendorData;
      }
      var xCollapsed = $.vgk.check.collapsec(xJson);
      document.cookie=$.vgk.check.cn()+'='+xCollapsed+'; path=/';

    },
    getUrlChecksum : function(xUrl) {
      var xHash = 5381;
      for (i = 0; i < xUrl.length; i++)
      {
        xChar = xUrl.charCodeAt(i);
        xHash = ((xHash << 5) + xHash) + xChar; /* hash * 33 + c */
      }
      xHash = Math.abs(xHash);
      return new String(xHash);
    },
    preventVendors : function(exceptThis) {
      var sfCss = "";
      if(exceptThis != "oo")
      {
        sfCss += "#oo_container { display:none !important; }";  //opinionlab
        sfCss += "#oo_float { display:none !important; }";  //opinionlab

  	    if(typeof(OOo) != "undefined" && typeof(OOo.Invitation) != "undefined")
	    {
          new OOo.Invitation({
                            pathToAssets: '//www.lenovo.com/onlineopinionV5/',
                            responseRate: 0,
                            repromptTime: 7776000});
	    }
      }
      if(exceptThis != "uz")
      {
        sfCss += "#uz_popup_container { display:none; }";  //userzoom
  	    if(typeof(uz_til) != "undefined")
	    {
		  uz_til.resolutionRestrictionPassed = function() {
		    return false;
	      }
		  uz_til.postMessagePassed = function() {
		    return false;
	      }
	    }
       if(exceptThis != "oracle")
       {
         $("#oracleChat").hide();
       }
    }
      if(sfCss != "")
      {
        var head = document.head || document.getElementsByTagName('head')[0];
        style = document.createElement("style");
        style.type = "text/css";
        if (style.styleSheet)
        {
          style.styleSheet.cssText = sfCss;
        }
        else
        {
          style.appendChild(document.createTextNode(sfCss));
        }
        head.appendChild(style);

    }	},
    showOnPage : function() {
	   //never show on CD..
      if(window.location.search.indexOf("gatekeeper=no") > 0)
      {
        //set to localstorage if not there yet
        if(window.sessionStorage && window.sessionStorage.setItem)
        {
          window.sessionStorage.setItem("gatekeeper", "no")
        }
      }

  	  if(window.location.hostname.indexOf("leni2.com") > 0)
  	  {
        //if this session does not want to use gatekeeper, ignore this check
        if(window.sessionStorage && window.sessionStorage.getItem)
        {
          if(window.sessionStorage.getItem("gatekeeper") == "no")
          {
            //no gatekeeper wanted
            return true;
          }
          else
          {
            return false;
          }
        }
        else
        {
  	      return false;
        }
  	  }
      if(window.location.pathname.indexOf("/us/en/landingpage/nfl") >= 0) {
        return false;
      }
      if(window.location.pathname.indexOf("checkout.workflow") >= 0)
      {
        return false;
      }
      if(window.location.pathname.indexOf("account.workflow") >= 0)
      {
        return false;
      }
      if(window.location.pathname.indexOf("wishlist.workflow") >= 0)
      {
        return false;
      }
      if(window.location.pathname.indexOf("www.lenovo.com") >= 0)
      {
        return false;
      }
      if(window.location.pathname.indexOf("/us/en/landingpage/promotions/weekly-sale/lenovo-laptops/?smartserve_preview=1&etcForceCreative=177798") >= 0)
      {
        return false;
      }
      if(window.location.pathname.indexOf("/us/en/redux/laptops/lenovo/yoga-laptop-series/yoga-3-pro-laptop/?smartserve_preview=1&etcForceCreative=177798") >= 0)
      {
        return false;
      }
      if(window.location.pathname.indexOf("/us/en/landingpage/promotions/weekly-sale/desktops/?smartserve_preview=1&etcForceCreative=177798") >= 0)
      {
        return false;
      }
      if(window.location.pathname.indexOf("/us/en/laptops/thinkpad/x-series/x1-carbon/?smartserve_preview=1&etcForceCreative=177798") >= 0)
      {
        return false;
      }
      if(window.location.pathname.indexOf("/us/en/redux/laptops/thinkpad/t-series/t450s/?smartserve_preview=1&etcForceCreative=177798") >= 0)
      {
        return false;
      }
      if(window.location.pathname.indexOf("/us/en/landingpage/promotions/weekly-sale/tablets/?smartserve_preview=1&etcForceCreative=177798") >= 0)
      {
        return false;
      }
      if(window.location.pathname.indexOf("/canada-pricing-statement") >= 0)
      {
        $.vgk.check.preventVendors("");
        return false;
      }

      return true;
    },
    isEntryPage : function(xUrl, xVendor) {

      if(xVendor != null)
      {
        if($.vgk.params.exceptions.entrypage[xVendor] == "true")
        {
          console.info("xVendor[" + xVendor + "] entry page rule ignored");
          return false;
        }
      }

      //get entry page
      var xCheck = $.vgk.check.getUrlChecksum("session-entry-point");
      var xJson = $.vgk.check.expandc();

      if(xJson['e'] == null)
      {
        //no entry point stored yet - so this must be the entry point
        xJson['e'] = xUrl;
        $.vgk.check.sjc(xJson);
        $.vgk.params.entry = xUrl;
        return true;
      }
      else
      {
        //we are still on same page (this variable is not set second time)
        if($.vgk.params.entry != null)
        {
          return true;
        }

        //can return to entry url afterwards and popup can show
        if(xJson['e'] == xUrl)
        {
          return true;
        }
      }
      return false;
    },
    grabVendorCodes : function()
    {
/*
      //old chat
      if(typeof(ii_display) == "function")
      {
        var o_ii_display = ii_display;
        ii_display = function() {
          if($.vgk.check.isVendorAllowed("iichat"))
          {
        	  alert("old chat")
        	$.vgk.check.markVendor("iichat");
            o_ii_display();
          }
        }
      }

*/
    },
    setEntryPage : function()
    {
      //if we don't have an entry point, initialize it
      var xCheck = $.vgk.check.getUrlChecksum("session-entry-point");
      var xCookieValues = $.vgk.check.expandc()[xCheck];

      if(xCookieValues == null)
      {
        var xEntryUrl = "";
        xEntryUrl = window.location.pathname;
        if(xEntryUrl.indexOf(":") > 0)
        {
          xEntryUrl = xEntryUrl.substring(0, xEntryUrl.indexOf(":"));
        }
        var xEntryCheck = $.vgk.check.getUrlChecksum(xEntryUrl);
        $.vgk.check.isEntryPage(xEntryCheck);

        //on entry page remove the vendor popup elements so they can't trigger
        $("body > div.oo_feedback_float").remove();
        $("#nm_popin_screen1").remove();
      }
    },
    isVendorAllowed: function (xVendor, xCB) {
        var isMobile = (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) return true; else return false; })(navigator.userAgent || navigator.vendor || window.opera);

        if (isMobile) {
            if (window.console && window.console.log) {
                console.info("xVendor[mobile] - is accessing from mobile device.");
            }

            return false;
        }
        /*
      if(xVendor == "oracle") {
        if(window.ipenabled === "true") {
          if(window.console && window.console.log ) {
            console.info("xVendor[" + xVendor +"] - is accessing from US or CA.");
          }
        } else {
          if(window.console && window.console.log ) {
            console.info("xVendor[" + xVendor +"] - is accessing from other country.");
          }

          return false;
        }
      }
      */
      if($.vgk.control.mode == 'custom' && $.vgk.params.pending != '')
      {
        //no other request allowed while 'custom' mode is active and vendor has not called 'vendorAccessed' function
        if(window.console && window.console.log )
        {
          console.info("xVendor[" + xVendor + "] - denied, pending vendor: " + $.vgk.params.pending);
        }
        return false;
      }

      var xJson = $.vgk.check.expandc();
      var xUrl = null;

      //check if the control is session level or page level
      if($.vgk.control.level == 'session')
      {
        xUrl = 'session-level-control-fixed-url';

        //check if session level max popup count has been reached
        var xCheck = $.vgk.check.getUrlChecksum("session-level-control-max-session-count");
        var xCookieValues = xJson[xCheck];
        var xMax = ($.vgk.params.vendormax[xVendor])?$.vgk.params.vendormax[xVendor]:$.vgk.control.maxshow;
        if( xJson["max"] == xMax)
        {
          if(window.console && window.console.log )
          {
            console.info("xVendor[" + xVendor + "] - max session count reached");
          }
          return false;
        }
        else if($.vgk.control.mode == 'auto')
        {
          if(xJson["max"] == null)
          {
            xJson["max"] = "0";
          }
          xJson["max"] = new String(parseInt(xJson["max"])+1);
          $.vgk.check.sjc(xJson);
        }
      }

      //if url is not given, use current page url up to colon. If no colon use url as is.
      var xEntryUrl = "";
      xEntryUrl = window.location.pathname;
      if(xEntryUrl.indexOf(":") > 0)
      {
        xEntryUrl = xEntryUrl.substring(0, xEntryUrl.indexOf(":"));
      }

      if(xUrl == null || xUrl == "")
      {
        xUrl = xEntryUrl;
      }

      var xCheck = $.vgk.check.getUrlChecksum(xUrl);
      var xEntryCheck = $.vgk.check.getUrlChecksum(xEntryUrl);

      var xCookieValues = xJson[xCheck];

      if(xCookieValues == null)
      {
        xCookieValues = {};
        xJson[xCheck] = xCookieValues;
      }

      if(($.vgk.check.showOnPage() == false || $.vgk.check.isEntryPage(xEntryCheck, xVendor)) && ($.vgk.params.current == "" && $.vgk.params.pending == ""))
      {
        if(window.console && window.console.log)
        {
          console.info("xVendor[" + xVendor + "] - entry blocked. Show on page:" + $.vgk.check.showOnPage() + ", entry page: " + $.vgk.check.isEntryPage(xEntryCheck, xVendor) + ", current: " + $.vgk.params.current + ", pending: " + $.vgk.params.pending);
        }
        return false;
      }
      var xMax = ($.vgk.params.vendormax[xVendor])?$.vgk.params.vendormax[xVendor]:$.vgk.control.maxshow;
      if(xCookieValues[xVendor] != null && xCookieValues[xVendor]["max"] == xMax)
      {
        if(window.console && window.console.log)
        {
          console.info("xVendor[" + xVendor + "] - entry blocked. Max page instance shows.");
        }
        return false;
	  }

      if($.vgk.params.current != '')
      {
        // a vendor popup has been displayed on this page
        return false;
      }
      else if(xCookieValues[xVendor] == null)
      {
        $.vgk.params.current = xVendor;
        if($.vgk.control.mode == 'custom')
        {
          $.vgk.params.pending = xVendor;
        }
        $.vgk.params.vendorcb = xCB;
        return true;
      }
      else
      {
        if($.vgk.control.mode == 'auto')
        {
          $.vgk.params.current = xVendor;
          //mark max count
          if(xCookieValues[xVendor] == null)
          {
            xCookieValues[xVendor] = {"max":"0"};
          }
          xCookieValues[xVendor]["max"] = new String(parseInt(xCookieValues[xVendor]["max"])+1);
          $.vgk.check.sjc(xJson);
        }
        if($.vgk.control.mode == 'custom')
        {
          $.vgk.params.pending = xVendor;
        }
        $.vgk.params.vendorcb = xCB;
        return true;
      }

    },
    vendorShown : function(xVendor, xMessage) {
      var xUrl = null;
      if($.vgk.control.level == 'session')
      {
        xUrl = 'session-level-control-fixed-url';
      }
      else
      {
        //if url is not given, use current page url up to colon. If no colon use url as is.
        var xEntryUrl = "";
        xEntryUrl = window.location.pathname;
        if(xEntryUrl.indexOf(":") > 0)
        {
          xEntryUrl = xEntryUrl.substring(0, xEntryUrl.indexOf(":"));
        }

        if(xUrl == null || xUrl == "")
        {
          xUrl = xEntryUrl;
        }
      }
      $.vgk.check.vendorAccessed(true, xVendor, xUrl, xMessage);
    },
    vendorAccessed : function(xVendorResult, xVendor, xUrl, xMessage) {
      /*
       * xVendorResult = boolean flag indicating whether vendor displayed data (true) or not (false)
       * in case of false vendor access to this page is not marked, and vendor can try again on next page load.
       */

      if(window.console && window.console.log)
      {
        console.info("xVendor[" + xVendor + "],xVendorResult["+xVendorResult+"],xMessage["+(xMessage == null?"":xMessage)+"]");
      }

      if(xVendorResult == true)
      {
        $.vgk.params.xVendor = xVendor;
        $.vgk.params.xUrl = xUrl;
        $.vgk.params.xMessage = xMessage;
        $.vgk.check.markVendor($.vgk.params.xVendor, $.vgk.params.xUrl, $.vgk.params.xMessage);

        setTimeout("$.vgk.check.vendorCallback()", $.vgk.control.delay * 1000);

        //prevent others vendors from showing
        $.vgk.check.preventVendors(xVendor);
      }
      else
      {
        //release pending lock
        $.vgk.params.pending = '';
      }
    },
    vendorCallback : function() {
      if($.vgk.params.vendorcb != null)
      {
        $.vgk.params.vendorcb();
      }
    },
    markVendor : function(xVendor, xUrl, xMessage) {
      var xJson = $.vgk.check.expandc();

      //check if the control is session level or page level
      if($.vgk.control.level == 'session')
      {
        xUrl = 'session-level-control-fixed-url';

        //add to max session count
        var xCheck = $.vgk.check.getUrlChecksum("session-level-control-max-session-count");
        var xCookieValues = xJson[xCheck];

        try
        {
          if(xJson["max"] == null)
          {
            xJson["max"] = "0";
          }
          xJson["max"] = new String(parseInt(xJson["max"])+1);
          $.vgk.check.sjc(xJson);
        }
        catch(err)
        {
          if(window.console && window.console.log)
          {
            console.info("max-session-count failed:" + err);
          }
        }
      }

      //if url is not given, use current page url up to semicolon. If no semicolon use url as is.
      if(xUrl == null || xUrl == "")
      {
        xUrl = window.location.pathname;
        if(xUrl.indexOf(":") > 0)
        {
          xUrl = xUrl.substring(0, xUrl.indexOf(":"));
        }
      }
      var xCheck = $.vgk.check.getUrlChecksum(xUrl);
      var xCookieValues = xJson[xCheck];

      if(xCookieValues == null || xCookieValues[xVendor] == null)
      {
        $.vgk.params.current = xVendor;
        if(xCookieValues == null)
        {
          xCookieValues = {};
          xJson[xCheck] = xCookieValues;
        }
        xCookieValues[xVendor] = {"max":"1"};
        $.vgk.check.sjc(xJson);
      }
      else
      {
        if(xCookieValues[xVendor] != null)
        {
          $.vgk.params.current = xVendor;
          xCookieValues[xVendor]["max"] = new String(parseInt(xCookieValues[xVendor]["max"])+1);
        }
      }

      $.vgk.check.sjc(xJson);

      //release pending lock
      $.vgk.params.pending = '';

    }
  };
})(jQuery);
$.vgk.check.setEntryPage();

/* handle feedback overlay pageflow */
function keepOffContent(jqExp)
{
	try
	{
	  var obj = $(jqExp);
	  if(obj.length > 0)
      {
   	    var objLeft = obj.offset().left;
   	    if(($("#bodywrapinner").hasClass( "container_20" )) == false)
   	    {
   	    	objLeft -= parseInt($("#bodywrapinner").css("margin-left").replace(/px/g, '')) + 10;
   	    }
		var boundary = $("#bodywrapinner").offset().left + $("#bodywrapinner").outerWidth();
		if(objLeft < boundary)
	    {
		  obj.css("visibility", "hidden");
	    }
		else
		{
		  obj.css("visibility", "visible");
		}

	  }
	}
	catch(errr)
	{
	}
}
(function(w) {
  $( w ).resize(function() {
	  keepOffContent("body > div.oo_feedback_float");

	});

	//if we are on popup block all vendors
	try
	{
		var woop = window.opener;
		if(woop != null)
		{
			$.vgk.check.preventVendors();
		}
	}
	catch(werr)
	{}
})(window);

//testing
function testpattern()
{
  if($.vgk.check.isVendorAllowed('oo'))
  {
    $.vgk.check.vendorShown('oo', 'functional test')
  }
}
//setTimeout("testpattern()", 3000);