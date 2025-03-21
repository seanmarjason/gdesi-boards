import CheckIn from '../check-in';

export default async function CheckInPage({ params }) {
  const { checkin, board } = await params

  if (checkin) {
    return (
      <CheckIn pastCheckInId={checkin} boardId={board}/>
    );
  }
  
  return (
    <CheckIn boardId={board}/>
  )


}
