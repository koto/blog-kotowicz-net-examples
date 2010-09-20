<?php

$contents = file_get_contents('2.js');
$patterns = file('2.lines.txt');

foreach ($patterns as $pattern) {
    list($search,$replace) = explode(';', $pattern, 2);
    echo $search . "=>" . $replace . PHP_EOL;
    $contents = str_replace($search,rtrim($replace), $contents);
}

file_put_contents('3.js', $contents);