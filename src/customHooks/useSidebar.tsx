import { useState, useEffect } from 'react';
import axios from 'axios';

interface ConversationType {
    username: string;
    lastMsg: string;
    lastYou: boolean;
    date: number;
    seen: boolean;
    avatar: string;
    email: string;
}

interface UseSideDataResult {
    sidebar: ConversationType[];
    setSidebar: React.Dispatch<React.SetStateAction<ConversationType[]>>;
    isLoading: boolean;
    error: string | null;
    setError: (error: string | null) => void;
    hasMoreData: boolean;
    setHasMoreData: (hasMoreData: boolean) => void;
}

export const useSideData = (email: string | null | undefined): UseSideDataResult => {
    const [sidebar, setSidebar] = useState<ConversationType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchSideData = async () => {
            const server = process.env.NEXT_PUBLIC_SERVER;
            try {
                const response = await axios.post(`${server}/graphql`, {
                    query: `query ($email: String!, $jump: Int!) {
                        getSidebar(email: $email, jump: $jump) {
                        success
                        message
                        hasMoreData
                        side {
                            username
                            lastMsg
                            lastYou
                            date
                            seen
                            avatar
                            email
                        }
                        }
                    }`,
                    variables: {
                        email: email,
                        jump: 0
                    }
                })
                if (response?.data?.data?.getSidebar?.success) {
                    setSidebar(response.data.data.getSidebar.side)
                    setHasMoreData(response.data.data.getSidebar.hasMoreData)
                } else {
                    setSidebar([])
                    console.error(response.data.data.getSidebar.message)
                    setError(response.data.data.getSidebar.message)
                }
                console.log(response)
            } catch (error: any) {
                console.error('Error fetching side data:', error);
                setError(`An error occurred while fetching sidebar data. ${error?.message}`);
                setSidebar([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSideData();
    }, []);

    return { sidebar, setSidebar, isLoading, error, setError, hasMoreData, setHasMoreData };
};