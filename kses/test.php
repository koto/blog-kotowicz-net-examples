<?php
ini_set('display_errors', true);
$filtered = '';
$raw = '';
if (!empty($_POST['p'])) {
    $raw = $_POST['p'];
    include 'kses.php';
    $filtered = wp_kses_data($raw);
}
?>
<h2>Payload</h2>
<form method="post">
<textarea name=p cols=80 rows=20>
<?php echo htmlspecialchars($raw); ?>
</textarea>
<button type="submit">Test payload</button>
</form>
<hr />
<h2>Escaped</h2>
<?php echo htmlspecialchars($filtered); ?>
<h2>Raw</h2>
<?php echo $filtered; ?>