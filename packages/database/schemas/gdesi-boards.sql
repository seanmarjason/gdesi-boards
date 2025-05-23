 
CREATE TABLE users
(
  id SERIAL,
  name VARCHAR(255),
  email VARCHAR(255),
  pwHash  VARCHAR(255),
  salt VARCHAR(255),
  iterations INTEGER,
 
  PRIMARY KEY (id),
);
 

 CREATE TABLE boards
 (
  id SERIAL,
  name VARCHAR(255),
  columns VARCHAR(255) [],
  manager INTEGER,

  PRIMARY KEY (id),
  FOREIGN KEY (manager) REFERENCES users(id)
 );


 CREATE TABLE tasks
 (
  id SERIAL,
  boardid INTEGER,
  title VARCHAR(255),
  type VARCHAR(255),
  assignee INTEGER,
  description TEXT,
  links VARCHAR(255) [],
  status VARCHAR(255),
  deadline DATE,
  startedDate DATE,
  completedDate DATE,

  PRIMARY KEY (id),
  FOREIGN KEY (boardid) REFERENCES boards(id),
  FOREIGN KEY (assignee) REFERENCES users(id)
 );

CREATE TABLE checkins
(
  id SERIAL,
  boardId INTEGER,
  userId INTEGER,
  date DATE,
  rating INTEGER,
  comments TEXT,

  PRIMARY KEY (id),
  FOREIGN KEY (boardId) REFERENCES boards(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE checkInTasksMapping
(
  checkinId INTEGER,
  taskId INTEGER,
  status VARCHAR(255),

  PRIMARY KEY (checkinId, taskId, status),
  FOREIGN KEY (checkinId) REFERENCES checkins(id),
  FOREIGN KEY (taskId) REFERENCES tasks(id)
);

CREATE TABLE boardUserMapping
(
  boardId INTEGER,
  userId INTEGER,

  PRIMARY KEY (boardId, userId),
  FOREIGN KEY (boardId) REFERENCES boards(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE comments
(
  id SERIAL,
  taskId INTEGER,
  author VARCHAR(255),
  datecreated TIMESTAMP,
  comment TEXT,

  PRIMARY KEY (id),
  FOREIGN KEY (taskId) REFERENCES tasks(id)
);


CREATE TABLE links
(
  id SERIAL,
  taskId INTEGER,
  name VARCHAR(255),
  url VARCHAR(255),
  type VARCHAR(255),

  PRIMARY KEY (id),
  FOREIGN KEY (taskId) REFERENCES tasks(id)
);
