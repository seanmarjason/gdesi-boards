import Board from './board';
import { auth } from '../../auth';
import Unauthenticated from '../unauthenticated';

export default async function BoardPage({ props, params }) {
  const session = await auth();

  if (!session) {
    return <Unauthenticated />
  }

  const { board } = await params

  return (
    <Board user={session.user} boardId={board} />
  );
}
