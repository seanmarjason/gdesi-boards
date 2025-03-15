import TaskList from './taskList'

export default async function TasksPage({ params }) {
    const { board } = await params

    return (
        <TaskList boardId={board}/>
    )
}