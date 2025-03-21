import { sql } from '../connection'

export async function getCheckInList() {
  const result = await sql`
  SELECT id, date, rating
  FROM checkins
  ORDER BY date DESC;
  `;

  // TODO: JOIN on task mapping to get tasks per check in (and populate this data)
  return result ? result : null;
}

export async function getCheckIn(id) {
  const result = await sql`
  SELECT *
  FROM checkins
  WHERE id=${id};
  `;

  // TODO: JOIN on task mapping to get tasks per check in (and populate this data)
  return result ? result[0] : null;
}

export async function getCheckInData(id) {
  const result = await sql`
  SELECT t.id as id, t.title as title, t.type as type, m.status as checkinStatus
  FROM 
  checkInTasksMapping m 
  INNER JOIN checkins c ON m.checkinId = c.id
  INNER JOIN tasks t ON m.taskId = t.id
  WHERE c.id=${id};
  `;

  // TODO: JOIN on task mapping to get tasks per check in (and populate this data)
  return result ? result : null;
}
