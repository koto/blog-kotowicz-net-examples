#!/usr/bin/env python
import sys
from struct import pack

def unicodize(s):
  for char in s:
    sys.stdout.write('\\u00%02x' % ord(char))

sys.stdout.write('"')
with open(sys.argv[1],'rb') as f:
  while True:
	  a = f.read(4096)
	  if not a:
		break
	  unicodize(a)
sys.stdout.write('"\n')