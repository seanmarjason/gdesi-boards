import Task from './task';

export default async function TaskPage({ params }) {
    const { task } = await params

    return (
        <Task task={ task } />
    )
}