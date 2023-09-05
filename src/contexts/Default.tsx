import React, { createContext, useContext, useEffect, useState, useReducer, ReactNode } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import DynamicWidthComponent from '@/components/DynamicWidth';

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


export function DefaultProvider({ children }: DefaultProviderProps) {
    const initialState: State = { number: 0 }
    const router = useRouter()
    const [state, dispatch] = useReducer<ReducerFunction>(Reducer, initialState);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const [navOpen, setNavOpen] = useState<boolean>(true)
    const [darkTheme, setDarkTheme] = useState<boolean>(true)
    const server: String = process.env.NEXT_PUBLIC_SERVER || ''


    useEffect(() => {
        if (router.asPath !== '/') {
            axios.post(`${server}/login/getUser`, {}, { withCredentials: true })
                .then(response => {
                    if (response?.data?.success) {
                        const userRes = response?.data?.user
                        setUser({
                            username: userRes.username,
                            email: userRes.email,
                            avatar: userRes.avatar
                        })
                        if (router.asPath === '/') {
                            router.push('/main/home')
                        }
                    } else {
                        console.log(response.data)
                        if (router.asPath !== '/') {
                            router.push('/')
                        }
                    }
                })
                .catch(err => console.log(err))
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }
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


    const value: DefaultContextValue = {
        state,
        dispatch,
        server,
        user, setUser,
        navOpen, setNavOpen,
        darkTheme, setDarkTheme,
    };

    return (
        <DefaultContext.Provider value={value}>
            <DynamicWidthComponent navbar={navOpen} >
                <div>TESTAREEEEEEEEE</div>
                {/* {!loading && children} */}
            </DynamicWidthComponent>
        </DefaultContext.Provider>
    )
}