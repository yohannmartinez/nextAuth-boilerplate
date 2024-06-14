import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      age: number | null | undefined;
      picture: string | null | undefined;
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    age: number | null | undefined;
    picture: string | null | undefined;
  }
}
