import { auth } from '../../../../auth';
import { getCheckInList, getCheckIn, getCheckInData, createNewCheckin } from '@gdesi-boards/database';

export const GET = auth(async function GET(request, { params }) {
    if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })
      
    const { board } = await params

    if (!request.auth?.user?.boards.includes(parseInt(board))) {
        return Response.json({ error: 'Unauthorised' }, { status: 401 }) 
    }

    const searchParams = request.nextUrl.searchParams
    const { id: userid } = request.auth.user

    // GET specific task
    const id = searchParams.get('id')
    if (id != null) {
      const checkIn = await getCheckIn(parseInt(id), board, userid)
      const checkInData = await getCheckInData(id, board, userid)

      if (checkIn) {
        const item = {
          ...checkIn,
          tasksCompleted: checkInData.filter(task => task.	checkinstatus == 'completed'),
          tasksStarted: checkInData.filter(task => task.	checkinstatus == 'started'),
          tasksDueNext: checkInData.filter(task => task.	checkinstatus == 'due next'),
        }
        return Response.json(item)
      }
    }

    const checkInsData = await getCheckInList(board, userid)

    const checkIns = {
      data: checkInsData,
    }

    return Response.json(checkIns)
  }
)


export const POST = auth(async function POST(request, { params }) {
    if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })
   
    const { board } = await params 
    const { id: userid } = request.auth.user

    const { data } = await request.json()
    const {
      submitDate,
      rating,
      tasks,
      comments
    } = data

    await createNewCheckin(board, userid, submitDate, rating, tasks.tasksCompleted, tasks.tasksStarted, tasks.tasksDueNext, comments)

    return Response.json({message: 'done!'})
})
