//& Utilities
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

//& Interfaces
import { DefaultContextValue, User } from '@/exports/interfaces';

//& Custom Components
import Protected from '@/components/Protected';
import DynamicWidthComponent from '@/components/DynamicWidth';
import CustomError from '@/components/custom/CustomError';


export const DefaultContext = createContext<DefaultContextValue | undefined>(undefined);

export function useDefault() {
    const context = useContext(DefaultContext);
    if (!context) {
        throw new Error('useDefault must be used within an DefaultProvider');
    }
    return context;
}


export function DefaultProvider({ children }: { children: ReactNode }) {

    const { data: session, status } = useSession()

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const server: string = process.env.NEXT_PUBLIC_SERVER || ''


    useEffect(() => {
        setLoading(false)
        if (status === "authenticated") {
            console.log(session)
            setUser({
                username: session.user?.username || null,
                email: session.user?.email || null,
                avatar: session?.user?.avatar || null
            })
        }
    }, [session])


    const value: DefaultContextValue = {
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
                            <CustomError />
                            {children}
                        </>
                    )}
                </Protected>
            </DynamicWidthComponent>
        </DefaultContext.Provider>
    )
}