# back_end
back_end(이승진, 이성희, 구영진)



### DB 설정

config/mysql-config.js에서 각자 설정

```
CREATE DATABASE moment;
use moment;

CREATE TABLE user(
	idx INT(11) NOT NULL auto_increment,
	id VARCHAR(45) NOT NULL,
	password VARCHAR(45) NOT NULL,
	name VARCHAR(45) NOT NULL,
	email VARCHAR(45) NOT NULL,
	address VARCHAR(100) NOT NULL,
	private_key VARCHAR(100),
	wallet_address VARCHAR(100)
	PRIMARY KEY(idx)
) DEFAULT CHARSET=UTF8;

CREATE TABLE capsule (
	idx INT(11) NOT NULL,
	capsule_address VARCHAR(100) NOT NULL,
	money INT(11) NOT NULL,
	PRIMARY KEY (idx, capsule_address),
	FOREIGN KEY (idx) REFERENCES user(idx)
) DEFAULT CHARSET=UTF8;	

CREATE TABLE invitation (
	idx INT(11) NOT NULL,
	latitude DOUBLE(20, 10) NOT NULL,
	longitude DOUBLE(20, 10) NOT NULL,
	FOREIGN KEY (idx) REFERENCES user(idx)
) DEFAULT CHARSET=UTF8;	
```
