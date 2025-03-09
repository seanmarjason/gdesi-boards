import { getBoard, getTasksSummary } from '@gdesi-boards/database';
import { auth } from '../../../auth';

export const GET = auth(async function GET(request, { params }) {
      if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })
      
      const { board } = await params

      const boardData = await getBoard(board)
      const tasks = await getTasksSummary(board)

      const data = {
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
      return Response.json(data) 
})
