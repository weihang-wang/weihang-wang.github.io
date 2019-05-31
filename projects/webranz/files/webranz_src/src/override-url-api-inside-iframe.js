var server = "50.129.86.149";
var buildProxyUrl = function( url ) {
	var ret;
	ret = "http://" + server + ":8080/WebRanz/proxy/phps/bypassUrl.php?link=" + btoa(url) + "&debug=ouaii";
	return ret;
}
var encryptURL = function(url) {
	var ret;
	if (url.startsWith('./') || url.startsWith('javascript:') || url.startsWith('file:') ) {
		return url;
	} 
	else if ((url.startsWith('http://' + server) || url.startsWith('https://' + server) ) && url.indexOf('bypassUrl.php?') > 0) {
		return url;
	}
	else if ( url.startsWith("http://" + server + ":8080/WebRanz/src/") &&  url.indexOf(".js") > 0 ) {
		return url;
	}
	else if (url.indexOf('_files/') > 0 ) {
		ret = buildProxyUrl( url );
		return ret;
	}
	else {
		//var encurl = btoa(url);
		/*
		//http://partner.googleadservices.com/gpt/pubads_impl_89.js
		if( url.indexOf('google') > 0 || url.indexOf('rubiconproject') > 0 || url.length < 110 || url.indexOf('openx.net') > 0 || url.indexOf('newsmaxfeednetwork') > 0 ) {
		} else if( url.indexOf('http://') == 0 ) {
			console.log("encryptURL(skip): [len: " + url.length + " => " + encurl.length + "] [" + url + "] => [" + encurl + "]");
			return url;
		}
		console.log("encryptURL: [len: " + url.length + " => " + encurl.length + "] [" + url + "] => [" + encurl + "]");
		*/
		ret = buildProxyUrl( url );
    	return ret;
  	}
}


var walkDOM = function(domNode) {  
	console.log('walkDom', domNode, domNode.childNodes.length, domNode.src);
	if (domNode.src) {
		if (domNode.src.indexOf("http://" + server) === -1) {
			domNode.src = encryptURL(domNode.src);
		}
	}
	if (domNode.childNodes.length > 0) {
		for (var i=0;i<domNode.childNodes.length;i++) {
			walkDOM(domNode.childNodes[i]);
		}
		return;
	}
	return;
}


var randSrc = function(htmlStr) {
	var headTag = false, bodyTag = false, ret;
	if (htmlStr.indexOf('</head>') !== -1) {
		headTag = true;
	}
	if (htmlStr.indexOf('</body>') !== -1) {
		bodyTag = true;
	}
	var parser = new DOMParser();
	var doc = parser.parseFromString(htmlStr, "text/html");
	walkDOM(doc);
	var s = new XMLSerializer();
	ret = s.serializeToString(doc);
	
	if (!headTag && !bodyTag) {
		ret = ret.substring(ret.indexOf('<head>') + 6, ret.indexOf('</head>'));
	}
	return ret;
}
	

var apnd = Element.prototype.appendChild;
Element.prototype.appendChild = function() {
	var oo = arguments[0];
	var ret;
	if (oo.nodeName.toLowerCase() === 'iframe') { 	
    	oo.addEventListener("load", function() {
    		var head = oo.contentDocument.getElementsByTagName("head")[0]; 
            var js = document.createElement("script"); 
            js.type = "text/javascript"; 
            js.src = "http://" + server + ":8080/WebRanz/src/override-url-api-inside-iframe.js";
            head.appendChild(js);
            
            //console.log("INSIDE IFRAME---- append Iframe: ------");
    		//console.log(oo.id, oo.contentWindow.document.scripts); 
        });
        if (oo.src) {
        	if (oo.src.indexOf('javascript:')!==0){
        		arguments[0].src = encryptURL(arguments[0].src);
        	}
        }
	} 

	else if (oo.nodeName.toLowerCase() === 'script' && arguments[0].src) {
		console.log('INSIDE IFRAME	appendChild: new script appended as a child');
		console.log('INSIDE IFRAME	-----original src: ', arguments[0].src);
		console.log('INSIDE IFRAME	-----encrypted src: ', encryptURL(arguments[0].src));
			                 
		var onerror = function() {
			console.log('INSIDE IFRAME	----onerror:', this.src, '---onerror-----');
		};
		var onload = function() {
			console.log('INSIDE IFRAME	-----onload:', this.src, '---onload-----');
		};
		arguments[0].addEventListener("error", onerror);	
		arguments[0].addEventListener("load", onload);		
		arguments[0].src = encryptURL(arguments[0].src);
			
	}
	else if (oo.src) {
		arguments[0].src = encryptURL(arguments[0].src);
	}	
	ret = apnd.apply(this, arguments);
	return ret;
};


var instB = Element.prototype.insertBefore;
Element.prototype.insertBefore = function() {
	var oo = arguments[0];
	var ret;
				
	if (oo.nodeName.toLowerCase() === 'iframe') { 
		oo.addEventListener("load", function() {
			var head = oo.contentDocument.getElementsByTagName("head")[0]; 
			var js = document.createElement("script"); 
			js.type = "text/javascript"; 
			js.src = "http://" + server+ ":8080/WebRanz/src/override-url-api-inside-iframe.js";
			head.appendChild(js);
           	
           	console.log("INSIDE IFRAME---- insert Iframe: ------");
           	console.log(oo.id, oo.contentWindow.document.scripts); 
		});
		if (oo.src) {
        	if (oo.src.indexOf('javascript:')!==0){
        		arguments[0].src = encryptURL(arguments[0].src);
        	}
        }
	}
		
	else if (oo.nodeName.toLowerCase() === 'script' && arguments[0].src) {
		console.log('INSIDE IFRAME	insertBefore: new script is inserted');
		console.log('INSIDE IFRAME	----original: ', arguments[0].src);
		console.log('INSIDE IFRAME	----encrypted: ', encryptURL(arguments[0].src));
		var onerror = function() {
			console.log('----onerror:', this.src, '---onerror-----');
		};
		var onload = function() {
			console.log('-----onload:', this.src, '---onload-----');
		};
		arguments[0].addEventListener("error", onerror);	
		arguments[0].addEventListener("load", onload);	
		arguments[0].src = encryptURL(arguments[0].src);
  	}	
  	else if (oo.src) {
		arguments[0].src = encryptURL(arguments[0].src);
	}	
  	ret = instB.apply(this, arguments);
  	return ret;
};

	
var docW = document.write;
document.write = function() {  

	var ret;
	var overrideScript = "<script src=\"http://" + server + ":8080/WebRanz/src/override-url-api-inside-iframe.js\">\<\/script>";
	for (var i=0; i<arguments.length; i++) {
		console.log("--- document write inside iframe: ---", arguments[i]);
		arguments[i] = overrideScript + arguments[i];
		arguments[i] = randSrc(arguments[i]);
		//console.log("--- document write inside iframe: ---", arguments[i]);
	}
	var waitMs = function(ms){
		var start = new Date().getTime();
		var end = start;
		while(end < start + ms) {
			end = new Date().getTime();
		}
	}
	//waitMs(20000);
	ret = docW.apply(this, arguments);
	return ret;
	
};
