import { sql } from '../connection'

export async function getCheckInList(page, limit) {
  const start = ((page-1) * limit) + 1
  const end = ((page-1) * limit) + limit

  const result = await sql`
  SELECT id, date, rating
  FROM checkins
  WHERE id BETWEEN ${start} AND ${end}; 
  `;

  // TODO: Reverse order of checkins returned
  // TODO: JOIN on task mapping to get tasks per check in (and populate this data)
  return result ? result : null;
}
