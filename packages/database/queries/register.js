import { sql } from '../connection'

export async function registerUser(name, email, pwStore) {
  const result = await sql`
    INSERT INTO users (name, email, pwhash, salt, iterations )
    VALUES (
      ${name}, ${email}, ${pwStore.hash}, ${pwStore.salt}, ${pwStore.iterations}
    );
  `;

  return result ? result[0] : null;
}
