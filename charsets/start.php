<?php session_start(); ?>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=<?php echo htmlspecialchars($_POST['charset'])?>">
  </head>
  <body>
<h1>Setup</h1>  
CHARSET: <pre id=charset></pre>
<script>document.getElementById('charset').innerHTML = document.characterSet ? document.characterSet : document.charset;
</script>
<form method="post">
charset: <input name="charset" value="<?php echo htmlspecialchars($_POST['charset'])?>">
<br>
payload:
<textarea rows=5 cols=80 name=payload><?php echo htmlspecialchars($_POST['payload']); ?></textarea>
<input type=submit value="start">
</form>
<?php 
$_SESSION = $_POST;
?>
    <h2>301 redirect</h1>
    <iframe width=900 height=400 src="frame.php"></iframe>
    <hr />
    <h2>No redirect</h2>
    <iframe width=900 height=400 src="<?php 
$host = 'victim.kotowicz.net';

$url = 'http://' . $host . dirname($_SERVER['REQUEST_URI']) . '/vuln.php?payload=noredirect';

echo $url;    
    ?>"></iframe>

  </body>
</html>