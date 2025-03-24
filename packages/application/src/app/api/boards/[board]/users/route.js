import { auth } from '../../../../auth';
import { getUsers } from '@gdesi-boards/database';

export const GET = auth(async function GET(request, { params }) {
      if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })

      const { board } = await params 

      const users = await getUsers(board)
      return Response.json( users )
})
