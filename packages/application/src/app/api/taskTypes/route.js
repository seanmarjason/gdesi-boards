import { taskTypeMenuItems } from '../../../data/tasks';

export async function GET(request) {
     
      return Response.json({ taskTypeMenuItems })
    
}
