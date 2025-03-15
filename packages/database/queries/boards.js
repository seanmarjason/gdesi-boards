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
