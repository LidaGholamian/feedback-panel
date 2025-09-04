import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** سایر خصوصیات User */
      isAdmin?: boolean;
    } & DefaultSession["user"];
  }
}
