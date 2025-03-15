import Board from './board';

export default async function BoardPage({ params }) {
  const { board } = await params

  return (
    <Board boardId={board} />
  );
}
