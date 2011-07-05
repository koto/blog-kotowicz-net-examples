<!doctype html>
<html>
<head>
<meta charset="utf-8">
<script
	src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>

<style>

iframe#one {
	margin: 0;
	padding: 0;
	width: 48%;
	height: 100em;
	float: left;
	border: 1px solid red;
	display:block;
}

pre {
	width: 48%;
	float: left;
	border: 1px solid green;
	height: 100em;
	display:block;
	padding: 8px;
	margin:0;
}

body,html {
	margin: 0;
	padding: 0;
}
</style>
</head>
<body>
	<iframe id=one scrolling=no></iframe><pre><? echo htmlspecialchars(file_get_contents('victim.html')); ?></pre>
		
	<script>
		$(function() {
			var host = location.host;
			var url = 'view-source:view-source:http://' + host + '/fake-captcha/victim.html?' + Math.random();
			$("#one").attr('src', url);
		})
	</script>
</body>
</html>
