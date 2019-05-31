var is_url_api_debug = true; // toggle this to turn on / off for global controll

if( typeof(idMap) === 'undefined' ) { 	var idMap = {}; }
if( typeof(reverseIdMap) === 'undefined' ) { 	var reverseIdMap = {}; }
if( typeof(classMap) === 'undefined' ) { 	var classMap = {}; }
if( typeof(reverseClassMap) === 'undefined' ) { 	var reverseClassMap = {}; }	

// ================ resource names ===================
var webranz_server 			= "50.129.86.149:8080";
var webranz_js_folder 		= "http://" + webranz_server + "/WebRanz/src/";
var webranz_bypassurl_php	= "http://" + webranz_server + "/WebRanz/proxy/phps/bypassUrl.php?link=";
var webranz_bypassurl_file	= 'bypassUrl.php?';
var webranz_js_override_url = "http://" + webranz_server + "/WebRanz/src/override-url-api.js";
var webranz_js_override_elt = "http://" + webranz_server + "/WebRanz/src/override-elt-api.js";
// =====================================================

var eleIdSetter, eleClassNameSetter;

function buildProxyUrl( input_url ) {
	var ret;
	ret = webranz_bypassurl_php + btoa(input_url);
	return ret;
}

function encryptURL(input_url, debugloc) {
	var ret = input_url;
	if ( startsWith(input_url, "./") === true || is_inline_js(input_url) === true || startsWith(input_url, "file:") === true ) {
		return ret;
	} 
	else if ( (startsWith(input_url, "http://" + webranz_server) === true || startsWith(input_url, "'https://" + webranz_server) === true ) && input_url.indexOf(webranz_bypassurl_file) > 0) {
		return ret;
	}
	else if ( startsWith(input_url, webranz_js_folder) === true &&  input_url.indexOf(".js") > 0 ) {
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
			if( is_url_api_debug ) console.log("encryptURL(skip): [len: " + url.length + " => " + encurl.length + "] [" + url + "] => [" + encurl + "]");
			return url;
		}
		if( is_url_api_debug ) console.log("encryptURL: [len: " + url.length + " => " + encurl.length + "] [" + url + "] => [" + encurl + "]");
		*/
		//if( is_url_api_debug ) console.log("url: ", url, "=>", buildProxyUrl( url ));
		ret = buildProxyUrl( input_url ) + "&debug=" + debugloc;
    	return ret;
  	}
	return ret;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
////
//// utilitiy functions
////
////////////////////////////////////////////////////////////////////////////////////////////////////
function hook_log( bef, after, debug_loc ) {
	if( is_url_api_debug ) { 
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
	
}

function get_iframe_contentDocument(iframe_obj) {
	var fw = null;
	try {
		fw = iframe_obj.contentWindow ? iframe_obj.contentWindow.document : iframe_obj.contentDocument;
	} catch(e) {
		fw = null;
	}
	return fw;
}

function randSrc(htmlStr) {
	if (typeof htmlStr != 'string') 
		if( is_url_api_debug ) console.log('>> non string parameter: ', htmlStr, typeof htmlStr);
		
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

function isNativeFunction(fn) {
	return (/\{\s*\[native code\]\s*\}/).test('' + fn);
}

function walkDOM(domNode) {  
	if (domNode.src) {
		if (domNode.src.indexOf("http://" + webranz_server) === -1) {
			domNode.src = encryptURL(domNode.src, "urlapi120");
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

function startsWith(str, tocheck)
{
	if( str.substring(0,tocheck.length) === tocheck ) {
		return true;
	}
	return false;
}

function endsWith(str, tocheck)
{
	if( str.substring(str.length - tocheck.length,str.length) === tocheck ) {
		return true;
	}
	return false;
}



function isEmptyIframe(w) {
	var h = w.children[0].children[0],
	b = w.children[0].children[1];
	if (h.children.length === 0 && b.children.length === 0) {
		//console.log(true, w.children[0]);
		return true;
	}
	else {
		//console.log(false, w.children[0]);
		return false;
	}	
}

function is_inline_js(strinput) {
	if( startsWith(strinput, "javascript:") === true )
		return true;
	return false;	
} 

function getProperty(obj, property) {
	var fnProp = function(prop){
        	if (prop === property) {
            	tmpProp = prop;
                tmpObj = curr;
            }
        };
	var tmpProp, tmpObj;
	var curr = obj;
    do {
		var props = Object.getOwnPropertyNames(curr);
        props.forEach(fnProp);
    } while(curr = Object.getPrototypeOf(curr));
    return Object.getOwnPropertyDescriptor(tmpObj, tmpProp);
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
		if( eleIdSetter === undefined ||  eleClassNameSetter === undefined ) return ; 

		
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



////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////
//
// Randomize Div ID
//
function runtime_randomizeId(old_id) {
	var randNum1 = Math.floor((Math.random() * 50000) + 1);
	var randId = 'rand_id_' + randNum1;
	while (reverseIdMap[randId]) { // check whether the one is there.
		randNum1 = Math.floor((Math.random() * 50000) + 1);
		randId = 'rand_id_' + randNum1;
	}
	
	// Set id - randomized mapping in idMap
	idMap[old_id] = randId;
	reverseIdMap[randId] = old_id;
	
	if( is_url_api_debug ) console.log("new_randId1 = ", randId);
	
	return randId;
}

function Randomize_FlashObject_Id(result) {
	//<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0" ID=flashad WIDTH=300 HEIGHT=250><PARAM NAME=movie VALUE="https://tpc.googlesyndication.com/pagead/imgad?id=CICAgMCuhOvJbhABGAEyCJCrkVyPxl0Z"><PARAM NAME=FlashVars Value="&clickTag=https%3A%2F%2Fadclick.g.doubleclick.net%2Faclk%3Fsa%3DL%26ai%3DBrHTNg2YcVr7UBIbcwQGBqZ6QDPbpkfQDAAAAEAEgADgAWIaQsc6RAWDJtr2I9KOcEoIBF2NhLXB1Yi0xMDI3MDI4MjUyNjE3Mzg2sgEOd3d3LnVvbC5jb20uYnK6AQlnZnBfaW1hZ2XIAQnaARZodHRwOi8vd3d3LnVvbC5jb20uYnIvqQLoehxHgNSRPsACAuACAOoCGi84ODA0L3VvbC9ob21lLzMwMHgyNTBfdG9w-AKB0h6QA-ADmAOcBKgDAdAEkE7gBAGQBgGgBh_YBwA%26num%3D0%26cid%3D5GhSMasKYYGgHbOoKsIl7g_N%26sig%3DAOD64_1LA-6rxKJnZgUiSNhLc8MA7X9iSg%26client%3Dca-pub-1027028252617386%26adurl%3Dhttp%3A%2F%2Fclicklogger.rm.uol.com.br%2F%3Fprd%3D247%26grp%3Dsrc%3A10%3Bchn%3A0%3Bcpg%3ALoiraQuente%3Bsize%3A34%3Bcreative%3A300x250_UOLPrive_LoiraQuente%26msr%3DCliques%2520de%2520Origem%3A1%26oper%3D11%26redir%3Dhttp%3A%2F%2Fsexo.uol.com.br%2Fprive"><PARAM NAME=quality VALUE=high><param name="wmode" value="opaque"><PARAM NAME="allowScriptAccess" VALUE="always"><EMBED src="https://tpc.googlesyndication.com/pagead/imgad?id=CICAgMCuhOvJbhABGAEyCJCrkVyPxl0Z" flashvars="&clickTag=https%3A%2F%2Fadclick.g.doubleclick.net%2Faclk%3Fsa%3DL%26ai%3DBrHTNg2YcVr7UBIbcwQGBqZ6QDPbpkfQDAAAAEAEgADgAWIaQsc6RAWDJtr2I9KOcEoIBF2NhLXB1Yi0xMDI3MDI4MjUyNjE3Mzg2sgEOd3d3LnVvbC5jb20uYnK6AQlnZnBfaW1hZ2XIAQnaARZodHRwOi8vd3d3LnVvbC5jb20uYnIvqQLoehxHgNSRPsACAuACAOoCGi84ODA0L3VvbC9ob21lLzMwMHgyNTBfdG9w-AKB0h6QA-ADmAOcBKgDAdAEkE7gBAGQBgGgBh_YBwA%26num%3D0%26cid%3D5GhSMasKYYGgHbOoKsIl7g_N%26sig%3DAOD64_1LA-6rxKJnZgUiSNhLc8MA7X9iSg%26client%3Dca-pub-1027028252617386%26adurl%3Dhttp%3A%2F%2Fclicklogger.rm.uol.com.br%2F%3Fprd%3D247%26grp%3Dsrc%3A10%3Bchn%3A0%3Bcpg%3ALoiraQuente%3Bsize%3A34%3Bcreative%3A300x250_UOLPrive_LoiraQuente%26msr%3DCliques%2520de%2520Origem%3A1%26oper%3D11%26redir%3Dhttp%3A%2F%2Fsexo.uol.com.br%2Fprive" quality=high allowScriptAccess="always" NAME=flashad swLiveConnect=TRUE WIDTH=300 HEIGHT=250 TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" WMODE="opaque"></EMBED></OBJECT> override-elt-api.js:100:4

	var sp = " id=";
	var ep = " ";
	var curpos = 0;
	var result_lc = result.toLowerCase();
	while(true) {
		if( result_lc.indexOf('<object ', curpos) >= 0 && result_lc.indexOf('</object>', curpos) > 0 &&
			result_lc.indexOf('flashvars', curpos) >= 0 && result_lc.indexOf(sp, curpos) >= 0 ) {
			var pos = result_lc.indexOf(sp, curpos);
			var pos_end = result_lc.indexOf(ep, pos+sp.length);
			if( pos != -1 && pos_end != -1 ) {
				var old_id = result.substring(pos+sp.length, pos_end);
				var new_id = "rand_obj_" + Math.floor((Math.random() * 50000) + 1);

				if( old_id === "flashad" ) {
					var b1 = result.substring(0, pos+sp.length);
					var b2 = result.substr(pos_end);

					result = b1 + new_id + b2;

				}
				
				result_lc = result.toLowerCase();
				curpos = b1.length + new_id.length + ep.length;
			} else {
				curpos = pos + sp.length + ep.length;
			}		
		} else {
			break;
		}
	}

	return result;
}
function Randomize_Div_Id(input, id_to_comp) {
	var input_low = input.toLowerCase();
	var idx, idx_end, idx_id;
	var idx_id_begin = -1, idx_id_end;
	var id_name_found = false;
	var id_name;
	
	idx = input_low.indexOf('<div');
	if( idx !== -1 ) {
		idx_end = input_low.indexOf('>', idx+1);
	}
	
	if( idx !== -1 && idx_end !== -1 ) {
		idx_id = input_low.indexOf('id =', idx+1);
		if( idx_id !== -1 && idx_id < idx_end ) {
			idx_id_begin = idx_id + 4;
		}
		if( idx_id_begin === -1 ) {
			idx_id = input_low.indexOf('id=', idx+1);
			if( idx_id !== -1 && idx_id < idx_end ) {
				idx_id_begin = idx_id + 3;
			}
		}
	}
	
	if( idx_id_begin !== -1 ) {
		// id found...
		if( id_name_found === false ){
			idx_id_begin = input_low.indexOf('\"', idx_id_begin);
			if( idx_id_begin !== -1 && idx_id_begin < idx_end ) {
				idx_id_end = input_low.indexOf('\"', idx_id_begin + 1);
				id_name = input.substr( idx_id_begin, idx_id_end-idx_id_begin+1);
				//console.log("1[" + id_name + "]");
				id_name_found = true;
			}
		}
		
		if( id_name_found === false ){
			idx_id_begin = input_low.indexOf('\'', idx_id_begin);
			if( idx_id_begin !== -1 && idx_id_begin < idx_end ) {
				idx_id_end = input_low.indexOf('\'', idx_id_begin + 1);
				id_name = input.substr( idx_id_begin, idx_id_end-idx_id_begin+1);
				//console.log("2[" + id_name + "]");
				id_name_found = true;
			}
		}
	}
	
	//console.log(id_name_found);
	if( id_name_found ) {
		if( id_name.indexOf(id_to_comp) !== -1 ) {
			if( (startsWith(id_name, "\"") === true && endsWith(id_name, "\"") === true) ||
				(startsWith(id_name, "\'") === true && endsWith(id_name, "\'") === true) ) {
				id_name = id_name.substr( 1, id_name.length-2 );
			}
			
			if( is_url_api_debug ) console.log( "Randomize_Div_Id(old):", input);
			var new_id = runtime_randomizeId( id_name );
			input = input.replace( id_name, new_id );
			
			if( is_url_api_debug ) console.log( "Randomize_Div_Id(mod):", id_name, "=>", new_id);
			if( is_url_api_debug ) console.log( "Randomize_Div_Id(new):", input);			
			
		}
	}
	
	return input;
}
////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////
//
// Replace SRC URL.
//
// case insensitive version.
function replaceSrcURL_debug(str, startPattern, doubleQuote, debugloc) {
	var result = "";
	var sIdx = 0;
	var pIdx = 0;
	var url = "";
	var str_lc = str.toLowerCase();
	sIdx = str_lc.indexOf(startPattern, pIdx);   
	while (sIdx != -1) {
		if (str.substring(sIdx+startPattern.length, sIdx+startPattern.length+1) == "'") {
			result = result + str.substring(pIdx, sIdx + startPattern.length+1);
			if( is_url_api_debug ) console.log("	>>		randsrcurl: ", pIdx, sIdx, startPattern, result, "debugloc: ", debugloc);
			pIdx = sIdx + startPattern.length + 1;
			sIdx = str_lc.indexOf(startPattern, pIdx);
			continue;
		}
		else if (str_lc.substring(sIdx+startPattern.length).indexOf("about:blank") === 0) {
			result = result + str.substring(pIdx, sIdx + startPattern.length+12);
			if( is_url_api_debug )console.log("	>>		randsrcurl: ", pIdx, sIdx, startPattern, result, "debugloc: ", debugloc);
			pIdx = sIdx + startPattern.length + 12;
			sIdx = str_lc.indexOf(startPattern, pIdx);
			continue;
		}
		result = result + str.substring(pIdx, sIdx + startPattern.length);
    	if (doubleQuote) {
    		pIdx = str.indexOf("\"", sIdx + startPattern.length);
    	}
    	else {
    		pIdx = str.indexOf("'", sIdx + startPattern.length);
    	}
		
		if( pIdx != -1 ) {
			url = str.substring(sIdx + startPattern.length, pIdx);
			if( is_url_api_debug ) console.log(">> [", startPattern, "] url = ", sIdx, pIdx, url, doubleQuote, "debugloc: ", debugloc);    
			result = result + encryptURL(url, "replaceurl" + debugloc);
			//console.log(">> [ret]: url: ",url, "=>", encryptURL(url), "debugloc: ", debugloc);
			sIdx = str_lc.indexOf(startPattern, pIdx); 
		} else {
			url = str.substring(sIdx + startPattern.length, pIdx);

			if( is_url_api_debug ) console.log(">> *incomplete source* [ret]: url: ",url,"debugloc: ", debugloc);
			pIdx = sIdx + startPattern.length;
			sIdx = str_lc.indexOf(startPattern, pIdx);
		}
		
    }
    result = result + str.substring(pIdx);
    return result;
}

// case insensitive version.
function replaceSrcURL(str, startPattern, doubleQuote) {
	var result = "";
	var url = "";
	var sIdx = 0;
	var pIdx = 0;
	var str_lc = str.toLowerCase();
	sIdx = str_lc.indexOf(startPattern, pIdx);   
	while (sIdx != -1) {
		if (str.substring(sIdx+startPattern.length, sIdx+startPattern.length+1) == "'") {
			result = result + str.substring(pIdx, sIdx + startPattern.length+1);
			if( is_url_api_debug ) console.log("	>>		randsrcurl: ", pIdx, sIdx, startPattern, result);
			pIdx = sIdx + startPattern.length + 1;
			sIdx = str_lc.indexOf(startPattern, pIdx);
			continue;
		}
		else if (str_lc.substring(sIdx+startPattern.length).indexOf("about:blank") === 0) {
			result = result + str.substring(pIdx, sIdx + startPattern.length+12);
			if( is_url_api_debug ) console.log("	>>		randsrcurl: ", pIdx, sIdx, startPattern, result);
			pIdx = sIdx + startPattern.length + 12;
			sIdx = str_lc.indexOf(startPattern, pIdx);
			continue;
		}
		result = result + str.substring(pIdx, sIdx + startPattern.length);
    	if (doubleQuote) {
    		pIdx = str.indexOf("\"", sIdx + startPattern.length);
    	}
    	else {
    		pIdx = str.indexOf("'", sIdx + startPattern.length);
    	}
		if( pIdx != -1 ) {
			url = str.substring(sIdx + startPattern.length, pIdx);
			if( is_url_api_debug ) console.log(">> [", startPattern, "] url = ", sIdx, pIdx, url, doubleQuote);    
			result = result + encryptURL(url, "replacesrcurl");
			//console.log(">> [ret]: url: ",url, "=>", encryptURL(url), "debugloc: ", debugloc);
			sIdx = str_lc.indexOf(startPattern, pIdx); 
		} else {
			url = str.substring(sIdx + startPattern.length, pIdx);

			if( is_url_api_debug ) console.log(">> *incomplete source* [ret]: url: ",url);
			pIdx = sIdx + startPattern.length;
			sIdx = str_lc.indexOf(startPattern, pIdx);
		}
		
    }
    result = result + str.substring(pIdx);
    return result;
}

/*
function replaceSrcURL(str, startPattern, doubleQuote) {
	var result = "";
	var sIdx = 0;
	var pIdx = 0;
	sIdx = str.indexOf(startPattern, pIdx);   
	while (sIdx != -1) {
		if (str.substring(sIdx+startPattern.length, sIdx+startPattern.length+1) == "'") {
			result = result + str.substring(pIdx, sIdx + startPattern.length+1);
			if( is_url_api_debug ) console.log("	>>		randsrcurl: ", pIdx, sIdx, startPattern, result);
			pIdx = sIdx + startPattern.length + 1;
			sIdx = str.indexOf(startPattern, pIdx);
			continue;
		}
		else if (str.substring(sIdx+startPattern.length).indexOf("about:blank") === 0) {
			result = result + str.substring(pIdx, sIdx + startPattern.length+12);
			if( is_url_api_debug ) console.log("	>>		randsrcurl: ", pIdx, sIdx, startPattern, result);
			pIdx = sIdx + startPattern.length + 12;
			sIdx = str.indexOf(startPattern, pIdx);
			continue;
		}
		result = result + str.substring(pIdx, sIdx + startPattern.length);
    	if (doubleQuote) {
    		pIdx = str.indexOf("\"", sIdx + startPattern.length);
    	}
    	else {
    		pIdx = str.indexOf("'", sIdx + startPattern.length);
    	}
    	var url = str.substring(sIdx + startPattern.length, pIdx);
    	if( is_url_api_debug ) console.log(">> [", startPattern, "] url = ", sIdx, pIdx, url, doubleQuote);    
    	result = result + encryptURL(url);    
    	sIdx = str.indexOf(startPattern, pIdx);   
    }
    result = result + str.substring(pIdx);
    return result;
};
*/


var replaceStr = "function replaceSrcURL(str,startPattern,doubleQuote){var result=&quot;&quot;;var sIdx=0;var pIdx=0;sIdx=str.indexOf(startPattern,pIdx);while(sIdx!=-1){result=result+str.substring(pIdx,sIdx+startPattern.length);if(doubleQuote){pIdx=str.indexOf(&apos;&quot;&apos;,sIdx+startPattern.length);}else{pIdx=str.indexOf(\"&apos;\",sIdx+startPattern.length);}var url=str.substring(sIdx+startPattern.length,pIdx);result=result+encryptURL(url+\"var_replacestr\");sIdx=str.indexOf(startPattern,pIdx);}result=result+str.substring(pIdx);return result;}";
var docWStr = "var docW=document.write;document.write=function(){var str=arguments[0];var result=replaceSrcURL(str,&apos; src = \"&apos;,true);result=replaceSrcURL(result,&apos; src=\"&apos;,true);result=replaceSrcURL(result,&quot; src = &apos;&quot;,false);result=replaceSrcURL(result,&quot; src=&apos;&quot;,false);if(result.indexOf(\"<head>\")!=-1){var b1=result.substring(0,result.indexOf(\"<head>\")+6);var b2=result.substring(result.indexOf(\"<head>\")+6);result=b1+\"<script src=&apos;"+webranz_js_override_url+"&apos;>\<\/script>\<!--dl1--\>\"+b2;}arguments[0]=result;return docW.apply(this,arguments);};";

function do_reaplceSrcURL_debug( str, debug_loc ) {
	var result = str;	
	//var result2 = str;

	result = replaceSrcURL_new_debug(result, "src", debug_loc);
	//
	/*
	result = replaceSrcURL_debug(result, " src = \"", true, debug_loc+"-1");
    result = replaceSrcURL_debug(result, " src=\"", true, debug_loc+"-2");
	result = replaceSrcURL_debug(result, " src =\"", true, debug_loc+"-3");
	result = replaceSrcURL_debug(result, " src= \"", true, debug_loc+"-4");
        		
	result = replaceSrcURL_debug(result, " src = '", false, debug_loc+"-5");
  	result = replaceSrcURL_debug(result, " src='", false, debug_loc+"-6");
	result = replaceSrcURL_debug(result, " src= '", false, debug_loc+"-7");
    result = replaceSrcURL_debug(result, " src ='", false, debug_loc+"-8");
	*/
	return result;
}

function check_same_script_exist(input_text, to_search) {	
	var pos_existing = input_text.indexOf( to_search );
	if( pos_existing != -1 ) { 
		return true; // exist
	}
	return false; // not exist
}

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


function do_insert_script_at_head(result, debug_loc) {
	var result_lc = result.toLowerCase();
	if (result_lc.indexOf("<head>") != -1) {
		var b1 = result.substring(0, result_lc.indexOf("<head>") + 6);
		var b2 = result.substring(result_lc.indexOf("<head>") + 6);
		var pos_head_end = result_lc.indexOf("</head>");
		
		var before_head_end = result_lc;
		if( pos_head_end != -1 ) before_head_end = result_lc.substring(0, pos_head_end);
		
		var new_scripts = "";
		var webranz_script = [  "\<script" + " src=\"" + webranz_js_override_url + "\">" , 
								"\<script" + " src=\"" + webranz_js_override_elt + "\">"];
		webranz_script.forEach(function (item, index, array) {
			if( check_same_script_exist(before_head_end, item) === false ) { 
				new_scripts = new_scripts + item + "\<\/script>\<!--dl" + debug_loc + "--\>";
			}
		});
		result = b1 + new_scripts + b2;		
    }
	
	return result;
}


function is_white_space(str, index) {
	switch( str.charAt(index) ) {
	case ' ': case '\t': case '\r': case '\n': 
		return true;
	default: 
		break;
	}
	return false;
}
function count_white_space(str, fromidx) {
	var cnt = 0;
	var i;
	for( i = fromidx; i < str.length; i++ ) {
//		if( is_url_api_debug ) console.log("[count_white_space] str.charAt(" + i + ") = " + str.charAt(i) );
		if( is_white_space(str, i) === true ) {
			cnt++;
		} else {
			break;
		}
	}
	return cnt;
}
function whitespace_prefix_indexOf(str, to_find, idx) {
	while( true ) {
		var curidx = str.indexOf(to_find, idx);
		if( curidx == -1 ) return -1; // not found
		if( is_white_space(str, curidx-1) ) { // found
			return curidx-1;
		} else { // not matched, try again
			idx = curidx + 1 + str.length;
		}
	}
	return -1;
}

function replaceSrcURL_new_debug(str, propName, debugloc) {
	//if( is_url_api_debug ) console.log("replaceSrcURL_new_debug - begin");
	var ret = replaceSrcURL_new_debug_impl(str, propName, debugloc);
	//if( is_url_api_debug ) console.log("replaceSrcURL_new_debug - end");
	return ret;
}
function  replaceSrcURL_new_debug_impl(str, propName, debugloc) {
	var sIdx = 0;
	var cIdx = 0;
	var incomplete_src = 0;

	var str_lc = str.toLowerCase();
	propName = propName.trim();
	// ====
	sIdx = whitespace_prefix_indexOf( str_lc, propName, 0 );
	var propName_Length = propName.length + 1;
	// ---
	//propName = " " + propName;
	//sIdx = str_lc.indexOf(propName);
	//var propName_Length = propName.length;
	// ====
	

	while (sIdx != -1) {
		var pos_src_begin = sIdx;
		var pos_src_end;
		var pos_url_begin;
		var pos_url_end;
		
		cIdx = sIdx + propName_Length; // right after the propName
		var wspace = count_white_space(str_lc, cIdx); 
		cIdx += wspace; // right before =
		var str_equal = str.substring((cIdx), (cIdx)+1); // '='
		//if( is_url_api_debug ) console.log("wspace:[" +wspace+"]");
		//if( is_url_api_debug ) console.log("str_equal:["+str_equal+"]");
		if( str_equal !== "=" ) { // "src =" pattern
			// ==== <============================================================================================================
			//sIdx = str_lc.indexOf(propName, cIdx); // try next propName
			// ---
			sIdx = whitespace_prefix_indexOf( str_lc, propName, cIdx ); // try next propName
			// ====
			continue;
		}
		cIdx++; // pass '='

		wspace = count_white_space(str_lc, cIdx); 
		cIdx += wspace; // right before the url after '=', mostly \" or \'
		var ch_q = str.charAt(cIdx);
		if( ch_q !== '\"' && ch_q !== '\'' ) {
			// ==== <============================================================================================================
			//sIdx = str_lc.indexOf(propName, cIdx); // try next propName.
			// ---
			sIdx = whitespace_prefix_indexOf( str_lc, propName, cIdx ); // try next propName.
			// ===
			//if( is_url_api_debug ) console.log("str_q incorrect");
			continue;
		}
		cIdx++;
		pos_url_begin = cIdx;
		// all patterns are correct.
		pos_src_end = str_lc.indexOf(ch_q, cIdx+1);
		pos_url_end = pos_src_end;

		if( pos_src_end == -1 ) { // this is incomplete tag.
			incomplete_src++;
			// ==== <============================================================================================================
			//sIdx = str_lc.indexOf(propName, cIdx); // try next.
			//--
			sIdx = whitespace_prefix_indexOf( str_lc, propName, cIdx );
			// ===
			if( is_url_api_debug ) console.log("***********************************************");
			if( is_url_api_debug ) console.log(" *** incomplete tag detected ***  ", debugloc);
			if( is_url_api_debug ) console.log("Input: " + str);
			if( is_url_api_debug ) console.log("***********************************************");
			continue;
		}
		pos_src_end++; // pass '''

		var str_old_url = str.substring(pos_url_begin, pos_url_end);

		var idx_blank = str_old_url.toLowerCase().indexOf("about:blank");
		var idx_http = str_old_url.toLowerCase().indexOf("http");
		var idx_bypassurl = str_old_url.indexOf(webranz_bypassurl_php);
		var idx_our_js = str_old_url.indexOf(webranz_js_folder);
		if( idx_blank === 0 || idx_http !== 0 || idx_bypassurl !== -1 || idx_our_js !== -1  ) {
			// ==== <============================================================================================================
			//sIdx = str_lc.indexOf(propName, pos_src_end); // try next.
			//---
			sIdx = whitespace_prefix_indexOf( str_lc, propName, pos_src_end );
			// ===
			continue;
		}
		var str_new_url = encryptURL(str_old_url, "replacesrc_new" + debugloc);

		//if( is_url_api_debug ) console.log("...src...[" + str.substring(pos_src_begin, pos_src_end) + "]");
		if( is_url_api_debug ) console.log("...old url...[" + str_old_url + "], idxs(", idx_blank, idx_http, idx_bypassurl, ")", debugloc);
		if( is_url_api_debug ) console.log("...new_url...[" + str_new_url + "], ", debugloc);

		
		var s1 = str.substring(0, pos_url_begin);
		var s2 = str.substring(pos_url_end);
		str = s1 + str_new_url + s2;

		pos_src_end = s1.length + str_new_url.length + 1;

		str_lc = str.toLowerCase();
		// ==== <============================================================================================================
		//sIdx = str_lc.indexOf(propName, pos_src_end); // try next.
		//---
		sIdx = whitespace_prefix_indexOf( str_lc, propName, pos_src_end );
		//===		
		continue;
    }
    return str;
}

function is_incomplete_tag(str, propName, debugloc) {
	var sIdx = 0;
	var cIdx = 0;
	var incomplete_src = 0;

	var str_lc = str.toLowerCase();
	propName = propName.trim();
	propName = " " + propName;
	sIdx = str_lc.indexOf(propName);   

	while (sIdx != -1) {
		var pos_src_begin = sIdx;
		var pos_src_end;
		var pos_url_begin;
		var pos_url_end;

		cIdx = sIdx + propName.length;
		var wspace = count_white_space(str_lc, cIdx);
		cIdx += wspace;
		var str_equal = str.substring((cIdx), (cIdx)+1);
		//if( is_url_api_debug ) console.log("wspace:[" +wspace+"]");
		//if( is_url_api_debug ) console.log("str_equal:["+str_equal+"]");
		if( str_equal !== "=" ) { // "src =" pattern
			sIdx = str_lc.indexOf(propName, cIdx ); // try next.
			continue;
		}
		cIdx++; // pass '='

		wspace = count_white_space(str_lc, cIdx);
		cIdx += wspace;
		var str_q = str.substring((cIdx), (cIdx)+1);
		//if( is_url_api_debug ) console.log("str_q:["+str_q+"]");

		if( str_q !== "\"" && str_q !== "'" ) {
			sIdx = str_lc.indexOf(propName, cIdx); // try next.
			//if( is_url_api_debug ) console.log("str_q incorrect");
			continue;
		}
		cIdx++;
		pos_url_begin = cIdx;
		// all patterns are correct.
		pos_src_end = str_lc.indexOf(str_q, cIdx+1);
		pos_url_end = pos_src_end;

		if( pos_src_end == -1 ) { // this is incomplete tag.
			incomplete_src++;
			sIdx = str_lc.indexOf(propName, cIdx); // try next.
			//if( is_url_api_debug ) console.log("incomplete tag");
			return true;
			//continue;
		}
		pos_src_end++; // pass '''
		sIdx = str_lc.indexOf(propName, pos_src_end); // try next.
		continue;
		/*
		var str_old_url = str.substring(pos_url_begin, pos_url_end);
		//if( is_url_api_debug ) console.log("...src...[" + str.substring(pos_src_begin, pos_src_end) + "]"); 
		//if( is_url_api_debug ) console.log("...url...[" + str_old_url + "]");

		//if( str_old_url.toLowerCase().indexOf("about:blank") === 0 ) {
			
			//continue;
		//}
		var str_new_url = "dummy";//encryptURL(str_old_url);

		var s1 = str.substring(0, pos_url_begin);
		var s2 = str.substring(pos_url_end);
		str = s1 + str_new_url + s2;

		pos_src_end = s1.length + str_new_url.length + 1;

		str_lc = str.toLowerCase();
		sIdx = str_lc.indexOf(propName, pos_src_end); // try next.
		continue;
		*/
    }
    //return str;
	if( incomplete_src > 0 ) {
		return true;
	}
	return false;
}


////////////////////////////////////////////////////////////////////////
//
// HOOK FUNCTIONS: iframe.contentDocument.write
//
// ===============================================================
function new_iframe_documentWrites(str, fnname, debugloc) {
	var result = do_reaplceSrcURL_debug(str, debugloc);
	result = do_insert_script_at_head(result, debugloc);
	hook_log( str, result, fnname );
	return result;
}
// ===============================================================

////////////////////////////////////////////////////////////////////////
//
// HOOK FUNCTIONS: appendChild
//
////////////////////////////////////////////////////////////////////////
var hook_appendChild = true;

var org_appendChild;
if( org_appendChild === undefined ) 
	org_appendChild = Element.prototype.appendChild;

Element.prototype.appendChild = new_appendChild; 
function new_appendChild() {
	var oo = arguments[0];
	var ret;
	
	//if( is_url_api_debug ) console.log( "appendChild:: ", oo, ", has src? ", oo.hasAttribute("src"), ", has nodeNode? " );
	if( hook_appendChild === false ) {
		return org_appendChild.apply(this, arguments);
	}
	
	if( oo === null ) {
		ret = org_appendChild.apply(this, arguments);
		return ret;
	}
	
	//
	// oo.hasAttribute("nodeName")
	// 
	var has_src = false, is_iframe = false;
	try {
		if( oo.hasAttribute("src") === true ) 		 has_src = true;
	} catch (e) { /**/ }
	try { 		
		if( oo.nodeName.toLowerCase() === 'iframe' ) is_iframe = true;
	} catch (e) { /**/ }
		
	
	if ( is_iframe ) {
		if( is_url_api_debug ) console.log("[Insert iframe @ appendChild] obj:", oo, ", id:", oo.id);
		oo.addEventListener("load", function() {
			try {
				if( is_url_api_debug ) console.log("---- append Iframe [", oo.id, "] onload ----"); 
				var fw = get_iframe_contentDocument(oo);
				if( fw ) {
					var org_iframe_documentWrite = fw.write;
					fw.write = function() {  
						if( is_url_api_debug ) console.log(">>	>> [iframe.document.write AFTER LOAD @ appendChild] # args: ", arguments.length, ", obj: ", this);
						arguments[0] = new_iframe_documentWrites(arguments[0], "[hooked at appendChild] iframe.contentWindow.document.write", "1");
						return org_iframe_documentWrite.apply(this, arguments);
					};
			
					var org_iframe_documentWriteLn = fw.writeln;
					fw.writeln = function() {  
						if( is_url_api_debug ) console.log(">>	>> [iframe.document.writeln AFTER LOAD @ appendChild] # args: ", arguments.length, ", obj: ", this);
						arguments[0] = new_iframe_documentWrites(arguments[0], "[hooked at appendChild] iframe.contentWindow.document.write", "2");
						return org_iframe_documentWriteLn.apply(this, arguments);
					};
				}
			} catch (e) {
				// nothing.
			}
        });
		
	    
		if (oo.src) {
    		if (is_inline_js(oo.src) === false) {
				var new_src = encryptURL(arguments[0].src, "urlapi885");
				//if( is_url_api_debug ) console.log("old_src: ", arguments[0].src, ", new_src: ", new_src);
        		arguments[0].src = new_src;
			}
        }
		
		ret = org_appendChild.apply(this, arguments);
        
		var f = get_iframe_contentDocument(oo);
		if( f !== null ) {
			// =================================================================================
			var handle_inner_iframe_documentWrites = function(str, debugloc) {
				var result = do_reaplceSrcURL_debug(str, debugloc);
				result = do_insert_script_at_head(result, debugloc);
				hook_log( str, result, "iframe.contentWindow.document.write (" + debugloc + ")" );
				return result;
			};
			
			var org_iframe_documentWrite = f.write;
			f.write = function() {
				if( is_url_api_debug ) console.log(">>	>> [iframe.document.write BEFORE LOAD @ appendChild] # args: ", arguments.length, ", obj: ", this);
				console.log("[iframe.document.write] BEFORE LOAD: ", arguments[0]);
				arguments[0] = handle_inner_iframe_documentWrites(arguments[0], "3");
				var ret = org_iframe_documentWrite.apply(this, arguments);
				return ret;
			};			
			var org_iframe_documentWriteLn = f.writeln;
			f.writeln = function() {  
				if( is_url_api_debug ) console.log(">>	>> [iframe.document.writeln BEFORE LOAD @ appendChild] # args: ", arguments.length, ", obj: ", this);
				arguments[0] = handle_inner_iframe_documentWrites(arguments[0], "4");
				var ret = org_iframe_documentWriteLn.apply(this, arguments);
				return ret;
			};
			
			//if( is_url_api_debug ) console.log('	>>	iframe element: ', getProperty(f.head.__proto__.__proto__.__proto__, "innerHTML").get, f.head.__proto__.__proto__.__proto__);
			// =================================================================================
			var handle_inner_iframe_hooks = function(oo) {
				try {
					if (oo.nodeName.toLowerCase() === 'iframe') {  // iframe
						if (oo.src) {
							if (is_inline_js(oo.src) === false)  
								oo.src = encryptURL(oo.src, "urlapi927");
						}
					} else if ( oo.hasAttribute("src") === true ) {
						if( oo.src ) oo.src = encryptURL(oo.src, "urlapi930");
					}
				} catch (e) {
					// surpress errors
				}
				return oo;
			};
			
			var iframeApnd = f.head.__proto__.__proto__.__proto__.appendChild;
			f.head.__proto__.__proto__.__proto__.appendChild = function() {
				arguments[0] = handle_inner_iframe_hooks( arguments[0] );
				return iframeApnd.apply(this, arguments);
			};			
			var iframeInstB = f.head.__proto__.__proto__.__proto__.insertBefore;
			f.head.__proto__.__proto__.__proto__.insertBefore = function() {	
				arguments[0] = handle_inner_iframe_hooks( arguments[0] );
				return iframeInstB.apply(this, arguments);
			};
			
			// =================================================================================
			var eleInnerHTMLSetter = getProperty(f.head.__proto__.__proto__.__proto__, "innerHTML").set;
			var eleInnerHTMLGetter = getProperty(f.head.__proto__.__proto__.__proto__, "innerHTML").get;
			Object.defineProperty(f.head.__proto__.__proto__.__proto__, "innerHTML", {
				set: function(arg) {
					if( is_url_api_debug ) console.log("	>>	innerhtml set:");
					
					var parser = new DOMParser();
					var doc = null;
					try {
						doc = parser.parseFromString(arg, "text/html");
						
						encryptDOM(doc.children[0]);						
					} catch(e) { 
						alert("dom parser error"); 
					}
					if( doc !== null ) {
						var s = new XMLSerializer();
						eleInnerHTMLSetter.call(this, s.serializeToString(doc));
					} else {
						eleInnerHTMLSetter.call(this, arg);
					}

				},
				get: function() {
					if( is_url_api_debug ) console.log('	>>	innerhtml getter: ', eleInnerHTMLGetter.call(this));
					
					var parser = new DOMParser();
					var doc = null;
					var innerHTML = null;
					try {
						innerHTML = eleInnerHTMLGetter.call(this);
						doc = parser.parseFromString(innerHTML, "text/html");
						// commented out; undefined
						decryptDOM(doc.children[0]);
					} catch(e) { 
						alert("dom parser error"); 
					}

					if( doc !== null ) {
						var s = new XMLSerializer();
						return s.serializeToString(doc);
					}
					return innerHTML;
				}
			});
			// =================================================================================
		}		
    }
	else if( has_src ) {
		if( oo.src ) {
			try {
				arguments[0].src = encryptURL(arguments[0].src, "urlapi1001");			
				//if( is_url_api_debug ) console.log("encryptURL @ appendChild: Object: ", oo);
			} catch(e) {
				// ...
			}
		}
		ret = org_appendChild.apply(this, arguments);
	}		
	else {
		ret = org_appendChild.apply(this, arguments);
	}
	return ret;
}


////////////////////////////////////////////////////////////////////////
//
// HOOK FUNCTIONS: insertBefore
//
////////////////////////////////////////////////////////////////////////
var hook_insertBefore = true;
var org_insertBefore;
if( org_insertBefore === undefined ) 
	org_insertBefore = Element.prototype.insertBefore;
Element.prototype.insertBefore = function() {
	if( hook_insertBefore === false ) {
		return org_insertBefore.apply(this, arguments);
	}
	var oo = arguments[0];
	var ret;
	
	//
	// oo.hasAttribute("nodeName")
	// 
	var has_src = false, is_iframe = false;
	try {
		if( oo.hasAttribute("src") === true ) 		 has_src = true;
	} catch (e) { /**/ }
	try { 		
		if( oo.nodeName.toLowerCase() === 'iframe' ) is_iframe = true;
	} catch (e) { /**/ }
	
	
	if ( is_iframe ) { 
		if( is_url_api_debug ) console.log("document.insertBefore(" + oo.id + ")");
		
		oo.addEventListener("load", function() {    
			if( is_url_api_debug ) console.log("---- insert Iframe [", oo.id, "] onload ----");
			try {
				var fw = get_iframe_contentDocument(oo);
				if( fw ) {
					var org_iframe_documentWrite = fw.write;
					fw.write = function() {  
						if( is_url_api_debug ) console.log(">>	>> [iframe.document.write AFTER LOAD -- insertBefore] arguments.length = ", arguments.length);
						arguments[0] = new_iframe_documentWrites(arguments[0], "[iframe.document.write] AFTER LOAD @ insertBefore", "5");        
						return org_iframe_documentWrite.apply(this, arguments);
					};

					var org_iframe_documentWriteln = fw.writeln;
					fw.writeln = function() {  
						if( is_url_api_debug ) console.log(">>	>> [iframe.document.write AFTER LOAD -- insertBefore] arguments.length = ", arguments.length);
						arguments[0] = new_iframe_documentWrites(arguments[0], "[iframe.document.write] AFTER LOAD @ insertBefore", "6");
						return org_iframe_documentWriteln.apply(this, arguments);
					};
				}
			} catch (e) {
				// nothing.
			} 
		});
	       
     	if (oo.src) {
			if( is_inline_js(oo.src) === false ) {
    			arguments[0].src = encryptURL(arguments[0].src, "urlapi1073");
        	}
        }
        ret = org_insertBefore.apply(this, arguments);

		
        var fw = get_iframe_contentDocument(oo);
		if( fw ) {		
			var org_iframe_documentWrite = fw.write;
			fw.write = function() {			
				if( is_url_api_debug ) console.log(">> [iframe.document.write]  BEFORE LOAD @ insertBefore] arguments.length = ", arguments.length);
				arguments[0] = new_iframe_documentWrites(arguments[0], "[iframe.document.write] BEFORE LOAD @ insertBefore", "7");
				return org_iframe_documentWrite.apply(this, arguments);
			};
			var org_iframe_documentWriteln = fw.writeln;
			fw.writeln = function() {			
				if( is_url_api_debug ) console.log(">> [iframe.document.write]  BEFORE LOAD @ insertBefore] arguments.length = ", arguments.length);
				arguments[0] = new_iframe_documentWrites(arguments[0], "[iframe.document.writeln] BEFORE LOAD @ insertBefore", "7");
				return org_iframe_documentWriteln.apply(this, arguments);
			};
		}
	}
	else if( has_src ) {
		if( oo.src ) {
			arguments[0].src = encryptURL(arguments[0].src, "urlapi1097");
		}
		ret = org_insertBefore.apply(this, arguments);
	}
	else {
		ret = org_insertBefore.apply(this, arguments);
	}
  	return ret;
};


////////////////////////////////////////////////////////////////////////
//
// HOOK FUNCTIONS: document.write
//
////////////////////////////////////////////////////////////////////////
//var docW_buf, docW_buf_obj, docW_buf_this, docW_buf_arg;
var hook_documentWrite = true;

var hook_handler_documentWrites = function (str, fnName, debugloc) {
	if( is_url_api_debug ) console.log(" ===> " + fnName + " <=== ");
	
	var result = do_reaplceSrcURL_debug(str, debugloc);
	// added
	result = replaceSrcURL_new_debug(result, "href", debugloc );
	result = do_insert_script_at_head(result, debugloc);
	
	result = Randomize_Div_Id(result, "div-gpt-ad");
	result = Randomize_FlashObject_Id(result);
	
	hook_log( str, result, fnName );
	return result;
};

var org_documentWrite;
if( org_documentWrite === undefined ) 
	org_documentWrite = document.write;
document.write = function() {  
	if( hook_documentWrite === false ) {
		return org_documentWrite.apply(this, arguments);
	}
	var result = arguments[0];
	if(result.indexOf('http://s10.histats.com/js15.js') >= 0 ) {
		console.log('hook here');
	}
	console.log("[debug] 1 document.write(" + result + ")");
	
	result = hook_handler_documentWrites( result, "document.write", "39" );	
	arguments[0] = result;   	
	
	console.log("[debug] 2 document.write(" + result + ")");
	
	var ret = org_documentWrite.apply(this, arguments);
	console.log("[debug] 3 document.write(" + result + ")");
	return ret; 
};

////////////////////////////////////////////////////////////////////////
//
// HOOK FUNCTIONS: document.writeln
//
////////////////////////////////////////////////////////////////////////
var hook_documentWriteln = true;
var org_documentWriteln;
if( org_documentWriteln === undefined ) 
	org_documentWriteln = document.writeln;
document.writeln = function() {  
	if( hook_documentWriteln === false ) {
		return org_documentWriteln.apply(this, arguments);
	}	
	
	var result = arguments[0];
	result = hook_handler_documentWrites( result, "document.writeln", "40" );
	arguments[0] = result;   	
	
	return org_documentWriteln.apply(this, arguments);
};


