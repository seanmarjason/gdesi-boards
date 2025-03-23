import { sql } from '../connection'

export async function getCheckInList(boardid, userid) {
  const result = await sql`
  SELECT id, date, rating
  FROM checkins
  WHERE userid = ${userid}
  AND boardid = ${boardid}
  ORDER BY date DESC;
  `;

  // TODO: JOIN on task mapping to get tasks per check in (and populate this data)
  return result ? result : null;
}

export async function getCheckIn(id, boardid, userid) {
  const result = await sql`
  SELECT *
  FROM checkins
  WHERE id=${id}
  AND boardid=${boardid}
  AND userid=${userid};
  `;

  // TODO: JOIN on task mapping to get tasks per check in (and populate this data)
  return result ? result[0] : null;
}

export async function getCheckInData(id, boardid, userid) {
  const result = await sql`
  SELECT t.id as id, t.title as title, t.type as type, m.status as checkinStatus
  FROM 
  checkInTasksMapping m 
  INNER JOIN checkins c ON m.checkinId = c.id
  INNER JOIN tasks t ON m.taskId = t.id
  WHERE c.id=${id}
  AND c.boardid=${boardid}
  AND c.userid=${userid};;
  `;

  // TODO: JOIN on task mapping to get tasks per check in (and populate this data)
  return result ? result : null;
}
