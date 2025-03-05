import { sql } from '../connection'

export async function getUser(email) {
  const result = await sql`
    SELECT * FROM users WHERE email = ${ email }
  `;
  return result ? result[0] : null;
}

