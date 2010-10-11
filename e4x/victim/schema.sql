CREATE TABLE comments (id integer primary key, author varchar(20), ip varchar(39), comment text, date varchar(16), hidden boolean not null default 0);
CREATE INDEX comments_ip on comments (ip);

