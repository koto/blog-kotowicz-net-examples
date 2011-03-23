#!/usr/bin/python
# XORs a file
# Usage:
# ./xor.py plain.txt byte1 byte2 .... byten > cipher
# byte1..n - decimal value of a key byte (0..255)
# you can use one, or many bytes
#
# @author Krzysztof Kotowicz <kkotowicz at gmail dot com>
# @see http://blog.kotowicz.net
import sys

def multibyte_xor(s, keys):
  out = '';
  i = 0
  for char in s:
     if i == len(keys):
       i = 0
     key = int(keys[i])
     i = i + 1
     out += chr(ord(char) ^ key)
  return out

f = open(sys.argv[1], 'rb')
while 1:
  keys = sys.argv[2:]
  byte_s = f.read(1000 * len(keys))
  if not byte_s:
     break
  sys.stdout.write(multibyte_xor(byte_s, keys))
f.close()
