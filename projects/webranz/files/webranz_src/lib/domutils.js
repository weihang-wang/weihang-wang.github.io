if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

var server = "50.129.86.149";
var randomize_path = "http://" + server + ":8080/WebRanz/";

define(function(require, exports) {

	var htmlparser2 = require("htmlparser2"),
	handler = new htmlparser2.DomHandler(),
	HTMLparser = new htmlparser2.Parser(handler);
	var html = require('htmlparser-to-html');
	var css = require("css"); 

	var fs = require("fs"),
	hashmap = require("hashmap");
	
	var htmlstr = require("./htmlstr"),
	cssutils = require("./cssutils");
	
	var eltOverrideStr = "\n\
	<script type='text/javascript' src='" + randomize_path + "src/utils.js'></script>\n\
	<script type='text/javascript' src='" + randomize_path + "src/override-elt-api.js'></script>\n\
	<script type='text/javascript' src='" + randomize_path + "src/observer.js'></script>";	

	var urlOverrideStr = "\n\
	<script type='text/javascript' src='" + randomize_path + "src/override-url-api.js'></script>";	

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
	
	
	function noRandomizeUrl(src, files_dir) {
		if (isLocalCopy(src, files_dir)) {
			return true;
		}
		if (src.indexOf("http://" + server)===0) {
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

	function encryptURL(url) {
		var ret = "";
		for (var i=0;i<url.length;i++) {
			if (url.charCodeAt(i) == 37) {
				ret = ret + '[' + String.fromCharCode(url.charCodeAt(i)) + ']';
			}
			else {
				ret = ret + String.fromCharCode(url.charCodeAt(i) + 1);
			}
		}
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
	
	
    function walkDOM(domNode, maps, error, siteFolder, styleTags) {  
		var idMap = maps.idMap,
		reverseIdMap = maps.reverseIdMap,
		classMap = maps.classMap,
		reverseClassMap = maps.reverseClassMap;
	
	//console.log('walkdom, dom: ', html(domNode));
	
		if (Array.isArray(domNode)) {
			domNode.forEach(function(nd) {
				styleTags = walkDOM(nd, maps, error, siteFolder, styleTags);
    		});
    		return styleTags;
  		}
		else if (domNode.type === 'tag') {
    		
			if (domNode.attribs) {
				if (domNode.attribs.src) {
					if (!noRandomizeUrl(domNode.attribs.src,siteFolder)) {
						domNode.attribs.src="http://" + server + ":8080/WebRanz/proxy/phps/bypassUrl.php?link="+encryptURL(domNode.attribs.src);
					}
				}
				if (domNode.attribs.href) {
					if (!noRandomizeUrl(domNode.attribs.href,siteFolder)) {
						domNode.attribs.href="http://" + server + ":8080/WebRanz/proxy/phps/bypassUrl.php?link="+encryptURL(domNode.attribs.href);
					}
				}
				
				if (domNode.attribs.style) {
					domNode.attribs.style = domNode.attribs.style.replace(/&#39;/g, "'");
				}							
			
				//if (domNode.attribs.id && domNode.name !== 'html') {
				if (domNode.attribs.id) {
					if (!idMap.has(domNode.attribs.id)) {
						var randNum1 = Math.floor((Math.random() * 50000) + 1),
						randId = "rand_id_" + randNum1;
          				while (idMap.search(randId)) {
							randNum1 = Math.floor((Math.random() * 50000) + 1);
            				randId = "rand_id_" + randNum1;
          				}
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
						var classes = domNode.attribs.class.trim().replace( /\n/g, " " ).split(/ +/);
						for (var i = 0; i < classes.length; i++) {
							var c = classes[i];
							if (!classMap.has(c)) {
								var randNum2 = Math.floor((Math.random() * 50000) + 1), 
								randClass = "rand_class_" + randNum2;
								while (classMap.search(randClass)) {
									randNum2 = Math.floor((Math.random() * 50000) + 1);
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
					styleTags = walkDOM(nd, maps, error, siteFolder, styleTags);
      			});
    		}
    		
    		return styleTags;
  		}
		if (domNode.type === 'style') {
			if (domNode.children[0]) {
				var cssAST = css.parse(domNode.children[0].data, {silent: true});
				if (cssAST.stylesheet.parsingErrors.length === 0) {
					styleTags.push(domNode);
				}
			}
			return styleTags;
		}
		else if (domNode.type === 'script') {
			if (domNode.attribs.src && typeof domNode.attribs.src==="string") {
				if (!noRandomizeUrl(domNode.attribs.src, siteFolder)) {
					domNode.attribs.src="http://" + server + ":8080/WebRanz/proxy/phps/bypassUrl.php?link="+encryptURL(domNode.attribs.src);
				}
			}	
			return styleTags;
		}
		else {
			return styleTags;
		}
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
				var idMapStr = "\n\
				<script>\n\
				var idMap = {};\n\
				";
				idMap.forEach(function(value, key) {
					idMapStr += "idMap[\"" + key + "\"] = \"" + value + "\";\n";
				});
				idMapStr += "var reverseIdMap = {};\n\
				";
				reverseIdMap.forEach(function(value, key) {
					idMapStr += "reverseIdMap[\"" + key + "\"] = \"" + value + "\"; \n"; 
				});
				idMapStr += "</script>\n";
		
				var classMapStr = "\n\
				<script>\n\
				var classMap = {}; \n\
				";
				classMap.forEach(function(value, key) {
					if (key !== "\n" && key !== "") {
					classMapStr += "classMap[\"" + key + "\"] = \"" + value + "\";\n";
					}
				});
				classMapStr += "var reverseClassMap = {};\n\
				";
				reverseClassMap.forEach(function(value, key) {
					if (value !== "\n" && value !== "") {
					classMapStr += "reverseClassMap[\"" + key + "\"] = \"" + value + "\"; \n";
					}
				});
				classMapStr += "</script>\n";
					
					
									
				// insert Override script
				HTMLparser.parseComplete(eltOverrideStr);
				insertAsFirst(headTag.children[0], handler.dom);
				HTMLparser.parseComplete(urlOverrideStr);
				insertAsFirst(headTag.children[0], handler.dom);
		
				// insert classMap
				HTMLparser.parseComplete(classMapStr);
				insertAsFirst(headTag.children[0], handler.dom);
											
				// insert idMap
				HTMLparser.parseComplete(idMapStr);
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
});
