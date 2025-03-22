import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUser } from '@gdesi-boards/database'
import { hashPassword, isPasswordValid } from "./utils/hashPassword"
 
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

          // validate password
          authorised = isPasswordValid(user, credentials.password)

          if (!user || !authorised) {
            return null
          }

          // return user object with their profile data
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            boards: user.boards
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user, account, profile }) {
        if (user) {
          token.role = user.role
          token.id = user.id
          token.boards = user.boards
        }
        return token
      },
      async session({ session, token, user }) {
        session.user.role = token.role
        session.user.id = token.id
        session.user.boards = token.boards
        return session
      }
    }    
})
