import { auth } from '../../auth';
import { getBoards, createBoard } from '@gdesi-boards/database';


export const GET = auth(async function GET(request) {
      if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })
      
      const {id: userId} = request.auth.user

      const boards = await getBoards(userId)
      return Response.json(boards) 
})

export const POST = auth(async function POST(request) {
      if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })
      
      const { name, manager, users } = await request.json()
      const {id: userId} = request.auth.user

      const allUsers = [parseInt(userId), ...users]

      const newBoard = await createBoard(name, manager, [ ...new Set(allUsers) ]);
      return Response.json({newBoard}) 
})
