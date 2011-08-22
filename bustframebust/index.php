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
    width: 300px;
    height: 60px;
}

dd {
    position: relative;
}

</style>
<h1>Same-domain ES5 iframe anti-frame-busting</h1>
<h2>By <a href="http://blog.kotowicz.net">Krzysztof Kotowicz</a></h2>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
<iframe id=f></iframe>
<script>
    var f = $("#f")[0], // frame
        w = f.contentWindow, // window
        d = f.contentDocument || f.contentWindow.document; // document
     
    $(f).load(function() {

    });

    if (Object.defineProperty) {
    Object.defineProperty(d, "location",{ writable: false, configurable: false}); // works in ie9+
    Object.defineProperty(w, "location",{ writable: false, configurable: false}); // works in firefox, ie9+
    Object.defineProperty(w, "framebust",{ configurable: true, set: function(v) {}, get: function() {
        return function() { console.log('im hijacked') };
    }});
    }
    
    f.src = 'framed.php';
    

</script>