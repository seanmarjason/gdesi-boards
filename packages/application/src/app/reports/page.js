import Reports from './reports';

export default async function ReportPage() {
  const data = await fetch(`${process.env.APPLICATION_BASE_URL}/api/activity?team`)
  const activity = await data.json()

  return (
    <Reports teamActivity={activity}/>
  );
}
