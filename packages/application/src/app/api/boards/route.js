import { auth } from '../../auth';
import { getBoards } from '@gdesi-boards/database';


export const GET = auth(async function GET(request) {
      if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })
      
      const boards = await getBoards()

      console.log(boards)

      // TODO: Handle missing board data
      return Response.json(boards) 
})
