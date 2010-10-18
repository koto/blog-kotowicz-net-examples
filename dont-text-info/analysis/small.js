var Tynt = Tynt || [];
function WAU_small(b) {
	var c = "";
	var a = "";
	if (document.title) {
		a = encodeURIComponent(document.title.replace(/(\?=)|(\/)/g, ""))
	}
	document
			.write('<a href="http://whos.amung.us/stats/'
					+ b
					+ '/"><img src="http://whos.amung.us/swidget/'
					+ b
					+ "/"
					+ a
					+ c
					+ '" width="80" height="15" border="0" title="Click to see how many people are online" /></a>');
	if (document.location.protocol == "http:") {
		Tynt.push("w!" + b);
		(function() {
			var e = document.createElement("script");
			e.async = "async";
			e.type = "text/javascript";
			e.src = "http://cdn.tynt.com/tc.js";
			var d = document.getElementsByTagName("script")[0];
			d.parentNode.insertBefore(e, d)
		})()
	}
};