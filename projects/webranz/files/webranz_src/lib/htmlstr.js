if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(function(require, exports) {

	function preprocess(html_str) {
		//var str = html_str.replace(/src\s*=\s*"javascript:"\s*\</g, "src=\"javascript:'<");
		var html_str = html_str.replace(/src="javascript:"<html><body style='background:transparent'><\/body><\/html>""/g,
		"src=\"javascript:'<html><body style\='background:transparent'></body></html>'\"");
		html_str = html_str.replace(/&#61;/g, "=");
		html_str = html_str.replace(/&amp;/g, "&");
		html_str = html_str.replace(/&lt;/g, "<");
		html_str = html_str.replace(/&gt;/g, ">");
		html_str = html_str.replace(/&quot;/g, "'");
		return html_str;
	}

	function postprocess(html_str) {
		html_str = html_str.replace(/&#61;/g, "=");
		//html_str = html_str.replace(/&amp;/g, "&");
		html_str = html_str.replace(/&lt;/g, "<");
		html_str = html_str.replace(/&gt;/g, ">");
		//html_str = html_str.replace(/&quot;/g, "'");
		return html_str;
	}
    
    exports.preprocess = preprocess;
    exports.postprocess = postprocess;    
});
