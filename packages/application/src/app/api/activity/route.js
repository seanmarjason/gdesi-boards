import { auth } from '../../auth';
import { weeklyActivity, teamActivity } from '../../../data/activity';

export const GET = auth(async function GET(request) {
    if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })

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

})