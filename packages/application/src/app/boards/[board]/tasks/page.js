import TaskList from './taskList'
import { auth } from '../../../auth';
import Unauthenticated from '../../unauthenticated';

export default async function TasksPage({ props, params }) {
    const session = await auth();

    if (!session) {
        return <Unauthenticated />
    }

    const { board } = await params

    return (
        <TaskList user={session.user} boardId={board}/>
    )
}