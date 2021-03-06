if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(function(require, exports) {

	var fs = require("fs"),
	css = require("css"); 
	var cssSelectorParser = require('css-selector-parser').CssSelectorParser,
	parser = new cssSelectorParser();
	parser.registerSelectorPseudos('has');
	parser.registerNestingOperators('>', '+', '~');
	parser.registerAttrEqualityMods('|', '^', '$', '*', '~');
	parser.enableSubstitutes();

	var util = require('util');
	
	function isCSS(file, dir) {
		if (fs.lstatSync(dir + file).isDirectory()) {	
			return false;
		}
		
		if ((file.lastIndexOf(".css") !== -1) && (file.lastIndexOf(".css") + 4 === file.length)) {
			return true;
		}
		if ((file.lastIndexOf(".jpg") !== -1) && (file.lastIndexOf(".jpg") + 4 === file.length)) {
			return false;
		}
		if ((file.lastIndexOf(".png") !== -1) && (file.lastIndexOf(".png") + 4 === file.length)) {
			return false;
		}
		if ((file.lastIndexOf(".gif") !== -1) && (file.lastIndexOf(".gif") + 4 === file.length)) {
			return false;
		}
		if ((file.lastIndexOf(".js") !== -1) && (file.lastIndexOf(".js") + 3 === file.length)) {
			return false;
		}
		if ((file.lastIndexOf(".html") !== -1) && (file.lastIndexOf(".html") + 5 === file.length)) {
			return false;
		}
		var cssStr = fs.readFileSync(dir + file, 'utf8');
		var cssAST = css.parse(cssStr, {silent: true});
		if (cssAST.stylesheet.parsingErrors.length === 0) {
			return true;
		}
		else {
			return false;
		}
	}
	
	
	function contains(attr, map, containsStr) {
		var selectors = new Array();
		var keys = map.keys();
		if (attr === 'class') {
		for (var i = 0; i < keys.length; i++) {
			if (keys[i] === undefined || keys[i] === '' || keys[i] === '\n') {
				continue;
			}
			if (keys[i].indexOf(containsStr) !== -1) {
				//console.log('^= begin with string: ', beginsWithStr);
				if (attr === 'class') {
				//console.log('^= begin with string: ', beginsWithStr, keys[i], map.get(keys[i]));
					selectors.push('.' + map.get(keys[i]));
				}
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
		if (attr === 'class') {
		for (var i = 0; i < keys.length; i++) {
			if (keys[i] === undefined || keys[i] === '' || keys[i] === '\n') {
				continue;
			}
			if (keys[i].indexOf(beginsWithStr) === 0) {
				//console.log('^= begin with string: ', beginsWithStr);
				if (attr === 'class') {
					selectors.push('.' + map.get(keys[i]));
				}
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
		if (attr === 'class') {
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
		classMap = maps.classMap,
		reverseIdMap = maps.reverseIdMap;
		reverseClassMap = maps.reverseClassMap;
		
		if (selector.classNames) {
			for (var i = 0; i < selector.classNames.length; i++) {
				if (classMap.has(selector.classNames[i])) {
					selector.classNames[i] = maps.classMap.get(selector.classNames[i]);
				}
				else {
					var randNum1 = Math.floor((Math.random() * 50000) + 1),
					randClassName = 'rand_class_' + randNum1;
					while (reverseClassMap.has(randClassName)) {
						randNum1 = Math.floor((Math.random() * 50000) + 1);
						randClassName = 'rand_class_' + randNum1;
					}
					// Set class - randomized mapping in classMap
					classMap.set(selector.classNames[i], randClassName);
					reverseClassMap.set(randClassName, selector.classNames[i]);
					selector.classNames[i] = randClassName;
				}
			}
		}
		if (selector.id) {
			if(idMap.has(selector.id)) {
				selector.id = idMap.get(selector.id);
			}
			else {
				var randNum2 = Math.floor((Math.random() * 50000) + 1),
				randId = 'rand_id_' + randNum2;
				while (reverseIdMap[randId]) {
					randNum2 = Math.floor((Math.random() * 50000) + 1);
					randId = 'rand_id_' + randNum2;
				}
				// Set id - randomized mapping in idMap
				idMap.set(selector.id, randId);
				reverseIdMap.set(randId, selector.id);
				selector.id = randId;
			}
		}
		
		if (selector.attrs) {
			var randClass = '';
			for (var j = 0; j < selector.attrs.length; j++) {
				if (selector.attrs[j].name === 'class') {
					if (selector.attrs[j].operator==='^=' || selector.attrs[j].operator==='|=') {
						/*
						if (selector.attrs[j].value === "button-standard") {
						console.log('^^^^ !!', selector.attrs[j], beginsWith('class', classMap, selector.attrs[j].value));
						}*/
						randClass += beginsWith('class', classMap, selector.attrs[j].value);
						/*
						if (beginsWith('class', classMap, selector.attrs[j].value).lastIndexOf(".")===0) {
							selector.attrs[j].value = beginsWith('class', classMap, selector.attrs[j].value).slice(1);
						}
						*/
						
					}
					
					if (selector.attrs[j].operator==='*=' || selector.attrs[j].operator==='~=') {
						//console.log('* haha');
						randClass += contains('class', classMap, selector.attrs[j].value);
					}
					if (selector.attrs[j].operator==='$=') {
						//console.log('* haha');
						randClass += endsWith('class', classMap, selector.attrs[j].value);
					}
				}
			}
			
			if (randClass !== '') {
				if (selector.pseudos) {
					var classes = randClass.split(',');
					for (var k = 0; k < selector.pseudos.length; k++) {
						for (var m = 0; m < classes.length; m++) {							
							classes[m] = classes[m] + ':';
							if (selector.pseudos[k].name === '') {
								classes[m] += ':';
							}
							else {
								classes[m] += selector.pseudos[k].name;
							}
						}
					}
					return classes.toString();
				}
				else {
					return randClass;
				}
			}
		}
		/*
		else if (selector.pseudos) {
			for (var n = 0; n < selector.pseudos.length; n++) {
				if (selector.pseudos[n].name === 'nth-child') {
					selector.pseudos[n].valueType = 'Int';
					//selector.pseudos[n].value = selector.pseudos[n].value.replace(/'/g," guyu ");
					console.log('nth-child:', selector.pseudos[n].value, typeof selector.pseudos[n].value);
				}
			}
		}
		*/
		
		if (selector.rule) {
			randomizeSelector(selector.rule, maps);
		}
		
	}
	
	
	function visit(ast, maps) {
		
		var selectors = new Array();
		
		if (ast.type === 'selectors') {
			//console.log('type is selectors');
			for (var i = 0; i < ast.selectors.length; i++) {
				if (ast.selectors[i].type === 'ruleSet') {
				//console.log('visit, before randomizeselector:', ast.selectors.length);
					var t = randomizeSelector(ast.selectors[i].rule, maps);
					//console.log('visit, after rselector:', t);
					if (t !== null && t!== undefined) {
						selectors.push(t); 
					}
				}
			}
		}
		if (ast.type === 'ruleSet') {
			//console.log('type is ruleSet');
			//console.log('visit111, before randomizeselector:');
			var r = randomizeSelector(ast.rule, maps);
			//console.log('visit111, after rselector:', r);
			if (r !== null && r !== undefined) {
				selectors.push(r);
			}
		}
		if (selectors.length > 0) {
			ast.randSelectors = selectors.toString();
		}
		//console.log('walkast, return: ', ast);
		return ast;
	}
	
	function postProcess(selectorsStr) {
		var subStrs = new Array();
		if (selectorsStr.indexOf('nth-child') !== -1) {
			subStrs[0] = selectorsStr.split('nth-child(')[0];
			subStrs[1] = 'nth-child(';			
			subStrs[2] = selectorsStr.split('nth-child(')[1].split(')')[0];
			subStrs[3] = selectorsStr.split('nth-child(')[1].split(')')[1];
			
			if (subStrs[2][0] === '"') {
				subStrs[2] = subStrs[2].replace(/"/g, "");
			}
			if (subStrs[2][0] === "'") {
				subStrs[2] = subStrs[2].replace(/'/g, "");
			}
			selectorsStr = subStrs.join('')+')';
			//console.log('nth-child:', selectorsStr);
		}
		if (selectorsStr.indexOf('nth-last-child') !== -1) {
			subStrs[0] = selectorsStr.split('nth-last-child(')[0];
			subStrs[1] = 'nth-last-child(';			
			subStrs[2] = selectorsStr.split('nth-last-child(')[1].split(')')[0];
			subStrs[3] = selectorsStr.split('nth-last-child(')[1].split(')')[1];
			
			if (subStrs[2][0] === '"') {
				subStrs[2] = subStrs[2].replace(/"/g, "");
			}
			if (subStrs[2][0] === "'") {
				subStrs[2] = subStrs[2].replace(/'/g, "");
			}
			selectorsStr = subStrs.join('')+')';
		}
		if (selectorsStr.indexOf('nth-last-of-type') !== -1) {
			subStrs[0] = selectorsStr.split('nth-last-of-type(')[0];
			subStrs[1] = 'nth-last-of-type(';			
			subStrs[2] = selectorsStr.split('nth-last-of-type(')[1].split(')')[0];
			subStrs[3] = selectorsStr.split('nth-last-of-type(')[1].split(')')[1];
			
			if (subStrs[2][0] === '"') {
				subStrs[2] = subStrs[2].replace(/"/g, "");
			}
			if (subStrs[2][0] === "'") {
				subStrs[2] = subStrs[2].replace(/'/g, "");
			}
			selectorsStr = subStrs.join('')+')';
		}
		if (selectorsStr.indexOf('nth-of-type') !== -1) {
			subStrs[0] = selectorsStr.split('nth-of-type(')[0];
			subStrs[1] = 'nth-of-type(';			
			subStrs[2] = selectorsStr.split('nth-of-type(')[1].split(')')[0];
			subStrs[3] = selectorsStr.split('nth-of-type(')[1].split(')')[1];
			
			if (subStrs[2][0] === '"') {
				subStrs[2] = subStrs[2].replace(/"/g, "");
			}
			if (subStrs[2][0] === "'") {
				subStrs[2] = subStrs[2].replace(/'/g, "");
			}
			selectorsStr = subStrs.join('')+')';
		}
		if (selectorsStr.indexOf('("') !== -1 && selectorsStr.indexOf('")') !== -1) {		
			selectorsStr = selectorsStr.replace(/\("/g, "(");
			selectorsStr = selectorsStr.replace(/"\)/g, ")");
		}
		return selectorsStr;
	}
	
	function randomizeRule(rule, maps) {
		var idMap = maps.idMap,
		classMap = maps.classMap;

		try {
			var ast = parser.parse(rule.selectors.toString());
			//console.log('ast =====', util.inspect(parser.parse(rule.selectors.toString()), false, null));
			ast = visit(ast, maps);
			//console.log('ast !!!!!', util.inspect(ast, false, null));
		} 
		catch (err) {
			//console.log('err', err);
			return;
		}

		rule.selectors = postProcess(parser.render(ast)).split(',');
		if (ast.randSelectors) {
			var randSelectors = ast.randSelectors.toString();
			rule.selectors.push(randSelectors);
			delete ast.randSelectors;
		}
	}


	function randomizeCSS(cssAST, maps) {
		for (var i = 0; i < cssAST.stylesheet.rules.length; i++) {
			//console.log('randomizeCSS, ', cssAST.stylesheet.rules.length, i, cssAST.stylesheet.rules[i]);
			var rule = cssAST.stylesheet.rules[i];	
			if (rule.type === 'rule') {
				randomizeRule(rule, maps);				
			}
			if (rule.type === 'media') {
				for (var j = 0; j < rule.rules.length; j++) {
					if (rule.rules[j].type === 'rule') {
						randomizeRule(rule.rules[j], maps);
					}
				}
			}
		}
	}
	
    exports.isCSS = isCSS;
    exports.visit = visit;
    exports.randomizeRule = randomizeRule;    
    exports.randomizeCSS = randomizeCSS;
});
