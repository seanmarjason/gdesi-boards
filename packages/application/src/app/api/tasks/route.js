import { tasks } from '../../../data/tasks';

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams

    if (searchParams) {
        const taskId = searchParams.get('task-id')

        // TODO: Replace with query
        const task = tasks.find(taskRecord => 
            taskRecord.id == taskId.toLowerCase()
        )

        return Response.json({ task })
    }

    // TODO: Replace with query
    return Response.json({ tasks })

}
