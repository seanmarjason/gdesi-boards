import { auth } from '../../auth';
import { boardUsers } from '../../../data/boardUsers';

export const GET = auth(async function GET(request) {
      if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })
      // TODO: Get data from database
      return Response.json({ users: boardUsers })
})
