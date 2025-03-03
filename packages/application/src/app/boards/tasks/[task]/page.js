import Task from './task';

export default async function TaskPage({ props, params }) {
    const { task } = await params

    return (
        <Task task={ task }/>
    )
}