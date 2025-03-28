import { getBoard, getTasksSummary, updateBoard } from '@gdesi-boards/database';
import { auth } from '../../../auth';

export const GET = auth(async function GET(request, { params }) {
      if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })
      const { board } = await params

      if (!request.auth?.user?.boards.includes(parseInt(board))) {
            return Response.json({ error: 'Unauthorised' }, { status: 401 }) 
      }

      const boardData = await getBoard(board)
      const tasks = await getTasksSummary(board)

      const data = {
            id: boardData.id,
            name: boardData.name,
            manager: boardData.manager,
            users: boardData.users,
            columns: boardData.columns.map((column, index) => {
                  return({
                        id: index + 1,
                        title: column,
                        cards: tasks.filter(task => task.status == column)
                  })
            })
      };

      return Response.json(data) 
})

export const POST = auth(async function POST(request, { params }) {
      if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })
      
      const { board } = await params
      
      const { name, manager, users } = await request.json()

      const {id: userId} = request.auth.user

      const allUsers = [parseInt(userId), ...users]

      const updatedBoard = await updateBoard(board, name, manager, [ ...new Set(allUsers) ]);
      return Response.json({updatedBoard}) 
})
