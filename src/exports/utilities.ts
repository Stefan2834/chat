export const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();

    const diffInMilliseconds = now.getTime() - date.getTime();

    if (diffInMilliseconds < 24 * 60 * 60 * 1000 && now.getDay() === date.getDay()) {
        return `${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    else if (diffInMilliseconds < 2 * 24 * 60 * 60 * 1000 && now.getDay() - 1 === date.getDay()) {
        return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    else if (diffInMilliseconds < 7 * 24 * 60 * 60 * 1000 && now.getDay() !== date.getDay()) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return `${days[date.getDay()]} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    else {
        return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
    }
};

export function formatTimeAgo(timestamp: number) {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);

    if (diffInSeconds < 60) {
        return 'now';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes}m`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours}h`;
    } else if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days}d`;
    } else if (diffInSeconds < 2419200) {
        const weeks = Math.floor(diffInSeconds / 604800);
        return `${weeks}w`;
    } else if (diffInSeconds < 29030400) {
        const months = Math.floor(diffInSeconds / 2419200);
        return `${months}mo`;
    } else {
        const years = Math.floor(diffInSeconds / 29030400);
        return `${years}y`;
    }
}


export const bgAvailable = [
    'https://chatapp2834.s3.eu-west-3.amazonaws.com/p1.jpg',
    'https://chatapp2834.s3.eu-west-3.amazonaws.com/p2.jpg',
    'https://chatapp2834.s3.eu-west-3.amazonaws.com/p3.jpg',
    'https://chatapp2834.s3.eu-west-3.amazonaws.com/p4.webp',
    'https://chatapp2834.s3.eu-west-3.amazonaws.com/p5.jpg',
    'https://chatapp2834.s3.eu-west-3.amazonaws.com/p6.jpg',
    'https://chatapp2834.s3.eu-west-3.amazonaws.com/p7.jpg',
    'https://chatapp2834.s3.eu-west-3.amazonaws.com/p8.jpg',
    'https://chatapp2834.s3.eu-west-3.amazonaws.com/p9.jpg',
]