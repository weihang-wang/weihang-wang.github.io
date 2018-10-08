/*
 * No Console - v1.0 - 8-Dec-2013
 * http://pastebin.com/86yXEc7G
 *
 * Include this in the document <head> for best results. It will create dummy
 * versions of any missing "console" methods of the Window object so uncaught 
 * console commands do not cause script errors.
 */
;(function(window){var method;var noop=function(){};var methods=["_commandLineAPI","assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollasped","groupEnd","info","log","profile","profileEnd","table","timeEnd","timeline","timelineEnd","timeStamp","trace","warn"];var length=methods.length;var console=(window.console=window.console||{});while(length--){method=methods[length];if(!console[method]){console[method]=noop;}}})(window);