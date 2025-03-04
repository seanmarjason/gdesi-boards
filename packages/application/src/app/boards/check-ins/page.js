import CheckIn from './check-in';
import { auth } from '../../auth';
import Unauthenticated from '../unauthenticated';

export default async function CheckInsPage(props) {
  const session = await auth();

  if (!session) {
    return <Unauthenticated />
  }
  
  return (
    <CheckIn />
  );
}
