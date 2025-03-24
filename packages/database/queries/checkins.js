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
  SELECT c.id, c.date, c.rating, c.comments, c.userid, u.name
  FROM checkins c
  INNER JOIN users u ON c.userid = u.id
  WHERE c.id=${id}
  AND boardid=${boardid}
  AND (c.userid=${userid} OR u.manager=${userid});
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
    AND c.userid=${userid};
  `;

  // TODO: JOIN on task mapping to get tasks per check in (and populate this data)
  return result ? result : null;
}

export async function createNewCheckin(boardid, userid, date, rating, tasksCompleted, tasksStarted, tasksDueNext, comments) {
  const checkinResult = await sql`
    INSERT INTO checkins (boardId, userId, date, rating, comments)
    VALUES (
      ${boardid}, ${userid}, ${date}, ${rating}, ${comments}
    )
    RETURNING id
  ;`;

  const { id: checkinid } = checkinResult[0]

  // // Build array of objects
  // const taskCompletedMap = tasksCompleted.map(task => ({ checkinid: checkinid, taskid: task, status: 'completed'}))
  // const tasksStartedMap = tasksStarted.map(task => ({ checkinid: checkinid, taskid: task, status: 'started'}))
  // const tasksDueNextMap = tasksDueNext.map(task => ({ checkinid: checkinid, taskid: task, status: 'due next'}))

  // const taskMappingResult = await sql`
  //   INSERT INTO checkInTasksMapping
  //     ${ sql(taskCompletedMap, 'checkinid', 'taskid', 'status')} 
  //     ${ sql(tasksStartedMap, 'checkinid', 'taskid', 'status')} 
  //     ${ sql(tasksDueNextMap, 'checkinid', 'taskid', 'status')} 
  //   ;
  // `

  // return checkinResult ? checkinResult : null;
}