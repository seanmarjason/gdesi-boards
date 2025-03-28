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
  SELECT 
      b.id,
      b.name,
      b.manager,
      b.columns,
      COALESCE(array_agg(m.userid) FILTER (WHERE m.userid IS NOT NULL), '{}') AS users 
    FROM boards b
    INNER JOIN boardusermapping m on b.id = m.boardid
    WHERE b.id = ${board}
    GROUP BY 
      b.id
    ;
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

  // Build array of objects
  const userMap = users.map(u => ({boardid: boardId, userid: u}))

  const boardUserResult = await sql`
    INSERT INTO boardUserMapping
      ${ sql(userMap, 'boardid', 'userid')} 
    ;
  `
  
  return boardId;
}

export async function updateBoard(boardId, name, manager, users) {
  const boardResult = await sql`
    UPDATE boards 
    SET 
      name = ${name},
      manager = ${manager},
      columns = '{"To Do", "Doing", "Done"}'
    WHERE id = ${boardId}
  `;

  // Build array of objects
  const userMap = users.map(u => ({boardid: boardId, userid: u}))

  const boardDropResult = await sql`
    DELETE FROM boardUserMapping
    WHERE boardid = ${boardId}
    ;
  `

  const boardUserResult = await sql`
    INSERT INTO boardUserMapping
      ${ sql(userMap, 'boardid', 'userid')} 
    ;
  `
  
  return boardId;
}