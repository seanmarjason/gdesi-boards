import TaskList from './taskList'

export default async function TasksPage(props) {
    const data = await fetch(`${process.env.APPLICATION_BASE_URL}/api/tasks`)
    const taskData = await data.json()

    return (
        <TaskList taskData={ taskData }/>
    )
}