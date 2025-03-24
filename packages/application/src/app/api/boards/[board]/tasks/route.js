import { auth } from '../../../../auth';
import { 
    getTask, 
    getTaskList, 
    updateTaskStatus, 
    createNewTask,
    getTasksCompleted,
    getTasksStarted,
    getTasksDue
 } from '@gdesi-boards/database';


export const GET = auth(async function GET(request, { params }) {
    if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })

    const { board } = await params

    if (!request.auth?.user?.boards.includes(parseInt(board))) {
        return Response.json({ error: 'Unauthorised' }, { status: 401 }) 
    }

    const searchParams = request.nextUrl.searchParams

    if (searchParams) {
        // GET specific task by id
        const taskId = searchParams.get('task-id')
        if (taskId) {
            const taskData = await getTask(taskId)
            return Response.json(taskData)
        }

        // GET tasks by date
        const date = searchParams.get('date')
        if (date) {
            const tasksCompleted = await getTasksCompleted(date)
            const tasksStarted = await getTasksStarted(date)
            const tasksDueNext = await getTasksDue(date)
            return Response.json({
                tasksCompleted,
                tasksStarted,
                tasksDueNext
            })
        }
    }

    // GET all tasks
    const tasks = await getTaskList(board)
    return Response.json(tasks)

})

export const POST = auth(async function POST(request, { params }) {
    if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })
   
    const { board } = await params 
    const { type, taskId, data } = await request.json()

    if (type == 'status') {
        updateTaskStatus(taskId, data.status)
    }

    if (type == 'new') {
        createNewTask({
            ...data,
            boardid: board
        })
    }

    return Response.json({message: 'done!'})
})
