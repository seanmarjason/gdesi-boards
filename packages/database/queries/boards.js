import { sql } from '../connection'

export async function getBoards() {
  const result = await sql`
    SELECT * FROM boards;
  `;

  return result ? result : null;
}


export async function getBoard(board) {
  const result = await sql`
    SELECT * FROM boards WHERE id = ${ board };
  `;

  return result ? result[0] : null;
}
