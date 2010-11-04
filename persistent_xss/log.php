<?php
if (!empty($_POST)) {
    $db = new PDO('sqlite:' . dirname(__FILE__) . DIRECTORY_SEPARATOR . 'payloads.sqlite');

    $site = !empty($_GET['site']) ? $_GET['site'] : 'default';
    // SQL injection protection - prepared statements
    $stmt = $db->prepare("INSERT INTO payloads (date, site, ip, payload, hidden) VALUES(:d,:s,:i,:p,0)");
    $ok = $stmt->execute(array(
        'd' => date('Y-m-d H:i:s'),
        's' => $site,
        'p' => json_encode($_POST),
        'i' => $_SERVER['REMOTE_ADDR'])
    );
}