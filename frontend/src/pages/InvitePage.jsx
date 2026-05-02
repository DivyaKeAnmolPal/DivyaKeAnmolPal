import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Envelope } from "../components/Envelope";
import { Invite } from "../components/Invite";
import { fetchWedding, getGuest } from "../lib/api";

const DEFAULT_WEDDING = {
    bride_name: "Divya",
    groom_name: "Anmol",
    wedding_date: "2026-06-28T08:00:00",
    ceremony_venue: "BAPS Swaminarayan Mandir, Milpitas, California",
    reception_venue: "Shubham Hall, Sunnyvale, California",
    hashtag: "#DivyakeAnmolpal",
    location_city: "San Jose Bay Area, California",
};

export default function InvitePage() {
    const { guestSlug } = useParams();
    const [wedding, setWedding] = useState(null);
    const [guest, setGuest] = useState(null);
    const [opened, setOpened] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const w = await fetchWedding();
                if (!mounted) return;
                setWedding(w);
            } catch {
                if (mounted) setWedding(DEFAULT_WEDDING);
            }
            if (guestSlug) {
                try {
                    const g = await getGuest(guestSlug);
                    if (!mounted) return;
                    setGuest(g);
                } catch {
                    if (!mounted) return;
                    const fallback = decodeURIComponent(guestSlug)
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase());
                    setGuest({ name: fallback, slug: guestSlug });
                }
            }
            if (mounted) setLoading(false);
        })();
        return () => { mounted = false; };
    }, [guestSlug]);

    useEffect(() => {
        if (opened) window.scrollTo({ top: 0, behavior: "instant" });
    }, [opened]);

    if (loading || !wedding) {
        return (
            <div className="min-h-screen flex items-center justify-center paper-bg">
                <div className="font-serif italic text-stone-500">Preparing your invitation…</div>
            </div>
        );
    }

    const guestName = guest?.name || "Friend";
    const note = guest?.message || null;

    if (!opened) {
        return (
            <div className="min-h-screen paper-bg flex flex-col items-center justify-center px-6 py-20">
                <div className="text-center mb-12 animate-fade-in">
                    <p className="font-sans uppercase tracking-[0.4em] text-[10px] sm:text-xs text-maroon">
                        {wedding.hashtag}
                    </p>
                    <h1 className="mt-4 font-serif italic text-3xl sm:text-5xl text-ink">
                        Sealed with love
                    </h1>
                    <p className="mt-3 font-serif text-stone-600 text-sm sm:text-base">
                        Something is waiting for you inside.
                    </p>
                </div>
                <Envelope
                    guestName={guestName}
                    note={note}
                    onOpened={() => setOpened(true)}
                />
            </div>
        );
    }

    return <Invite wedding={wedding} guestName={guestName} note={note} />;
}
