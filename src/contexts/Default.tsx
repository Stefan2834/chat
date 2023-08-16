import React, { createContext, useContext, useEffect, useState, useReducer, ReactNode } from 'react';
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router';

interface DefaultContextValue {
    state: State;
    dispatch: Dispatch;
    server: String;
    session: any;
    user: User | null;
    setUser: (user: User | null) => void,
    navOpen: boolean,
    setNavOpen: (navOpen: boolean) => void,
    darkTheme: boolean,
    setDarkTheme: (darkTheme: boolean) => void
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
    name: string | null,
    image: string | null
}

export function DefaultProvider({ children }: DefaultProviderProps) {
    const initialState: State = { number: 0 }
    const { data: session, status } = useSession()
    const router = useRouter()
    const [state, dispatch] = useReducer<ReducerFunction>(Reducer, initialState);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const [navOpen, setNavOpen] = useState<boolean>(true)
    const [darkTheme, setDarkTheme] = useState<boolean>(true)
    const server: String = process.env.NEXT_PUBLIC_SERVER || ''



    useEffect(() => {
        if (status === "loading") {
            console.log('Loading')
        } else if (status === "authenticated") {
            setLoading(false);
            console.log(status)
            setUser({
                email: session?.user?.email || null,
                name: session?.user?.name || null,
                image: session?.user?.image || null,
            })
        } else {
            setUser(null)
            console.log(status)
            setLoading(false)
            router.push("/");
        }
    }, [status]);

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
        session,
        server,
        user, setUser,
        navOpen, setNavOpen,
        darkTheme, setDarkTheme
    };

    return (
        <DefaultContext.Provider value={value}>
            {!loading && children}
        </DefaultContext.Provider>
    )
}