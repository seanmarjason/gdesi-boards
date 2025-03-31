import { sql } from '../connection'

export async function getActivity(board, date) {

  const result = await sql`
    SELECT u.name, u.id as userid, c.id, c.date, c.rating, COUNT(m.taskid)
    FROM checkInTasksMapping m 
    RIGHT JOIN checkins c ON m.checkinId = c.id
    INNER JOIN users u ON c.userId = u.id
    WHERE c.boardid = ${board}
    AND c.date BETWEEN (TO_DATE(${date}, 'YYYY-MM-DD') - 7) AND ${date} 
    GROUP BY u.name, c.id, u.id
  `;

  return result ? result : null;
};

