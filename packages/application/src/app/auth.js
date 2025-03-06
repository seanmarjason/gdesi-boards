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
            // No user found, so this is their first attempt to login
            throw new Error("Invalid credentials.")
          }

          // return user object with their profile data
          return {
            email: user.email,
            password: user.pwhash
          }
        },
      }),
    ],
})
