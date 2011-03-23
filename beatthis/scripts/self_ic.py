#!/usr/bin/python
# @author Krzysztof Kotowicz <kkotowicz at gmail dot com>
# @see http://blog.kotowicz.net
# Calculate self index of coincidence
import sys

f = open(sys.argv[1], 'rb')
occurences = {}
count = 0
l = 0
while 1:
  one = f.read(1)
  if not one:
     break
  l += 1
  if one[0] in occurences:
    occurences[one[0]] += 1
  else:
    occurences[one[0]] = 1

f.close()

ic = 0.0
for i in occurences:
  ic += occurences[i]* (occurences[i] - 1)

divide = 256
#divide = len(occurences)
ic /= (l*(l - 1) / divide)

print ic, len(occurences)

