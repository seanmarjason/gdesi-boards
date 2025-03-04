import { auth } from '../auth';
import Board from './boards';

export default async function BoardPage(props) {
  let session = await auth();

  console.log(`Session:`, session)

  return (
    <Board />
  );
}
