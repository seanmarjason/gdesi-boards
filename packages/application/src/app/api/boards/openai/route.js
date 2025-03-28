import { auth } from '../../../auth';
import { 
    evaluateMessage
 } from '@gdesi-boards/openai';

export const POST = auth(async function POST(request) {
    if (!request.auth) return Response.json({ message: "Not authenticated" }, { status: 401 })
   
    const { message } = await request.json()
    
    const response = await evaluateMessage(message)

    const responseData = JSON.parse(response.body)
    
    return Response.json(responseData.message)
})
