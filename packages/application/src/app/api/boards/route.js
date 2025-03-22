import { auth } from '../../auth';
import { getBoards, createBoard } from '@gdesi-boards/database';


export const GET = auth(async function GET(request) {
      if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })
      
      const boards = await getBoards()
      // TODO: Handle missing board data
      return Response.json(boards) 
})

export const POST = auth(async function POST(request) {
      if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })
      
      const { name, users } = await request.json()

      const newBoard = await createBoard(name, users);
      // TODO: Handle missing board data
      return Response.json(newBoard) 
})
