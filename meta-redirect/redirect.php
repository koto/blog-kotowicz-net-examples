<?php 
if (!empty($_POST)) {
?>
<meta http-equiv=refresh content="0;url=<?php echo htmlspecialchars($_POST['url']) ?>">
<?
} else {
    setcookie('secret', 'value' . time());
?>
<form method=post>
<input size=100 name=url>
<input type=submit value=redirect!>
</form>
<?php
}
?>