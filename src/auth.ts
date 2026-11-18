
import type { DefaultSession, NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

type AuthUser = {
  name: string;
  email: string;
  role: string;
};

declare module "next-auth" {
  interface User {
    user: AuthUser;
    token: string;
  }

  interface Session {
    user: AuthUser & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: AuthUser;
    token?: string;
  }
}

type DecodedToken = {
  id: string;
};

type LoginResponse = {
  message: string;
  token: string;
  user: AuthUser;
};

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const payload: LoginResponse = await response.json();

        if (payload.message === "success") {
          const decodedToken = jwtDecode<DecodedToken>(payload.token);

          return {
            id: decodedToken.id,
            user: payload.user,
            token: payload.token,
          };
        }

        throw new Error(payload.message || "Something Went Wrong");
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }

      return token;
    },

    async session({ session, token }) {
      if (token.user) {
        session.user = {
          ...session.user,
          ...token.user,
        };
      }

      return session;
    },
  },
};
