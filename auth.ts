import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      }
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text'},
        password: { label: 'Password', type: 'password'},
      },
      async authorize(credentials, req) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        const user = await sql`
          SELECT * FROM users WHERE email = ${email}
        `;

        if (!user[0].password) {
          return null;
        }

        const isValid = await bcrypt.compare(password, user[0].password)

        if (!isValid) {
          return null;
        }
        return { id: user[0].id, email: user[0].email, name: user[0].name};
      }
    })
    
  ],
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          // Check if user exists
          const existingUser = await sql`
            SELECT * FROM users WHERE email = ${user.email}
          `;

          if (existingUser.length === 0) {
            // Create new user if doesn't exist
            await sql`
              INSERT INTO users (name, email, image)
              VALUES (${user.name}, ${user.email}, ${user.image})
            `;
            // Get the new user's ID
            const newUser = await sql`
              SELECT id FROM users WHERE email = ${user.email}
            `;
            user.id = newUser[0].id;
          } else {
            user.id = existingUser[0].id;
          }
          return true;
        } catch (error) {
          console.error("Error in Google sign in:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({session, token}){
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  }
})