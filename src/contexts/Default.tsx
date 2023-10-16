import React, { createContext, useContext, useEffect, useState, useReducer, ReactNode } from 'react';
import DynamicWidthComponent from '@/components/DynamicWidth';
import { Snackbar, Alert } from '@mui/material';
import { useSession } from 'next-auth/react';
import Protected from '@/components/Protected';

interface DefaultContextValue {
    state: State;
    dispatch: Dispatch;
    server: String;
    user: User | null;
    setUser: (user: User | null) => void,
    error: null | string,
    setError: (error: null | string) => void
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
    const { data: session, status } = useSession()
    const [state, dispatch] = useReducer<ReducerFunction>(Reducer, initialState);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<null | string>(null)
    const server: String = process.env.NEXT_PUBLIC_SERVER || ''


    useEffect(() => {
        setLoading(false)
        if (status === "authenticated") {
            console.log(session)
            setUser({
                username: session.user?.username || null,
                email: session.user?.email || null,
                avatar: session?.user?.image || null
            })
            setLoading(false)
        }
    }, [status])


    const value: DefaultContextValue = {
        state,
        dispatch,
        server,
        user, setUser,
        error, setError
    };
    return (
        <DefaultContext.Provider value={value}>
            <DynamicWidthComponent>
                <Protected>
                    {!loading && (
                        <>
                            <Snackbar open={error !== null ? true : false} autoHideDuration={5000} onClose={() => setError(null)}>
                                <Alert onClose={() => setError(null)} severity="error" sx={{
                                    width: '100%',
                                    marginBottom: '40px',
                                    '@media (max-width:1000px)': { marginBottom: '64px' }
                                }}
                                >
                                    {error}
                                </Alert>
                            </Snackbar>
                            {children}
                        </>
                    )}
                </Protected>
            </DynamicWidthComponent>
        </DefaultContext.Provider>
    )
}