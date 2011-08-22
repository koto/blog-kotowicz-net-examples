<?php 
$remote = 'http://' . str_replace('attacker', 'victim', $_SERVER['HTTP_HOST']);
?>
<head>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
<style>
p {
font-weight: bold;
}
</style>
</head>
<body>
<script>
history.pushState({}, '', '/origin/history-pushed-state');
</script>
<div>
<h2>Standard methods</h2>
	<div>
	<h3>embed: </h3>
	<embed src="<?php echo $remote ?>/origin/test.php?svg=1" width=400 height=100></embed>
	</div>
	
	<div>
	<h3>img: </h3>
	<img src="<?php echo $remote ?>/origin/test.php?svg=1" width=400 height=100 />
	</div>
	
	<div>
	<h3>frame: </h3>
	<iframe src="<?php echo $remote ?>/origin/test.php" width=400 height=100></iframe>
	</div>
	
	<div>
	<h3>CORS: </h3>
	<div id="cors">loading</div>
	</div>

	<div>
	<h3>form: </h3>
	<iframe src="form.php" width=400 height=100></iframe>
	</div>

	<div>
	<h3>script: </h3>
	<iframe src="script.php" width=400 height=100></iframe>
	</div>
	
	
</div>

<div>
<h2>Simple redirect methods</h2>
	<div>
	<h3>embed redirect: </h3>
	<embed src="redirect.php?svg=1" width=400 height=100></embed>
	</div>
	
	<div>
	<h3>img redirect: </h3>
	<img src="redirect.php?svg=1" width=400 height=100 />
	</div>
	
	<div>
	<h3>frame redirect: </h3>
	<iframe src="redirect.php" width=400 height=100></iframe>
	</div>

	<div>
	<h3>CORS redirect: </h3>
	<div id="cors-redirect">loading</div>
	</div>
	
</div>

<div>
<h2>Quirky redirects</h2>
	<div>
	<h3>meta refresh</h3>
	<iframe src="redirect.php?method=meta-refresh" width=400 height=100></iframe>
	</div>

	<div>
	<h3>location = </h3>
	<iframe src="redirect.php?method=location" width=400 height=100></iframe>
	</div>

    <div>
    <h3>window.navigate</h3>
    <iframe src="redirect.php?method=navigate" width=400 height=100></iframe>
    </div>
    
    <div>
    <h3>window.showModalDialog</h3>
    <iframe src="redirect.php?method=modal" width=400 height=100></iframe>
    </div>
    <div>
    <h3>xlink</h3>
    <iframe src="redirect.php?method=xlink" width=400 height=100></iframe>
    </div>
 
    
	<div>
	<h3>about:blank location=</h3>
	<iframe id=blank src="about:blank" width=400 height=100></iframe>
	</div>
	
    <div>
    <h3>about:blank cors</h3>
    <iframe id=blank-cors src="about:blank" width=400 height=100></iframe>
    </div>
	
</div>

<script>
$(function() {
	$('#cors').load('<?php echo $remote ?>/origin/test.php');
	$('#cors-redirect').load('redirect.php');
	$('#blank').contents()[0].write('<script>location="<?php echo $remote ?>/origin/test.php"<' + '/script>');
	$('#blank-cors').contents()[0].write('<iframe src="about:blank"></iframe>');
    setTimeout(function() {

	$('iframe', $('#blank-cors').contents()[0].body).contents()[0].write('<div /><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></'+'script><script>$("div").load("<?php echo $remote ?>/origin/test.php");</'+'script>');
    }, 1000);
});
</script>
</body>
