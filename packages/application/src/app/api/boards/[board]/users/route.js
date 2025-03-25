import { auth } from '../../../../auth';
import { getUsers, getAllUsers } from '@gdesi-boards/database';

export const GET = auth(async function GET(request, { params }) {
      if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })

      const { board } = await params 

      if (board == 'new') {
            const users = await getAllUsers()
            return Response.json( users )   
      }

      const users = await getUsers(board)
      return Response.json( users )
})


export const POST = auth(async function POST(request, { params }) {
      // TODO: Add route to update user details for logged in user (e.g. add boards, edit manager)
})
