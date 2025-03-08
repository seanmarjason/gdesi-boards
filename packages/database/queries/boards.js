import { sql } from '../connection'

export async function getBoard(board) {
  const result = await sql`
    SELECT * FROM boards WHERE id = ${ board };
  `;

  return result ? result[0] : null;
}
