import CheckIn from '../check-in';

export default async function CheckInPage({ props, params }) {
  const { checkin } = await params

  if (checkin) {
    return (
      <CheckIn pastCheckInId={checkin}/>
    );
  }
  
  return (
    <CheckIn />
  )


}
