import { getPgVersion } from '@gdesi-boards/database'
import { board } from '../../../data/boards';

export async function GET(request) {
      return Response.json(board)
}
