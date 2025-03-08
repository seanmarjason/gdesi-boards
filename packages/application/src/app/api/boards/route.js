import { auth } from '../../auth';
import { getBoard, getTasksSummary } from '@gdesi-boards/database';


export const GET = auth(async function GET(request) {
      if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })
      
      const boardData = await getBoard(1)
      const tasks = await getTasksSummary(1)

      const board = {
            id: boardData.id,
            name: boardData.name,
            columns: boardData.columns.map((column, index) => {
                  return({
                        id: index + 1,
                        title: column,
                        cards: tasks.filter(task => task.status == column)
                  })
            })
      };

      // TODO: Handle missing board data
      return Response.json(board) 
})
