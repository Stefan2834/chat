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


import image1 from "../assets/backgrounds/background-1.webp"
import image2 from "../assets/backgrounds/background-2.webp"
import image3 from "../assets/backgrounds/background-3.webp"
import image4 from "../assets/backgrounds/background-4.webp"
import image5 from "../assets/backgrounds/background-5.jpg"
import image6 from "../assets/backgrounds/background-6.jpg"
import image7 from "../assets/backgrounds/background-7.png"
import image8 from "../assets/backgrounds/background-8.jpg"


export const bgAvailable = [
    image1.src, image2.src, image3.src,
    image4.src, image5.src, image6.src,
    image7.src, image8.src
]