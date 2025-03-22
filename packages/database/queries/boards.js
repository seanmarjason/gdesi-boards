import { sql } from '../connection'

export async function getBoards() {
  const result = await sql`
    SELECT * FROM boards;
  `;

// TODO: Update select for only boards user has access to

  return result ? result : null;
}


export async function getBoard(board) {
  const result = await sql`
    SELECT * FROM boards WHERE id = ${ board };
  `;

  return result ? result[0] : null;
}

export async function createBoard(name, users) {
  const boardResult = await sql`
    INSERT INTO boards ( name, columns ) 
    VALUES (
      ${name}, '{"To Do", "Doing", "Done"}'
    )
    RETURNING id;
  `;

  const { id: boardId } = boardResult[0]

  // Buikd array of objects
  const userMap = users.map(u => ({boardid: boardId, userid: u}))

  const boardUserResult = await sql`
    INSERT INTO boardUserMapping
      ${ sql(userMap, 'boardid', 'userid')} 
    ;
  `
  
  return boardId;
}