var is_elt_api_debug = true; // toggle this to turn on / off for global controll
var log_id_class_setter_getter = false;

if( typeof(idMap) === 'undefined' ) { 	var idMap = {}; }
if( typeof(reverseIdMap) === 'undefined' ) { 	var reverseIdMap = {}; }
if( typeof(classMap) === 'undefined' ) { 	var classMap = {}; }
if( typeof(reverseClassMap) === 'undefined' ) { var reverseClassMap = {}; }	

// debug API usage
//var text = "\n";

var textFile = null;
var makeTextFile = function (t) {
	var data = new Blob([t], {type: 'text/plain'});

	// If we are replacing a previously generated file we need to
	// manually revoke the object URL to avoid memory leaks.
	if (textFile !== null) {
		window.URL.revokeObjectURL(textFile);
	}
	
	textFile = window.URL.createObjectURL(data);
	return textFile;
};


////////////////////////////////////
// This function is called every time
/*
var override_elt_api_js_loaded;
var override_elt_api_js_first_run = false;
if( override_elt_api_js_loaded === undefined ) {
	override_elt_api_js_first_run = true;
	override_elt_api_js_loaded = true;
}
// Is this required??
(function() {
	if( override_elt_api_js_first_run ) {
		var link = document.createElement('a');
		link.style.display = 'none';
		link.id = "docAPI";
		document.getElementsByTagName("head")[0].appendChild(link);
		
		
		window.addEventListener('load', function() {
			document.getElementById('docAPI').tmp = text;
			//link.tmp = text;
			//console.log(link.tmp);
			//document.getElementsByTagName("head")[0].appendChild(link);
			//console.log(document.getElementById('docAPI'));
		});
	}
	
})();
*/

////////////////////////////////////////////////////////////////////////
//
// UTILITY FUNCTIONS
//
function isNativeFunction(fn) {
	return (/\{\s*\[native code\]\s*\}/).test('' + fn);
}

function is_iframe( obj ) {
	try {
		if( obj ) {
			if( obj.nodeName ) {
				if( obj.nodeName.toLowerCase() === "iframe" ) {
					return true;
				}
			}
		}
	} catch(e) {  
		// 
	}
	return false;
};

function get_iframe_contentDocument(iframe_obj) {
	var fw = null;
	try {
		fw = iframe_obj.contentWindow ? iframe_obj.contentWindow.document : iframe_obj.contentDocument;
	} catch(e) {
		fw = null;
	}
	return fw;
};

function hook_log( bef, after, debug_loc ) {
	if( is_elt_api_debug ) { 
		if( bef !== after ) {
			console.log("===== " + debug_loc + " (MOD) ====");
			console.log(bef);
			console.log(" ==> ");
			console.log(after);
			console.log("================");
		} else {
			console.log("===== " + debug_loc + " (NOMOD) ====");
			console.log(bef);
			console.log("================");
		}
	}
	
};



////////////////////////////////////////////////////////////////////////
//
// HOOK FUNCTIONS
//

////////////////////////////////////////////////////////////////////////
// HOOK iframe.document.write
////////////////////////////////////////////////////////////////////////
function hook_iframeWrite(ret, dbg) {
	if( is_iframe(ret) === true ) {
		console.log("Detected new iframe(dbg:" + dbg + ")");//, (iframe: ", ret, ")");
		var fw = get_iframe_contentDocument(ret);
		if( fw ) {
			//if (is_elt_api_debug) console.log("[hook_iframeWrite] fw found (dbg:", dbg ,")");
			//if( isNativeFunction( fw.write ) === true )
			{ 
				//if (is_elt_api_debug) console.log("[set bp here] native: ", fw.write);
				if (is_elt_api_debug) console.log("[hook_iframeWrite] fw.write hooked (dbg:", dbg ,")");
				var iframeLoadDocW15 = fw.write;
				fw.write = function() {  
					if (is_elt_api_debug) console.log(">> [fw.write hooked by hook_iframeWrite] arguments.length = ", arguments.length);
					var str = arguments[0];
					//if (is_elt_api_debug) console.log(str);
					
					var result = do_reaplceSrcURL_debug(str, "60");
					// added
					result = replaceSrcURL_new_debug(result, " href", "60" );
					
					
					result = do_insert_script_at_head(result, "60");
					
					hook_log( str, result, "[hook_iframeWrite] iframe.contentDocument.write" );
					
					arguments[0] = result;        
					return iframeLoadDocW15.apply(this, arguments);
				};
			}
			
			
			{
				//if (is_elt_api_debug) console.log("[set bp here] native: ", fw.write);
				if (is_elt_api_debug) console.log("[hook_iframeWrite] fw.writeln hooked (dbg:", dbg ,")");
				var iframeLoadDocWln15 = fw.writeln;
				fw.writeln = function() {  
					if (is_elt_api_debug) console.log(">> [fw.writeln hooked by hook_iframeWrite] (writeln) arguments.length = ", arguments.length);
					var str = arguments[0];
					
					var result = do_reaplceSrcURL_debug(str, "59");
					// added
					result = replaceSrcURL_new_debug(result, " href", "59" );
					
					
					result = do_insert_script_at_head(result, "59");
					
					hook_log( str, result, "[hook_iframeWrite] iframe.contentDocument.writeln" );
					
					arguments[0] = result;        
					return iframeLoadDocWln15.apply(this, arguments);
				};
			}
		} else {
			if (is_elt_api_debug) console.log("[hook_iframeWrite] FAILED contentWindow not found (dbg:", dbg ,")");
		}
	}
};


////////////////////////////////////////////////////////////////////////
// HOOK getElementById
////////////////////////////////////////////////////////////////////////
var org_getElementById;
if( org_getElementById === undefined ) 
	org_getElementById = Object.getPrototypeOf(document).getElementById;
Object.getPrototypeOf(document).getElementById = function(id) {
	//if (is_elt_api_debug) console.log("getElementById: ", id);
	//text += "document.getElementById\n";
	var ret;
	if (idMap[id]) {
		ret = org_getElementById.call(document, idMap[id]);
		if (is_elt_api_debug && log_id_class_setter_getter) console.log("getElementById: (", id, " => ", idMap[id], ")" );
		if( id === "google_ads_iframe_/5302/Desktop/Desktop-Web-ES/Homepage_1__hidden__" ) {
			console.log("bp here");
		}
	}
	else {
		ret = org_getElementById.call(document, id);
		//if (is_elt_api_debug) console.log("[hook] leave-2 getElementById:", id);
	}
	
	hook_iframeWrite( ret, "getElementById(id = " + id + ")" );
	return ret;
};


////////////////////////////////////////////////////////////////////////
// HOOK getElementByClassName
////////////////////////////////////////////////////////////////////////
var org_getElementByClassName;
if( org_getElementByClassName === undefined ) 
	org_getElementByClassName = Object.getPrototypeOf(document).getElementsByClassName;
Object.getPrototypeOf(document).getElementsByClassName = function(className) {
	//text += "document.getElementsByClassName\n";
	if (classMap[className]) {
        return org_getElementByClassName.call(this, classMap[className]);
    }
    else {
        return org_getElementByClassName.call(this, className);
    }
};

var org_proto_documentWrite;
if( org_proto_documentWrite === undefined )
	org_proto_documentWrite = Object.getPrototypeOf(document).write;
Object.getPrototypeOf(document).write = new_proto_documentWrite; 
function new_proto_documentWrite(expr) {
	//text += "document.write\n";		
	if (is_elt_api_debug) console.log('documentwrite, arg: ', arguments.length, ", org_proto_documentWrite? ", org_proto_documentWrite);
	if (document.readyState === "complete") {
	
	}
	else {
		for (var i=0; i<arguments.length; i++) {
			var parser = new DOMParser();
			try {
				var doc = parser.parseFromString(arguments[i], "text/html");
			}
			catch(e) {
				alert("dom parser error");
			}
			
			encryptDOM(doc.children[0]);
			var s = new XMLSerializer();
 			arguments[i] = s.serializeToString(doc);
			if (is_elt_api_debug) console.log("doc: ", doc.children[0], arguments[i]);
		}
		return org_proto_documentWrite.apply(this, arguments);  
	}
};

var org_proto_documentWriteLn;
if( org_proto_documentWriteLn === undefined ) 
	org_proto_documentWriteLn = Object.getPrototypeOf(document).writeln;
Object.getPrototypeOf(document).writeln = new_proto_documentWriteLn; 
function new_proto_documentWriteLn(expr) {
	//text += "document.writeln\n";
	//if (is_elt_api_debug) console.log('documentwriteln, arg: ', arguments.length);
	if (is_elt_api_debug) console.log('documentwriteLn, arg: ', arguments.length, ", org_proto_documentWriteLn? ", org_proto_documentWriteLn);
	if (document.readyState === "complete") {
		return org_proto_documentWriteLn.apply(this, arguments); 
	}
	else {
		for (var i=0; i<arguments.length; i++) {
			var parser = new DOMParser();
			try {
				var doc = parser.parseFromString(arguments[i], "text/html");
				
				encryptDOM(doc.children[0]);
				var s = new XMLSerializer();
 				arguments[i] = s.serializeToString(doc);
			
			}
			catch(e) {
				alert("dom parser error");
			}
			
			//if (is_elt_api_debug) console.log("doc: ", doc.children[0], arguments[i]);
		}
		return org_proto_documentWriteLn.apply(this, arguments);  
	}
};


var org_document_querySelector;
if( org_document_querySelector === undefined ) 
	org_document_querySelector = Object.getPrototypeOf(document).querySelector;
Object.getPrototypeOf(document).querySelector = function(arg) {
	//text += "document.querySelector\n";	
	//var t = tokenize(arg);
	//var s = parseAListOfDeclarations(arg);
	//var s = parseADeclaration("#p");
	//if (is_elt_api_debug) console.log('org_document_querySelector, arg: ', arg, s);
	
	var re = /(\.|#|\*|,| +|>|\+|~|:)/,
		selector = arg.split(re);
	//if (is_elt_api_debug) console.log('doc query selector: ', arguments.length, arg, selector.length, selector);																										
	for (var k = 0; k < selector.length; k++) {
		if (idMap[selector[k]] && selector[k-1]==='#') {
			selector[k] = selector[k].replace(selector[k], idMap[selector[k]]);
			//rule.selectors[j] = rule.selectors[j].replace(selector[k], idMap.get(selector[k]));
		}
		if (classMap[selector[k]] && selector[k-1]==='.') {
			selector[k] = selector[k].replace(selector[k], classMap[selector[k]]);
			//rule.selectors[j] = rule.selectors[j].replace(selector[k], classMap.get(selector[k]));
		}
		if (selector[k].indexOf('[')!== -1 && selector[k].indexOf('[')!==0) {
			var ele = selector[k].substring(0, selector[k].indexOf('['));
						
			if (idMap.has(ele) && selector[k-1]==='#') {
				selector[k] = selector[k].replace(ele, idMap.get(ele));
				//rule.selectors[j] = rule.selectors[j].replace(ele, idMap.get(ele));
			}
			if (classMap.has(ele) && selector[k-1]==='.') {
				selector[k] = selector[k].replace(ele, classMap.get(ele));
				//rule.selectors[j] = rule.selectors[j].replace(ele, classMap.get(ele));
			}	
		}
	}
				
	arguments[0] = selector.toString().replace(/,/g, '');
	//if (is_elt_api_debug) console.log('doc query selector: ', arguments[0]);		
	return org_document_querySelector.apply(this, arguments);  
	
};


var org_document_querySelectorAll;
if( org_document_querySelectorAll === undefined ) 
	org_document_querySelectorAll = Object.getPrototypeOf(document).querySelectorAll;
Object.getPrototypeOf(document).querySelectorAll = function(expr) {
	//text += "document.querySelectorAll\n";		
	return org_document_querySelectorAll.apply(this, arguments); 
};

var org_element_querySelector;
if( org_element_querySelector === undefined ) 
	org_element_querySelector = Element.prototype.querySelector;
Element.prototype.querySelector = function(arg) {
	//text += "element.querySelector\n";			
	return org_element_querySelector.apply(this, arguments);  
};

var org_element_querySelectorAll;
if( org_element_querySelectorAll === undefined ) 
	org_element_querySelectorAll = Element.prototype.querySelectorAll;
Element.prototype.querySelectorAll = function(expr) {
	//text += "element.querySelectorAll\n";			
	return org_element_querySelectorAll.apply(this, arguments); 
};


var eleRepChild;
if( eleRepChild === undefined ) 
	eleRepChild = Element.prototype.replaceChild;
Element.prototype.replaceChild = function(newChild, oldChild) {
	//text += "element.replaceChild\n";
	if (is_elt_api_debug) console.log("Element.prototype.replaceChild: newChild = ", newChild);
	
	var ret = eleRepChild.apply(this, arguments);
	
	if( is_iframe( newChild ) ) {
		hook_iframeWrite( newChild, "replaceChild(newChild.id = " + newChild.id + ")" );
	}
	
	return ret;
};


var eleGetAttr;
try {
if( eleGetAttr === undefined ) 
	eleGetAttr = Element.prototype.getAttribute;
Element.prototype.getAttribute = function(attr) {
	//text += "element.getAttribute\n";
	if (attr === 'id') {
		//if (is_elt_api_debug) console.log("element.getAttribute[1]:  ", this, attr);
		return this.id;
		/*
		if (reverseIdMap[eleGetAttr.call(this, attr)]) {
			return reverseIdMap[eleGetAttr.call(this, attr)];
    	}
    	else {
        	return eleGetAttr.call(this, attr);
    	}
    	*/
    }
    else if (attr === 'className') {
    	//var classStr = eleGetAttr.call(this, attr); // ?? 
    	//var classStr = this.className; // ?? which one is correct???
    	//if (is_elt_api_debug) console.log("element.getAttribute[2]:  ", this, attr);
		return eleGetAttr.call(this, attr);
		/*
		if (classStr === null) {
    		//if (is_elt_api_debug) console.log("classstr is NOT null, ", this, classStr);
    		return classStr;
    	}
    	var	classes = classStr.split(" ");
    	
    	for (var i = 0; i<classes.length; i++) {
    		if (reverseClassMap[classes[i]]) {
				classes[i] = reverseClassMap[classes[i]];
    		}
    	}
    	return classes.join(" ");
		*/
    	
    	//return this.className;
    }
    else {
    	return eleGetAttr.call(this, attr);
    }
};
} catch(e) {
	//
}

var runtime_randomizeId = function(old_id) {
	var randNum1 = Math.floor((Math.random() * 50000) + 1);
	var randId = 'rand_id_' + randNum1;
	while (reverseIdMap[randId]) { // check whether the one is there.
		randNum1 = Math.floor((Math.random() * 50000) + 1);
		randId = 'rand_id_' + randNum1;
	}
			
	// Set id - randomized mapping in idMap
	idMap[old_id] = randId;
	reverseIdMap[randId] = old_id;
	
	if (is_elt_api_debug) console.log("new_randId = ", randId);
	return randId;
};

var eleSetAttr;
if( eleSetAttr === undefined ) 
	eleSetAttr = Element.prototype.setAttribute;
Element.prototype.setAttribute = function(attr, value) {
	//text += "element.setAttribute\n";
	if (is_elt_api_debug && log_id_class_setter_getter) console.log("Element.prototype.setAttribute(",attr,", ",value,")");
	if (attr === 'id') {
		this.id = value;
	
		if (idMap[value]) {
			eleSetAttr.call(this, attr, idMap[value]);
		}
		else {
			
			var randId = runtime_randomizeId( value );
			
			// Change id to randomized id
			eleSetAttr.call(this, attr, randId);
		}
    }
    else if (attr === 'className') {
    	this.className = value;	
    	var classes = value.split(" ");
    	for (var i=0; i<classes.length; i++) {
    		var className = classes[i];

			if( reverseClassMap[className] ) {
				continue ;
			}
    		if (!classMap[className]) {
				var randNum1 = Math.floor((Math.random() * 50000) + 1),
					randClassName = 'rand_class_' + randNum1;
				while (reverseClassMap[randClassName]) {
					randNum1 = Math.floor((Math.random() * 50000) + 1);
					randClassName = 'rand_class_' + randNum1;
				}
				if (is_elt_api_debug) console.log("Element.prototype.setAttribute:: randomize className [" + className + "] ["+ randClassName +"]");
				// Set class - randomized mapping in classMap
				classMap[className] = randClassName;
				reverseClassMap[randClassName] = className;		
				classes[i] = randClassName;	
			}
		}
		// Change class to randomized class
		eleSetAttr.call(this, attr, classes.join(" "));
    }
    else {
    	eleSetAttr.call(this, attr, value);
    }
};


var eleRemoveAttr;
if( eleRemoveAttr === undefined ) 
	eleRemoveAttr = Element.prototype.removeAttribute;
Element.prototype.removeAttribute = function(attr) {
	//text += "element.removeAttribute\n";
	if (attr === 'id') {
		var attrId = eleGetAttr.call(this, attr);
		if (attrId && idMap[attrId]) {
			delete reverseIdMap[idMap[attrId]];
			delete idMap[attrId];
    	}
        eleRemoveAttr.call(this, attr);
    }
    else if (attr === 'className') {
    	var attrClass = eleGetAttr.call(this, attr),
    		classes = attrClass.split(" ");
    	classes.forEach(function(className) {
    		if (classMap[className]) {
    			delete reverseClassMap[classMap[className]];
    			delete classMap[className];
    		}
    	});
        eleRemoveAttr.call(this, attr);
    }
    else {
    	eleRemoveAttr.call(this, attr);
    }
};


var eleByClassName;
if( eleByClassName === undefined ) 
	eleByClassName = Element.prototype.getElementsByClassName;
Element.prototype.getElementsByClassName = function(className) {
	//text += "element.getElementsByClassName\n";
	if (classMap[className]) {
        return eleByClassName.call(this, classMap[className]);
    }
    else {
        return eleByClassName.call(this, className);
    }
};


/*
var eleStyleSetter = getProperty(Element.prototype, "style").set;
var eleStyleGetter = getProperty(Element.prototype, "style").get;
Object.defineProperty(Element.prototype, 'style', {
	set: function(arg) {
		if (is_elt_api_debug) console.log("set style:", arg);
		eleStyleSetter.call(this, arg);
	},
    get: function() {
		//if (is_elt_api_debug) console.log("get style:", arg);
		return eleStyleGetter.call(this);    	
	}
});
*/

var eleIdSetter, eleIdGetter;

try {
if( eleIdSetter === undefined ) 
	eleIdSetter = getProperty(Element.prototype, "id").set;
if( eleIdGetter === undefined ) 
	eleIdGetter = getProperty(Element.prototype, "id").get;
Object.defineProperty(Element.prototype, 'id', {
	set: function(arg) {
		//text += "element.id\n";
		if (idMap[arg]) {
			eleIdSetter.call(this, idMap[arg]);
		}
		else if (reverseIdMap[arg]) {		
			eleIdSetter.call(this, arg);
		}			
		else {
			var randNum1 = Math.floor((Math.random() * 50000) + 1),
				randId = 'rand_id_' + randNum1;
			while (reverseIdMap[randId]) {
				randNum1 = Math.floor((Math.random() * 50000) + 1);
				randId = 'rand_id_' + randNum1;
			}
			
			if (is_elt_api_debug) console.log("[@Element.prototype.id.set] new_randId3 = ", randId, ", orgId = ", arg);
			//console.trace();
			// ox_8673244809_538478175
			//if( arg.indexOf("ox_") === 0 && arg.length === 23 ) {
			if(  arg.indexOf('DfaVisibilityIdentifier_1467165562606') === 0 ) {
				//var org_obj = document.getElementById(arg);
				if (is_elt_api_debug) console.log('hook here\n');
			}
			/*
			if ( arg.indexOf('google_ads_iframe_') >= 0 ||
			      arg.indexOf('combination-1') >= 0 || 
			     arg.indexOf('google_image_div') >= 0 || 
				 arg.indexOf('aw0') >= 0 ) {
			//if (arg == "google_ads_iframe_/3081/SMCO_ENCO_ON_StCathSTD_EN_WEB/homepage_1") 
			//{
				if (is_elt_api_debug) console.log("[0618] IdSetter, id: ", arg, ", randId: ", randId);
			}
			*/
			
			// Set id - randomized mapping in idMap
			idMap[arg] = randId;
			reverseIdMap[randId] = arg;
			// Change id to randomized id
			eleIdSetter.call(this, idMap[arg]);
			
			//hook_iframeWrite(document.getElementById(randId), "defineProperty(id = " + arg + ", randid = " + randId + ")" );
		}
	},
    get: function() {
    	//if (is_elt_api_debug) console.log('getter: ', eleIdGetter.call(this), reverseIdMap[eleIdGetter.call(this)]);
        //text += "element.id\n";
        if (reverseIdMap[eleIdGetter.call(this)]) {
        	return reverseIdMap[eleIdGetter.call(this)];
        }
        else {
            return eleIdGetter.call(this);
        }
	}
});
} catch (e) {
	// 
}

var eleClassNameSetter, eleClassNameGetter;
try {
if( eleClassNameSetter === undefined ) 
	eleClassNameSetter = getProperty(Element.prototype, "className").set;
if( eleClassNameGetter === undefined ) 
	eleClassNameGetter = getProperty(Element.prototype, "className").get;
Object.defineProperty(Element.prototype, 'className', {

	set: function(arg) {
		//text += "element.className\n";
		if (is_elt_api_debug && log_id_class_setter_getter) console.log("Element.prototype.className:: "+arg);
				
		var classes = arg.trim().replace(/\n/g, " " ).split(/ +/);

		
		//if (is_elt_api_debug) console.log("Object.keys(reverseClassMap).length:"+Object.keys(reverseClassMap).length);
		//if (is_elt_api_debug) console.log("Object.keys(classMap).length:"+Object.keys(classMap).length);
		//if( arg.indexOf('img_ad') >= 0 ) {
			//if (is_elt_api_debug) console.log('[0618] ClassNameSetter: ', arg);
		//}
		//if (arg.indexOf('inverse') !== -1)
			//if (is_elt_api_debug) console.log('set class name inverse: ', arg);

		//console.log("[org_arg]classNameSetter: " + arg);
		for (var i=0; i<classes.length; i++) {
			var className = classes[i];

			if( reverseClassMap[className] ) { // already randomized one
				continue;
			} else if (!classMap[className]) {
				var randNum1 = Math.floor((Math.random() * 50000) + 1),
					randClassName = 'rand_class_' + randNum1;
				while (reverseClassMap[randClassName]) {
					randNum1 = Math.floor((Math.random() * 50000) + 1);
					randClassName = 'rand_class_' + randNum1;
				}
				if (is_elt_api_debug) console.log("Element.prototype.className:: NEWLY randomize className [" + className + "] => ["+ randClassName +"]");
				// Set class - randomized mapping in classMap
				classMap[className] = randClassName;
				reverseClassMap[randClassName] = className;
				classes[i] = randClassName;
			}
			else {
				if (is_elt_api_debug && log_id_class_setter_getter) console.log("Element.prototype.className:: return ranomized className [" + classes[i] + "] => ["+ classMap[className] +"]");
				classes[i] = classMap[className];				
				
			}
		}
		var uniqueClasses = classes.filter(function(elem, pos) {
			return classes.indexOf(elem) == pos;
		});
		var new_arg = uniqueClasses.join(" ");
		//console.log("[new_arg]classNameSetter: " + new_arg);
		// Change class to randomized class
		eleClassNameSetter.call(this, new_arg);
	},
    get: function() {
    	//text += "element.className\n";
		if( reverseClassMap.length === undefined ) {
			return eleClassNameGetter.call(this);
		}


        var classStr = eleClassNameGetter.call(this),
    		classes = classStr.trim().replace(/\n/g, " " ).split(/ +/);
			
		for (var i=0; i<classes.length; i++) {
			var className = classes[i];
			if (reverseClassMap[className]) {
				classes[i] = reverseClassMap[className];
			}
		}
    	return classes.join(" ");	
	}
});
} catch(e) {
	// 
}

var eleInnerHTMLSetter;
var eleInnerHTMLGetter;
try {
if( eleInnerHTMLSetter === undefined ) 
	eleInnerHTMLSetter = getProperty(Element.prototype, "innerHTML").set;
if( eleInnerHTMLGetter === undefined ) 
	eleInnerHTMLGetter = getProperty(Element.prototype, "innerHTML").get;
Object.defineProperty(Element.prototype, "innerHTML", {
	set: function(arg) {
		//text += "element.innerHTML\n";
		var parser = new DOMParser();
		try {
			var doc = parser.parseFromString(arg, "text/html");
		}
		catch(e) {
			alert("dom parser error");
		}	
		encryptDOM(doc.children[0]);
		var s = new XMLSerializer();
 		eleInnerHTMLSetter.call(this, s.serializeToString(doc));
	},
	
    get: function() {
    	//text += "element.innerHTML\n";
    	//if (is_elt_api_debug) console.log('innerhtml getter: ', eleInnerHTMLGetter.call(this));
    	var parser = new DOMParser();
		try {
			var innerHTML = eleInnerHTMLGetter.call(this);
			var doc = parser.parseFromString(innerHTML, "text/html");
		}
		catch(e) {
			alert("dom parser error");
		}	
		decryptDOM(doc.children[0]);
		var s = new XMLSerializer();
 		return s.serializeToString(doc);
	}
	
});
} catch(e) {
	// 
}


/*
var eleClassListGetter = getProperty(Element.prototype, "classList").get;
var eleClassListSetter = getProperty(Element.prototype, "classList").set;
Object.defineProperty(Element.prototype, 'classList', {
    get: function() {
    	text += "element.classList\n";
    	return eleClassListGetter.call(this);
	},
	set: function(arg) {
		text += "element.classList\n";
		return eleClassListSetter.call(this, arg);
	}
});
var eleAttributesGetter = getProperty(Element.prototype, "attributes").get;
var eleAttributesSetter = getProperty(Element.prototype, "attributes").set;
Object.defineProperty(Element.prototype, 'attributes', {
    get: function() {
    	text += "element.attributes\n";
    	return eleAttributesGetter.call(this);
	},
	set: function(arg) {
		text += "element.attributes\n";
		return eleAttributesSetter.call(this);
	}
});


var eleClassListGetter = getProperty(Element.prototype, "classList").get;
Object.defineProperty(Element.prototype, 'classList', {
    get: function() {
    if (is_elt_api_debug) console.log('classList getter!', eleClassListGetter.call(this).constructor);
    
		var classes = eleClassListGetter.call(this);
    	
    	for (var i = 0; i < classes.length; i++) {
    		var className = classes[i];
    		//if (is_elt_api_debug) console.log('classList getter!', className, reverseClassMap[className]);
        	if (reverseClassMap[className]) {
        	if (is_elt_api_debug) console.log('classList getter!', classes, classes.remove);
        		classes.remove(className);
        		classes.add(reverseClassMap[className]);
        		i--;
        	}
        }
        var ret = clone(classes);
        
        return ret;
	}
});

var eleClassListRemove = Element.prototype.classList.remove;
Element.prototype.classList.remove = function(className) {
	
};


var eleClassListAdd = getProperty(Element.prototype, "classList").get;
Element.prototype.classList.add = function() {
	
};

var eleClassListToggle = getProperty(Element.prototype, "classList").get;
Element.prototype.classList.toggle = function() {

};

*/


try {
var attrValueSetter = getProperty(Element.prototype, "value").set;
var	attrValueGetter = getProperty(Element.prototype, "value").get;
Object.defineProperty(Element.prototype, "value", {
	set: function(arg) {
		//text += "Attr.value\n";
		if (this.name === "id") {
			if (idMap[arg]) {
				attrValueSetter.call(this, idMap[arg]);
			}
			else if(reverseIdMap[arg]) {
				attrValueSetter.call(this, arg);
			}
			else {
				var randNum1 = Math.floor((Math.random() * 50000) + 1),
					randId = 'rand_id_' + randNum1;
				while (reverseIdMap[randId]) {
					randNum1 = Math.floor((Math.random() * 50000) + 1);
					randId = 'rand_id_' + randNum1;
				}
				
				//if (arg == "google_ads_iframe_/3081/SMCO_ENCO_ON_StCathSTD_EN_WEB/homepage_1") {
					//if (is_elt_api_debug) console.log("attrValueSetter, id: ", arg, ", randId: ", randId);
				//}
				if (is_elt_api_debug) console.log("new_randId4 = ", randId);
				// Set id - randomized mapping in idMap
				idMap[arg] = randId;
				reverseIdMap[randId] = arg;
				// Change id to randomized id
				attrValueSetter.call(this, idMap[arg]);
			}
		}
		else if (this.name === "class") {
			var classes = arg.split(" ");
			for (var i=0; i<classes.length; i++) {
				var className = classes[i];
				
				if (reverseClassMap[className]) {
					continue;
				} 
				else if (!classMap[className]) {
					var randNum1 = Math.floor((Math.random() * 50000) + 1),
						randClassName = 'rand_class_' + randNum1;
					while (reverseClassMap[randClassName]) {
						randNum1 = Math.floor((Math.random() * 50000) + 1);
						randClassName = 'rand_class_' + randNum1;
					}
					if (is_elt_api_debug) console.log("Element.prototype.value(class):: randomize className [" + className + "] ["+ randClassName +"]");
					// Set class - randomized mapping in classMap
					classMap[className] = randClassName;
					reverseClassMap[randClassName] = className;
					
					classes[i] = randClassName;
				}
			}
			
			// Change class to randomized class
			attrValueSetter.call(this, classes.join(" "));
		}
		else {
			attrValueSetter.call(this, arg);
		}
	},
    get: function() {
    	//text += "Attr.value\n";
    	//if (is_elt_api_debug) console.log('attr value getter: ', attrValueGetter.call(this), this.name);
    	if (this.name === "id") {
    		if (reverseIdMap[attrValueGetter.call(this)]) {
        		return reverseIdMap[attrValueGetter.call(this)];
        	}
        	else {
            	return attrValueGetter.call(this);
        	}
    	}
    	else if (this.name === "class") {
    		var classStr = attrValueGetter.call(this),
    			classes = classStr.split(" ");
    		for (var i=0; i<classes.length; i++) {
				var className = classes[i];
    			if (reverseClassMap[className]) {
        			classes[i] = reverseClassMap[className];
        		}
    		}
    		return classes.join(" ");
    	}
    	else {
    		return attrValueGetter.call(this);
    	}
	}
});
} catch(e) {
	//console.log( "attrValueGetter/Setter are not hooked due to an exception." );
}

try {
var attrSrcSetter = getProperty(Element.prototype, "src").set;
var	attrSrcGetter = getProperty(Element.prototype, "src").get;
Object.defineProperty(Element.prototype, "src", {
	set: function(arg) {
		//text += "Src.value\n";
		if (is_elt_api_debug) console.log("set(Element.prototype.src):", arg);
		
		attrValueSetter.call(this, arg);
	},
    get: function(arg) {
    	//text += "Src.value\n";
		if (is_elt_api_debug) console.log("get(Element.prototype.src):", arg);
    	return attrValueGetter.call(this);
	}
});
} catch(e) {
	//console.log( "attrSrcSetter/Getter are not hooked due to an exception." );
}

var org_document_createElement;
if( org_document_createElement === undefined ) 
	org_document_createElement = document.createElement;
document.createElement = function() {  
	//if (is_elt_api_debug) console.log(" ===> document.createElement <=== ");
	var str = arguments[0];
	
	var ret_obj = org_document_createElement.apply(this, arguments);
	
	
	var str_lower = str.toLowerCase();
	if( str_lower === "iframe" ) {
		//if (is_elt_api_debug) console.log( "createElement[iframe]: str = " + str );
		//if (is_elt_api_debug) console.log( "createElement[iframe]: arguments = ", arguments );
	} else if( str_lower === "div" ) {
		//if (is_elt_api_debug) console.log( "createElement[div]: arguments = ", arguments );
	}
	
	//arguments[0] = result;   
	return ret_obj;
};




