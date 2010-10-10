<html>
<head>
<title></title>
<script src="http://code.jquery.com/jquery-1.4.2.min.js"></script>
<link rel="stylesheet" type="text/css" href="css.css" />
<?php

$db = new PDO('sqlite:' . dirname(__FILE__) . DIRECTORY_SEPARATOR . 'shoutbox.sqlite');

if (!empty($_POST['author']) && !empty($_POST['comment'])) {
	// add to db

	// SQL injection protection - prepared statements
	$stmt = $db->prepare("INSERT INTO comments (author, comment) VALUES(:a,:c)");
	$stmt->execute(array(
		'a' => $_POST['author'], 
		'c' => $_POST['comment'])
	);

}

if (!empty($_GET['widget'])) {
	// use only a-z and . for widget files (path traversal & xss protection)
	$widget = preg_replace('/[^a-z\.]/', '', $_GET['widget']); 
	echo '<script type="text/javascript" src="' . htmlspecialchars($widget) . '"></script>';
}
?>
</head>
<body>
<h1>Shoutbox</h1>
<?php
	// fetch all comments and render them with htmlspecialchars() (XSS protection) 
	$result = $db->query("SELECT author, comment FROM comments ORDER BY id DESC");
	foreach ($result as $row) : ?>
	<div class="comment">
	<strong class="author"><?php echo htmlspecialchars($row['author']) ?></strong>
	<div class="comment-text"><?php echo htmlspecialchars($row['comment']) ?></div>
	</div>
	<?php endforeach; ?>
<h2>Add your comment</h2>
<form action="" method="post">
Author: <input name="author" /><br />
Shout: <textarea name="comment"></textarea><br />
<button type="submit">Add comment</button>
</form>
</body>
</html>
<!--
{/copyright 2010 kkotowicz@gmail.com/}
-->
