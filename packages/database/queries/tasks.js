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

export async function getTaskList() {
  const result = await sql`
    SELECT *
    FROM tasks;
  `;

  return result ? result : null;
}
