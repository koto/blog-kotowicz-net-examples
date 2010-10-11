<html>
<head>
<title>XSS attack demo</title>
<script src="http://code.jquery.com/jquery-1.4.2.min.js"></script>
<link rel="stylesheet" type="text/css" href="css.css" />
<?php 
	
	$widget = null;
 
        if (!empty($_GET['widget'])) {
		// use only a-z and . for widget files (path traversal & xss protection)
		$widget = preg_replace('/[^a-z\.]/', '', $_GET['widget']); 
		echo '<script type="text/javascript" src="' . htmlspecialchars($widget) . '"></script>';
        }
?>
</head>
<body>
<div id="container">
<h1>Shoutbox</h1>

<p>Use widgets: 
<?php 
$widgets = array('zoom.js', 'shout.js');

foreach ($widgets as $w) {
	echo "<a href=\"?widget={$w}\">{$w}</a> ";
}
?>
</p>
<?php

	$ip = $_SERVER['REMOTE_ADDR'];
	$db = new PDO('sqlite:' . dirname(__FILE__) . DIRECTORY_SEPARATOR . 'shoutbox.sqlite');

	// delete comments for IP
	if (!empty($_GET['clear'])) {
		$stmt = $db->prepare("UPDATE comments SET hidden = 1 WHERE ip = :i");
		$ok = $stmt->execute(array(
			'i' => $ip)
		);
		if ($ok) {
			echo "<h3>Comments deleted.</h3>";
		}
	}

	// add comments to db
	if (!empty($_POST['author']) && !empty($_POST['comment'])) {

		// SQL injection protection - prepared statements
		$stmt = $db->prepare("INSERT INTO comments (date, author, comment, ip, hidden) VALUES(:d,:a,:c,:i, 0)");
		$ok = $stmt->execute(array(
			'd' => date('Y-m-d H:i:s'),
			'a' => $_POST['author'], 
			'c' => $_POST['comment'],
			'i' => $ip)
		);

		if ($ok) {
			echo "<h3>Comment added.</h3>";
		}


	}

	// fetch all comments and render them with htmlspecialchars() (XSS protection) 
	$stmt = $db->prepare("SELECT author, comment FROM comments WHERE ip = ? AND hidden <> 1 ORDER BY id DESC");

	$result = $stmt->execute(array($ip));

	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) : ?>
		<div class="comment">
		<strong class="author"><?php echo htmlspecialchars($row['author']) ?></strong>
		<div class="comment-text"><?php echo htmlspecialchars($row['comment']) ?></div>
		</div>
	<?php endwhile; ?>
<h2>Add your comment</h2>
<form action="shoutbox.php?widget=<?php echo htmlspecialchars($widget) ?>" method="post">
Author: <br /><input name="author" value="me" /><br />
Comment: <br /><textarea name="comment"></textarea><br />
<small>Your IP: <?php echo htmlspecialchars($ip); ?></small><br />
<p><button type="submit"><strong>Add comment</strong></button></p>
<p><a href="?clear=1">Delete your comments</a></p>
</form>
<p>
<strong>Disclaimer:</strong> This page is a demonstraction of XSS attack. IT MAY CONTAIN MALICIOUS CODE (if somebody injects it), be careful!
<br />For more info see <a href="http://blog.kotowicz.net/2010/10/test-your-skills-with-this-xss-hackme.html">the blog</a>
</p>
</div>
</body>
</html>
<!--
{/copyright 2010 kkotowicz@gmail.com/}
-->
