<?php
/**
 * Login form
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

if (!empty($_POST['login'])) {
    $_SESSION['login'] = preg_replace('[^a-zA-Z0-9-]', '', $_POST['login']);
}

if (array_key_exists('logout', $_GET)) {
    unset($_SESSION['logout']);
}

if (empty($_SESSION['login'])) {
    echo "<form action=index.php method=post><input name=login placeholder=login><br><input type=password><br><input type=submit></form>";
} else {
    echo "Hello, " . htmlspecialchars($_SESSION['login']) . "<br>";
    echo "<a href=?logout>logout</a>";
    $files = glob(__DIR__ . DIRECTORY_SEPARATOR . 'uploaded_files' . DIRECTORY_SEPARATOR . $_SESSION['login'] . '*');
    if ($files) {
        echo "<h2>Your files</h2><ul>";
        foreach ($files as $file) {
            echo "<li><a href=\"uploaded_files/". htmlspecialchars(basename($file)) . '">' . basename($file) . "</a></li>";
        }
        echo "</ul>";
    }

    echo "<p>Would you like to <a href=upload.php>upload new file</a>?</p>";
}
