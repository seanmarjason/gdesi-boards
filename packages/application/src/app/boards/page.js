import Boards from './boards';
import ErrorPage from '../errorPage'

export default async function BoardPage(props) {
  const data = await fetch(`${process.env.APPLICATION_BASE_URL}/api/boards`)
  const board = await data.json()

  if (!board) {
    return (
      <ErrorPage />
    )
  }

  return (
    <Boards board={ board } />
  );
}
