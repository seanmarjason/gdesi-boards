import { tasks } from '../../../data/tasks';

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams

    if (searchParams) {
        // GET specific task by id
        const taskId = searchParams.get('task-id')

        if (taskId) {
            const task = tasks.find(taskRecord => 
                taskRecord.id == taskId.toLowerCase()
            )
            return Response.json(task)
        }
    }

    // GET all tasks
    return Response.json({ tasks })

}

export async function POST(request) {
    // TODO: Handle change of task information (e.g. status)
}