import type { NextAuthOptions } from "next-auth";
import type { Provider } from "next-auth/providers";

import Credentials from "next-auth/providers/credentials";
import { _axios as axios, setUser } from "@/utils/_axios";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
      role: string;
      Role: {
        name: string;
      };
    };
  }

  interface User {
    id: string;
    role?: string;
    Role: {
      name: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      name: "Email & Password",
      id: "credentials",
      authorize: async (credentials) => {
        try {
          const response = await axios.post("/auth/login", {
            ...credentials,
          });

          if (response.status !== 200) {
            throw new Error(response.statusText);
          }

          if (response.data.status === "ERROR") return null;

          const user = response.data.user;
          setUser(user.id);

          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@test.com" },
        password: { label: "Password", type: "password" },
      },
    }),
  ] as Provider[],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      const filledSession = {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
        },
      };
      return filledSession;
    },
    async jwt({ token, user }) {
      if (user) {
        setUser(user.id);
        const u = user;
        const filledToken = {
          ...token,
          id: u.id as string,
          role: u.Role.name as string,
        };
        return filledToken;
      }
      return token;
    },
  },
};
