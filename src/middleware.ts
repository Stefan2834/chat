import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized({ req, token }) {
            return !!token
        },
    },
})


// export const config = { matcher: ["/main/messages", "/main/messages/:path*"] }

export const config = { matcher: ["/test"] }
