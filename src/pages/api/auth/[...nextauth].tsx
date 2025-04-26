import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                avatar: { label: "Photo", type: "image" },
                email: { label: "Email", type: "email" },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: any, req: any) {
                if (credentials) {
                    return {
                        username: credentials.username,
                        email: credentials.email,
                        avatar: "empty"
                    }
                } else {
                    return req
                }
            }
        }),
    ],
    pages: {
        signIn: '/',
        error: '/'
    },
    jwt: {
        secret: process.env.ACCESS_TOKEN,
    },
    callbacks: {
        async jwt({ token, user, session, trigger }) {
            if (trigger === "update") {
                return { ...token, ...session.user }
            }
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            session.user.username = token.username || ""
            return session;
        },
        async signIn({ user }) {
            console.log("User:", user.email, "Successfully logged in");
            return true;
        },
    },
}

export default NextAuth(authOptions)
