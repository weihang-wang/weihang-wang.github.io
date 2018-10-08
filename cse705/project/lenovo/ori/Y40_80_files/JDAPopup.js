/* JDA floating popup function as external JS */

var jdaHTML = '<div id="wishlistOverlay"></div>';

/*
var jdaHTML = '<div id="floatingPopupDimmerLayer" ></div><div id="floatingPopupWrapper"><div id="floatingPopuplayer" >' +
              '<table id="floatingPopupMain" width="460" cellpadding="0" cellspacing="0" border="0"><tr><td align="left" colspan="2" width="15">' +
              '<img id="floatingPopup_upperleft_img" width="15" height="15" src="/SEUILibrary/hightech-portal/images/icons/uppercorner-left-box-15x15.gif" alt=""/></td>' +
              '<td class="floatingPopupUpperEdge"></td><td align="right" colspan="2" width="15">' +
              '<img id="floatingPopup_upperright_img" width="15" height="15" src="/SEUILibrary/hightech-portal/images/icons/uppercorner-right-box-15x15.gif" alt=""/></td></tr>' +
              '<tr><td align="left" width="4" class="floatingPopupLeftEdge"></td><td width="11" class="floatingPopupBoxGradient"></td>' +
              '<td height="35" valign="top" width="100%" class="floatingPopupBoxGradient"><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td>' +
              '<img src="/SEUILibrary/lenovo-portal/images/lenovo-logo-150x25.gif" alt=""/></td><td align="right" valign="top"><a href="javascript:closeFloatingPopup(floatingCancelResponse)">' +
              '<img valign="top" id="floatingPopupCancelUpperRight" style="display:none" width="21" height="21" border="0" src="/SEUILibrary/lenovo-portal/images/icons/cancel_rd.gif" alt=""/></a></td>' +
              '</tr></table></td><td width="9" class="floatingPopupBoxGradient"></td><td align="right" width="6" class="floatingPopupRightEdge"></td></tr><tr>' +
              '<td align="left" width="4" class="floatingPopupLeftEdge"></td><td height="20" width="11" class="bgBlueGradient"></td><td height="20" valign="top" width="100%" class="bgBlueGradient"></td>' +
              '<td height="20" width="9" class="bgBlueGradient"></td><td align="right" width="6" class="floatingPopupRightEdge"></td></tr><tr><td align="left" width="4" class="floatingPopupLeftEdge"></td>' +
              '<td width="11" class="floatingPopupBackground"></td><td valign="top" width="100%" class="floatingPopupBackground">' +
              '<table id="floatingPopupContentTable" cellpadding="0" cellspacing="0" border="0"><tr><td height="10" width="46"></td><td></td><td width="46"></td></tr><tr><td width="46"></td>' +
              '<td width="100%" id="floatingPopupContent"></td><td width="46"></td></tr></table></td><td width="9" class="floatingPopupBackground"></td>' +
              '<td align="right" width="6" class="floatingPopupRightEdge"></td></tr><tr><td align="left" width="4" class="floatingPopupLeftEdge"></td>' +
              '<td width="11" class="floatingPopupBackground"></td><td valign="top" align="center" width="100%" class="floatingPopupBackground">' +
              '<table id="floatingPopupButtonTable" cellpadding="0" cellspacing="0" border="0"><tr><td width="100"></td><td>' +
              '<table id="floatingPopupPositiveButton" style="display:none" cellpadding="0" cellspacing="0" border="0"><tr height="40">' +
              '<td><a id="floatingPopupPositiveButtonLink1" href="javascript:closeFloatingPopup(floatingPositiveResponse)">' +
              '<img border="0" src="/SEUILibrary/hightech-portal/images/icons/arrow_rd_blue.gif" alt=""/></a></td>' +
              '<td><a href="javascript:closeFloatingPopup(floatingPositiveResponse)" class="fbox" id="floatingPopupPositiveLabel"></a></td><td width="100"></td></tr></table></td><td>' +
              '<table id="floatingPopupNegativeButton" style="display:none" cellpadding="0" cellspacing="0" border="0"><tr height="40">' +
              '<td><a id="floatingPopupNegativeButtonLink1" href="javascript:closeFloatingPopup(floatingNegativeResponse)">' +
              '<img border="0" src="/SEUILibrary/lenovo-portal/images/icons/arrow_rd.gif" alt=""/></a></td><td>' +
              '<a href="javascript:closeFloatingPopup(floatingNegativeResponse)" class="fbox" id="floatingPopupNegativeLabel"></a></td><td width="100"></td></tr></table></td><td>' +
              '<table id="floatingPopupCancelButton" style="display:none" cellpadding="0" cellspacing="0" border="0"><tr height="40"><td><a href="javascript:closeFloatingPopup(floatingCancelResponse)">' +
              '<img border="0" src="/SEUILibrary/lenovo-portal/images/icons/cancel_rd.gif" alt=""/></a></td><td>' +
              '<a href="javascript:closeFloatingPopup(floatingCancelResponse)" class="fbox" id="floatingPopupCancelLabel"></a></td><td width="100"></td></tr></table></td><td></td></tr></table></td>' +
              '<td width="9" class="floatingPopupBackground"></td><td align="right" width="6" class="floatingPopupRightEdge"></td></tr><tr><td align="left" colspan="2" width="15">' +
              '<img id="floatingPopup_lowerleft_img" width="15" height="15" src="/SEUILibrary/hightech-portal/images/icons/lowercorner-left-box-15x15.gif" alt=""/></td>' +
              '<td class="floatingPopupLowerEdge"></td><td align="right" colspan="2" width="15">' +
              '<img id="floatingPopup_lowerright_img" width="15" height="15" src="/SEUILibrary/hightech-portal/images/icons/lowercorner-right-15x15.gif" alt=""/></td></tr></table></div></div>';
*/

// Enabling this pushes debug log to browser console
var FLOATING_POPUP_DEBUG = false;
var FLOATING_POPUP_DEBUG_PREFIX = 'floating_popup';

var FLOATING_POPUP_DEFAULT_WIDTH = 460;
var FLOATING_POPUP_DEFAULT_HEIGHT = 300;

var floatingPopupID = "";
var styleDimensionSuffix = "px";

var floatingPopupHorizontalScroll = false;
var floatingPopupVerticalScroll = false;

// Start floatingPopup with this function.
function openFloatingPopup(popupContentHtml, popupId)
{
  floatingPopupShowDimmer(popupContentHtml);

/*
	logFloatingPopup("open");
  floatingPopupID = popupId;
  floatingPopupDoBrowserCustomization();
  if(popupContentHtml!=null)
  {
//    document.getElementById("floatingPopupContent").innerHTML = popupContentHtml;
     $('#floatingPopupContent').html( popupContentHtml ) ;
  }
  floatingPopupRunning = true;
  floatingPopupShowDimmer();
  showFloatingPopup();
  initializeFloatingPopup();
  // Set initial position
  checkWindowSize();
  // Bind position update to resize/scroll events
  $(window).bind('resize.floatingPopup', checkWindowSize);
*/
}
var floatingPositiveResponse = "1";
var floatingNegativeResponse = "-1";
var floatingCancelResponse = "0";
var floatingPopupRunning = false;


function disableFloatingPopupLinks()
{
/*
  document.getElementById("floatingPopupNegativeButtonLink1").style.cursor = 'wait';
  document.getElementById("floatingPopupNegativeLabel").style.cursor = 'wait';
  document.getElementById("floatingPopupNegativeButtonLink1").href = '#';
  document.getElementById("floatingPopupNegativeLabel").href = '#';

  document.getElementById("floatingPopupPositiveButtonLink1").style.cursor = 'wait';
  document.getElementById("floatingPopupPositiveLabel").style.cursor = 'wait';
  document.getElementById("floatingPopupPositiveButtonLink1").href = '#';
  document.getElementById("floatingPopupPositiveLabel").href = '#';
*/
}


function enableFloatingPopupLinks()
{
/*
  document.getElementById("floatingPopupNegativeButtonLink1").href = 'javascript:closeFloatingPopup(floatingNegativeResponse)';
  document.getElementById("floatingPopupNegativeLabel").href = 'javascript:closeFloatingPopup(floatingNegativeResponse)';
  document.getElementById("floatingPopupNegativeButtonLink1").style.cursor = 'pointer';
  document.getElementById("floatingPopupNegativeLabel").style.cursor = 'pointer';

  document.getElementById("floatingPopupPositiveButtonLink1").href = 'javascript:closeFloatingPopup(floatingPositiveResponse)';
  document.getElementById("floatingPopupPositiveLabel").href = 'javascript:closeFloatingPopup(floatingPositiveResponse)';
  document.getElementById("floatingPopupPositiveButtonLink1").style.cursor = 'pointer';
  document.getElementById("floatingPopupPositiveLabel").style.cursor = 'pointer';
*/
}

// Close with this function.
function closeFloatingPopup(responseCode)
{
/*
  floatingPopupRunning = false;
  $('#floatingPopupWrapper').hide();
  $('#floatingPopupDimmerLayer').hide();

  // Unbind event listeners
  $(window).unbind('resize.floatingPopup')
           .unbind('scroll.floatingPopupWidth')
           .unbind('scroll.floatingPopupHeight');

  // callback method
  if(window.floatingPopupResponse)
  {
    floatingPopupResponse(responseCode, floatingPopupID);
  }
*/
}

// predefined buttons
function floatingPopupShowPositiveButton(buttonText)
{
/*
  document.getElementById("floatingPopupPositiveLabel").innerHTML = "<span class=\""+"boldLabel"+"\">"+buttonText+"</span>";
  document.getElementById("floatingPopupPositiveButton").style.display = "inline";
*/
}
function floatingPopupShowNegativeButton(buttonText)
{
/*
  document.getElementById("floatingPopupNegativeLabel").innerHTML = "<span class=\""+"boldLabel"+"\">"+buttonText+"</span>";
  document.getElementById("floatingPopupNegativeButton").style.display = "inline";
*/
}
function floatingPopupShowCancelButton(buttonText)
{
/*
  if(buttonText==null)
    buttonText = 'Cancel';
  document.getElementById("floatingPopupCancelLabel").innerHTML = "<span class=\""+"boldLabel"+"\">"+buttonText+"</span>";
  document.getElementById("floatingPopupCancelButton").style.display = "inline";
  floatingPopupShowUpperRightCloseButton();
*/
}
function floatingPopupShowUpperRightCloseButton(visibility)
{
/*
  if(visibility!=null && (visibility=='false' || visibility==false))
  {
    document.getElementById("floatingPopupCancelUpperRight").style.display = "none";
  }
  else
  {
    document.getElementById("floatingPopupCancelUpperRight").style.display = "inline";
  }
*/
}
function floatingPopupShowSubmitButton()
{
//  floatingPopupShowPositiveButton('Submit');
}
function floatingPopupShowContinueButton()
{
//  floatingPopupShowPositiveButton('Continue');
}
function floatingPopupShowOKButton()
{
//  floatingPopupShowPositiveButton('OK');
}
function floatingPopupShowYesButton()
{
//  floatingPopupShowPositiveButton('Yes');
}
function floatingPopupShowNoButton()
{
//  floatingPopupShowNegativeButton('No');
}
function floatingPopupShowCloseButton()
{
//  floatingPopupShowCancelButton('Close');
}
//function floatingPopupShowCancelButton() already above

function floatingPopupResetButtons()
{
/*
  document.getElementById("floatingPopupPositiveButton").style.display = "none";
  document.getElementById("floatingPopupNegativeButton").style.display = "none";
  document.getElementById("floatingPopupCancelButton").style.display = "none";
  document.getElementById("floatingPopupCancelUpperRight").style.display = "none";
*/
}

// Set initial position and dimensions
function initializeFloatingPopup()
{
/*
	var floatingPopup = document.getElementById('floatingPopuplayer'),
	    floatingPopupWidth = FLOATING_POPUP_DEFAULT_WIDTH,
	    floatingPopupHeight = FLOATING_POPUP_DEFAULT_HEIGHT;
	if(document.getElementById("floatingPopupMain").offsetWidth)
    floatingPopupWidth = document.getElementById("floatingPopupMain").offsetWidth;
  if(document.getElementById("floatingPopupMain").offsetHeight)
    floatingPopupHeight = document.getElementById("floatingPopupMain").offsetHeight;

	floatingPopup.style.width = floatingPopupWidth + 'px';
	floatingPopup.style.height  = floatingPopupHeight + 'px';
	setFloatingPopupVerticalPosition();
	setFloatingPopupHorizontalPosition();
*/
}

function setFloatingPopupVerticalPosition()
{
/*
  var floatingPopupHeight = FLOATING_POPUP_DEFAULT_HEIGHT;
  if(document.getElementById("floatingPopupMain").offsetHeight)
    floatingPopupHeight = document.getElementById("floatingPopupMain").offsetHeight;
  var topMargin = -(floatingPopupHeight/2);
  $('#floatingPopuplayer').css({
    'top': '50%',
    'margin-top': topMargin + 'px'
  });
*/
}

function setFloatingPopupHorizontalPosition()
{
/*
  var floatingPopupWidth = FLOATING_POPUP_DEFAULT_WIDTH;
  if(document.getElementById("floatingPopupMain").offsetWidth)
    floatingPopupWidth = document.getElementById("floatingPopupMain").offsetWidth;
  var leftMargin = -(floatingPopupWidth/2);
  $('#floatingPopuplayer').css({
    'left': '50%',
    'margin-left': leftMargin + 'px'
  });
*/
}

function checkWindowSize()
{
/*
	logFloatingPopup("resize")
	var popupWidth = $('#floatingPopupMain').width(),
	    popupHeight = $('#floatingPopupMain').height(),
	    windowWidth = $(window).width(),
	    windowHeight = $(window).height();
	if(popupWidth > windowWidth && !floatingPopupHorizontalScroll) {
		$('#floatingPopuplayer').css({
			'margin-left': '0px',
			'left': '0px'
		});
	  $(window).bind('scroll.floatingPopupWidth', fixFloatingPopupHorizontalPosition);
	  // Mark current state
	  floatingPopupHorizontalScroll = true;
	  logFloatingPopup('horizontal scroll on')
	}
	else if(popupWidth < windowWidth && floatingPopupHorizontalScroll) {
    $(window).unbind('scroll.floatingPopupWidth');
    setFloatingPopupHorizontalPosition();
    // Mark current state
    floatingPopupHorizontalScroll = false;
    logFloatingPopup('horizontal scroll off')
	}
  if(popupHeight > windowHeight && !floatingPopupVerticalScroll) {
	  $('#floatingPopuplayer').css({
		  'margin-top': '0px',
		  'top': '0px'
	  });
	  $(window).bind('scroll.floatingPopupHeight', fixFloatingPopupVerticalPosition);
    // Mark current state
    floatingPopupVerticalScroll = true;
    logFloatingPopup('vertical scroll on')
  }
  else if(popupHeight < windowHeight && floatingPopupVerticalScroll) {
	  $(window).unbind('scroll.floatingPopupHeight');
	  setFloatingPopupVerticalPosition();
    // Mark current state
    floatingPopupVerticalScroll = false;
    logFloatingPopup('vertical scroll off');
  }
*/
}

function fixFloatingPopupVerticalPosition()
{
//	document.getElementById('floatingPopuplayer').style.top = -window.scrollTop() + 'px';
}

function fixFloatingPopupHorizontalPosition()
{
//	document.getElementById('floatingPopuplayer').style.left = -window.scrollLeft() + 'px';
}

function showFloatingPopup()
{
	$('#floatingPopupWrapper').show();
  //document.getElementById("floatingPopuplayer").style.display="inline";
}

function floatingPopupShowDimmer(popupContentHtml)
{
  //remove hardcoded extra libraries
  var hackdiv = document.createElement("DIV");
  hackdiv.innerHTML = popupContentHtml;
  $hackdiv = $(hackdiv)
  $hackdiv.find("link").remove();
  $hackdiv.find("script[src*='jquery-1.8.2.min.js']").remove();
  $hackdiv.find("script[src*='seutil.workflow:LoadCombinedResource']").remove();

  popupContentHtml = $hackdiv.html();

  if($("#fancybox-content").html() == "")
  {
    $.fancybox( popupContentHtml,
	{
		"closeClick" : false,
		"onStart" : function()
		{
			$("#fancybox-content").addClass("wishlistOverlay");
			$("#fancybox-close").addClass("wishlistClose");
		},
		"onClosed" : function()
		{
			$("#fancybox-content").removeClass("wishlistOverlay");
			$("#fancybox-close").removeClass("wishlistClose");
		}
	});
    $(document).on({
        ajaxStart: function() {
           $.fancybox.showActivity();
         },
         ajaxStop: function() {
          $.fancybox.hideActivity();
         }
     });
  }
  else
  {
    $("#fancybox-content").html(popupContentHtml);
  }

  $("#fancybox-close").off("click").on("click", function(e) {
    $(document).off("ajaxStart");
    $(document).off("ajaxStop");
    $.fancybox.close();
  });

/*
  $('#floatingPopupDimmerLayer').css({
	  left: '0px',
	  top: '0px',
	  width: '100%',
	  height: '100%',
	  position: 'fixed',
	  display: 'block'
  });
*/
}

function logFloatingPopup(debug_text) {
	if(FLOATING_POPUP_DEBUG)
		console.log(FLOATING_POPUP_DEBUG_PREFIX + ': ' + debug_text);
}

function floatingPopupDoBrowserCustomization()
{
/*
  if(floatingPopupIsChrome())
  {
  }
  else if(floatingPopupIsSafari())
  {
  }
  else if(floatingPopupIsOpera())
  {
  }
*/
}


function floatingPopupIsChrome()
{
//  return navigator.userAgent.indexOf("Chrome")!=-1;
}
function floatingPopupIsSafari()
{
//  return navigator.userAgent.indexOf("Safari")!=-1 && !floatingPopupIsChrome();
}
function floatingPopupIsOpera()
{
//  return navigator.userAgent.indexOf("Opera")!=-1;
}

function getfloatingPopupCollapseIcon()
{
/*
  var floatingPopupCollapseIcon="/SEUILibrary/hightech-portal/images/icons/b_collapse.gif";
  return floatingPopupCollapseIcon;
*/
}

function getfloatingPopupExpandIcon()
{
/*
  var floatingPopupExpandIcon="/SEUILibrary/hightech-portal/images/icons/b_expand.gif";
  return floatingPopupExpandIcon;
*/
}

$(document).ready(function() {
  $(jdaHTML).appendTo($("body"));
});

/* grab JDA style sheet inserts to head - they will break oneweb css */
/*
var o_appendChild = document.getElementsByTagName("HEAD")[0].appendChild;
document.getElementsByTagName("HEAD")[0].appendChild = function() {

  var srcMappings = {"/SEUILibrary/stylesheets/jda-styles.css":"true","/SEUILibrary/stylesheets/jda-ht-styles.css":"true","/SEUILibrary/lenovo-portal/css/main.css":"true","/SEUILibrary/lenovo-portal/css/screen.css":"true","/SEUILibrary/lenovo-portal/css/lenovo_custom.css":"true","/SEUILibrary/lenovo-portal/css/lenovo_custom_pub.css":"true"};

  if(arguments[0] && arguments[0].getAttribute && arguments[0].getAttribute("src") != null && arguments[0].getAttribute("src") != "" && srcMappings[arguments[0].getAttribute("src")] != null)
  {
    console.log("skipped SRC:" + arguments[0].getAttribute("src"))
  }
  else if(arguments[0] && arguments[0].getAttribute && arguments[0].getAttribute("href") != null && arguments[0].getAttribute("href") != "" && srcMappings[arguments[0].getAttribute("href")] != null)
  {
    console.log("skipped HREF:" + arguments[0].getAttribute("href"))
  }
  else
  {
  console.log("applied: " + arguments[0].toString());
    o_appendChild.apply(this, arguments);
  }
                              };
*/
