import { auth } from '../../auth';
import { getActivity } from '@gdesi-boards/database';
// import { teamActivity } from '../../../data/activity';

export const GET = auth(async function GET(request) {
    if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })

    const searchParams = request.nextUrl.searchParams

    const date = searchParams.get('date')

    if (date) {
        const data = await getActivity(date);
        console.log(data)
        return Response.json(data)
    }
    return Response.json({})
})