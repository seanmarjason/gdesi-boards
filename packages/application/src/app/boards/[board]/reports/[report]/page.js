import Reports from '../reports';

export default async function CheckInPage({ params }) {
  const { report, board } = await params

  if (report) {
    return (
      <Reports reportDate={report} boardId={board}/>
    );
  }
  
  return (
    <Reports boardId={board}/>
  )


}
