import { boardUsers } from '../../../data/boardUsers';

export async function GET(request) {
     
      return Response.json({ users: boardUsers })
    
}
