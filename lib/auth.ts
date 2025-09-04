import NextAuth from "next-auth"
import { v4 as uuid} from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials"
import Keycloak from "next-auth/providers/keycloak"
import db from "./db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { schema } from "./schema"

const adapter = PrismaAdapter(db)

const users = [
        { id: "1", email: "admin@dorehami.dev", password: "Test1234" , role: 'admin'},
        { id: "2", email: "user@dorehami.dev", password: "User1234", role: 'user' }
      ]

export const { auth, handlers,signIn, signOut } = NextAuth({adapter, providers: [
    Keycloak({
      clientId: process.env.OIDC_CLIENT_ID!,
      clientSecret: process.env.OIDC_CLIENT_SECRET!,
      issuer: process.env.OIDC_ISSUER!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async(credentials) => {

        const validateCredentials = schema.parse(credentials)

        const user = await db.user.findFirst({
          where: {email: validateCredentials.email, password:validateCredentials.password}
        });
        if (!user){
          throw new Error ('Invalid Credentials.')
        }
        return user;
      }
    }),
],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
})
