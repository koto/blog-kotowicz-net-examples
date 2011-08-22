<?php
ini_set('display_errors', false);
header('Access-Control-Allow-Origin: *');

$txt = 
	" ORIGIN: "
	. (array_key_exists('HTTP_ORIGIN', $_SERVER) ? $_SERVER['HTTP_ORIGIN'] : '-' )
	. "\n REFERER: "
	. (array_key_exists('HTTP_REFERER', $_SERVER) ? $_SERVER['HTTP_REFERER'] : '-');
	
if (!empty($_GET['svg'])) {
   header('Content-Type: image/svg+xml');
   echo "<" . '?xml version="1.0" standalone="no" ?' . ">";
   
?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
 "http://www.w3.org/2000/svg">
	<svg width="400px" height="100px" xmlns="http://www.w3.org/2000/svg">
	<text x="0" y="10%" font-size="10"><?php
	echo $txt;
	

?>
	</text>
	</svg>
	<?php
} elseif (!empty($_GET['script'])) {
	echo 'document.write("' . str_replace("\n",'<br/>', $txt) . '");';
	die();
} else {
	
	echo "<small>ORIGIN: ";
	print_r(array_key_exists('HTTP_ORIGIN', $_SERVER) ? $_SERVER['HTTP_ORIGIN'] : '-');
	echo "<br />REFERER: ";
	print_r(array_key_exists('HTTP_REFERER', $_SERVER) ? $_SERVER['HTTP_REFERER'] : '-');
	echo "</small>";
}
?>
