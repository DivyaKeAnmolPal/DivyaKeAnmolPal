import { useState } from "react";

export function Envelope({ guestName = "Our Dearest Friend", onOpened }) {
    const [open, setOpen] = useState(false);
    const [hide, setHide] = useState(false);

    const handleOpen = () => {
        if (open) return;
        setOpen(true);
        window.setTimeout(() => {
            setHide(true);
            onOpened && onOpened();
        }, 2100);
    };

    return (
        <div
            className={`transition-opacity duration-700 ${hide ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            aria-hidden={hide}
        >
            <div className="envelope-wrapper animate-float" data-testid="envelope-container">
                <div className="envelope-back" />

                <div className={`letter ${open ? "is-open" : ""}`} aria-label="Invitation letter">
                    <div className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-stone-500 mb-2 font-sans">
                        You are invited
                    </div>
                    <div className="font-serif italic text-xl sm:text-2xl text-stone-800 leading-tight">
                        Dearest
                    </div>
                    <div
                        className="font-serif text-2xl sm:text-4xl text-burgundy leading-tight mt-1 px-4"
                        data-testid="letter-guest-name"
                    >
                        {guestName}
                    </div>
                    <div className="divider w-32 sm:w-40 my-3 text-stone-400">
                        <span className="font-serif italic text-xs">&amp;</span>
                    </div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-stone-500 font-sans">
                        with love
                    </div>
                </div>

                <div className="envelope-front">
                    <div className="stamp-mark">Par Avion</div>
                    <div className="absolute left-0 right-0 top-[66%] flex flex-col items-center z-[35] pointer-events-none px-6">
                        <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-stone-500 font-sans">
                            To
                        </div>
                        <div
                            className="font-serif text-base sm:text-xl text-stone-800 mt-0.5 text-center truncate max-w-full"
                            data-testid="guest-name-display"
                        >
                            {guestName}
                        </div>
                        <div className="mt-1 font-serif italic text-[10px] sm:text-xs text-stone-500">
                            — 14 · Dec · 2026 · Udaipur —
                        </div>
                    </div>
                </div>

                <div className={`envelope-flap ${open ? "is-open" : ""}`} />

                <button
                    type="button"
                    onClick={handleOpen}
                    className={`wax-seal ${open ? "is-open" : ""}`}
                    aria-label="Open the envelope"
                    data-testid="open-envelope-button"
                >
                    A&amp;A
                </button>
            </div>

            <div className="mt-10 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-stone-500 font-sans">
                    Break the seal
                </p>
                <p className="mt-2 font-serif italic text-stone-600">
                    Tap the wax to open your invitation
                </p>
            </div>
        </div>
    );
}
