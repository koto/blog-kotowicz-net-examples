CREATE TABLE comments(id integer primary key, author varchar(20), ip varchar(15), comment text);
CREATE INDEX comments_ip on comments (ip);
