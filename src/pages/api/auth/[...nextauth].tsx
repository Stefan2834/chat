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
        async session({ session, token }) {
            return session;
        },
    },
}

export default NextAuth(authOptions)
