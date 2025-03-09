import Task from './task';
import { auth } from '../../../../auth';
import Unauthenticated from '../../../unauthenticated';

export default async function TaskPage({ props, params }) {
    const session = await auth();

    if (!session) {
        return <Unauthenticated />
    }
    
    const { task } = await params

    return (
        <Task task={ task }/>
    )
}