 
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
  links VARCHAR(255) [], -- TODO: Confirm if needs relation
  comments TEXT [], -- TODO: Confirm if needs relation
  status VARCHAR(255), -- TODO: Move to reference table
  deadline DATE,

  PRIMARY KEY (id),
  FOREIGN KEY (boardId) REFERENCES boards(id),
  FOREIGN KEY (assignee) REFERENCES users(id)
 );

CREATE TABLE checkins
(
  id SERIAL,
  boardId SERIAL,
  date DATE,
  rating INTEGER,
  comments TEXT [],

  PRIMARY KEY (id),
  FOREIGN KEY (boardId) REFERENCES boards(id),
);

CREATE TABLE checkInTasksMapping
(
  checkinId SERIAL,
  taskId SERIAL,
  status VARCHAR(255),

  PRIMARY KEY (checkinId, taskId),
  FOREIGN KEY (checkinId) REFERENCES checkins(id),
  FOREIGN KEY (taskId) REFERENCES tasks(id)
);