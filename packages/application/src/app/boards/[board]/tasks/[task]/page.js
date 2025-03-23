import Task from './task';

export default async function TaskPage({ params }) {
    const { task, board } = await params

    return (
        <Task task={ task } boardId={ board }/>
    )
}