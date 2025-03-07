// app/api/auth/[...nextauth]/route.jsx
import { authOptions } from "@/lib/authentication/authOptions";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };