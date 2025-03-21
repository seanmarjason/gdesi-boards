import { auth } from '../../auth';
import { teamActivity } from '../../../data/activity';

export const GET = auth(async function GET(request) {
    if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })

    const searchParams = request.nextUrl.searchParams

    if (searchParams) {
        // Get specific week
        return Response.json(teamActivity)
    }
    return Response.json(teamActivity)
})