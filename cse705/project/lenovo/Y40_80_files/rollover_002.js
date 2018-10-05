/*

buySAFE Rollover Loader
Copyright 2015, buySAFE, Inc.
$Revision: 1.242 $
*/
var bs_R=window.bs_R||{},buySAFE=window.buySAFE||{},_GUARANTEE=window._GUARANTEE||buySAFE;
(function(a,b){if(!a.sRoot){a.sRootHost="https://seal.buysafe.com";a.sRoot=a.sRootHost+"/private/rollover/";for(var f=document.getElementsByTagName("script"),e=0;e<f.length;e++){var d=f[e].src.substr(0,100);if(d=d.match(/((.*)\/private\/.*\/)rollover(?:\.unpacked)?\.js/i)||d.match(/()(.*)\/Web\/Seal\/gjs.aspx/i)){a.sRootHost=d[2];a.sRoot=d[1]||a.sRootHost+"/private/rollover/";break}}}a.aExecQ=a.aExecQ||[];a.onEvent=function(a,b,c){if(a){var k=a.addEventListener;a=a.attachEvent;k?k(b,c,!1):a&&a("on"+
b,c)}};a.onLoad=function(b,d){if(a.fOnLoad||d)b&&b();else a.onEvent(window,"load",b)};a.AddJS=function(a,b){var c=document.createElement("script");c.type="text/javascript";c.async=!0;c.src=a;window.setTimeout(function(){var a=document.getElementsByTagName("script")[0];a&&a.parentNode&&a.parentNode.insertBefore(c,a)},b||0)};b.Loaded||(b.Hash||(b.Hash=""),b.Guarantee||(b.Guarantee={order:"",total:"",email:""}),b.Seal||(b.Seal={bgcolor:"#FFFFFF"}),b.Button||(b.Button={bgcolor:"#FFFFFF"}),b.Loaded=1)})(bs_R,
buySAFE);var buySAFESealConfig=buySAFE.Seal,buySAFEButtonConfig=buySAFE.Button;
(function(a){function b(b,c){c[b]||(c[b]=function(){a.aExecQ.push([b,c,arguments])})}a.onLoad(function(){a.fOnLoad=1});for(var f=[["+AffiliateSeal"],["+Button"],["+ButtonAjax"],["+ButtonAjaxInvisible"],["+ButtonInvisible"],["+Guarantee"],["+Kickers"],["+Seal"],["+TrustRatingSeal"],["+TrustSeal"],["buysafeGetAffiliateURL"],["Display",1]],e=[{},{pre:"WriteBuySafe"},{pre:"Write",obj:"buySAFE"}],d=0;d<f.length;d++)for(var g=1;g<e.length;g++){var h=e[g],c=f[d];c[g]||(c=c[0].replace(/^\+/,h.pre),b(c,h.obj&&
window[h.obj]||window))}a.AddJS(a.sRoot+"rollover.core.js",100)})(bs_R);
