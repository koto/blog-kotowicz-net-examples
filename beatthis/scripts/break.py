#!/usr/bin/python
# Breaks Vigenere cipher (repeating multibyte key Ceasar's cipher) by
#  - using Friedman test to determine key length
#  - using Kerckhoff's method to brute force each byte of the key
# You need to supply a model file with similar alphabet
# as the one supposedly used in plaintext - this is used
# for letter frequency analysis
#
# Uses XOR, ADD and ROL methods to transform the ciphertext
# It's easy to add new methods by yourself, just define a function and add it to 
# @author Krzysztof Kotowicz <kkotowicz at gmail dot com>
# @see http://blog.kotowicz.net
# @see http://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher
#
# Usage:
# break.py cipher-file
#  - will print IC for different key lenghts (1-50) - observe periodic similarities
#    e.g. when 3,6,9,12 lengths give significally different ICs, key is probably 3 bytes long
#
# break.py cipher-file model-plaintext-file
#  -  same, but will print IC difference to model file, makes it easier to spot key length
#
# break.py cipher-file model-plaintext-file key-length > decoded
# brute force the key, outputing plain text
#
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


def multibyte_transform(s, transformers):
# transformers is a list of (function, key) tuples
  out = '';
  i = 0
  for char in s:
     #loop transformers
     if i == len(transformers):
       i = 0
     fun = transformers[i][0]
     key = int(transformers[i][1])
     i = i + 1
     tr = fun(char, key)
     if tr == None: # abort
        return None
     out += tr
  return out

def ic(s):
  # calculate index of coincidence of a string
  # normalized to 256 - lowercase english + punct ~= 17.8
  o = occurence_dict(s)
  l = len(s)
  if l <= 1:
    return 0.0
  ic = 0.0
  for i in o:
    ic += o[i] * (o[i] - 1)

  divide = 256.0
  #divide = len(occurences)
  ic /= (l*(l - 1) / divide)
  return ic

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

def delta_bar_ic(cols):
  sum_ic = 0
  for i in cols:
    sum_ic += ic(i)
  return sum_ic / len(cols)

def brute_force_to_model(s, model, num_best_keys, functions):
  # brute force a key to achieve maximum correlation of relative frequencies, returns num_best_keys keys
  corels = {}
  for fun in functions:
    for i in range(1,256):
      # count corel for each possible key value
      transformed = multibyte_transform(s, [(fun, i)])
      if transformed != None:
        real = freq_list(transformed)
        corels[(fun,i)] = 0.0
        for k,v in model.items():
          if k in real:
            corels[(fun,i)] += real[k] * v

  if num_best_keys == 1 :
    best = max(corels,key = lambda x: corels.get(x))
    return [best]
  else :  
    # pick some best corels, sort by value
    best_corels = sorted(corels.iteritems(), key=lambda (k,v): v, reverse = True)[:num_best_keys]
    return [k[0] for k in best_corels ]

# determine key length
def guess_key_length(min, max, model_ic) :
  for i in range(min,max+1):
    a = delta_bar_ic(columnize(cipher, i))
    sys.stderr.write(repr(i) + " " + repr(a))
    if model_ic:
      sys.stderr.write(" (" + str(abs(model_ic - a))+ ")")
    sys.stderr.write("\n")

#transforming functions:
# will be called in loop with key 0-255
# should return transformed char
# if key doesnt make sense, return None

# xor
def xor(char, key):
  return chr(ord(char) ^ key)

# add x to byte value, rounding to 256
def add(char, key):
  return chr((ord(char) + key) % 256)

# shift bits left
def rol(char, count):
    if count > 7:
      return None
    byte = ord(char)
    while count > 0:
        byte = (byte << 1 | byte >> 7) & 0xFF
        count -= 1
    return chr(byte)

def rot47(c, key):
    if key != 1:
      return None
    if c == " ":
      return " " #rot47 prserves space
    return chr(33+((ord(c)-33+47) %(47*2)))

# add your own functions to this list
try_these = [xor, add, rol]

def do_guess(cipher, model_plaintext, minim = 1, maxim = 50) :
  sys.stderr.write("Guessing key length...\n")

  model_ic = None
  if model_plaintext:
    # model file for freq analysis
    model_ic = ic(model_plaintext)
    sys.stderr.write("IC: " + str(model_ic) + "\n")
    model.close()

  #assume key is between 1 and 50
  guess_key_length(minim, maxim, model_ic)

if (len(sys.argv) == 1) :
  sys.stderr.write("Usage:\n" + sys.argv[0] + " ciphertext_file [plaintext_model_file] [key_length]\n")
elif len(sys.argv) <= 3 :
  #ciphertext file to break
  cipher = open(sys.argv[1], 'rb')
  if len(sys.argv) > 2:
    model = open(sys.argv[2], 'rb')
    do_guess(cipher, model.read())
    model.close()
  else :
    do_guess(cipher, None)
  cipher.close()

else:
  #ciphertext file to break
  cipher = open(sys.argv[1], 'rb')

  sys.stderr.write("Assuming key length " + sys.argv[3] + "\n")
  model = open(sys.argv[2], 'rb')
  model_f = freq_list(model.read())
  model.close()
  cols = columnize(cipher, int(sys.argv[3]))
  winning = [] #winning combinations
  for k, col in enumerate(cols) :
    sys.stderr.write("\nColumn " + str(k) + ":\n")
    # brute force key for column
    best = brute_force_to_model(col, model_f, 3, try_these)
    sys.stderr.write("Best matches:" + repr([(k[0].__name__, k[1]) for k in best ]) + "\n")
    (best_fun, best_key) = best[0] # lets only display one match here
    sys.stderr.write("Chosen function: " + best_fun.__name__ + ":" + repr(best_key) + "\n")
    winning.append(best[0])

  # display plaintext
  sys.stderr.write("Guessed plaintext:\n")
  cipher.seek(0)
  while 1:
    buf = cipher.read(1000*len(winning))
    if not buf:
      break
    sys.stdout.write(multibyte_transform(buf, winning))

