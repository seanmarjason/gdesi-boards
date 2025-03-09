import Boards from './boards';
import { auth } from '../auth';
import Unauthenticated from './unauthenticated';

export default async function BoardSelectionPage(props) {
  const session = await auth();

  if (!session) {
    return <Unauthenticated />
  }

  return (
    <Boards user={session.user} />
  );
}
