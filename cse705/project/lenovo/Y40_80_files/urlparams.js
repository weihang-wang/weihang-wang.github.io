/*
 * URL Params - v1.0 - 8/28/2013
 * http://pastebin.com/yvfeK76y
 *
 * Include this in the document <head> for best results. It will create a global 
 * object "urlParams" that stores all querystring parameters in a URL.
 *
 * Uses/examples:
 * if ("foo" in urlParams) { ... }
 * var foo_value = urlParams["foo"];
 *
 */
var urlParams={};(function(){var e,a=/\+/g,r=/([^&=]+)=?([^&]*)/g,d=function(s){return decodeURIComponent(s.replace(a," "));},q=window.location.search.substring(1);while(e=r.exec(q))
urlParams[d(e[1])]=d(e[2]);})();