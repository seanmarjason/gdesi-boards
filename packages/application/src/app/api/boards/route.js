import { getPgVersion } from '@gdesi-boards/database'
import { board } from '../../../data/boards';

export async function GET(request) {
      // TODO: Get data from database
      return Response.json(board)
}
