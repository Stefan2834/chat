import { Socket } from "socket.io-client";


//& Default Context

export type User = {
    email: string | null,
    username: string | null,
    avatar: string | null
}


export interface DefaultContextValue {
    server: string;
    user: User | null;
    setUser: (user: User | null) => void,
    error: null | string,
    setError: (error: null | string) => void
}

//&  Socket context


export interface SocketContextValue {
    socket: Socket | null,
    sidebar: ConversationType[];
    setSidebar: React.Dispatch<React.SetStateAction<ConversationType[]>>;
    isLoading: boolean;
    hasMoreData: boolean;
    setHasMoreData: (hasMoreData: boolean) => void;
}

export interface ConversationType {
    username: string;
    lastMsg: string;
    lastYou: boolean;
    date: number;
    seen: boolean;
    avatar: string;
    email: string;
}




//& [email] page


export interface MessagePageProps {
    messagesData: {
        email: string | null | undefined,
        date: number,
        message: string,
        loading?: boolean,
        photo?: string | null,
    }[],
    avatar: string,
    username: string,
    hasSeen: boolean,
    background: string,
    params: string | null,
    err: string | null,
}


//& Info component

export interface CompType {
    activeBg: string,
    setBg: (bg: string) => void,
    setInfo: (info: boolean) => void,
    setError: (err: string) => void,
    email: string,
    emailSend: string
}

