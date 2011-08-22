<?php
$remote = 'http://' . str_replace('attacker', 'victim', $_SERVER['HTTP_HOST']);

if (empty($_GET['method'])) {
	$_GET['method'] = '301';
}

$method = $_GET['method'];
unset($_GET['method']);
$_GET['_']  = rand(0, 99999);
$url = $remote . '/origin/test.php?' . http_build_query($_GET);

switch ($method) {
	case '301':
    case '302':
    case '303':
    case '304':
		header('Location: ' . $url, true, $method);
	break;
    case 'meta-refresh':
        echo '<meta http-equiv="refresh" content="1;' . $url . '" />';
    break; 
    case 'navigate':
        $js = "navigate('$url')";
    break; 
    case 'location':
    	$js = "window.location='$url';";
    break;
    case 'modal':
        $js = "showModalDialog('$url')";
    break;
    case 'xlink':
        echo '<x xmlns:xlink="http://www.w3.org/1999/xlink" xlink:actuate="onLoad" xlink:href="' . $url .'" xlink:type="simple"/>loading';    	
    break;	
    
}

if (!empty($js)) {
    echo '<img src=x onerror="' . htmlspecialchars($js, ENT_QUOTES) . '" />' . "...loading...";
}