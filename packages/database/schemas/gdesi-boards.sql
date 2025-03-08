 
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
 

 CREATE TABLE boards
 (
  id SERIAL,
  name VARCHAR(255),
  columns VARCHAR(255) [],

  PRIMARY KEY (id)
 );


 CREATE TABLE tasks
 (
  id SERIAL,
  boardId SERIAL,
  title VARCHAR(255), -- TODO: Move to reference table
  type VARCHAR(255),
  assignee SERIAL,
  description TEXT,
  links VARChAR(255) [], -- TODO: Confirm if needs relation
  comments TEXT [], -- TODO: Confirm if needs relation
  status VARCHAR(255), -- TODO: Move to reference table
  deadline DATE,

  PRIMARY KEY (taskId),
  FOREIGN KEY (boardId) REFERENCES boards(id),
  FOREIGN KEY (assignee) REFERENCES users(id)
 );

