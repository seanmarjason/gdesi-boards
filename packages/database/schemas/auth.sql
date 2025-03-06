 
CREATE TABLE users
(
  id SERIAL,
  name VARCHAR(255),
  email VARCHAR(255),
  role  VARCHAR(255),
  pwHash  VARCHAR(255),
  salt VARCHAR(255),
  iterations INTEGER,
 
  PRIMARY KEY (id)
);
 