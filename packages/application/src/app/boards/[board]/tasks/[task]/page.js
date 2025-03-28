import Task from '../task';
import { auth } from '../../../../auth';

export default async function TaskPage({ params }) {
    const { task, board } = await params
    const session = await auth();

    return (
        <Task task={ task } boardId={ board } userName={ session.user.name }/>
    )
}