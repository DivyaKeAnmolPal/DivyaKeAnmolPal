// Indian-wedding inspired motifs: marigolds, paisleys, sunbursts.

// Vertical hanging marigold garland — replaces BotanicalStem on page sides.
export function MarigoldGarland({ className = "" }) {
    const blooms = Array.from({ length: 16 }, (_, i) => i);
    return (
        <svg viewBox="0 0 80 800" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {/* string */}
            <path d="M40 0 C 32 100, 48 200, 36 300 C 28 400, 50 500, 38 620 C 32 720, 44 760, 40 800"
                  stroke="#8B1C2D" strokeOpacity="0.55" strokeWidth="1" fill="none" />
            {blooms.map((i) => {
                const y = 18 + i * 48;
                // approximate the curved string x at given y
                const t = y / 800;
                const x = 40 + Math.sin(t * 7) * 8;
                const r = 9 + (i % 3);
                const fill = i % 2 === 0 ? "#C75A2C" : "#E58741";
                return (
                    <g key={i} transform={`translate(${x},${y})`}>
                        {/* outer petals layer */}
                        {Array.from({ length: 8 }).map((_, k) => {
                            const a = (k / 8) * Math.PI * 2;
                            const cx = Math.cos(a) * (r * 0.55);
                            const cy = Math.sin(a) * (r * 0.55);
                            return <circle key={k} cx={cx} cy={cy} r={r * 0.55} fill={fill} fillOpacity="0.85" />;
                        })}
                        <circle r={r * 0.55} fill="#A03B1C" />
                        <circle r={r * 0.22} fill="#6E1A0A" />
                    </g>
                );
            })}
        </svg>
    );
}

// Single marigold bloom badge — replaces LeafBadge.
export function MarigoldBadge({ className = "" }) {
    return (
        <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g transform="translate(30,30)">
                {Array.from({ length: 12 }).map((_, k) => {
                    const a = (k / 12) * Math.PI * 2;
                    const cx = Math.cos(a) * 14;
                    const cy = Math.sin(a) * 14;
                    return <circle key={k} cx={cx} cy={cy} r="9" fill="#E58741" fillOpacity="0.85" />;
                })}
                {Array.from({ length: 8 }).map((_, k) => {
                    const a = (k / 8) * Math.PI * 2 + 0.2;
                    const cx = Math.cos(a) * 8;
                    const cy = Math.sin(a) * 8;
                    return <circle key={k} cx={cx} cy={cy} r="6" fill="#C75A2C" />;
                })}
                <circle r="6" fill="#A03B1C" />
                <circle r="2.5" fill="#6E1A0A" />
            </g>
        </svg>
    );
}

// Paisley curl (Indian "Buta") — accent decoration.
export function Paisley({ className = "" }) {
    return (
        <svg viewBox="0 0 80 100" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g stroke="#8B1C2D" strokeWidth="1.2" fill="none" strokeLinecap="round">
                <path d="M40 96 C 6 86, 8 30, 40 18 C 64 10, 72 38, 50 50 C 36 56, 30 42, 40 34" />
                <path d="M40 80 C 22 76, 18 50, 40 42" strokeOpacity="0.6" />
                <circle cx="40" cy="28" r="2.4" fill="#8B1C2D" stroke="none" />
                <circle cx="34" cy="46" r="1.8" fill="#C75A2C" stroke="none" />
                <circle cx="46" cy="48" r="1.8" fill="#C75A2C" stroke="none" />
            </g>
        </svg>
    );
}

// Sunburst / mandala accent — used near the hero.
export function Sunburst({ className = "" }) {
    return (
        <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g transform="translate(100,100)" stroke="#8B1C2D" strokeWidth="0.8" fill="none">
                <circle r="14" />
                <circle r="22" strokeOpacity="0.7" />
                <circle r="36" strokeDasharray="2 4" strokeOpacity="0.5" />
                {Array.from({ length: 24 }).map((_, k) => {
                    const a = (k / 24) * Math.PI * 2;
                    const x1 = Math.cos(a) * 38;
                    const y1 = Math.sin(a) * 38;
                    const x2 = Math.cos(a) * (k % 2 === 0 ? 56 : 48);
                    const y2 = Math.sin(a) * (k % 2 === 0 ? 56 : 48);
                    return <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} />;
                })}
                <circle r="62" strokeOpacity="0.35" />
            </g>
        </svg>
    );
}

// Floating butterfly — kept (still loved)
export function Butterfly({ className = "", style }) {
    return (
        <svg viewBox="0 0 60 50" className={className} style={style} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g fill="#E2A07F" stroke="#8B1C2D" strokeWidth="0.6">
                <path d="M30 25 Q 14 6, 6 18 Q 4 30, 18 32 Q 26 32, 30 25 Z" fillOpacity="0.85" />
                <path d="M30 25 Q 46 6, 54 18 Q 56 30, 42 32 Q 34 32, 30 25 Z" fillOpacity="0.85" />
                <path d="M30 25 Q 18 36, 14 44 Q 24 46, 30 36 Z" fillOpacity="0.7" />
                <path d="M30 25 Q 42 36, 46 44 Q 36 46, 30 36 Z" fillOpacity="0.7" />
            </g>
            <line x1="30" y1="14" x2="30" y2="38" stroke="#5A2A20" strokeWidth="1" strokeLinecap="round" />
            <path d="M30 14 q -2 -4, -5 -3" stroke="#5A2A20" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <path d="M30 14 q 2 -4, 5 -3" stroke="#5A2A20" strokeWidth="0.8" fill="none" strokeLinecap="round" />
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
                <circle cx="80" cy="14" r="3" fill="#C75A2C" stroke="none" />
                <circle cx="80" cy="14" r="1.4" fill="#8B1C2D" stroke="none" />
                <path d="M70 14 q 4 -8, 10 0" />
                <path d="M70 14 q 4 8, 10 0" />
            </g>
        </svg>
    );
}

// Heart scribble (kept)
export function HeartDoodle({ className = "" }) {
    return (
        <svg viewBox="0 0 50 45" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M25 40 C 6 28, 6 8, 18 8 C 24 8, 25 14, 25 14 C 25 14, 26 8, 32 8 C 44 8, 44 28, 25 40 Z" stroke="#C75A2C" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </svg>
    );
}
