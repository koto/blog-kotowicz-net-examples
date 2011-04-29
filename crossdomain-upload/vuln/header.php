<?php
/**
 * HTML Header
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

session_start(); 
?>

<!DOCTYPE html> 
<html> 
<head>
<meta charset=utf-8 />
<link href='http://fonts.googleapis.com/css?family=Inconsolata' rel='stylesheet' type='text/css'> 
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js" type="text/javascript"></script>
<style>
body {background: #393; color: #eee; font-family: 'Inconsolata', Verdana, sans-serif;}
.warning {color: yellow;}
</style>
</head>
<body>
<h1>Private file uploading service</h1>
<p>by <a rel="me" href="http://blog.kotowicz.net">Krzysztof Kotowicz</a></p>
<p class="warning">This site is just a demonstration of vulnerability class. Be careful when browsing it!</p>