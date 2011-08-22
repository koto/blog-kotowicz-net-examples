<?php 
$remote = 'http://' . str_replace('attacker', 'victim', $_SERVER['HTTP_HOST']);
?>
<script src="<?php echo $remote ?>/origin/test.php?script=1"></script>
