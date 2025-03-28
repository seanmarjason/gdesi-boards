import { sql } from '../connection'

export async function getBoards(userId) {
  const result = await sql`
    SELECT * 
    FROM boards b
    INNER JOIN boardUserMapping m ON b.id = m.boardid
    WHERE m.userid = ${userId}
    ;
  `;

  return result ? result : null;
}


export async function getBoard(board) {
  const result = await sql`
    SELECT * FROM boards WHERE id = ${ board };
  `;

  return result ? result[0] : null;
}

export async function createBoard(name, manager, users) {
  const boardResult = await sql`
    INSERT INTO boards ( name, manager, columns ) 
    VALUES (
      ${name}, ${manager}, '{"To Do", "Doing", "Done"}'
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