<?php

$xt = file_get_contents('top.dat');
$matches = array();
preg_match_all('#"([a-z]{32})","(.*?)"#', $xt, $matches, PREG_SET_ORDER);
$ext = array();
foreach ($matches as $match) {
    $ext[$match[1]] = $match[2];
}
echo json_encode($ext);