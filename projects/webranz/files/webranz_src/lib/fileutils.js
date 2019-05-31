if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(function(require, exports) {

	var fs = require("fs"),
	css = require("css"),
	cssutils = require("./cssutils");
	
	var htmlparser2 = require("htmlparser2");
	var html = require('htmlparser-to-html');
	var hashmap = require("hashmap");
	var domutils = require("./domutils"),
	htmlstr = require("./htmlstr");
	
	
	function randomizeHtml(html_str, maps, siteFolder) {
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
		var error = false;
		var styleTags = new Array();
		styleTags = domutils.walkDOM(handler.dom, maps, error, siteFolder, styleTags);
		
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
		
		var headTag;
		headTag = domutils.getHeadTag(handler.dom, headTag);
		
		domutils.insertScripts(handler.dom, maps, headTag);
			
		// Transform AST back to HTML
		var randomized = html(handler.dom);
		
		randomized = htmlstr.postprocess(randomized);
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
				var cssStr = fs.readFileSync(from + file, 'utf8');
				var cssAST = css.parse(cssStr, {silent: true});
				cssutils.randomizeCSS(cssAST, maps);
				try {
					cssStr = css.stringify(cssAST);
				}
				catch (err) {
					;
				}
				fs.writeFileSync(to + file, cssStr);				
			}
			/*
			else {
				var data;
				// randomize HTML files
				if (file.endsWith(".html") || file.endsWith(".htm")) {
					data = fs.readFileSync(from + file, 'utf-8');
					data = randomizeHtml(data, siteFolder);
				}
				else {
					data = fs.readFileSync(from + file);
				}
				// Copy files (including HTML and other non CSS files)
				fs.writeFileSync(to + file, data);			
			}
			*/
			else {
				var data;
				if (file.endsWith(".html") || file.endsWith(".htm")) {
					htmlFiles.push({
						"from": from + file,
						"to": to + file
					});
				}
				else {
					data = fs.readFileSync(from + file);
					fs.writeFileSync(to + file, data);		
				}
			}
			
			if (i == (files.length-1)) {
				for (var j=0; j<htmlFiles.length; j++) {
					var data;
					data = fs.readFileSync(htmlFiles[j].from, 'utf-8');
					data = randomizeHtml(data, maps, siteFolder);
					fs.writeFileSync(htmlFiles[j].to, data);
				}
			}
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
