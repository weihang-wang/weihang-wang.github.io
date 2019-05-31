var is_utils_debug = true; // toggle this to turn on / off for global controll

// ================ resource names ===================
var webranz_server 			= "50.129.86.149:8080";
var webranz_js_folder 		= "http://" + webranz_server + "/WebRanz/src/";
var webranz_bypassurl_php	= "http://" + webranz_server + "/WebRanz/proxy/phps/bypassUrl.php?link=";
var webranz_bypassurl_file	= 'bypassUrl.php?';
var webranz_js_override_url = "http://" + webranz_server + "/WebRanz/src/override-url-api.js";
var webranz_js_override_elt = "http://" + webranz_server + "/WebRanz/src/override-elt-api.js";
// =====================================================

var eleIdSetter, eleClassNameSetter;

function is_inline_js(strinput) {
	if( strinput.startsWith('javascript:') === true )
		return true;
	return false;	
} 

function clone(obj) {
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}
	var temp = {};
	for (var attr in obj) {
		if (obj.hasOwnProperty(attr)) {
			temp[attr] = obj[attr];
		}
	}
	return temp;
}
function dirtyUrlFix( url ) {
	if (url.indexOf(webranz_server + "/WebRanz/proxy/phps/300x250_botany_edge.js") === 0 ) {
		//300x250_botany_edge.js
		return webranz_server + "/WebRanz/websites/rand/showcase/www.capital.gr_files/container_data_002/300x250_botany_data/300x250_botany_edge.js";
	}
	return url;
}
function buildProxyUrl( url ) {
	var ret;
	ret = webranz_bypassurl_php + btoa(url);
	return ret;
}
function encryptURL(input_url, debugloc) {
	var ret = input_url;
	if ( input_url.startsWith('./') === true || is_inline_js(input_url) === true || input_url.startsWith('file:') === true ) {
		return ret;
	} 
	else if ( (input_url.startsWith('http://' + webranz_server) === true || input_url.startsWith('https://' + webranz_server) === true ) && input_url.indexOf(webranz_bypassurl_file) > 0) {
		return ret;
	}
	else if ( input_url.startsWith(webranz_js_folder) === true &&  input_url.indexOf(".js") > 0 ) {
		return ret;
	}
	else if (input_url.indexOf('_files/') > 0 ) {
		ret = buildProxyUrl( input_url ) + "&debug=" + debugloc;
		return ret;
	}
	else {
		//var encurl = btoa(url);
		/*
		//http://partner.googleadservices.com/gpt/pubads_impl_89.js
		if( url.indexOf('google') > 0 || url.indexOf('rubiconproject') > 0 || url.length < 110 || url.indexOf('openx.net') > 0 || url.indexOf('newsmaxfeednetwork') > 0 ) {
		} else if( url.indexOf('http://') == 0 ) {
			if( is_utils_debug ) console.log("encryptURL(skip): [len: " + url.length + " => " + encurl.length + "] [" + url + "] => [" + encurl + "]");
			return url;
		}
		if( is_utils_debug ) console.log("encryptURL: [len: " + url.length + " => " + encurl.length + "] [" + url + "] => [" + encurl + "]");
		*/
		//if( is_utils_debug ) console.log("url: ", url, "=>", buildProxyUrl( url ));
		input_url = dirtyUrlFix( input_url ); // added.
		ret = buildProxyUrl( input_url ) +  "&debug=" + debugloc;;
    	return ret;
  	}
	return ret;
}

function encryptDOM(domNode, maps) { 	
	try {
		if (domNode.id) {
			domNode.id = domNode.id;
		}
		if (domNode.className) {
			domNode.className = domNode.className;
		}
		
		for (var i = 0; i<domNode.children.length; i++) {
			encryptDOM(domNode.children[i], maps);
		}
	} catch(e) {
		///
	}
    return;
    	
	// handling of internal and external CSS
	/*
	else if (domNode.type === 'style') {
		if (domNode.children[0]) {
			var cssAST = css.parse(domNode.children[0].data, {silent: true});
			if (cssAST.stylesheet.parsingErrors.length === 0) {
				styleTags.push(domNode);
			}
		}
		return;
	}
	*/
}


function decryptDOM(domNode, maps) {
	try { 
		if (domNode.id) {
			eleIdSetter.call(domNode, domNode.id);
		}
		if (domNode.className) {
			eleClassNameSetter.call(domNode, domNode.className);		
		}
		
		for (var i = 0; i<domNode.children.length; i++) {
			decryptDOM(domNode.children[i], maps);
		}
	} catch(e) {
		///
	}
    return;
}



function getProperty(obj, property) {
	var propFunc = function(prop){
        	if (prop === property) {
            	tmpProp = prop;
                tmpObj = curr;
            }
        };
	var tmpProp, tmpObj;
	var curr = obj;
    do {
		var props = Object.getOwnPropertyNames(curr);
        props.forEach( propFunc );
    } while(curr = Object.getPrototypeOf(curr));
    return Object.getOwnPropertyDescriptor(tmpObj, tmpProp);
}


function contains(attr, map, containsStr) {
	var selectors = new Array();
	var keys = map.keys();
	for (var i = 0; i < keys.length; i++) {
		if (keys[i] === undefined || keys[i] === '' || keys[i] === '\n') {
			continue;
		}
		if (keys[i].indexOf(containsStr) !== -1) {
			//if( is_utils_debug ) console.log('^= begin with string: ', beginsWithStr);
			if (attr === 'class') {
				//if( is_utils_debug ) console.log('^= begin with string: ', beginsWithStr, keys[i], map.get(keys[i]));
				selectors.push('.' + map.get(keys[i]));
			}
		}		
	}
	if (selectors.length > 0) {
		return selectors.toString();
	}
	else {
		return null;
	}
}
	
	
function beginsWith(attr, map, beginsWithStr) {
	var selectors = new Array();
	var keys = map.keys();
	for (var i = 0; i < keys.length; i++) {
		if (keys[i] === undefined || keys[i] === '' || keys[i] === '\n') {
			continue;
		}
		if (keys[i].indexOf(beginsWithStr) === 0) {
			//if( is_utils_debug ) console.log('^= begin with string: ', beginsWithStr);
			if (attr === 'class') {
				//if( is_utils_debug ) console.log('^= begin with string: ', beginsWithStr, keys[i], map.get(keys[i]));
				selectors.push('.' + map.get(keys[i]));
			}
		}		
	}
	if (selectors.length > 0) {
		return selectors.toString();
	}
	else {
		return null;
	}
}
	

function endsWith(attr, map, endsWithStr) {
	var selectors = new Array();
	var keys = map.keys();
	for (var i = 0; i < keys.length; i++) {
		if (keys[i] === undefined || keys[i] === '' || keys[i] === '\n') {
			continue;
		}
		if (keys[i].indexOf(endsWithStr, keys[i].length-endsWithStr.length) !== -1) {
			if (attr === 'class') {
				selectors.push('.' + map.get(keys[i]));
			}
		}
	}
	if (selectors.length > 0) {
		return selectors.toString();
	}
	else {
		return null;
	}
}
	

function randomizeSelector(selector, maps) {
	if (!selector)
		return;
	var idMap = maps.idMap,
	classMap = maps.classMap;
	if (selector.classNames) {
		for (var i = 0; i < selector.classNames.length; i++) {
			if (classMap.has(selector.classNames[i])) {
				selector.classNames[i] = classMap.get(selector.classNames[i]);
			}
		}
	}
	if (selector.id) {
		if(idMap.has(selector.id)) {
			selector.id = idMap.get(selector.id);
		}
	}
		
	if (selector.attrs) {
		for (var j = 0; j < selector.attrs.length; j++) {
			if (selector.attrs[j].name === 'class') {
				if (selector.attrs[j].operator==='^=' || selector.attrs[j].operator==='|=') {
					return beginsWith('class', classMap, selector.attrs[j].value);
				}
				if (selector.attrs[j].operator==='*=' || selector.attrs[j].operator==='~=') {
					return contains('class', classMap, selector.attrs[j].value);
				}
				if (selector.attrs[j].operator==='$=') {
					return endsWith('class', classMap, selector.attrs[j].value);
				}	
			}
		}
	}
		
	if (selector.rule) {
		randomizeSelector(selector.rule, maps);
	}		
}
	
	
function visit(ast, maps) {	
	var selectors = new Array();
	if (ast.type === 'selectors') {
		for (var i = 0; i < ast.selectors.length; i++) {
			if (ast.selectors[i].type === 'ruleSet') {
				var t = randomizeSelector(ast.selectors[i].rule, maps);
				if (t !== null && t!== undefined) {
					selectors.push(t); 
				}
			}
		}
		/*
		ast.selectors.forEach(function(selector) {
			if (selector.type === 'ruleSet') {
				randomizeSelector(selector.rule, maps);
			}
		})*/ 
	}
	if (ast.type === 'ruleSet') {
		var r = randomizeSelector(ast.rule, maps);
		if (r !== null && r !== undefined) {
			selectors.push(r);
		}
	}
	if (selectors.length > 0) {
		ast.randSelectors = selectors.toString();
	}
	return ast;
}
