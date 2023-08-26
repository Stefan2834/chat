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
    const [isLoading, setIsLoading] = useState(true);
    const [hasMoreData, setHasMoreData] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchSideData = async () => {
            const server = process.env.NEXT_PUBLIC_SERVER;
            try {
                const response = await axios.post(`${server}/messages/sidebar/`, {
                    email: email,
                    jump: 0
                });
                if (response?.data?.success) {
                    setSidebar(response?.data?.side);
                    setHasMoreData(response?.data?.hasMoreData)
                } else {
                    setSidebar([])
                    console.error(response?.data?.message)
                    setError(response?.data?.message);
                }
            } catch (error : any) {
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