<form id=f enctype="text/plain" method="post">
b <textarea id=begin></textarea><br>
<textarea name="b"></textarea><br>
e <textarea id=end></textarea><br>
</form>
<textarea id="begin-name"></textarea>
<textarea id="end-name"></textarea>
<button onclick="own()">own</button>
<script>
function own() {
var d=document;

d.i=d.getElementById;

d.i('begin').name = d.i('begin-name').value;
d.i('end').name = d.i('end').value;
d.i('f').submit();
}
</script>
<?php

ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] == 'POST') 

$raw = file_get_contents('php://input');

var_dump($raw);
var_dump($_POST);
var_dump('json',json_decode($raw));

if ($xml = simplexml_load_string($raw))
   var_dump('xml', $xml->asXML());

