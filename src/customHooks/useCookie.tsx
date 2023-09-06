import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'

export function useCookie(cookieName: string, initialValue: string) {
    const [state, setState] = useState(() => {
        const storedValue = Cookies.get(cookieName)
        return storedValue !== undefined ? storedValue : initialValue;
    });

    useEffect(() => {
        Cookies.set(cookieName, state, {
            secure: true,
            httpOnly: false,
            path: '/' ,
            expires: 700000000,
        });
    }, [state]);


    return [state, setState] as const;
}