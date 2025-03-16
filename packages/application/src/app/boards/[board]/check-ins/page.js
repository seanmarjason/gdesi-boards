import CheckIn from './check-in';

export default async function CheckInsPage({params}) {
  const { board } = await params

  return (
    <CheckIn boardId={board}/>
  );
}
