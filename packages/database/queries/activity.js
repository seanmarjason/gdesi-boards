import { sql } from '../connection'

export async function getActivity(date) {

  const result = await sql`
    SELECT u.name, c.id, c.date, c.rating, COUNT(m.taskid)
    FROM checkInTasksMapping m 
    RIGHT JOIN checkins c ON m.checkinId = c.id
    INNER JOIN users u ON c.userId = u.id
    WHERE c.date BETWEEN (TO_DATE(${date}, 'YYYY-MM-DD') - 7) AND ${date} 
    GROUP BY u.name, c.id
  `;
  // TODO: Add in counts of tasks

  return result ? result : null;
};

