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
    conversation: ConversationType[];
    isLoading: boolean;
    error: string | null;
    setError: (error: string | null) => void;
    setConversation: (conversation: ConversationType[]) => void
}

export const useSideData = (email: string | null | undefined): UseSideDataResult => {
    const [conversation, setConversation] = useState<ConversationType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
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
                    setConversation(response?.data?.side);
                } else {
                    setConversation([])
                    console.error(response?.data?.message)
                    setError(response?.data?.message);
                }
            } catch (error) {
                console.error('Error fetching side data:', error);
                setError('An error occurred while fetching conversation data.');
                setConversation([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSideData();
    }, []);

    return { conversation, setConversation, isLoading, error, setError };
};