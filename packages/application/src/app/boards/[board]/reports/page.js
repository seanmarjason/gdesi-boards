import Reports from './reports';
import { auth } from '../../../auth';
import Unauthenticated from '../../unauthenticated';

export default async function ReportPage() {
  const session = await auth();

  if (!session) {
    return <Unauthenticated />
  }

  return (
    <Reports />
  );
}
