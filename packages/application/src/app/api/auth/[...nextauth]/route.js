import NextAuth from "next-auth"

const handler = NextAuth({
  debug: process.env.AUTH_DEBUG,
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-out',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/sign-up' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [],
})

export { handler as GET, handler as POST }

