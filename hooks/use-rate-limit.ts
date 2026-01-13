import { useState, useEffect } from "react";

export function useRateLimit() {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    return {
        isRateLimited: timeLeft > 0,
        timeLeft,
        startRateLimit: setTimeLeft,
    };
}
