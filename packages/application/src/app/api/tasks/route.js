import { tasks } from '../../../data/tasks';

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams

    if (searchParams) {
        const taskId = searchParams.get('task-id')

        // TODO: Replace with db query
        const task = tasks.find(taskRecord => 
            taskRecord.id == taskId.toLowerCase()
        )

        return Response.json({ task })
    }

    // TODO: Replace with db query
    return Response.json({ tasks })

}

export async function POST(request) {
    // TODO: Handle change of task information (e.g. status)
}