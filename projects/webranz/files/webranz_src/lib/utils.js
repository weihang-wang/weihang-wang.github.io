if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(function(require, exports) {

	function getBgUrl(el) {
		if (el.style) {
			var bg = el.style.backgroundImage;
 			return bg.replace(/url\(['\"]?(.*?)['\"]?\)/i, '$1');
			/*			
			var beginSlice = el.attribs.style.indexOf("background-image:url('") + 22,
			endSlice = el.attribs.style.indexOf("'", beginSlice);
			return el.attribs.style.slice(beginSlice, endSlice);		*/
		}
	}
    
	function setBgUrl(el, url) {
    	el.style.backgroundImage = el.style.backgroundImage.replace(getBgUrl(el), url);  
	}
    
    exports.getBgUrl = getBgUrl;
    exports.setBgUrl = setBgUrl;    
});
