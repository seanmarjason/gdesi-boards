import Reports from './reports';

export default async function ReportPage({ params }) {
  const { board } = await params

  return (
    <Reports boardId={board}/>
  );
}
