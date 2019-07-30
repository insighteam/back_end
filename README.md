# back_end
back_end(이승진, 이성희, 구영진)



### DB 설정

config/mysql-config.js에서 각자 설정

```
CREATE DATABASE moment;
use moment;

CREATE TABLE user (
	idx INT(11) NOT NULL auto_increment,
	id VARCHAR(45) NOT NULL,
	password VARCHAR(45) NOT NULL,
	name VARCHAR(45) NOT NULL,
	PRIMARY KEY(idx)
) DEFAULT CHARSET=utf8;
```



