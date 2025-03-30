import { registerUser } from '@gdesi-boards/database';
import { hashPassword } from "../../utils/hashPassword"

export const POST = async function POST(request, { params }) {
      const { name, email, password } = await request.json()

      const pwStore = hashPassword(password)

      const newUser = await registerUser(name, email, pwStore)

      return Response.json({message: 'success!'})
}
