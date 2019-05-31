
var url_resources = require("../src/resources");

var server = url_resources.getServer();
var absolute_path = url_resources.getAbsolutePath();
var randomize_path = url_resources.getRandomizePath(); 
var webranz_bypassUrl = url_resources.getBypassUrl();
var webranz_redirectUrl = url_resources.getRedirectUrl();

if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

var base64encodeURL = function (url) {
    var buf = new Buffer(url);
    var ret = buf.toString('base64');
    buf = null;
	return ret;
}
var encodeURL = function(original_src) {
    return webranz_bypassUrl + base64encodeURL(original_src);
}

function handle_real_url(url) {
    if( url.indexOf("//") === 0 ) {
        return "http:" + url;
    }
    return url;
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

	function postprocess(html_str, curfolder) {
        html_str = html_str.replace(/&#61;/g, "=");
		//html_str = html_str.replace(/&amp;/g, "&");
		html_str = html_str.replace(/&lt;/g, "<");
		html_str = html_str.replace(/&gt;/g, ">");
		//html_str = html_str.replace(/&quot;/g, "'");


        if( html_str )
            html_str = dtm_postprocess(html_str, curfolder);
        
		return html_str;
	}

    
    function encodeStyleUrls(input, startpattern, endpattern) {
         var pos = 0;
         console.log("encodeStyleUrls begins === ");
         while( true ) {
             //background-image:url('
             //var pos_begin = input.indexOf("background:url(", pos);
             
             var pos_begin = input.indexOf(startpattern, pos);
             if( pos_begin == -1 ) {
                 break;
             }
             var pos_end = input.indexOf(endpattern, pos_begin+startpattern.length);
             //console.log(pos_begin, "/ ", pos_end)
             if( pos_end != -1 ) {
                 // found
                 var found_url = input.substring(pos_begin, pos_end + endpattern.length);
                 var real_url = found_url.substr(startpattern.length, found_url.length - startpattern.length - endpattern.length);
                 real_url = real_url.trim();
                 console.log("found url1: [" + found_url + "]");
                 real_url = handle_real_url(real_url);
                 console.log("-- real url1: [" + real_url + "]");
                 console.log(" -- server? [" + server + "]");
                 console.log(" -- indexof(server)? [" + real_url.indexOf(server) + "]");
                 if( real_url.indexOf(server) >= 0 ) {
                     pos = pos_begin + found_url.length;
                     continue;
                 }
                 if( real_url.substr(0,4) === "http" ) { 
                     
                     var new_url = encodeURL(real_url);
                     console.log(" -- new url: [" + new_url + "]");
                 
                     var strBefore = input.substring(0, pos_begin);
                     var strAfter = input.substring(pos_end + endpattern.length);
                     input = strBefore + startpattern + new_url + endpattern + strAfter;
                     pos = pos_begin + new_url.length + startpattern.length + endpattern.length;
                 } else {
                     pos = pos_begin + found_url.length;
                 }
             } else {
                 pos = pos_begin + startpattern.length;
             }  
         }
         console.log("encodeStyleUrls ends  === ");
         return input;
    }
     
    function dtm_postprocess(data, curfolder)
    {
        //background: url      
        data = encodeStyleUrls(data, "background:url('", "')");
        data = encodeStyleUrls(data, "background: url('", "')");
        data = encodeStyleUrls(data, "background:url(", ")");
        data = encodeStyleUrls(data, "background: url(", ")");
        data = encodeStyleUrls(data, "background-image:url('", "')");
        //imgn:{l:"http://50.129.86.149:8080/WebRanz/proxy/phps/bypassUrl.php?DBG=1047&link=" + btoa(dir+"970x250xz8qgl9ol.gif"),w:970,h:250},
        //imgn:{l:dir+"970x250xz8qgl9ol.gif",w:970,h:250},
        data = encodeJSPiece(data, "imgn:{l:dir+\"", "\"", "imgn:{l:\"http://" + server + ":8080/WebRanz/proxy/phps/bypassUrl.php?&link=\" + btoa(dir+\"", "\")");
        //<embed src="www.uol.com.br_files/imgad.swf" 
        data = encodeSWFPiece(data, "<embed src=\"", "\" ", curfolder);
        //<object data="
        data = encodeSWFPiece(data, "<object data=\"", "\" ", curfolder);
        //data-src="/sandbox?id=ad_iframe
        data = encodeDataSrc(data); 

        data = randomizeClassId(data, "img_ad");

        data = randomizeGptDivs(data);

        data = str_replace(data, ";e=b.getElementById('adunit');", ";e=b.getElementById('randunit');");
        data = str_replace(data, ";e=b.getElementById(\"adunit\");", ";e=b.getElementById(\"randunit\");");
        data = str_replace(data, "<style>#adunit {", "<style>#randunit {");
        data = str_replace(data, "<div id=adunit><div id=ads dir='rtl'><ul>", "<div id=randunit><div id=ads dir='rtl'><ul>");
        data = str_replace(data, "<div id=\"adunit\"><div id=\"ads\" dir=\"rtl\"><ul>", "<div id=\"randunit\"><div id=\"ads\" dir=\"rtl\"><ul>");
        data = str_replace(data, "<div id='adunit'><div id='ads' dir='rtl'><ul>", "<div id='randunit'><div id='ads' dir='rtl'><ul>");
        
        data = randomizeGoogleSynd(data);
        
        
        //data = data.replace("class=\"img_ad\"", "class=\"rand_ad_716\"");
        //data = data.replace("class=&quot;img_ad&quot;", "class=\"rand_ad_716\"");                        
        //data = data.replace(" class='img_ad' ", " class='rand_ad_716' ");
        //data = data.replace("\nclass='img_ad' ", "\nclass='rand_ad_716' ");

        //imgn:{l:dir+"
        //background-image:url
        return data;
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
				new_src = absolute_path + new_src.substr(1);
			else
				new_src = absolute_path + new_src;
		} else {
			if( new_src.substr(0,1) == "/" )
				new_src = absolute_path + curfolder + "/" + new_src.substr(1);
			else
				new_src = absolute_path + curfolder + "/" + new_src;
		}
		
		console.log("[makeAbsolutePath]new_src: " + new_src);
		return new_src;
	}
	
    function iswhitespace(str, pos) {
        switch( str.charAt(pos) ) {
        case ' ': case '\t': case '\n': case '\r':
            return true;
        }
        return false;
    }
    function isTagEnd(str, pos) {
        switch( str.charAt(pos) ) {
        case '>':
            return true;
        }
        return false;
    }
    function getNextWhiteSpace(str, pos) {
        var i;
        for( i = pos; i < str.length; i++ ) 
            if( iswhitespace(str, i) === true ) return i;
        return i;
    }    
    function getPrevWhiteSpace(str, pos) {
        var i;
        for( i = pos-1; i >= 0; i-- ) 
            if( iswhitespace(str, i) === true ) return i;
        return i;
    }
    function getPrevNonWhiteSpace(str, pos) {
        var i;
        for( i = pos-1; i >= 0; i-- ) 
            if( iswhitespace(str, i) !== true ) return i;
        return i;
    }
    function getNextAttributeEnd(str, pos) {
        var i;
        for( i = pos; i < str.length; i++ ) 
            if( iswhitespace(str, i) === true || isTagEnd(str, i) === true ) return i;
        return i;
    }
    function getNextTagEnd(str, pos) {
        var i;
        for( i = pos; i < str.length; i++ ) 
            if( isTagEnd(str, i) === true ) return i;
        return i; 
    }
    function str_replace(data, oldstr, newstr) {
        while( data.indexOf(oldstr) != -1 ) {
            data = data.replace(oldstr, newstr);
        }
        return data;
    }
    function randomizeClassId(data, classid) {
        // class='img_ad' 
        // class='img_ad' 
        data = str_replace(data, " class=\"" + classid + "\"", " class=\"rand_ad_716\"");
        data = str_replace(data, " class=&quot;" + classid + "&quot;", " class=\"rand_ad_716\"");                        
        data = str_replace(data, " class=\'" + classid + "\' ", " class='rand_ad_716' ");
        data = str_replace(data, "\nclass=\'" + classid + "\' ", "\nclass='rand_ad_716' ");
        data = str_replace(data, " class='" + classid + "' ", " class='rand_ad_716' ");
        // ;e=b.getElementById('adunit');

        var curpos = 0;
        while(true) {
            var pos = data.indexOf(classid, curpos);
            if( pos == -1 ) break;

            var pos_begin = pos;
            if( pos_begin < 0 ) pos_begin = 0;
            
            console.log("found classid:" + data.substring(pos_begin-10, pos_begin+10));
            curpos = pos + classid.length; // next search
        }
        

        return data;        
    }
    function encodeSWFPiece(input, startpattern, endpattern, curfolder) {
         var pos = 0;
         while( true ) {
             var pos_begin = input.indexOf(startpattern, pos);
             if( pos_begin == -1 ) {
                 break;
             }
             var pos_end = input.indexOf(endpattern, pos_begin+startpattern.length);
             //console.log(pos_begin, "/ ", pos_end)
             if( pos_end != -1 ) {
                 // found
                 var found_url = input.substring(pos_begin, pos_end + endpattern.length);
                 var real_url = found_url.substr(startpattern.length, found_url.length - startpattern.length - endpattern.length);
                 
                 console.log("found url2: [" + found_url + "]");
                 real_url = handle_real_url(real_url);
                 console.log("-- real url2: [" + real_url + "]");
                 if( real_url.indexOf(server) >= 0 ) {
                     pos = pos_begin + found_url.length;
                     continue;
                 }
                 real_url = makeAbsolutePath(real_url, curfolder); 
                 
                 
                 var url_to_encode = real_url;
                 if( isLocalCopy(real_url) ) {
                     url_to_encode = absolute_path + real_url;
                 }
                 { 
                     var new_url = encodeURL(real_url);
                     console.log(" -- new url: [" + new_url + "]");
                 
                     var strBefore = input.substring(0, pos_begin);
                     var strAfter = input.substring(pos_end + endpattern.length);
                     input = strBefore + startpattern + new_url + endpattern + strAfter;
                     pos = pos_begin + new_url.length + startpattern.length + endpattern.length;
                 }
             } else {
                 pos = pos_begin + startpattern.length;
             }                            
         }
         return input;   
     };

    function script_postprocess(str, fname, curfolder) {
        try { 
            if( fname === "adview.js" ){
                //console.log("adview.js!!");
                /*
                var to_find = "er_imgSrc='";
                
                var curpos = 0;
                while(true) {
                    var pos = str.indexOf(to_find, curpos);
                    if( pos == -1 ) break;
                    
                    var pos_end = str.indexOf("'", pos+to_find.length);
                    if( pos_end != -1 ) {
                        //console.log(pos, pos_end);
                        //console.log(typeof(str));
                        console.log("er_imgsrc:: [" + str.substring( pos, pos_end+1 ) + "]");
                        var found_tag = str.substring( pos, pos_end+1 );
                        var real_url = found_tag.substring(to_find.length, found_tag.length-1);
                        console.log("real_url: [" + real_url + "]");
                        if( real_url.indexOf( server ) >= 0 ) {
                            curpos = pos + to_find.length;
                            console.log(" --- already encrypted --- ");
                            continue; 
                        } 
                        var new_url = encodeURL(real_url);
                        var new_tag = to_find + new_url + "'";
                        console.log("new_tag: [" + new_tag + "]");

                        str = str.replace( found_tag, new_tag );
                    }
                    curpos = pos + to_find.length;
                }
                */
                //function encodeSWFPiece(input, startpattern, endpattern) {
                str = encodeSWFPiece(str, "er_imgSrc='", "';er_RedirURL", curfolder);
                str = encodeSWFPiece(str, "rma:[{w:980,h:80,s:'", "',ech:50", curfolder);
                str = str_replace(str, 
                                                   "Image().src='http'+(sec?\"s\":\"\")+'://eyereact.eyereturn.com/s/?site='+id+'&se=&kw=&tle='+er_ec64(tle)+'&tagID='+er_tokenID+'&tleTID=11&seTID=12&ec=1';",
                "Image().src='" + webranz_bypassUrl + "' + btoa('http'+(sec?\"s\":\"\")+'://eyereact.eyereturn.com/s/?site='+id+'&se=&kw=&tle='+er_ec64(tle)+'&tagID='+er_tokenID+'&tleTID=11&seTID=12&ec=1');");
                

            }
        } catch(e) {
            console.log(e);
        }
        return str;
    }    
     //replaceJSPiece
     //imgn:{l:"http://50.129.86.149:8080/WebRanz/proxy/phps/bypassUrl.php?DBG=1047&link=" + btoa(dir+"970x250xz8qgl9ol.gif"),w:970,h:250},
     //imgn:{l:dir+"970x250xz8qgl9ol.gif",w:970,h:250},
     function encodeJSPiece(input, startpattern, endpattern, newstartpattern, newendpattern) {
         var pos = 0;
         while( true ) {
             var pos_begin = input.indexOf(startpattern, pos);
             if( pos_begin == -1 ) {
                 break;
             }
             var pos_end = input.indexOf(endpattern, pos_begin+startpattern.length);
             //console.log(pos_begin, "/ ", pos_end)
             if( pos_end != -1 ) {
                 // found
                 var found_url = input.substring(pos_begin, pos_end + endpattern.length);
                 var real_url = found_url.substr(startpattern.length, found_url.length - startpattern.length - endpattern.length);
                 
                 console.log("found url3: [" + found_url + "]");
                 real_url = handle_real_url(real_url);
                 console.log("-- real url3: [" + real_url + "]");
                 if( real_url.indexOf(server) >= 0 ) {
                     pos = pos_begin + found_url.length;
                     continue;
                 }
                 { 
                     
                     var new_url = real_url;//encodeURL(real_url);
                     console.log(" -- new url: [" + new_url + "]");
                 
                     var strBefore = input.substring(0, pos_begin);
                     var strAfter = input.substring(pos_end + endpattern.length);
                     input = strBefore + newstartpattern + new_url + newendpattern + strAfter;
                     pos = pos_begin + new_url.length + newstartpattern.length + newendpattern.length;
                 }
             } else {
                 pos = pos_begin + startpattern.length;
             }  
             break;                          
         }
         return input;   
     }
     function encodeDataSrc(data)
     {
         // data-src="/sandbox?id=ad_iframe
         var curpos = 0;
         var to_search = " data-src=\"/sandbox?id=ad_iframe";
         while(true) {
            var pos = data.indexOf(to_search, curpos);
            if( pos === -1 ) break;

            var url_begin = data.indexOf("\"", pos);
            if( url_begin === -1 ) {
                curpos = pos + to_search.length; continue;
            } 
            var url_end = data.indexOf("\"", url_begin+1);
            if( url_begin === -1 ) {
                curpos = pos + to_search.length; continue;
            }

            var found_url = data.substring( url_begin+1, url_end );
            console.log("encodeDataSrc: found_url: " + found_url);
            var new_url = encodeURL(found_url);
            console.log("encodeDataSrc: new_url: " + new_url);

            var s1 = data.substring(0, url_begin+1);
            var s2 = data.substr(url_end);

            data = s1 + new_url + s2;
            curpos = s1.length + new_url.length;
        }
        return data;                  
     }
     function randomizeGoogleSynd(data)
     {
        var input = data;
        var curpos = 0;
        while(true) {
            var pos = input.indexOf("<script src='https://tpc.googlesyndication.com/pagead/js/", curpos);//r20151006/r20110914/abg.js'>
            if( pos == -1 ) {
                break;
            }
            var pos_end = input.indexOf("'>", pos);
            if( pos_end == -1 ) {
                break;			
            }
            var url_begin = input.indexOf("'", pos);
            var url_end = pos_end;
            
            if( url_begin != -1 && url_end != -1 ) {
                var real_url = input.substring( url_begin+1, url_end );
                var new_url = encodeURL( real_url );
                console.log( "real_url: [" +real_url +"]" );
                console.log( "new_url: [" +new_url +"]" );

                input = input.replace(real_url, new_url);

                curpos = pos_end + (new_url.length - real_url.length);
            } else {		            
                curpos = pos_end;
            }
        }
         
         return input;
     }
     function randomizeGptDivs(data)
     {
        var input = data;
        while(input.search( /\"div-gpt-ad-[0-9]+-[0-9]-oop\"/i) != -1) {
            input = input.replace( /\"div-gpt-ad-[0-9]+-[0-9]-oop\"/i, "\"div-rand-gpt-ad-oop\"");
        }
        while(input.search( /\'div-gpt-ad-[0-9]+-[0-9]-oop\'/i) != -1) {
            input = input.replace( /\'div-gpt-ad-[0-9]+-[0-9]-oop\'/i, "\'div-rand-gpt-ad-oop\'");
        }
         return input;
     }
     
    exports.preprocess = preprocess;
    exports.postprocess = postprocess;
    exports.script_postprocess = script_postprocess;    
});
