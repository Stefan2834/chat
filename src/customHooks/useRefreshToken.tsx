import axios from "axios";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
    const { data: session, update } = useSession();

    const refreshToken = async () => {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/login/refresh`, {
            refreshToken: session?.user.refreshToken,
        });

        if (session && res.data.success) {
            console.log('REFRESHING ACCESS TOKEN')
            update({
                ...session,
                user: {
                    ...session.user,
                    accessToken: res.data.accessToken
                }
            })
        }
        else {
            console.log('REFRESH TOKEN EXPIRED')
            signIn();
        }
    };
    return refreshToken;
};