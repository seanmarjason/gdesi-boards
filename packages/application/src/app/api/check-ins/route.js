import { checkIns, checkIn } from '../../../data/checkIns';

export async function GET(request) {

      const searchParams = request.nextUrl.searchParams
      let page = 1
      let limit = 10

      // GET list of check-ins (default - first page)
      if (searchParams.size === 0) {
        return Response.json(checkIns)
      }
      else {
        // GET list of check-ins (specific page)
        let searchPage = searchParams.get('page')
        let searchLimit = searchParams.get('limit')

        if ( (searchPage && searchPage < 10) && ( searchLimit && searchLimit < 50 )) {
          page = searchPage
          limit = searchLimit
          return Response.json(checkIns)
        }

        // GET specific task
        const id = searchParams.get('id')
        if (id) {
          const item = checkIn.find(item => item.id === id);
          if (item) {
            return Response.json(item)
          }
          else {
            return Response.json(checkIn[0])
          }
        }
      }

      return Response.json(
        { error: 'Invalid query parameters' }, { status: 400 } 
      )
}
