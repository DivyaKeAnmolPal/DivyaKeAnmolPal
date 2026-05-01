// Inline botanical SVGs.
// Long stem with leaves
export function BotanicalStem({ className = "" }) {
    return (
        <svg viewBox="0 0 120 800" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g stroke="#5C6B3C" strokeWidth="1.4" fill="none" strokeLinecap="round">
                <path d="M60 0 C 50 120, 70 240, 55 360 C 42 480, 72 600, 50 800" />
                {Array.from({ length: 14 }).map((_, i) => {
                    const y = 30 + i * 55;
                    const dir = i % 2 === 0 ? 1 : -1;
                    return (
                        <g key={i}>
                            <path d={`M${60 - dir * 2} ${y} Q ${60 + dir * 30} ${y - 12}, ${60 + dir * 50} ${y - 4}`} />
                            <path d={`M${60 + dir * 50} ${y - 4} Q ${60 + dir * 36} ${y + 6}, ${60 + dir * 8} ${y + 4}`} fill="#9AA77C" fillOpacity="0.35" />
                        </g>
                    );
                })}
            </g>
        </svg>
    );
}

// Floating butterfly
export function Butterfly({ className = "" }) {
    return (
        <svg viewBox="0 0 60 50" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g fill="#A8B8C7" stroke="#7A8997" strokeWidth="0.6">
                <path d="M30 25 Q 14 6, 6 18 Q 4 30, 18 32 Q 26 32, 30 25 Z" fillOpacity="0.7" />
                <path d="M30 25 Q 46 6, 54 18 Q 56 30, 42 32 Q 34 32, 30 25 Z" fillOpacity="0.7" />
                <path d="M30 25 Q 18 36, 14 44 Q 24 46, 30 36 Z" fillOpacity="0.55" />
                <path d="M30 25 Q 42 36, 46 44 Q 36 46, 30 36 Z" fillOpacity="0.55" />
            </g>
            <line x1="30" y1="14" x2="30" y2="38" stroke="#5A4640" strokeWidth="1" strokeLinecap="round" />
            <path d="M30 14 q -2 -4, -5 -3" stroke="#5A4640" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <path d="M30 14 q 2 -4, 5 -3" stroke="#5A4640" strokeWidth="0.8" fill="none" strokeLinecap="round" />
        </svg>
    );
}

// Small flourish near titles
export function Flourish({ className = "" }) {
    return (
        <svg viewBox="0 0 160 28" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g stroke="#8B1C2D" strokeWidth="1.2" fill="none" strokeLinecap="round">
                <path d="M2 14 C 30 4, 50 24, 78 14" />
                <path d="M82 14 C 110 4, 130 24, 158 14" />
                <circle cx="80" cy="14" r="2.4" fill="#8B1C2D" stroke="none" />
                <path d="M76 8 Q 80 2, 84 8" />
                <path d="M76 20 Q 80 26, 84 20" />
            </g>
        </svg>
    );
}

// Leaf badge
export function LeafBadge({ className = "" }) {
    return (
        <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g stroke="#5C6B3C" strokeWidth="1.2" fill="none" strokeLinecap="round">
                <path d="M30 4 C 12 18, 12 42, 30 56 C 48 42, 48 18, 30 4 Z" fill="#9AA77C" fillOpacity="0.18" />
                <path d="M30 8 L 30 54" />
                <path d="M30 16 Q 22 22, 18 28" />
                <path d="M30 24 Q 22 30, 18 36" />
                <path d="M30 32 Q 22 38, 18 44" />
                <path d="M30 16 Q 38 22, 42 28" />
                <path d="M30 24 Q 38 30, 42 36" />
                <path d="M30 32 Q 38 38, 42 44" />
            </g>
        </svg>
    );
}

// Heart scribble (matches logo)
export function HeartDoodle({ className = "" }) {
    return (
        <svg viewBox="0 0 50 45" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M25 40 C 6 28, 6 8, 18 8 C 24 8, 25 14, 25 14 C 25 14, 26 8, 32 8 C 44 8, 44 28, 25 40 Z" stroke="#C17C63" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </svg>
    );
}
