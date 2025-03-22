INSERT INTO boards ( name, columns ) 
VALUES 
  ( 'Helpdesk', {"To Do", "Doing", "Done"} )
  ( 'Restricted', {"To Do", "Doing", "Done"} )
;

INSERT INTO boardUserMapping ( boardId, userId )
VALUES 
  ( 1, 1 ),
  ( 1, 2 ),
  ( 1, 3 ),
  ( 2, 1 )
;