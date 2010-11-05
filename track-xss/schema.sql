CREATE TABLE payloads (id integer primary key, ip varchar(39), date varchar(16), hidden boolean not null default 0, payload text, site varchar(100));
CREATE INDEX payloads_hidden on payloads(hidden);
CREATE INDEX payloads_ip on payloads(ip);
CREATE INDEX payloads_site on payloads(site);

