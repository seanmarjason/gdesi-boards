import { auth } from '../../../../auth';
import { getActivity } from '@gdesi-boards/database';

export const GET = auth(async function GET(request, { params }) {
    if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })

    const { board } = await params

    if (!request.auth?.user?.boards.includes(parseInt(board))) {
        return Response.json({ error: 'Unauthorised' }, { status: 401 }) 
    }

    const searchParams = request.nextUrl.searchParams

    const date = searchParams.get('date')

    if (date) {
        const data = await getActivity(board, date);
        return Response.json(data)
    }
    return Response.json({})
})