import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user: {
            username: string,
            email: string,
            avatar: string,
        }
    }
}