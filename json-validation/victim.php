<?php 
if (preg_match('/source/', $_SERVER['QUERY_STRING'])) {
    highlight_file(__FILE__);
    die();
}
?>
<body>
<pre id=log>
</pre>
<?php
// we only allow:
// a-z A-Z - : " , . { } and a space
// to be safe
$allowed_chars = '[-a-zA-Z0-9:",. {}]';

if (!empty($_POST['json'])) {
  $json = trim($_POST['json']);
  
  if (!preg_match('/^' . $allowed_chars . '+$/', $json)) {
    echo "<h2>Invalid characters detected, aborting!</h2>";
  } else {
    ?>
<script>
var input,obj;

function goto() {
    location = this;
}

window.onload = function() {
    input = '<?php echo $json ?>';
    obj = eval("(" + input + ")");
    if (typeof console !== 'undefined' && console.log) { console.log(obj); };
    document.getElementById("log").innerText = obj;
};
</script>
   <?php
  }
  
}

?>
<form method=post>
<textarea rows=10 cols=80 name=json><?php echo ($json ? htmlspecialchars($json) : '{"onlyjson":"here"}'); ?>
</textarea>
<input type=submit>
</form>
</body>