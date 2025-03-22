import { auth } from '../../auth';
import { getUsers } from '@gdesi-boards/database';

export const GET = auth(async function GET(request) {
      if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })
      const users = await getUsers()
      return Response.json( users )
})
