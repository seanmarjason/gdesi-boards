import { auth } from '../../auth';
import { getCheckInList } from '@gdesi-boards/database';
import { checkIn } from '../../../data/checkIns';

export const GET = auth(async function GET(request) {
    if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })

    const searchParams = request.nextUrl.searchParams

    // GET specific task
    const id = searchParams.get('id')
    if (id != null) {
      const item = checkIn.find(item => item.id === id);
      if (item) {
        return Response.json(item)
      }
      else {
        return Response.json(checkIn[0])
      }
    }

    // GET list of check-ins (specific page)
    let searchPage = searchParams.get('page')
    let searchLimit = searchParams.get('limit')

    // default - first page
    let page = 1
    let limit = 10

    if (searchPage != null && searchLimit != null) {
      page = searchPage
      limit = Math.min(searchLimit, 50) // limit max out at 50 per page
    }

    const checkInsData = await getCheckInList(page, limit)

    const checkIns = {
      data: checkInsData,
      pagination: {
        "current_page": page,
        "next_page": page + 1,
        "prev_page": page == 1 ? null : page - 1
      }
    }

    return Response.json(checkIns)
  }
)
