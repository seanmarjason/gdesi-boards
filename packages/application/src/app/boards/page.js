import Boards from './boards';

export default async function BoardPage(props) {
  const data = await fetch(`${process.env.APPLICATION_BASE_URL}/api/boards`)
  const board = await data.json()

  return (
    <Boards board={ board } />
  );
}
