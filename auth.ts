import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text'},
        password: { label: 'Password', type: 'password'},
      },
      async authorize(credentials, req) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        const user = await pool.query(
          'SELECT * FROM users WHERE email = $1', [email]
        );

        if (user.rows.length === 0) {
          return null;
        }

        const isValid = await bcrypt.compare(password, user.rows[0].password)

        if (!isValid) {
          return null;
        }
        return { id: user.rows[0].id, email: user.rows[0].email };
      }
    })
    
  ],
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: '/login',
    error: '/login',
  }
})