import { sql } from '../connection'

export async function getUser(email) {
  const result = await sql`
    SELECT 
      u.id,
      u.name,
      u.email,
      u.pwhash,
      u.salt,
      u.iterations,
      COALESCE(array_agg(b.boardid) FILTER (WHERE b.boardid IS NOT NULL), '{}') AS boards,
      COALESCE(array_agg(s.id) FILTER (WHERE s.id IS NOT NULL), '{}') AS manager
    FROM 
        users u
    LEFT JOIN 
        boardUserMapping b ON u.id = b.userid
    LEFT JOIN
        boards s ON u.id = s.manager
    WHERE email = ${email}
    GROUP BY 
        u.id, u.name, u.email;
  `;
  return result ? result[0] : null;
}

export async function getUsers(boardid) {
  const result = await sql`
    SELECT u.id, u.name 
    FROM users u
    INNER JOIN boardUserMapping b ON u.id = b.userid
    WHERE b.boardid = ${boardid};
  `;

  return result ? result : null;
}

export async function getAllUsers() {
  const result = await sql`
    SELECT id, name 
    FROM users
  `;

  return result ? result : null;
}