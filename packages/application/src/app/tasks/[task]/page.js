import Task from './task';

export default async function TaskPage({ props, params }) {
    const { task } = await params
    const data = await fetch(`${process.env.APPLICATION_BASE_URL}/api/tasks?task-id=${task}`)
    const taskData = await data.json()

    return (
        <Task taskData={ taskData }/>
    )
}