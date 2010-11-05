<?php
if (count($_GET) == 1) { // encoded
    parse_str(urldecode($_SERVER['QUERY_STRING']), $_GET);
}

if (!empty($_GET)) {
    $db = new PDO('sqlite:' . dirname(__FILE__) . DIRECTORY_SEPARATOR . 'payloads.sqlite');

    $site = !empty($_GET['site']) ? $_GET['site'] : 'default';
    unset($_GET['site']);
    unset($_GET['_']);
    $_GET['agent'] = $_SERVER['HTTP_USER_AGENT'];
    // SQL injection protection - prepared statements
    $stmt = $db->prepare("INSERT INTO payloads (date, site, ip, payload, hidden) VALUES(:d,:s,:i,:p,0)");
    $ok = $stmt->execute(array(
        'd' => date('Y-m-d H:i:s'),
        's' => $site,
        'p' => json_encode($_GET),
        'i' => $_SERVER['REMOTE_ADDR'])
    );
}

header("Content-Type: image/gif");
//43byte 1x1 transparent pixel gif
echo base64_decode("R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");
