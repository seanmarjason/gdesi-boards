import { sql } from '../connection'

export async function getCheckInList(page, limit) {
  const start = ((page-1) * limit) + 1
  const end = ((page-1) * limit) + limit

  const result = await sql`
  SELECT id, date, rating
  FROM checkins
  WHERE id BETWEEN ${start} AND ${end};
  `;

  return result ? result : null;
}
