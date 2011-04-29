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
include 'header.php';

$file_storage = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'uploaded_files';

$response = false;
if (!empty($_FILES['contents'])) {  // process file upload
    $filename = $_SESSION['login'] . $_FILES['contents']['name'] . '.txt';
    $full = $file_storage . DIRECTORY_SEPARATOR . $filename;

    if (move_uploaded_file($_FILES['contents']['tmp_name'],  $full)) {
        $org = file_get_contents($full);
        file_put_contents($full, '[file extension changed and contents removed for security reasons. md5 of original file: ' . md5($org) . ']');
        $response = "$filename created";
    } else {
        $response = 'error!';
    }
}

if ($response) {
    echo "<h2>" . htmlspecialchars($response) . '</h2>';
}

?>

<p><a href="upload.php">One more file</a> <a href="index.php">I'm done</a></p>