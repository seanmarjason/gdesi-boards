import { sql } from '../connection'

export async function getUser(email) {
  const result = await sql`
    SELECT * FROM users WHERE email = ${ email }
  `;
  return result ? result[0] : null;
}

export async function getUsers() {
  const result = await sql`
    SELECT id, name FROM users;
  `;
return result ? result : null;
}