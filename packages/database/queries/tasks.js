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
    INSERT INTO tasks (boardid, deadline, title, type, assignee, description, links, comments, status )
    VALUES (
      ${boardid}, ${deadline}, ${title}, ${type}, ${assignee}, ${description}, ${links}, ${comments}, 'To Do'
    )
    ;
  `;

  return result ? result : null;
}
