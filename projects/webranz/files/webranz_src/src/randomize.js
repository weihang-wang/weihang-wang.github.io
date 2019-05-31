var hrstart = process.hrtime();

var server = "50.129.86.149";

var htmlparser2 = require("htmlparser2"),
handler = new htmlparser2.DomHandler(),
HTMLparser = new htmlparser2.Parser(handler);
var html = require('htmlparser-to-html');
var css = require("css"); 

var fs = require("fs"),
hashmap = require("hashmap");

var cssSelectorParser = require('css-selector-parser').CssSelectorParser,
parser = new cssSelectorParser();
parser.registerSelectorPseudos('has');
parser.registerNestingOperators('>', '+', '~');
parser.registerAttrEqualityMods('|', '^', '$', '*', '~');
parser.enableSubstitutes();


var domutils = require("../lib/domutils"),
cssutils = require("../lib/cssutils"),
htmlstr = require("../lib/htmlstr"),
fileutils = require("../lib/fileutils");

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

/**************************			Mac 		*****************************/
/*		randomize.js: /Library/Tomcat/Home/webapps/WebRanz/src/ 	*/
var randomize_path = "http://" + server + ":8080/WebRanz/";
var crawl_sites_path = "/Users/weiwei/Documents/workspace/crawl-sites/";

/**************************			Ubuntu		*****************************/
/*		randomize.js: /var/lib/tomcat7/webapps/ROOT/abp/randomize/src/	 	*/
//var randomize_path = "http://" + server + ":8080/abp/randomize/";
//var crawl_sites_path = "/home/weiwei/workspace/crawl-sites/";

/****************************************************************************/
/* 		run from command line:												*/
/* 		$node src/randomize.js websites/ori/1/ websites/rand1/1/			*/


var eltOverrideStr = "\n\
<script type='text/javascript' src='" + randomize_path + "src/utils.js'></script>\n\
<script type='text/javascript' src='" + randomize_path + "src/override-elt-api.js'></script>\n\
<script type='text/javascript' src='" + randomize_path + "src/observer.js'></script>";	

var urlOverrideStr = "\n\
<script type='text/javascript' src='" + randomize_path + "src/override-url-api.js'></script>";	


var headTag,
styleTags = new Array();		


var encryptURL = function (url) {
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

var isLocalCopy = function (src, files_dir){
	src = decodeURI(src);
	if (typeof src === "string" && typeof files_dir === "string") {
		if (src.includes && src.includes(files_dir) && src.indexOf(files_dir) ===0) {
			return true;
		}
		else 
			return false;
	}
	return false;
}

var noRandomizeUrl = function (src, files_dir) {
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
	if (src.indexOf("#")===0 && src.length === 1) {
		return true;
	}
	return false;
}

/*
 * Randomize DOM properties
 * @param {type} domNode: root of main page AST
 * @param {type} maps: store property maps
 * @param {true/false} error: 
 * @param {true/false} files_dir: 
 * @returns {undefined}
 */
function walkDOM(domNode, maps, error, files_dir) {  
	var idMap = maps.idMap,
	reverseIdMap = maps.reverseIdMap,
	classMap = maps.classMap,
	reverseClassMap = maps.reverseClassMap;
	
	if (Array.isArray(domNode)) {
		domNode.forEach(function(nd) {
			error = walkDOM(nd, maps, error, files_dir);
    	});
    	return error;
  	}
	else if (domNode.type === 'tag') {
    	if (domNode.name === 'head') {
			headTag = domNode;
    	}

		if (domNode.attribs) {
			if (domNode.attribs.src) {
				if (!noRandomizeUrl(domNode.attribs.src,files_dir)) {
					domNode.attribs.src="http://" + server + ":8080/WebRanz/proxy/phps/bypassUrl.php?link="+encryptURL(domNode.attribs.src);
				}
			}

			if (domNode.attribs.href) {
				if (!noRandomizeUrl(domNode.attribs.href,files_dir)) {
					domNode.attribs.href="http://" + server + ":8080/WebRanz/proxy/phps/bypassUrl.php?link="+encryptURL(domNode.attribs.href);
				}
			}
			
			if (domNode.attribs.style) {
				domNode.attribs.style = domNode.attribs.style.replace(/&#39;/g, "'");
			}							
			
			if (domNode.attribs.id && domNode.name !== 'html') {
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
		
			if (domNode.attribs.class && domNode.name !== 'html') {
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
				error = walkDOM(nd, maps, error, files_dir);
      		});
    	}
    
    	if (domNode.name === 'html') {
    		return error;
    	/*
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
      		domutils.insertAsFirst(headTag.children[0], handler.dom);
			HTMLparser.parseComplete(urlOverrideStr);
      		domutils.insertAsFirst(headTag.children[0], handler.dom);
      		
			// insert classMap
      		HTMLparser.parseComplete(classMapStr);
      		domutils.insertAsFirst(headTag.children[0], handler.dom);
												
      		// insert idMap
      		HTMLparser.parseComplete(idMapStr);
      		domutils.insertAsFirst(headTag.children[0], handler.dom); */
    	}
    	
  	}
	if (domNode.type === 'style') {
		if (domNode.children[0]) {
			var cssAST = css.parse(domNode.children[0].data, {silent: true});
			if (cssAST.stylesheet.parsingErrors.length === 0) {
				styleTags.push(domNode);
			}
			else {
				console.log("style tag css error!");
				error = true;
			}
		}
		return error;
	}
	else if (domNode.type === 'script') {
		if (domNode.attribs.src && typeof domNode.attribs.src==="string") {
			if (!noRandomizeUrl(domNode.attribs.src, files_dir)) {
				domNode.attribs.src="http://" + server + ":8080/WebRanz/proxy/phps/bypassUrl.php?link="+encryptURL(domNode.attribs.src);
			}
		}	
		return error;
	}
	else {
		return error;
	}
}


/*
 * Insert override Scripts and global Maps
 * @param {type} domNode: root of main page AST
 * @param {type} maps: store property maps 
 * @returns {undefined}
 */
function insertScripts(domNode, maps) { 
	var idMap = maps.idMap,
	reverseIdMap = maps.reverseIdMap,
	classMap = maps.classMap,
	reverseClassMap = maps.reverseClassMap;
	
	if (Array.isArray(domNode)) {
		domNode.forEach(function(nd) {
			insertScripts(nd, maps);
    	});
    	return;
  	}
	else if (domNode.type === 'tag') {
    	if (domNode.children) { 
			domNode.children.forEach(function(nd) {
				insertScripts(nd, maps);
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
      		domutils.insertAsFirst(headTag.children[0], handler.dom);
			HTMLparser.parseComplete(urlOverrideStr);
      		domutils.insertAsFirst(headTag.children[0], handler.dom);
      		
			// insert classMap
      		HTMLparser.parseComplete(classMapStr);
      		domutils.insertAsFirst(headTag.children[0], handler.dom);
												
      		// insert idMap
      		HTMLparser.parseComplete(idMapStr);
      		domutils.insertAsFirst(headTag.children[0], handler.dom);
    	}
    	return;
  	}
	else {
		return;
	}
}


/*
 * Randomize one website
 * @param {type} input_path: websites/ori/showcase/
 * @param {type} output_path: websites/rand1/showcase/
 * @param {type} input_file: Yahoo.html
 * @returns {undefined}
 */
function runtest(input, output_path) {
		
	var input_path = input.slice(0, input.lastIndexOf("/")+1);
	var input_file = input.slice(input.lastIndexOf("/")+1);
	var FILES_DIR;
	if (input_file.endsWith("html")) {
		FILES_DIR = input_file.split(".html")[0] + "_files/";
	}
	if (input_file.endsWith("htm")) {
		FILES_DIR = input_file.split(".htm")[0] + "_files/";
	}
	console.log(input_path, input_file, output_path);
		
	var html_str = fs.readFileSync(input_path + input_file, 'utf-8');
	html_str = htmlstr.preprocess(html_str);
	
	// Transform input html page to AST tree
	var handler = new htmlparser2.DomHandler();
	handler.onerror = function(err) {
		//console.log('htmlparser2 error!', err);
	}
	var HTMLparser = new htmlparser2.Parser(handler);
	HTMLparser.parseComplete(html_str);
    //console.log('===========output of htmlparser2:==========');
    //sys.puts(sys.inspect(handler.dom, false, null));			
				
  	// Randomize DOM props, and insert override script and global maps
	var maps = {
		idMap: new hashmap(),
		reverseIdMap: new hashmap(),
		classMap: new hashmap(),
		reverseClassMap: new hashmap()
	};
	var error = false;
	if (walkDOM(handler.dom, maps, error, FILES_DIR)) {
		try {
			fs.unlinkSync(input_path + input_file);
		}
		catch (err) {;}
		try {
			fileutils.deleteFolder(input_path + input_file.split(".html")[0] + "_files/");
			return;
		}
		catch (err) {return;}
	}
	
	// randomize CSS <style> tags for randomized id and class
	styleTags.forEach(function(style) {
		var ast = css.parse(style.children[0].data, {silent: true});
		cssutils.randomizeCSS(ast, maps);
		try {
			style.children[0].data = css.stringify(ast);
		}
		catch (err) {
			console.log('internal css break parser!', dir + input_file, err);
			try {
				fs.unlinkSync(input_path + input_file);
			}
			catch (err) {;}
			try {
				fileutils.deleteFolder(input_path + input_file.split(".html")[0] + "_files/");
				return;
			}
			catch (err) {return;}
		}
	});
	
	// Create a folder for the website
	try {
		fs.mkdirSync(output_path);
	}
	catch (err) {;}
	try {
		fs.mkdirSync(output_path + FILES_DIR);
	}
	catch (err) {;}
	
	//insertScripts(handler.dom, maps);
	
	// Copy other files that along with the randomized html page, external CSS files are randomized
	try {	
		var ori_files = fs.readdirSync(input_path + FILES_DIR);
		if (!fileutils.copyFiles(ori_files, input_path + FILES_DIR, output_path + FILES_DIR, maps, FILES_DIR)) {
			try {
				fs.unlinkSync(input_path + input_file);
			}
			catch(err) {;}
			try {
				fileutils.deleteFolder(input_path + input_file.split(".html")[0] + "_files/");
				return;
			}
			catch(err) {return;}
		}
	}
	catch (err) {;}
	
	insertScripts(handler.dom, maps);
	
	// Transform AST back to HTML
	var randomized = html(handler.dom);
	randomized = htmlstr.postprocess(randomized);
  	try {
  		fs.writeFileSync(output_path + input_file, randomized);
  	}
  	catch (err) {;}
  	
  	maps.idMap = null;
	maps.reverseIdMap = null;
	maps.classMap = null;
	maps.reverseClassMap = null;
	maps = null;
	
}


/*
 * Randomize multiple sites under the same folder
 * @param {type} input_path: websites/ori/showcase/
 * @param {type} output_path: websites/rand/showcase/
 * @returns {undefined}
 */
var test = function(input_path, output_path) {
	var files = fs.readdirSync(input_path);
	//var wstream_ori = fs.createWriteStream(crawl_sites_path + "data/ori-urls.txt");
	//var wstream_rand = fs.createWriteStream(crawl_sites_path + "data/rand-urls.txt");	
	for (var i = 0; i < files.length; i++) {
		var f = files[i];
		try {
			if(!fs.lstatSync(input_path + f)) {
				continue;
			}
		}
		catch(err) {continue;}
		try {
			if(fs.lstatSync(input_path + f).isDirectory()) {
				continue;
			}
		}
		catch(err) {continue;}
		console.log(f);
		console.log("\n");
		
		try {
			fs.appendFileSync(crawl_sites_path + "data/ori-urls.txt", randomize_path + input_path + f + "\n");
		}
		catch (err) {;}
		try {
			fs.appendFileSync(crawl_sites_path + "data/rand-urls.txt", randomize_path + output_path + f + "\n");
		}
		catch (err) {;}
			
		runtest(input_path+f, output_path);		
		
		//hrend = process.hrtime(hrstart);
		//console.log("\n", files[i]);
		//console.info("\nExecution time (hr): %ds %dms\n", hrend[0], hrend[1]/1000000);
	}
	//wstream_ori.end();
	//wstream_rand.end();
}

var args = new Array();
for (var i=4;i<process.argv.length; i++) {
	args[i-4] = process.argv[i];
}
var argsStr = args.join(' ');
//argsStr.split(/'/);
//console.log(argsStr.split("imdelimiter")[1], '!!!!!!', argsStr.split("imdelimiter")[3]);

//runtest(process.argv[2], process.argv[3], argsStr.split("imdelimiter")[1], argsStr.split("imdelimiter")[3]);

// Randomize One site
runtest(process.argv[2], process.argv[3]);

// Randomize Multiple Sites under input folder
//test(process.argv[2], process.argv[3]);