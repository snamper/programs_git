/***
 * @preserve Router.js
 * @version 0.8.4
 * @author: Fabrizio Ruggeri
 * @website: http://ramielcreations.com/projects/router-js/
 * @license GPL-v2
 */
/*jshint expr:true */
(function(name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else this[name] = definition();
}('Router', function() {
	/**
	 * Provide Function Bind specification if browser desn't support it
	 */
	if(!Function.prototype.bind) {
		Function.prototype.bind = function(object) {
			var originalFunction = this, args = Array.prototype.slice.call(arguments); object = args.shift();
			return function() {
				return originalFunction.apply(object, args.concat(Array.prototype.slice.call(arguments)));
			};
		};
	}

	/**
	 * Commodity function to bind hashchange event
	 * @param {DOMElement} el       Element of DOM
	 * @param {Function} listener Callback
	 */
	function addHashchangeListener( el, listener ){
		if (el.addEventListener) {
		  el.addEventListener('hashchange', listener, false); 
		} else if (el.attachEvent)  {
		  el.attachEvent('hashchange', listener);
		}
	}

	/**
	 * Commodity function to unbind hashchange event
	 * @param  {DOMElement} el       Element of DOM
	 * @param  {Function} listener Callback
	 */
	function removeHashchangeListener( el, listener ){
		if (el.removeEventListener) {
		  el.removeEventListener('hashchange', listener, false); 
		} else if (el.detachEvent)  {
		  el.detachEvent('hashchange', listener);
		}
	}

	/**
	 * Commodity function to extend parameters and default options
	 * @return {object} merged objects
	 */
	function extend(){
		for(var i=1; i<arguments.length; i++)
	    	for(var key in arguments[i])
	    		if(arguments[i].hasOwnProperty(key))
	            	arguments[0][key] = arguments[i][key];
	    return arguments[0];
	}
	
	/**
	 * Thanks to Sammy.js
	 */
	var PATH_REPLACER = "([^\/\\?]+)",
		PATH_NAME_MATCHER = /:([\w\d]+)/g,
		PATH_EVERY_MATCHER = /\/\*(?!\*)/,
		PATH_EVERY_REPLACER = "\/([^\/\\?]+)",
		PATH_EVERY_GLOBAL_MATCHER = /\*{2}/,
		PATH_EVERY_GLOBAL_REPLACER = "(.*?)\\??",
		LEADING_BACKSLASHES_MATCH = /\/*$/;
	
	/**
	 * Request class
	 * @param {string} href Url for request object
	 * @constructor
	 */
	var Request = function(href){
		this.href = href;
		this.params;
		this.query;
		this.splat;
	};

	/**
	 * Return value passed in request using, in order params, query and eventually default_value if provided
	 * @param {string} key Key of the value to retrieve
	 * @param {mixed} default_value Default value if nothing found. Default to nothing
	 */
	Request.prototype.get = function(key, default_value){
		return (this.params && this.params[key] !== undefined) ? 
				decodeURIComponent(this.params[key])
				: (this.query && this.query[key] !== undefined) ?
					this.query[key]
					: (default_value !== undefined) ?
						default_value : undefined;
	};

	/**
	 * Router Class
	 * @constructor
	 */
	var Router = function(options) {
		/**@private*/
		this._options = extend({ignorecase: true}, options);
		/**@private */
		this._routes = [];
		/**@private */
		this._befores = [];
		/**@private */
		this._errors = {
			'_'		: function(err, url, httpCode) {
				if(console && console.warn) console.warn('Router.js : '+httpCode);
			},
			'_404' 	: function(err, url) {
				if(console && console.warn) console.warn('404! Unmatched route for url ' + url);
			},
			'_500' 	: function(err, url) {
				if(console && console.error) console.error('500! Internal error route for url ' + url);
				else{
					throw new Error('500');
				}
			}
		};
		/**@private */
		this._paused = false;
		this._hasChangeHandler = this._onHashChange.bind(this);
		addHashchangeListener(window,this._hasChangeHandler);
	};

	/**
	 * Handler for hashchange event
	 * @param  {event} e Event
	 */
	Router.prototype._onHashChange = function(e){
		if(!this._paused){
			this._route( this._extractFragment(window.location.href) );
		}
		return true;
	};
	
	/**
	 * Extract fragments from url (everything after '#')
	 * @param  {String} url
	 * @return {String} Route fragment
	 * @private
	 */
	Router.prototype._extractFragment = function(url){
		var hash_index = url.indexOf('#');
		return hash_index >= 0 ? url.substring(hash_index) : '#/';
	};

	/**
	 * Internally launched when an error in route or in nexts happens
	 * @param {String|Number} httpCode The httpCode of the error to thrown
	 * @param {Object} err, Error to thrown
	 * @param {String} url, Url which generated the error
	 * @private
	 */
	Router.prototype._throwsRouteError = function( httpCode, err, url ) {
		if(this._errors['_'+httpCode] instanceof Function)
			this._errors['_'+httpCode](err, url, httpCode);
		else{
			this._errors._(err, url, httpCode);
		}
		return false;
	};
	
	
	/**
	 * Build a request object based on passed information
	 * @param {Object} urlObj
	 * @param {Object} params Params of request if any. Not mandatory
	 * @throw error Error if urlObj is not 
	 * @return {Object} Request object
	 * @private
	 */
	Router.prototype._buildRequestObject = function(fragmentUrl, params, splat){
		if(!fragmentUrl)
			throw new Error('Unable to compile request object');
		var request = new Request(fragmentUrl);
		if(params)
			request.params = params;
		var completeFragment = fragmentUrl.split('?');
		if(completeFragment.length == 2){
			var queryKeyValue = null;
			var queryString = completeFragment[1].split('&');
			request.query = {};
			for(var i = 0, qLen = queryString.length; i < qLen; i++){
				queryKeyValue = queryString[i].split('=');
				request.query[decodeURI(queryKeyValue[0])] = decodeURI(queryKeyValue[1].replace(/\+/g, '%20'));
			}
			request.query;
		}
		if(splat && splat.length > 0){
			request.splats = splat;
		}
		return request;
	};

	/**
	 * Internally launched when routes for current hash are found
	 * @param {Object} urlObj Object of the url which fired this route
	 * @param {String} url Url which fired this route
	 * @param {Array} matchedIndexes Array of matched indexes
	 * @private
	 */
	Router.prototype._followRoute = function( fragmentUrl, url, matchedIndexes ) {
		var index = matchedIndexes.splice(0, 1), 
			route = this._routes[index], 
			match = url.match(route.path), 
			request, 
			params = {},
			splat = [];
		if(!route){
			return this._throwsRouteError(500, new Error('Internal error'), fragmentUrl);
		}
		/*Combine path parameter name with params passed if any*/
		for(var i = 0, len = route.paramNames.length; i < len; i++) {
			params[route.paramNames[i]] = match[i + 1];
		}
		i = i+1;
		/*If any other match put them in request splat*/
		if( match && i < match.length){
			for(var j = i;j< match.length;j++){
				splat.push(match[j]);
			}
		}
		/*Build next callback*/
		var next = (matchedIndexes.length === 0) ? null : (function(uO, u,mI,context){
			return function(err, error_code){
				if(err)	
					return this._throwsRouteError( error_code || 500, err, fragmentUrl );
				this._followRoute(uO, u, mI);
				}.bind(this);
			}.bind(this)(fragmentUrl, url, matchedIndexes));
		
		request = this._buildRequestObject( fragmentUrl, params, splat );
		route.routeAction(request, next);
	};
	
	/**
	 * Internally call every registered before
	 * @param {Array} befores Array of befores callback
	 * @param {Function} before Actual before
	 * @param {Object} urlObj Object of the url which fired this route
	 * @param {String} url Url which fired this route
	 * @param {Array} matchedIndexes Array of matched indexes
	 * @private
	 */
	Router.prototype._routeBefores = function(befores, before, fragmentUrl, url, matchedIndexes) {
		var next;
		if(befores.length > 0) {
			var nextBefore = befores.splice(0, 1);
			nextBefore = nextBefore[0];
			next = function(err, error_code) {
				if(err)
					return this._throwsRouteError( error_code || 500, err, fragmentUrl);
				this._routeBefores(befores, nextBefore, fragmentUrl, url, matchedIndexes);
			}.bind(this);
		} else {
			next = function(err, error_code) {
				if(err)
					return this._throwsRouteError( error_code || 500, err, fragmentUrl);
				this._followRoute(fragmentUrl, url, matchedIndexes);
			}.bind(this);
		}
		before( this._buildRequestObject( fragmentUrl ), next );
	};
	
	/**
	 * On hashChange route request through registered handler
	 * @param  {String} fragmentUrl
	 * @private
	 */
	Router.prototype._route = function( fragmentUrl ) {
		var route = '', 
			befores = this._befores.slice(),/*Take a copy of befores cause is nedeed to splice them*/ 
			matchedIndexes = [],
			urlToTest;
		var url = fragmentUrl;
		if(url.length === 0)
			return true;
		url = url.replace( LEADING_BACKSLASHES_MATCH, '');
		urlToTest = (url.split('?'))[0]
			  .replace( LEADING_BACKSLASHES_MATCH, '');/*Removes leading backslashes from the end of the url*/
		/*Check for all matching indexes*/
		for(var p in this._routes) {
			if(this._routes.hasOwnProperty(p)) {
				route = this._routes[p];
				if(route.path.test(urlToTest)) {
					matchedIndexes.push(p);
				}
			}
		}
		
		if(matchedIndexes.length > 0) {
			/*If befores were added call them in order*/
			if(befores.length > 0) {
				var before = befores.splice(0, 1);
				before = before[0];
				/*Execute all before consecutively*/
				this._routeBefores(befores, before, fragmentUrl, url, matchedIndexes);
			} else {
				/*Follow all routes*/
				this._followRoute(fragmentUrl, url,  matchedIndexes);
			}
		/*If no route matched, then call 404 error*/
		} else {
			return this._throwsRouteError(404, null, fragmentUrl);
		}
	};
	
	/**
	 * Pause router to be binded on hashchange
	 * @return {Router} return router
	*/
	Router.prototype.pause = function(){
		this._paused = true;
		return this;
	};
	
	/**
	 * Unpause router to be binded on hashchange
	 * @param   {Boolean} triggerNow If true evaluate location immediately
	 * @return {Router} return router
	 */
	Router.prototype.play = function(triggerNow){
		triggerNow = 'undefined' == typeof triggerNow ? false : triggerNow;
		this._paused = false;
		if(triggerNow){
			this._route( this._extractFragment(window.location.href) );
		}
		return this;
	};
	
	/**
	 * Set location but doesn't fire route handler
	 * @param {String} url Url to set location to
	 * @return {Router} return router
	 * 
	 */
	Router.prototype.setLocation = function(url){
		window.history.pushState(null,'',url);
		return this;
	};
	
	/**
	 * Set location and fires route handler
	 * @param {String} url Url to redirect to
	 * @return {Router} return router
	 */
	Router.prototype.redirect = function(url){
		this.setLocation(url);
		if(!this._paused)
			this._route( this._extractFragment(url) );
		return this;
	};

	/**
	 * Add a routes to possible route match. Alias : route, add, get
	 * @param {String|RexExp} path A string or a regular expression to match
	 * @param {Function} callback Function to be fired on path match
	 *                            Callback will be fired with (req, next)
	 *                            req is the current Request and contains {
	 * 							                    					'href': local href,
	 * 																    'params': Object containing parameter for the request plus splat
	 * 																}
	 */
	Router.prototype.addRoute = 
	Router.prototype.add = 
	Router.prototype.route = 
	Router.prototype.get = function(path, callback) {
		var match, 
			modifiers = (this._options.ignorecase ? 'i' : ''), 
			paramNames = [];
		if('string' == typeof path) {
			/*Remove leading backslash from the end of the string*/
			path = path.replace(LEADING_BACKSLASHES_MATCH,'');
			/*Param Names are all the one defined as :param in the path*/
			while(( match = PATH_NAME_MATCHER.exec(path)) !== null) {
				paramNames.push(decodeURIComponent(match[1]));
			}
			path = new RegExp(path
					      .replace(PATH_NAME_MATCHER, PATH_REPLACER)
					      .replace(PATH_EVERY_MATCHER, PATH_EVERY_REPLACER)
					      .replace(PATH_EVERY_GLOBAL_MATCHER, PATH_EVERY_GLOBAL_REPLACER) + "(?:\\?.+)?$", modifiers);
		}
		this._routes.push({
			'path' : path,
			'paramNames' : paramNames,
			'routeAction' : callback
		});
		return this;
	};
	
	
	/**
	 * Adds a before callback. Will be fired before every route
	 * @params {Function} callback
	 */
	Router.prototype.before = function(callback) {
		this._befores.push(callback);
		return this;
	};
	
	
	/**
	 * Adds error callback handling for Http code
	 * @param {Number} httpCode Http code to handle just like 404,500 or what else
	 * @param {Function} callback Handler for error
	 */
	Router.prototype.errors = function(httpCode, callback) {
		if(isNaN(httpCode)) {
			throw new Error('Invalid code for routes error handling');
		}
		if(!(callback instanceof Function)){
			throw new Error('Invalid callback for routes error handling');
		}
		httpCode = '_' + httpCode;
		this._errors[httpCode] = callback;
		return this;
	};
	
	/**
	 * Run application. Note that calling this is not mandatory. Calling it just force application to evaluate current or passed url
	 * @param {String} startUrl Url to redirect application on startup. Default is current location
	 */
	Router.prototype.run = function( startUrl ){
		if(!startUrl){
			startUrl = this._extractFragment(window.location.href);
		}
		startUrl = startUrl.indexOf('#') === 0 ? startUrl : '#'+startUrl;
		this.redirect( startUrl );
		return this;
	};

	/**
	 * Remove every reference to DOM and event listeners
	 * @return {Router} This router
	 */
	Router.prototype.destroy = function(){
		removeHashchangeListener(window, this._hasChangeHandler);
		return this;
	};

	return Router;
}));
