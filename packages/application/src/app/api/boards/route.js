import { getPgVersion } from '@gdesi-boards/database';
import { auth } from '../../auth';
import { board } from '../../../data/boards';


export const GET = auth(async function GET(request) {
// export const GET = (async function GET(request) {
      console.log(request)
      if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })
      // TODO: Get data from database
      return Response.json(board)
})
