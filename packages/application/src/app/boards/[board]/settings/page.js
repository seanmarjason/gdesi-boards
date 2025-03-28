import BoardSettings from './settings';

export default async function SettingsPage({ params }) {
  const { board } = await params

  return (
    <BoardSettings boardId={board} />
  );
}


