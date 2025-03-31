import { auth } from '../../../../auth';
import { getCheckInList, getCheckIn, getCheckInData, createNewCheckin } from '@gdesi-boards/database';

export const GET = auth(async function GET(request, { params }) {
    if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })
      
    const { board } = await params

    if (!request.auth?.user?.boards.includes(parseInt(board))) {
        return Response.json({ error: 'Unauthorised' }, { status: 401 }) 
    }

    const role = request.auth?.user?.manager.includes(parseInt(board)) ? 'manager' : 'user'

    const searchParams = request.nextUrl.searchParams
    const { id: userid } = request.auth.user

    // GET specific task
    const id = searchParams.get('id')
    if (id != null) {
      const checkIn = await getCheckIn(parseInt(id))
      const checkInData = await getCheckInData(id)

      if (checkIn) {
        // Confirm user is accessing their own checkin or board manager is accessing checkin
        if (userid != checkIn.userid && role != 'manager') return Response.json({ error: 'Unauthorised' }, { status: 401 })

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

    const id = await createNewCheckin(board, userid, submitDate, rating, tasks.tasksCompleted, tasks.tasksStarted, tasks.tasksDueNext, comments)

    return Response.json(id)
})
