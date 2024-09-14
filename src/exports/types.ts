import { Socket } from "socket.io-client";


export type MessageType = {
    email: string | null | undefined,
    date: number,
    message: string,
    loading?: boolean,
    photo?: string | null,
}

export type UserType = {
    email: string,
    username: string,
    avatar: string
}


//& Default Context


export type DefaultContextValue = {
    server: string;
    error: null | string,
    setError: (error: null | string) => void
    socket: Socket | null,
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export type ConversationType = {
    username: string;
    lastMsg: string;
    lastYou: boolean;
    date: number;
    seen: boolean;
    avatar: string;
    email: string;
}

export type SidebarRequestType = {
    data: {
        success: boolean,
        sidebar: ConversationType[],
        hasMoreData: boolean,
        error: string | null
    }
}




//& [email] page


export type MessagePageProps = {
    messagesData: MessageType[],
    avatar: string,
    username: string,
    hasSeen: boolean,
    background: string,
    params: string | null,
    err: string | null,
}


//& Custom components

export type CompType = {
    activeBg: string,
    setBg: (bg: string) => void,
    setInfo: (info: boolean) => void,
    setError: (err: string) => void,
    email: string,
    emailSend: string
}

export type MessagePropsType = {
    messages: MessageType[],
    user: UserType | undefined,
    setViewPhoto: (viewPhoto: string | null | undefined) => void,
    avatar: string
}