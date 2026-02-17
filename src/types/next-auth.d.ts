import NextAuth from "next-auth";
import { UserInterface } from "@/interfaces/Authinterfaces";

declare module "next-auth" {
  interface Session {
    user: UserInterface & { token?: string }; // نضيف token هنا لو محتاج
  }

  interface User {
    user: UserInterface;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: UserInterface;
    token?: string;
  }
}