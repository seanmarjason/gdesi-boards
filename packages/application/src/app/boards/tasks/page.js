import TaskList from './taskList'
import { auth } from '../../auth';
import Unauthenticated from '../unauthenticated';

export default async function TasksPage(props) {
    const session = await auth();

    if (!session) {
    return <Unauthenticated />
    }

    return (
        <TaskList />
    )
}