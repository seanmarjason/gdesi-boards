import { sql } from '../connection'

export async function registerUser(name, email, pwStore) {
  const result = await sql`
    INSERT INTO users (name, email, role, pwhash, salt, iterations )
    VALUES (
      ${name}, ${email}, 'user', ${pwStore.hash}, ${pwStore.salt}, ${pwStore.iterations}
    );
  `;

  return result ? result[0] : null;
}
