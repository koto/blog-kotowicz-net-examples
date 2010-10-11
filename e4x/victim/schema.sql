CREATE TABLE comments (id integer primary key, author varchar(20), ip varchar(39), comment text);
CREATE INDEX comments_ip on comments (ip);

