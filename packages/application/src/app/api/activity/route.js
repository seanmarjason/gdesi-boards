import { weeklyActivity } from '../../../data/activity';

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams

    if (searchParams) {
        // GET this week activity
        const thisWeek = searchParams.get('this-week')

        if (typeof thisWeek != undefined) {
            return Response.json(weeklyActivity)
        }
    }

}