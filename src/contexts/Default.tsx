import React, { createContext, useContext, useEffect, useState, useReducer, ReactNode } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import DynamicWidthComponent from '@/components/DynamicWidth';
import { useCookie } from '@/customHooks/useCookie';

interface DefaultContextValue {
    state: State;
    dispatch: Dispatch;
    server: String;
    user: User | null;
    setUser: (user: User | null) => void,
    navOpen: boolean,
    setNavOpen: (navOpen: boolean) => void,
    darkTheme: boolean,
    setDarkTheme: (darkTheme: boolean) => void,
    accessToken: string,
    setAccessToken: (accessToken: string) => void,
}
type Action = { type: 'test'; payload: { number: number } };
type Dispatch = (action: Action) => void;
export type State = {
    number: number;
};
type ReducerFunction = (state: State, action: Action) => State;

export const DefaultContext = createContext<DefaultContextValue | undefined>(undefined);

export function useDefault() {
    const context = useContext(DefaultContext);
    if (!context) {
        throw new Error('useDefault must be used within an DefaultProvider');
    }
    return context;
}

function Reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'test':
            return { ...state, number: action.payload.number };
        default:
            return state;
    }
}

interface DefaultProviderProps {
    children: ReactNode;
}

type User = {
    email: string | null,
    username: string | null,
    avatar: string | null
}

const verifyToken = async (token: string, setToken: any) => {
    const response = await axios.get('/api/token',
        { headers: { Authorization: `Bearer ${token}` } }
    )
    console.log(response)
    if (response.data.success) {
        response.data.newAccessToken && setToken(response.data.newAccessToken) 
        return response.data
    } else {
        if (response.data.logout) {
            return null
        } return null
    }
}

export function DefaultProvider({ children }: DefaultProviderProps) {
    const initialState: State = { number: 0 }
    const router = useRouter()
    const [state, dispatch] = useReducer<ReducerFunction>(Reducer, initialState);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const [navOpen, setNavOpen] = useState<boolean>(true)
    const [darkTheme, setDarkTheme] = useState<boolean>(true)
    const [accessToken, setAccessToken] = useCookie('accessToken', '')
    const server: String = process.env.NEXT_PUBLIC_SERVER || ''


    useEffect(() => {
        verifyToken(accessToken, setAccessToken).then((data) => {
            if (data?.success) {
                console.log(data)
                setUser({
                    username: data.username,
                    email: data.email,
                    avatar: data.avatar
                })
            }
        }).catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }, [])



    useEffect(() => {
        const root = document.documentElement;
        if (darkTheme) {
            root.style.setProperty('--first', '#141414');
            root.style.setProperty('--first-reverse', '#fff');
            root.style.setProperty('--second', '#1b1b1b');
            root.style.setProperty('--third', '#2b2b2b');
            root.style.setProperty('--main', "#a9def9");
        } else {
            root.style.setProperty('--first', '#141414');
            root.style.setProperty('--first-reverse', '#fff');
            root.style.setProperty('--second', '#1b1b1b');
            root.style.setProperty('--third', '#2b2b2b');
            root.style.setProperty('--main', "#a9def9");
        }

    }, [darkTheme])

    useEffect(() => {
        if (!loading && user && router.asPath === '/') {
            router.push('/main/home')
        } else if (!loading && !user && router.asPath !== '/') {
            router.push('/')
        }
    }, [router.asPath, loading])


    const value: DefaultContextValue = {
        state,
        dispatch,
        server,
        user, setUser,
        navOpen, setNavOpen,
        darkTheme, setDarkTheme,
        accessToken, setAccessToken,
    };

    return (
        <DefaultContext.Provider value={value}>
            <DynamicWidthComponent navbar={navOpen}>
                {!loading && (children)}
            </DynamicWidthComponent>
        </DefaultContext.Provider>
    )
}