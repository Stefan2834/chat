import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'

interface CookieUpdaterProps {
    cookieName: string;
    initialValue: string;
}

export function useCookie(cookieName: string, initialValue: string) {
    const [state, setState] = useState(() => {
        const storedValue = Cookies.get(cookieName)
        return storedValue !== undefined ? storedValue : initialValue;
    });

    useEffect(() => {
        console.log(cookieName, state)
        Cookies.set(cookieName, state, {
            secure: true,
            httpOnly: true,
            sameSite: 'strict',
            expires: 7,
        });
    }, [initialValue, state]);


    return [state, setState] as const;
}