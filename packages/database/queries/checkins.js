import { sql } from '../connection'

export async function getCheckInList(boardid, userid) {
  const result = await sql`
  SELECT id, date, rating
  FROM checkins
  WHERE userid = ${userid}
  AND boardid = ${boardid}
  ORDER BY date DESC;
  `;

  return result ? result : null;
}

export async function getCheckIn(id) {
  const result = await sql`
  SELECT c.id, c.date, c.rating, c.comments, c.userid, u.name
  FROM checkins c
  INNER JOIN users u ON c.userid = u.id
  WHERE c.id=${id}
  `;

  return result ? result[0] : null;
}

export async function getCheckInData(id) {
  const result = await sql`
    SELECT t.id as id, t.title as title, t.type as type, m.status as checkinStatus
    FROM 
    checkInTasksMapping m 
    INNER JOIN checkins c ON m.checkinId = c.id
    INNER JOIN tasks t ON m.taskId = t.id
    WHERE c.id=${id}
  `;

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

  if (tasksCompleted.length > 0) {
    const taskCompletedMap = tasksCompleted.map(task => ({ checkinid: checkinid, taskid: task, status: 'completed'}))
    const taskCompletedResult = await sql`
    INSERT INTO checkInTasksMapping
    ${ sql(taskCompletedMap, 'checkinid', 'taskid', 'status')}
    ;
    `
  }

  if (tasksStarted.length > 0) {
  const tasksStartedMap = tasksStarted.map(task => ({ checkinid: checkinid, taskid: task, status: 'started'}))
  const tasksStartedResult = await sql`
    INSERT INTO checkInTasksMapping
      ${ sql(tasksStartedMap, 'checkinid', 'taskid', 'status')}
    ;
  `
  }

  if (tasksDueNext.length > 0) {
  const tasksDueNextMap = tasksDueNext.map(task => ({ checkinid: checkinid, taskid: task, status: 'due next'}))
  const tasksDueNextResult = await sql`
    INSERT INTO checkInTasksMapping
      ${ sql(tasksDueNextMap, 'checkinid', 'taskid', 'status')} 
    ;
  `
  }

  return checkinResult ? checkinResult[0] : null;
}