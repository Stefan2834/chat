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
            secure: false,
            httpOnly: false,
            path: '/' ,
            expires: 700000000,
        });
    }, [initialValue, state]);


    return [state, setState] as const;
}