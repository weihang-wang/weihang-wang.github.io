
var url_resources = require("../src/resources");

var webranz_server = url_resources.getServer();
var webranz_absolute_path = url_resources.getAbsolutePath();
var webranz_randomize_path = url_resources.getRandomizePath(); 
var webranz_bypassUrl = url_resources.getBypassUrl();
var webranz_redirectUrl = url_resources.getRedirectUrl();

//=======================================================================================================================
if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}


var curRandomNumber = 1;
var getRandomNumber = function()
{
	//return Math.floor((Math.random() * 50000) + 1);
	//console.log("random number: ", curRandomNumber);
    return curRandomNumber++;
}


var base64encodeURL = function (url) {
    var buf = new Buffer(url);
    var ret = buf.toString('base64');
    buf = null;
	return ret;
}
var encodeURL_debug = function(original_src, debug) {
    return webranz_bypassUrl+base64encodeURL(original_src) + "&debug=" + debug;
}
var encodeURL = function(original_src) {
    return webranz_bypassUrl+base64encodeURL(original_src);
}
var encodeLinkURL = function(original_src) {
    return webranz_redirectUrl+base64encodeURL(original_src);
}


define(function(require, exports) {

	var htmlparser2 = require("htmlparser2"),
	handler = new htmlparser2.DomHandler(),
	HTMLparser = new htmlparser2.Parser(handler);
	var html = require('htmlparser-to-html');
	var css = require("css"); 

	var fs = require("fs"),
	hashmap = require("hashmap");
	
	var htmlstr = require("./htmlstr_dtm"),
	cssutils = require("./cssutils_dtm");
	
	var eltOverrideStr = "\n\
	<script type='text/javascript' src='" + webranz_randomize_path + "src/utils.js'></script>\n\
	<script type='text/javascript' src='" + webranz_randomize_path + "src/override-elt-api.js'></script>\n\
	<script type='text/javascript' src='" + webranz_randomize_path + "src/observer.js'></script>";	

	var urlOverrideStr = "\n\
	<script type='text/javascript' src='" + webranz_randomize_path + "src/override-url-api.js'></script>";	

	function insertAsFirst(elem, prev){
		if (elem == undefined) {
			//console.log('undefined',prev);
		}
		if (elem) {
    		var childs = elem.parent.children;
    		childs.splice(childs.lastIndexOf(elem), 0, prev);
    		if(elem.prev){
        		elem.prev.next = prev;
    		}
    		prev.prev = elem.prev;
    		prev.next = elem;
    		elem.prev = prev;
    		prev.parent = elem.parent;
		}
	}

	function insertAsNext(elem, next) {
		if(next) {
			if(next.prev) next.prev.next = next.next;
			if(next.next) next.next.prev = next.prev;
			if(next.parent) {
				var childs = next.parent.children;
				childs.splice(childs.lastIndexOf(next), 1);
			}
		}			
		var parent = elem.parent,
		currNext = elem.next;
		next.next = currNext;
		next.prev = elem;
		elem.next = next;
		if(currNext) {
			currNext.prev = next;
			if(parent) {
				var childs = parent.children;
				childs.splice(childs.lastIndexOf(currNext), 0, next);
			}
		} else if(parent){
			parent.children.push(next);
		}
	}	
    
    
    function isLocalCopy(src, files_dir){
		src = decodeURI(src);
		if (typeof src === "string" && typeof files_dir === "string") {
			if (src.includes && src.includes(files_dir) && src.indexOf(files_dir) ===0) {
				return true;
			}
			else if (!src.startsWith("http://") && !src.startsWith("https://")) {
				return true;
			}
			else {
				return false;
			}
		}
		return false;
	}
	function isLocalCopy_debug(src, files_dir){
		console.log("isLocalCopy_debug:", src);
		src = decodeURI(src);
		console.log("isLocalCopy_debug:", src);
		console.log("isLocalCopy_debug:", files_dir);
		if (typeof src === "string" && typeof files_dir === "string") {
			if (src.includes && src.includes(files_dir) && src.indexOf(files_dir) ===0) {
				return true;
			}
			else if (!src.startsWith("http://") && !src.startsWith("https://")) {
				return true;
			}
			else {
				return false;
			}
		}
		return false;
	}
	
	function makeAbsolutePath(src, curfolder) {
		// encrypt;
		// make it absolute.
		var new_src = decodeURI(src);
		console.log("[makeAbsolutePath]src: " + new_src);
		console.log("[makeAbsolutePath]curfolder: " + curfolder);
		if( new_src.indexOf(curfolder) === 0 ) {
			new_src = new_src.substr(curfolder.length);
		}
		if( curfolder === "" ) {
			if( new_src.substr(0,1) == "/" )
				new_src = webranz_absolute_path + new_src.substr(1);
			else
				new_src = webranz_absolute_path + new_src;
		} else {
			if( new_src.substr(0,1) == "/" )
				new_src = webranz_absolute_path + curfolder + "/" + new_src.substr(1);
			else
				new_src = webranz_absolute_path + curfolder + "/" + new_src;
		}
		
		console.log("[makeAbsolutePath]new_src: " + new_src);
		return new_src;
	}
	
	function notUrlFormat(src) {
		if (src.indexOf("javascript:")===0) {
			return true;
		}
		if (src.indexOf("data:")===0) {
			return true;
		}
		return false;
	}
	function noRandomizeUrl(src, files_dir) {
		if (isLocalCopy(src, files_dir)) {
			return true;
		}
		if (src.indexOf("http://" + webranz_absolute_path)===0) {
			return true;
		}
		if (src.indexOf("javascript:")===0) {
			return true;
		}
		if (src.indexOf("data:")===0) {
			return true;
		}
		return false;
	}

    var encryptURL = function (url) {
       var buf = new Buffer(url);
       var ret = buf.toString('base64');
       buf = null;
       return ret;
    }

	function getHeadTag(domNode, headTag) {
		if (Array.isArray(domNode)) {
			domNode.forEach(function(nd) {
				headTag = getHeadTag(nd, headTag);
    		});
    		return headTag;
  		}
		else if (domNode.type === 'tag') {
			if (domNode.name === 'head') {
				headTag = domNode;
				return headTag;
    		}
    		if (domNode.children) { 
				domNode.children.forEach(function(nd) {
					headTag = getHeadTag(nd, headTag);
      			});
    		}
    
    		if (domNode.name === 'html') {
    			return headTag;
    		}
    		return headTag;
  		}
  		else {
  			return headTag;
  		}
	}
	
	
	//var retTags = { headTag: null, styleTags: null };
    function walkDOM(domNode, maps, siteFolder, curfolder, retTags) {
		var error = false;  
		var idMap = maps.idMap,
		reverseIdMap = maps.reverseIdMap,
		classMap = maps.classMap,
		reverseClassMap = maps.reverseClassMap;
	
	//console.log('walkdom, dom: ', html(domNode));
    
		if (Array.isArray(domNode)) {
			domNode.forEach(function(nd) {
				error = walkDOM(nd, maps, siteFolder, curfolder, retTags);
    		});
    		return error;
  		}
		else if (domNode.type === 'tag') {
    		if (domNode.name === 'head') {
				retTags.headTag = domNode;
			}
			if (domNode.attribs) {
				if (domNode.attribs.src) {
					var src = domNode.attribs.src;
					if (!noRandomizeUrl(src,siteFolder)) {
						console.log("src[1]:" + src);
						domNode.attribs.src = encodeURL_debug(src, "5");
					} else if (isLocalCopy(src, siteFolder) && notUrlFormat(src) === false ){
						console.log("src[2]:" + src);
						var new_src = makeAbsolutePath(src, curfolder);
                        domNode.attribs.src = encodeURL_debug(new_src, "6");
					}
				}
				if (domNode.attribs.href) {
					var src = domNode.attribs.href;
                    if (!noRandomizeUrl(src, siteFolder)) {
						console.log("href[1]:"+ src );
						domNode.attribs.href = encodeURL_debug(src, "3");
					} else if (isLocalCopy(src, siteFolder) && notUrlFormat(src) === false ){
                        /* === update === */
                        /* if it does encrypt too much, then use the following predicate */
						/* if( domNode.attribs.href.indexOf("300x250") !== -1 ) */ 
						console.log("href[2]:" + src);
						var new_src = makeAbsolutePath(src, curfolder);
						domNode.attribs.href = encodeURL_debug(new_src, "4");
                        /* console.log("========== :" + domNode.attribs.href); */
					}
				}

				if (domNode.attribs.style) {
					domNode.attribs.style = domNode.attribs.style.replace(/&#39;/g, "'");
				}							
			
				//if (domNode.attribs.id && domNode.name !== 'html') {
				if (domNode.attribs.id) {
					if (!idMap.has(domNode.attribs.id)) {
						var randNum1 = getRandomNumber();
						var randId = "rand_id_" + randNum1;
          				while (idMap.search(randId)) {
							randNum1 = getRandomNumber();
            				randId = "rand_id_" + randNum1;
          				}
                         // console.log(randId);
						// Set id - randomized mapping in idMap
          				idMap.set(domNode.attribs.id, randId);
          				reverseIdMap.set(randId, domNode.attribs.id);
						// Change id to randomized id
          				domNode.attribs.id = randId;
        			}
					else {
						domNode.attribs.id = idMap.get(domNode.attribs.id);
					}
				}
    		
				//if (domNode.attribs.class && domNode.name !== 'html') {
				if (domNode.attribs.class) {
					if (domNode.attribs.class.trim() !== "\n" && domNode.attribs.class.trim() !== "") {
						var classes = domNode.attribs.class.trim().replace( /\n/g, " " );
						classes = classes.replace( /\r/g, " " ).split(/ +/);
						for (var i = 0; i < classes.length; i++) {
							var c = classes[i];
							if (!classMap.has(c)) {
								var randNum2 = getRandomNumber(), 
								randClass = "rand_class_" + randNum2;
								while (classMap.search(randClass)) {
									randNum2 = getRandomNumber();
									randClass = "rand_class_" + randNum2;
								}
								// Set class - randomized mapping in classMap
								classMap.set(c, randClass);
								reverseClassMap.set(randClass, c);
								// Change class to randomized class					
								classes[i] = randClass;
								domNode.attribs.class = classes.toString().replace(/\,/g, ' ');
							}
							else {
								// Change class to randomized class
								classes[i] = classMap.get(c);
								domNode.attribs.class = classes.toString().replace(/\,/g, ' ');
							}
						}
					}					
				}
			
			}
			
    		if (domNode.children) { 
				domNode.children.forEach(function(nd) {
					error = walkDOM(nd, maps, siteFolder, curfolder, retTags);
      			});
    		}
    		return error;
  		}
		if (domNode.type === 'style') {
			if (domNode.children[0]) {
				var cssAST = css.parse(domNode.children[0].data);
				if (cssAST.stylesheet.parsingErrors.length === 0) {
					retTags.styleTags.push(domNode);
					//console.log("styleTags.push::", domNode);
				} else {
					console.log("style tag css error!");
					console.log(err.message); console.log(err.stack);
				}
			}
		}
		else if (domNode.type === 'script') {
			if (domNode.attribs.src && typeof domNode.attribs.src==="string") {
				var src = domNode.attribs.src;
				if (!noRandomizeUrl(src, siteFolder)) {
					domNode.attribs.src=encodeURL(src);
				}
				// === update === 
				else if (isLocalCopy_debug(src, siteFolder) && notUrlFormat(src) === false) {
					if( src.toLowerCase().indexOf(".js") >= 0 ) {
						// encrypt.
						// make it absolute.
						var new_src = makeAbsolutePath(src, curfolder);
						console.log("script src ==> [" + src + "] => [" + new_src + "]" );
						domNode.attribs.src = encodeURL(new_src);
					}
				}
				// === update-end ===
			}				
		}
        return error;
	}


	function map_to_string_org(mapName, inMap) {
		var ret = "";
		inMap.forEach(function (val, key, map) {
			ret += mapName + "[\"" + key + "\"]=\"" + val + "\"; ";
		});
		return ret;
	}
	function map_to_string(inMap) {
		var ret = "";
		inMap.forEach(function (val, key, map) {
			ret += "[" + key + "<\n>" + val + "]\n";
		});
		ret = ret.substr(0, ret.length-1);
		return ret;
	}
	function str2obj(strMap, reverseKeyVal) {
		if( strMap.slice(0,1) === "[" && strMap.slice(-1) === "]" ) strMap = strMap.substring(1, strMap.length-1);
		var aryElem = strMap.split(']\n[');
		var retMap = {};
		for(var i = 0; i < aryElem.length; i++) {
			var elem = aryElem[i];
			var keyval = elem.split("<\n>");
			
			if( keyval.length !== 2 ) continue;
			if( reverseKeyVal === true ) retMap[keyval[1]] = keyval[0];
			else retMap[keyval[0]] = keyval[1];
		}
		return retMap;
	} // function str2obj(n,t){\"[\"===n.slice(0,1)&&\"]\"===n.slice(-1)&&(n=n.substring(1,n.length-1));for(var l=n.split(\"]\n[\"),r={},s=0;s<l.length;s++){var e=l[s],i=e.split(\"<\n>\");2===i.length&&(t===!0?r[i[1]]=i[0]:r[i[0]]=i[1])}return r}
	function str2map(strMap, reverseKeyVal) {
		if( strMap.slice(0,1) === "[" && strMap.slice(-1) === "]" ) strMap = strMap.substring(1, strMap.length-1);
		var aryElem = strMap.split(']\n[');
		var retMap = new Map();
		for(var i = 0; i < aryElem.length; i++) {
			var elem = aryElem[i];
			var keyval = elem.split("<\n>");
			
			if( keyval.length !== 2 ) continue;
			if( reverseKeyVal === true ) retMap.set(keyval[1], keyval[0]);
			else retMap.set(keyval[0], keyval[1]);
		}
		return retMap;
	} // function str2map(t,n){"["===t.slice(0,1)&&"]"===t.slice(-1)&&(t=t.substring(1,t.length-1));for(var e=t.split("]\n["),s=new Map,l=0;l<e.length;l++){var r=e[l],i=r.split("<\n>");2===i.length&&(n===!0?s.set(i[1],i[0]):s.set(i[0],i[1]))}return s}
	function concat_mapstr(mapstr1, mapstr2) {
		return mapstr1 + '+\r\r+' + mapstr2;
	}
	function get_map_str_from_map_strings(str) {
		var ary = str.split('+\r\r+');
		return ary;
	} // function get_map_str_from_map_strings(r){var t=r.split("+\r\r+");return t}
	function replaceAll(target, search, replacement)
	{
		return target.replace(new RegExp(search, 'g'), replacement);
	}
	/*
	// function getReverseMap(e){for(var r={},t=Object.keys(e),n=0;n<t.length;n++)r[e[t[n]]]=t[n];return r}
	function getReverseMap(org) {
		var ret = {};
		var keyary = Object.keys(org);
		for( var i = 0; i < keyary.length; i++ ) {
			ret[ org[keyary[i]] ] = keyary[i];
		}
		return ret;
	} 
	*/
	function getMapString(idMap, classMap)
	{
		var retMapStr;
		var strIdMap = map_to_string_org( "idMap", idMap );
		var strClassMap = map_to_string_org( "classMap", classMap );
		var str_fn_getRevMap = "function getReverseMap(e){for(var r={},t=Object.keys(e),n=0;n<t.length;n++)r[e[t[n]]]=t[n];return r}";
		//str2map_func_str = replaceAll(str2map_func_str, "\n", "\\n");
		//str2map_func_str = replaceAll(str2map_func_str, "\r", "\\r");
		//str2obj_func_str = replaceAll(str2obj_func_str, "\n", "\\n");
		//str2obj_func_str = replaceAll(str2obj_func_str, "\r", "\\r");

		retMapStr = "\n<script>\n";
		//retMapStr += "var strIdMap = \"" + replaceAll(strIdMap, "\n", "\\n") + "\";\n";
		//retMapStr += "var strClassMap = \"" + replaceAll(strClassMap, "\n", "\\n") + "\";\n";
		//retMapStr += "window.glob = strIdMap + '+\\r\\r+' + strClassMap;\n";
		retMapStr += "var idMap = {}, classMap = {}, reverseIdMap = {}, reverseClassMap = {};\n";
		retMapStr += strIdMap + "\n";
		retMapStr += strClassMap + "\n";
		retMapStr += str_fn_getRevMap + "\n";
		retMapStr += "reverseIdMap = getReverseMap(idMap); reverseClassMap = getReverseMap(classMap);\n";
		retMapStr += "console.log('reverseIdMap.size: ' + Object.keys(reverseIdMap).length + ' ==? ' + " + idMap.count() + ");\n";
		retMapStr += "console.log('reverseClassMap.size: ' + Object.keys(reverseClassMap).length + ' ==? ' + " + classMap.count() + ");\n";
		retMapStr += "\n</script>\n";
		return retMapStr;
	}

	/*
	 * Insert override Scripts and global Maps
	 * @param {type} domNode: root of main page AST
	 * @param {type} maps: store property maps 
	 * @returns {undefined}
	 */
	function insertScripts(domNode, maps, headTag) { 
		var idMap = maps.idMap,
		reverseIdMap = maps.reverseIdMap,
		classMap = maps.classMap,
		reverseClassMap = maps.reverseClassMap;

		if (Array.isArray(domNode)) {
			domNode.forEach(function(nd) {
				insertScripts(nd, maps, headTag);
			});
			return;
		}
		else if (domNode.type === 'tag') {
			if (domNode.children) { 
				domNode.children.forEach(function(nd) {
					insertScripts(nd, maps, headTag);
				});
			}

			if (domNode.name === 'html') {
				var mapStr = getMapString(idMap, classMap);
					
					
									
				// insert Override script
				HTMLparser.parseComplete(eltOverrideStr);
				insertAsFirst(headTag.children[0], handler.dom);
				HTMLparser.parseComplete(urlOverrideStr);
				insertAsFirst(headTag.children[0], handler.dom);
		
				// insert idMap/classMap -- new -- updated
				HTMLparser.parseComplete(mapStr);
				insertAsFirst(headTag.children[0], handler.dom);
				
				//console.log("--html--", headTag);
				
			}
			return;
		}
		else {
			return;
		}
	}


    exports.insertAsFirst = insertAsFirst;
    exports.insertAsNext = insertAsNext;    
    exports.walkDOM = walkDOM;
    exports.getHeadTag = getHeadTag; 
    exports.insertScripts = insertScripts;
	exports.getMapString = getMapString;
});
