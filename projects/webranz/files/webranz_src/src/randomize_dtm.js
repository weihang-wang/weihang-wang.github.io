var url_resources = require("./resources");

var webranz_server = url_resources.getServer();
var webranz_bypassUrl = url_resources.getBypassUrl();
var webranz_redirectUrl = url_resources.getRedirectUrl(); 
var webranz_randomize_path = url_resources.getRandomizePath();

var do_not_randomize_css = false;
//=======================================================================================================================
var hrstart = process.hrtime();


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


var domutils = require("../lib/domutils_dtm"),
cssutils = require("../lib/cssutils_dtm"),
htmlstr = require("../lib/htmlstr_dtm"),
fileutils = require("../lib/fileutils_dtm");


var base64encodeURL = function (url) {
    var buf = new Buffer(url);
    var ret = buf.toString('base64');
    buf = null;
	return ret;
}
var encodeURL = function(original_src) {
    return webranz_bypassUrl + base64encodeURL(original_src);
}
var encodeURL_debug = function(original_src, debug) {
    return webranz_bypassUrl + base64encodeURL(original_src) + "&debug=" + debug;
}
var encodeLinkURL = function(original_src) {
    return webranz_redirectUrl + base64encodeURL(original_src);
}

var curRandomNumber = 1;
var getRandomNumber = function()
{
	//console.log("random number: ", curRandomNumber);
    return curRandomNumber++;
}

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};


/****************************************************************************/
/* 		run from command line:												*/
/* 		$node src/randomize.js websites/ori/1/ websites/rand1/1/			*/


var eltOverrideStr = "\n\
<script type='text/javascript' src='" + webranz_randomize_path + "src/utils.js'></script>\n\
<script type='text/javascript' src='" + webranz_randomize_path + "src/override-elt-api.js'></script>\n\
<script type='text/javascript' src='" + webranz_randomize_path + "src/observer.js'></script>\n";	

var urlOverrideStr = "\n\
<script type='text/javascript' src='" + webranz_randomize_path + "src/override-url-api.js'></script>";	


var headTag, styleTags = new Array();		

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
	if (src.indexOf("http://" + webranz_server)===0) {
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
			var mapStr = domutils.getMapString(idMap, classMap);
										
      		// insert Override script
      		HTMLparser.parseComplete(eltOverrideStr);
      		domutils.insertAsFirst(headTag.children[0], handler.dom);
			HTMLparser.parseComplete(urlOverrideStr);
      		domutils.insertAsFirst(headTag.children[0], handler.dom);
      		
			// insert classMap
      		HTMLparser.parseComplete(mapStr);
      		domutils.insertAsFirst(headTag.children[0], handler.dom);
    	}
    	return;
  	}
	else {
		return;
	}
}


// Randomize one website; an easier version.....
function runtest2(input_path, output_path)
{
	var pos = input_path.lastIndexOf('/');
	var input_file = input_path.substr(pos+1);
	input_path = input_path.substr(0, pos+1);
	
	pos = output_path.lastIndexOf('/');
	var output_file = output_path.substr(pos+1);
	output_path = output_path.substr(0, pos+1);
	
	
	if( input_file !== output_file ) {
		console.log("Input File and Ouput File names are differnet. We will correct the output file name.\n");
		output_file = input_file;
	}
	console.log("Input Path : ", input_path);
	console.log("Output Path: ", output_path);
	console.log("File name: ", output_file);
	
	runtest( input_path, output_path, input_file );
	
}

function makeDir(path)
{
	try {
		fs.mkdirSync(path);
	} catch(err) { ; }
}
/*
 * Randomize one website
 * @param {type} input_path: websites/ori/showcase/
 * @param {type} output_path: websites/rand1/showcase/
 * @param {type} input_file: Yahoo.html
 * @returns {undefined}
 */
function runtest(input_path, output_path, input_file) {
		
	var FILES_DIR;
	if (input_file.endsWith("html")) {
		FILES_DIR = input_file.split(".html")[0] + "_files/";
	}
	if (input_file.endsWith("htm")) {
		FILES_DIR = input_file.split(".htm")[0] + "_files/";
	}
		
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
	var retTags = { headTag: null, styleTags: new Array() };
	
	// function walkDOM(domNode, maps, headTag, siteFolder, styleTags, curfolder) { 
	if (domutils.walkDOM(handler.dom, maps, FILES_DIR, "", retTags)) {
		try {
			fs.unlinkSync(input_path + input_file);
		}
		catch (err) { console.log(err.message, err.stack); }
		try {
			fileutils.deleteFolder(input_path + input_file.split(".html")[0] + "_files/");
			return;
		}
		catch (err) { console.log(err.message, err.stack); return;}
	}
	console.log("styleTags:" + styleTags);
	headTag = retTags.headTag;
	styleTags = retTags.styleTags;
	console.log("headTag:" + headTag);
	console.log("styleTags:" + styleTags);
	
	// randomize CSS <style> tags for randomized id and class
	styleTags.forEach(function(style) {
		var ast = css.parse(style.children[0].data, {silent: true});
		cssutils.randomizeCSS(ast, maps);
		try {
			style.children[0].data = css.stringify(ast);
		}
		catch (err) {
			console.log('internal css break parser!', dir + input_file, err);
			console.log(err.message, err.stack);
			try {
				fs.unlinkSync(input_path + input_file);
			}
			catch (err) { console.log(err.message, err.stack);}
			try {
				fileutils.deleteFolder(input_path + input_file.split(".html")[0] + "_files/");
				return;
			}
			catch (err) { console.log(err.message, err.stack); return;}
		}
	});
	
	// Create a folder for the website
	makeDir( output_path );
	makeDir( output_path + FILES_DIR );
	
	//insertScripts(handler.dom, maps);
	
	// Copy other files that along with the randomized html page, external CSS files are randomized
	try {	
		var ori_files = fs.readdirSync(input_path + FILES_DIR);
		if (!fileutils.copyFiles(ori_files, input_path + FILES_DIR, output_path + FILES_DIR, maps, FILES_DIR)) {
			try {
				fs.unlinkSync(input_path + input_file);
			}
			catch(err) { console.log(err.message, err.stack); }
			try {
				fileutils.deleteFolder(input_path + input_file.split(".html")[0] + "_files/");
				return;
			}
			catch(err) { console.log(err.message, err.stack); return;}
		}
	}
	catch (err) {console.log(err.message, err.stack);}
	
	insertScripts(handler.dom, maps);
	
	// Transform AST back to HTML
	var randomized = html(handler.dom);
	console.log("PostProcess:" + input_file);
	randomized = htmlstr.postprocess(randomized, "");
	console.log("PostProcess:" + input_file + " .... done ....");

  	try {
  		fs.writeFileSync(output_path + input_file, randomized);
  	}
  	catch (err) {console.log(err.message, err.stack);}
  	
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
		catch(err) {console.log(err.message, err.stack);continue;}
		try {
			if(fs.lstatSync(input_path + f).isDirectory()) {
				continue;
			}
		}
		catch(err) {console.log(err.message, err.stack);continue;}
		console.log(f);
		console.log("\n");
		
		try {
			fs.appendFileSync(crawl_sites_path + "data/ori-urls.txt", webranz_randomize_path + input_path + f + "\n");
		}
		catch (err) {console.log(err.message, err.stack);;}
		try {
			fs.appendFileSync(crawl_sites_path + "data/rand-urls.txt", webranz_randomize_path + output_path + f + "\n");
		}
		catch (err) {console.log(err.message, err.stack);;}
			
		runtest(input_path, output_path, f);		
		
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

//runtest(process.argv[2], process.argv[3], process.argv[4]);
try {
	runtest2(process.argv[2], process.argv[3]);
} catch(err) {
	console.log(err.message, err.stack);
}

console.log(" =================== completely done ==================== ");
//test(process.argv[2], process.argv[3]);