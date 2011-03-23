#!/usr/bin/python
# @author Krzysztof Kotowicz <kkotowicz at gmail dot com>
# @see http://blog.kotowicz.net
# Prints bytes frequency histogram for a given file, optionally splitting it in columns
import sys

def occurence_dict(s) :
  occurences = {}
  for i in s:
    if i in occurences:
      occurences[i] += 1
    else:
      occurences[i] = 1
  return occurences

def freq_list(s) :
  o = occurence_dict(s)
  for k, v in o.items():
    o[k] = float(v) / len(s);
  return o

def columnize(f, keylen) :
  texts = []
  f.seek(0)
  while 1:
    row = f.read(keylen)
    if not row:
       break
    for i in range(0, len(row)):
      if len(texts) <= i :
        texts.append("")
      texts[i] += row[i]
  return texts

if (len(sys.argv) == 1) :
  sys.stderr.write("Usage:\n" + sys.argv[0] + " ciphertext_file [key_length]\n")
else :  
  if len(sys.argv) > 2:
    keylen = int(sys.argv[2])
  else:
    keylen = 1

  #ciphertext file to break
  cipher = open(sys.argv[1], 'rb')
  columns = columnize(cipher, keylen)
  for k,column in enumerate(columns):
    print "col %d:\n-------------" % k
    f = freq_list(column)
    m = max(f, key=f.get)
    sort = sorted(f.items(), key=lambda x: x[1])
    sort.reverse()
    for k2,v2 in sort:
      s = ''
      if k2 == m:
        s = '*'
      print "%6s %02X %3d %s %.4f %s" % (repr(k2), ord(k2), ord(k2), '{0:08b}'.format(ord(k2)),v2, s)
  cipher.close()
