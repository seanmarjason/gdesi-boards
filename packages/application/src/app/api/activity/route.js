import { weeklyActivity, teamActivity } from '../../../data/activity';

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams

    if (searchParams) {
        // GET this week activity
        const thisWeek = searchParams.get('this-week')

        if (thisWeek == '') {
            return Response.json(weeklyActivity)
        }

        // GET team's activity
        const team = searchParams.get('team')

        if (team == '') {
            return Response.json(teamActivity)
        }
    }

}