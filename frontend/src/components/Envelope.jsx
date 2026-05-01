import { useState } from "react";

export function Envelope({ guestName = "Friend", note, onOpened }) {
    const [open, setOpen] = useState(false);
    const [hide, setHide] = useState(false);

    const handleOpen = () => {
        if (open) return;
        setOpen(true);
        // brief haptic on mobile if allowed
        try { navigator.vibrate && navigator.vibrate(20); } catch { /* noop */ }
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
                    <img
                        src="/brand/logo.jpeg"
                        alt="Divya & Anmol"
                        className="logo-blend w-12 h-12 sm:w-14 sm:h-14 object-contain mb-1"
                    />
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-stone-500 font-sans">
                        You are invited
                    </div>
                    <div className="font-serif italic text-base sm:text-lg text-stone-700 leading-tight mt-1">
                        Dearest
                    </div>
                    <div
                        className="font-serif text-xl sm:text-2xl text-maroon leading-tight mt-0.5 px-3"
                        data-testid="letter-guest-name"
                    >
                        {guestName}
                    </div>
                    {note ? (
                        <div className="mt-2 px-2 sm:px-3 font-serif italic text-stone-700 text-[10px] sm:text-xs leading-snug line-clamp-3" data-testid="letter-note">
                            "{note}"
                        </div>
                    ) : (
                        <>
                            <div className="divider w-24 sm:w-32 my-2 text-stone-400">
                                <span className="font-serif italic text-xs">&amp;</span>
                            </div>
                            <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-stone-500 font-sans">
                                with love
                            </div>
                        </>
                    )}
                </div>

                <div className="envelope-front">
                    <div className="stamp-mark">Air Mail</div>
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
                            — 28 · Jun · 2026 · San Jose —
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
                    <img src="/brand/logo.jpeg" alt="Logo" />
                </button>
            </div>

            <div className="mt-10 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-stone-500 font-sans">
                    Tap the seal
                </p>
                <p className="mt-2 font-serif italic text-stone-600">
                    to break it open
                </p>
            </div>
        </div>
    );
}
