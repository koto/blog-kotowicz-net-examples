<?php 
$remote = 'http://' . str_replace('attacker', 'victim', $_SERVER['HTTP_HOST']);
?>
<form id=f method="post" action="<?php echo $remote ?>/origin/test.php">
<input name=_ type=hidden value=<?php echo rand(0, 99999); ?> /> 
<input type=submit>
</form>
<script>document.getElementById('f').submit();</script>
