<html>
<head>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
</head>
<body>
hello i will framebust in a moment.
<script>


var framebust = function() {
       self.location = 'data:text/html,you%20lost';
       console.log('framebusting');
}

setTimeout(function() {

	framebust();
	
	setTimeout(function() {
	    document.body.innerHTML += ('you won!');
	},300);
	
	$('body').click(function(){ 
		alert('really, you won'); return false;
	});

}, 500);
</script>
</body>
</html>