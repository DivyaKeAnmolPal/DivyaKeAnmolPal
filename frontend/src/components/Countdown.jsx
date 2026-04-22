import { useEffect, useState } from "react";

function parts(ms) {
    const total = Math.max(0, Math.floor(ms / 1000));
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;
    return { days, hours, minutes, seconds };
}

export function Countdown({ targetIso }) {
    const target = new Date(targetIso).getTime();
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, []);

    const { days, hours, minutes, seconds } = parts(target - now);
    const cells = [
        { label: "Days", value: days },
        { label: "Hours", value: hours },
        { label: "Minutes", value: minutes },
        { label: "Seconds", value: seconds },
    ];

    return (
        <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-xl mx-auto" data-testid="countdown-timer">
            {cells.map((c) => (
                <div key={c.label} className="count-card">
                    <div className="font-serif text-3xl sm:text-5xl text-ink tabular-nums">
                        {String(c.value).padStart(2, "0")}
                    </div>
                    <div className="mt-2 font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] text-stone-500">
                        {c.label}
                    </div>
                </div>
            ))}
        </div>
    );
}
