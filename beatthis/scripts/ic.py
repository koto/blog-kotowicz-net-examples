#!/usr/bin/python
# @author Krzysztof Kotowicz <kkotowicz at gmail dot com>
# @see http://blog.kotowicz.net
# Calculate index of coincidence between two files
import sys

f = open(sys.argv[1], 'rb')
f2 = open(sys.argv[2], 'rb')
count = 0
length = 0
while 1:
  one = f.read(1)
  two = f2.read(1)
  length+=1
  if one == two:
    count+=1

  if not one or not two:
     break

print (count/float(length))
f.close()
f2.close()
