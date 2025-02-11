//& Utilities
import React, { useContext, useState, ReactNode, createContext, } from 'react';
import { useSession } from 'next-auth/react';
import io, { Socket } from 'socket.io-client';

const socketIo = io(process.env.NEXT_PUBLIC_SERVER || '', {
    transports: ['websocket']
});


//& Interfaces
import { DefaultContextValue } from '@/exports/types';

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

    const { status } = useSession()
    
    const socket: Socket = socketIo;
    const server: string = process.env.NEXT_PUBLIC_SERVER || ''
    
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true);

    
    
    
    const value: DefaultContextValue = {
        socket,
        server,
        isLoading, setIsLoading,
        error, setError
    };

    return (
        <DefaultContext.Provider value={value}>
            <DynamicWidthComponent>
                <Protected>
                    {status !== "loading" && (
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