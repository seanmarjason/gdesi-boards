import Task from '../task';

export default async function TaskPage({ params }) {
    const { board } = await params

    return (
        <Task boardId={ board }/>
    )
}