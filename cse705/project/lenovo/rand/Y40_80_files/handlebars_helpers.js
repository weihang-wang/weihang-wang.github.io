/**
 * Handlebars Helpers - Dan Harper (http://github.com/danharper)
 * https://github.com/danharper/Handlebars-Helpers
 *
 * This is a compilation of the current branch (v2.0.0) and old version 1.1.0 
 * (https://github.com/danharper/Handlebars-Helpers/tree/v1.1.0)
 * 
 * This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. 
 */
(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('handlebars'));
    } else if (typeof define === 'function' && define.amd) {
        define(['handlebars'], factory);
    } else {
        root.HandlebarsHelpersRegistry = factory(root.Handlebars);
    }
}(this, function (Handlebars) {

    var isArray = function(value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    }

    var ExpressionRegistry = function() {
        this.expressions = [];
    };

    ExpressionRegistry.prototype.add = function (operator, method) {
        this.expressions[operator] = method;
    };

    ExpressionRegistry.prototype.call = function (operator, left, right) {
        if ( ! this.expressions.hasOwnProperty(operator)) {
            throw new Error('Unknown operator "'+operator+'"');
        }

        return this.expressions[operator](left, right);
    };

    var eR = new ExpressionRegistry;
    eR.add('not', function(left, right) {
        return left != right;
    });
    eR.add('>', function(left, right) {
        return left > right;
    });
    eR.add('<', function(left, right) {
        return left < right;
    });
    eR.add('>=', function(left, right) {
        return left >= right;
    });
    eR.add('<=', function(left, right) {
        return left <= right;
    });
    eR.add('===', function(left, right) {
        return left === right;
    });
    eR.add('!==', function(left, right) {
        return left !== right;
    });
    eR.add('in', function(left, right) {
        if ( ! isArray(right)) {
            right = right.split(',');
        }
        return right.indexOf(left) !== -1;
    });

    var isHelper = function() {
        var args = arguments
        ,   left = args[0]
        ,   operator = args[1]
        ,   right = args[2]
        ,   options = args[3]
        ;

        if (args.length == 2) {
            options = args[1];
            if (left) return options.fn(this);
            return options.inverse(this);
        }

        if (args.length == 3) {
            right = args[1];
            options = args[2];
            if (left == right) return options.fn(this);
            return options.inverse(this);
        }

        if (eR.call(operator, left, right)) {
            return options.fn(this);
        }
        return options.inverse(this);
    };
	
	/**
	 * Is
	 * Given one argument, is acts exactly like if: {{#is this}}...{{/is}}
	 * Given two arguments, is compares the two are equal (a non-strict, == comparison): {{#is this that}}...{{/is}}
	 * Given three arguments, the second argument becomes the comparator: {{#is this "not" that}}...{{/is}}
	 * Built-in comparators:
	 *   == (same as not providing a comparator)
	 *   !=
	 *   not (alias for !=)
	 *   ===
	 *   !==
	 *   >
	 *   >=
	 *   <
	 *   <=
	 *   in (check a value exists in either a comma-separated string, or an array)
	 */
    Handlebars.registerHelper('is', isHelper);

	/**
	 * Convert new line (\n\r) to <br>
	 * from http://phpjs.org/functions/nl2br:480
	 * {{nl2br description}}
	 */
    Handlebars.registerHelper('nl2br', function(text) {
        var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
        return new Handlebars.SafeString(nl2br);
    });
	
	/**
	 * Log
	 * Log one or multiple values to the console: {{log foo bar}}
	 */
    Handlebars.registerHelper('log', function() {
        console.log(['Values:'].concat(
            Array.prototype.slice.call(arguments, 0, -1)
        ));
    });
	
	/**
	 * Debug
	 * Log one or multiple values to the console, /with the current context/: {{debug foo bar}}
	 */
    Handlebars.registerHelper('debug', function() {
        console.log('Context:', this);
        console.log(['Values:'].concat(
            Array.prototype.slice.call(arguments, 0, -1)
        ));
    });
	
	/**
	 * If Equals
	 * {{#if_eq this compare=that}}...{{/if_eq}}
	 */
	Handlebars.registerHelper('if_eq', function(context, options) {
		if (context == options.hash.compare)
			return options.fn(this);
		return options.inverse(this);
	});

	/**
	 * Unless Equals
	 * {{#unless_eq this compare=that}}...{{/unless_eq}}
	 */
	Handlebars.registerHelper('unless_eq', function(context, options) {
		if (context == options.hash.compare)
			return options.inverse(this);
		return options.fn(this);
	});

	/**
	 * If Greater Than
	 * {{#if_gt this compare=that}}...{{/if_gt}}
	 */
	Handlebars.registerHelper('if_gt', function(context, options) {
		if (context > options.hash.compare)
			return options.fn(this);
		return options.inverse(this);
	});

	/**
	 * Unless Greater Than
	 * {{#unless_gt this compare=that}}...{{/unless_gt}}
	 */
	Handlebars.registerHelper('unless_gt', function(context, options) {
		if (context > options.hash.compare)
			return options.inverse(this);
		return options.fn(this);
	});

	/**
	 * If Less Than
	 * {{#if_lt this compare=that}}...{{/if_lt}}
	 */
	Handlebars.registerHelper('if_lt', function(context, options) {
		if (context < options.hash.compare)
			return options.fn(this);
		return options.inverse(this);
	});

	/**
	 * Unless Less Than
	 * {{#unless_lt this compare=that}}...{{/unless_lt}}
	 */
	Handlebars.registerHelper('unless_lt', function(context, options) {
		if (context < options.hash.compare)
			return options.inverse(this);
		return options.fn(this);
	});

	/**
	 * If Greater Than or Equal To
	 * {{#if_gteq this compare=that}}...{{/if_gteq}}
	 */
	Handlebars.registerHelper('if_gteq', function(context, options) {
		if (context >= options.hash.compare)
			return options.fn(this);
		return options.inverse(this);
	});

	/**
	 * Unless Greater Than or Equal To
	 * {{#unless_gteq this compare=that}}...{{/unless_gteq}}
	 */
	Handlebars.registerHelper('unless_gteq', function(context, options) {
		if (context >= options.hash.compare)
			return options.inverse(this);
		return options.fn(this);
	});

	/**
	 * If Less Than or Equal To
	 * {{#if_lteq this compare=that}}...{{/if_lteq}}
	 */
	Handlebars.registerHelper('if_lteq', function(context, options) {
		if (context <= options.hash.compare)
			return options.fn(this);
		return options.inverse(this);
	});

	/**
	 * Unless Less Than or Equal To
	 * {{#unless_lteq this compare=that}}...{{/unless_lteq}}
	 */
	Handlebars.registerHelper('unless_lteq', function(context, options) {
		if (context <= options.hash.compare)
			return options.inverse(this);
		return options.fn(this);
	});

    return eR;

}));