<html>
<head>
<script src="jquery.min.js"></script>
</head>
<body>
hello i will framebust in a moment.
<script>
<?php

$pre = array(
    'functionvar' => <<<EOF
	var framebust = function() {
	    document.write("you lost");
//	    alert('you lost');
	    location = 'data:text/html,you%20lost';
	}
EOF
);

$codes = array(
    'topself' => <<<EOF
	if (top != self) {
	    top.location = self.location;
	}
EOF
    ,'locationhref' => <<<EOF
	location.href = 'data:text/html,you%20lost';
EOF
    ,'functionvar' => <<<EOF
	framebust();
EOF
);

$framebust = '';
$framebust_pre = '';

if (!empty($_GET['method']) && array_key_exists($_GET['method'], $codes)) {
    $m = $_GET['method'];
    $framebust = $codes[$m];
    $framebust_pre = !empty($pre[$m]) ? $pre[$m] : '';
} 

?>

<?php echo $framebust_pre ?>

setTimeout(function() {

        <?php echo $framebust ?>
	
	setTimeout(function() {
	    document.body.innerHTML += ('you won. unless im top, in that case - no, you didn\'t!');
	},300);
	
	$('body').click(function(){ 
		alert('really, you won'); return false;
	});

}, 500);

</script>
</body>
</html>