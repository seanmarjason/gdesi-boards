import CheckIn from '../check-in';

export default async function CheckInPage({ props, params }) {
  const { checkin } = await params
  let checkInData = ''

  if (checkin) {
    const data = await fetch(`${process.env.APPLICATION_BASE_URL}/api/check-ins?id=${checkin}`)
    checkInData = await data.json()
  }
  
  const data = await fetch(`${process.env.APPLICATION_BASE_URL}/api/check-ins`)
  const checkIns = await data.json()

  return (
    <CheckIn checkIns={checkIns} pastCheckIn={checkInData}/>
  );
}
