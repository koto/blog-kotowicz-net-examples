<?php
/**
 * Upload file form
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

if (empty($_SESSION['login'])) {
     echo "You need to be <a href=index.php>logged in</a> to upload files.";
} else {
    echo "<form method=post action=recv.php enctype=multipart/form-data><input name=contents type=file><br><input type=submit value=upload>";
}