/* BEGIN -- BING COOKIE SCRIPT LAP 022610 */
//<script type="text/javascript" src="/SEUILibrary/js/common/CookieHandler.js"></script>
//<script type="text/javascript">
Date.prototype.addHours = function(h)
{
this.setTime(this.getTime() + (h*60*60*1000));
return this;
}
function gp( name )
{
 name = name.replace(/[[]/,"\\[").replace(/[]]/,"\\]");
 var regexS = "[\\?&]"+name+"=([^&#]*)";
 var regex = new RegExp( regexS );
 var results = regex.exec( window.location.href );
 if( results == null )
   return "";
 else
   return results[1];
}
function SetCookie (name, value, expires, path)
{
 document.cookie = name + "=" + escape (value) +
 ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
 ((path == null) ? "" : ("; path=" + path));
}

if(gp("jftid") != "") {SetCookie("BingCookie", gp("jftid"), new Date().addHours(24));}
//</script>
/* END -- BING COOKIE SCRIPT LAP 022610 */

/* BEGIN -- jumpToAnchor() JRL 062510 */
function jumpToAnchor(anc){window.location=String(window.location).replace(/\#.*$/,"")+anc;return false;}
/* END -- jumpToAnchor() JRL 062510 */