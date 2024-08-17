import { authOptions } from "@/app/_lib/auth"
import NextAuth from "next-auth"

// Configure NextAuth with your Google provider options
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
