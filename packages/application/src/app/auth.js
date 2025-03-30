import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUser } from '@gdesi-boards/database'
import { isPasswordValid } from "./utils/hashPassword"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
      Credentials({
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        credentials: {
          email: {},
          password: {},
        },
        authorize: async (credentials) => {
          let user = null
          let authorised = false

          // get user record from db
          user = await getUser(credentials.email)

          if (!user) {
            return null
          }

          // validate password
          authorised = isPasswordValid(user, credentials.password)

          if (!authorised) {
            return null
          }

          // return user object with their profile data
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            boards: user.boards,
            manager: user.manager,
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user, trigger, session }) {
        if (user) {
          token.id = user.id
          token.boards = user.boards
          token.manager = user.manager
        }
        if (trigger === "update") {
          token.boards = session.boards
        }
        return token
      },
      async session({ session, token, trigger }) {
        session.user.id = token.id
        session.user.boards = token.boards
        session.user.manager = token.manager
        if (trigger === "update") {
          token.boards = session.boards
        }
        return session
      }
    }    
})
