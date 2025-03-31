import { sql } from '../connection'

export async function getTasksSummary(board) {
  const result = await sql`
  SELECT tasks.id, title, type, assignee, status
  FROM tasks INNER JOIN boards ON tasks.boardId = boards.id
  WHERE boards.id = ${ board };
  `;

  return result ? result : null;
}

export async function getTask(taskId) {
  const result = await sql`
    SELECT *
    FROM tasks
    WHERE id = ${ taskId };
  `;

  return result ? result[0] : null;
}

export async function getTaskComments(taskId) {
  const result = await sql`
    SELECT *
    FROM comments
    WHERE taskid = ${taskId}
  `
  return result ? result : null;
}

export async function getTaskLinks(taskId) {
  const result = await sql`
    SELECT *
    FROM links
    WHERE taskid = ${taskId}
  `
  return result ? result : null;
}

export async function getTaskList(board) {
  const result = await sql`
    SELECT *
    FROM tasks
    WHERE boardid = ${ board };
    ;
  `;

  return result ? result : null;
}

export async function updateTaskStatus(task, status) {
  console.log("task", task)
  console.log("status", status)
  
  const result = await sql`
    UPDATE tasks
    SET status = ${status}
    WHERE id = ${task}
    ;
  `;

  return result ? result : null;
}

export async function createNewTask(taskData) {
  const {
    boardid,
    deadline,
    title,
    type,
    assignee,
    description,
    links,
    comments,
  } = taskData

  const result = await sql`
    INSERT INTO tasks (boardid, deadline, title, type, assignee, description, status )
    VALUES (
      ${boardid}, ${deadline}, ${title}, ${type}, ${assignee}, ${description}, 'To Do'
    )
    ;
  `;

  if (comments.length > 0) {
    const commentsMap = comments.map(comment => ({
      taskid: taskId,
      author: comment.author,
      datecreated: comment.datecreated,
      comment: comment.comment
    }))

    const commentResult = await sql`
    INSERT INTO comments
    ${ sql(commentsMap, 'taskid', 'author', 'datecreated', 'comment')} 
    ;
    `
  }

  if (links.length > 0) {
    const linksMap = links.map(links => ({
      taskid: taskId,
      name: links.name,
      url: links.url,
      type: links.type
    }))

    const linksResult = await sql`
      INSERT INTO links
        ${ sql(linksMap, 'taskid', 'name', 'url', 'type')} 
      ;
    `
  }

  return result ? result : null;
}

export async function updateTask(taskId, taskData) {
  const {
    deadline,
    title,
    type,
    assignee,
    description,
    links,
    comments,
    status
  } = JSON.parse(taskData)

  const result = await sql`
    UPDATE tasks
    SET 
      ${sql({
        deadline: deadline,
        title: title,
        type: type,
        assignee: assignee,
        description: description,
        links: links,
        status: status
      })}
    WHERE
      id = ${taskId}
    ;
  `;

  const commentsMap = comments.map(comment => ({
    taskid: taskId,
    author: comment.author,
    datecreated: comment.datecreated,
    comment: comment.comment
  }))

  const commentResult = await sql`
    INSERT INTO comments
      ${ sql(commentsMap, 'taskid', 'author', 'datecreated', 'comment')} 
    ;
  `

  const linksMap = links.map(links => ({
    taskid: taskId,
    name: links.name,
    url: links.url,
    type: links.type
  }))

  const linksResult = await sql`
    INSERT INTO links
      ${ sql(linksMap, 'taskid', 'name', 'url', 'type')} 
    ;
  `

  return result ? result : null;
}

export async function getTasksCompleted(date) {
  const result = await sql`
    SELECT *
    FROM tasks
    WHERE completedDate BETWEEN (TO_DATE(${date}, 'YYYY-MM-DD') - 7) AND ${date} 
  `;

  return result ? result : null;
}

export async function getTasksStarted(date) {
  const result = await sql`
    SELECT *
    FROM tasks
    WHERE startedDate BETWEEN (TO_DATE(${date}, 'YYYY-MM-DD') - 7) AND ${date} 
  `;

  return result ? result : null;
}

export async function getTasksDue(date) {
  const result = await sql`
    SELECT *
    FROM tasks
    WHERE deadline BETWEEN ${date} AND (TO_DATE(${date}, 'YYYY-MM-DD') + 7) 
  `;

  return result ? result : null;
}

