<?php session_start(); ?>
<html>
  <body>
<h1>Charset-based XSS (htmlentities() bypass) attempt</h1>
<p>Using 301 redirect in a frame to <a href="http://securethoughts.com/2009/05/exploiting-ie8-utf-7-xss-vulnerability-using-local-redirection">
force a charset on a target page</a> (IE 6-8). Changed charset allows to bypass htmlentities() escaping and sneak in a XSS.
<p>However, IE encodes query string in target charset, often messing up "=" so that the target page has it's parameters messed up and the payload is never processed
<p>To test:
<ol>
<li>enter a charset  (e.g. utf-7)
<li>enter payload to target page - this will 301 redirect
<li>cry :/
</ol>
    <iframe width="100%" frameborder=0 height=2000 src="start.php"></iframe>
  </body>
</html>