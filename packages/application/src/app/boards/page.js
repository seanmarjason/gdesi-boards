import Board from './boards';
import { auth } from '../auth';
import Unauthenticated from './unauthenticated';

export default async function BoardPage(props) {
  const session = await auth();

  if (!session) {
    return <Unauthenticated />
  }

  return (
    <Board user={session.user} />
  );
}
