
var url_resources = require("../src/resources");

//var server = url_resources.getServer();
//var absolute_path = url_resources.getAbsolutePath();
var webranz_bypassUrl = url_resources.getBypassUrl();
var webranz_redirectUrl = url_resources.getRedirectUrl(); 

var do_not_randomize_sub_files = false;
//=======================================================================================================================


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
var encodeLinkURL = function(original_src) {
    return webranz_redirectUrl + base64encodeURL(original_src);
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

define(function(require, exports) {

	var fs = require("fs"),
	css = require("css"),
	cssutils = require("./cssutils_dtm");
	
	var htmlparser2 = require("htmlparser2");
	var html = require('htmlparser-to-html');
	var hashmap = require("hashmap");
	var domutils = require("./domutils_dtm"),
	htmlstr = require("./htmlstr_dtm");
	
	
	function randomizeHtml(html_str, maps, siteFolder, curfolder) {
		html_str = htmlstr.preprocess(html_str);
		
		// Transform input html page to AST tree
		var handler = new htmlparser2.DomHandler();
		handler.onerror = function(err) {
			;
		}
		var HTMLparser = new htmlparser2.Parser(handler);
		HTMLparser.parseComplete(html_str);			
				
			/*	
  		// Randomize DOM props, and insert override script and global maps
		var maps = {
			idMap: new hashmap(),
			reverseIdMap: new hashmap(),
			classMap: new hashmap(),
			reverseClassMap: new hashmap()
		};
		*/
		var retTags = { headTag: null, styleTags: new Array() };
		domutils.walkDOM(handler.dom, maps, siteFolder, curfolder, retTags);
		styleTags = retTags.styleTags;
		//console.log("styleTags: " + styleTags.length);
		
		// randomize CSS <style> tags for randomized id and class
		styleTags.forEach(function(style) {
			var ast = css.parse(style.children[0].data, {silent: true});
			cssutils.randomizeCSS(ast, maps);
			try {
				style.children[0].data = css.stringify(ast);
			}
			catch (err) {
				;
			}
		});
		
		var headTag = null;
		headTag = domutils.getHeadTag(handler.dom, headTag);
		//console.log("headTag:" + headTag);
		if( headTag !== null  ) {
			domutils.insertScripts(handler.dom, maps, headTag);
		}
			
		// Transform AST back to HTML
		var randomized = html(handler.dom);
		
		randomized = htmlstr.postprocess(randomized, curfolder);
		//console.log("randomized str: \n", randomized);
		return randomized;
	}
	
	
	function copyFiles(files, from, to, maps, siteFolder) {
	
		if (files === undefined) {
			return true;
		}
		var htmlFiles = new Array();
		for (var i = 0; i<files.length; i++) {
			
			var file = files[i];
			//console.log('====', file, i, fs.lstatSync(from + file).isDirectory(), cssutils.isCSS(file, from));
			//console.log(file, i, fs.lstatSync(from + file).isDirectory(), cssutils.isCSS(file, from), files.length);
			if (fs.lstatSync(from + file).isDirectory()) {	
					
				try {
					fs.mkdirSync(to + file);
				}
				catch(err) {
					;
				}
				var subfolderFiles = fs.readdirSync(from + file);
				copyFiles(subfolderFiles, from + file + "/", to + file + "/", maps, siteFolder);
				continue;
			}
			if (cssutils.isCSS(file, from)) {
				try {
					var cssStr = fs.readFileSync(from + file, 'utf8');
					var cssAST = css.parse(cssStr);
					cssutils.randomizeCSS(cssAST, maps);
					cssStr = css.stringify(cssAST);
				}
				catch (err) {
					console.log("css parsing error: filename = " + from + file);
					console.log(err.message, err.stack);
				}
				fs.writeFileSync(to + file, cssStr);				
			}
			else {
				if(do_not_randomize_sub_files) {
					data = fs.readFileSync(from + file);
					fs.writeFileSync(to + file, data);
					continue;		
				}
				
				var data;
				if (file.endsWith(".html") || file.endsWith(".htm")) {
					//console.log("html file: " + from+file)
					htmlFiles.push({
						"from": from + file,
						"to": to + file
					});
				}
				else if(file.endsWith(".js")) {
					data = fs.readFileSync(from + file, 'utf-8');
					data = htmlstr.script_postprocess(data, file, curfolder);
					fs.writeFileSync(to + file, data);
				}
				else {
					data = fs.readFileSync(from + file);
					fs.writeFileSync(to + file, data);		
				}
			}
		}

		try {
			for (var j=0; j<htmlFiles.length; j++) {
				console.log( "Randomize:: " , htmlFiles[j].from );
				/*
				if( htmlFiles[j].from.indexOf("southcn.com_files") >= 0 ) {
					data = fs.readFileSync(htmlFiles[j].from);
					console.log(data);
					fs.writeFileSync(htmlFiles[j].to, data);					
					fs.writeFileSync(htmlFiles[j].to + ".test.html", data);
					console.log("wtf: [" + htmlFiles[j].from + "] => [" + htmlFiles[j].to + "]");
					continue; 
				}*/
				//Randomize::  ./testwebsites/ori/showcase/St. Catharines Standard_files/sidebar_data/container.html
				//CurFolder: [St. Catharines Standard_files/sidebar_data]
				var curfolder = htmlFiles[j].from;
				if( curfolder.indexOf( siteFolder ) >= 0 ) {
					curfolder = curfolder.substr(curfolder.indexOf( siteFolder ) );
					if( curfolder.lastIndexOf('/') == -1 ) curfolder = "";
					else curfolder = curfolder.substr(0, curfolder.lastIndexOf('/'))
				} else {
					curfolder = "";
				}
				console.log("CurFolder: [" + curfolder + "]");
				var data;
				data = fs.readFileSync(htmlFiles[j].from, 'utf-8');
				data = randomizeHtml(data, maps, siteFolder, curfolder);
				console.log( "Randomize:: " , htmlFiles[j].from,  " .... done .... " );

				// data.background:url('http
				fs.writeFileSync(htmlFiles[j].to, data);
			}
		} catch (e) {
			console.log(e.message, e.stack);
		}
		return true;
	}


	function deleteFolder(path) {
    	var files = [];
    	if( fs.existsSync(path) ) {
        	files = fs.readdirSync(path);
        	files.forEach(function(file,index){
            	var curPath = path + "/" + file;
            	if(fs.lstatSync(curPath).isDirectory()) { // recurse
                	deleteFolder(curPath);
            	} else { // delete file
                	fs.unlinkSync(curPath);
            	}
        	});
        fs.rmdirSync(path);
    	}
	};
	
    exports.copyFiles = copyFiles; 
    exports.deleteFolder = deleteFolder; 
});
