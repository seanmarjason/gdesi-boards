import { auth } from '../../auth';
import { getTask, getTaskList } from '@gdesi-boards/database';

export const GET = auth(async function GET(request) {
    if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })

    const searchParams = request.nextUrl.searchParams

    if (searchParams) {
        // GET specific task by id
        const taskId = searchParams.get('task-id')

        if (taskId) {
            const taskData = await getTask(taskId)
            return Response.json(taskData)
        }
    }

    // GET all tasks
    const tasks = await getTaskList()
    return Response.json(tasks)

})

export const POST = auth(async function POST(request) {
    if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })
    // TODO: Handle change of task information (e.g. status)
})
