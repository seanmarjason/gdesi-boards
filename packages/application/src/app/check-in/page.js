import CheckIn from './check-in';

export default async function CheckInPage(props) {
  const data = await fetch(`${process.env.APPLICATION_BASE_URL}/api/check-ins`)
  const checkIns = await data.json()

  return (
    <CheckIn checkIns={ checkIns }/>
  );
}
