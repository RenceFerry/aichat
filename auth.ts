import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/db";
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

        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .single()

        if (error) return null;

        if (!data.password) {
          return null;
        }

        const isValid = await bcrypt.compare(password, data.password)

        if (!isValid) {
          return null;
        }
        return { id: data.id, email: data.email, name: data.name};
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
          const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", user.email)
            .single()

          if (!data) {
            // Create new user if doesn't exist
            const { data, error } = await supabase
              .from("users")
              .insert({
                name: user.name,
                email: user.email,
                image: user.image,
              })
              .select("id")
              .single();
            if (error) return false;
            
            user.id = data.id;
          } else {
            user.id = data.id;
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