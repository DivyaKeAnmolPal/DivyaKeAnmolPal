import { Countdown } from "./Countdown";
import { Reveal } from "./Reveal";
import { Guestbook } from "./Guestbook";
import { Flourish, MarigoldGarland, MarigoldBadge, Butterfly, HeartDoodle, Paisley, Sunburst } from "./Botanicals";
import { MapPin, Music, Sparkles, Youtube, Clock } from "lucide-react";

const galleryImgs = [
    "/brand/photos/p5.JPG",
    "/brand/photos/p4.jpg",
    "/brand/photos/p3.jpg",
    "/brand/photos/p2.jpg",
    "/brand/photos/p1.jpg",
];

const sangeetItinerary = [
    { time: "5:00 PM", label: "Welcome & sundowners" },
    { time: "6:30 PM", label: "Performances — friends, family & us" },
    { time: "8:00 PM", label: "Dinner under the lights" },
    { time: "9:30 PM", label: "Dance floor opens" },
];

const weddingItinerary = [
    { time: "8:00 AM", label: "Arrival & welcome chai" },
    { time: "8:45 AM", label: "Baraat" },
    { time: "9:30 AM", label: "Ceremony" },
    { time: "12:00 PM", label: "Lunch" },
    { time: "2:00 PM", label: "Vidaai" },
];

function EventCard({ tag, title, dateLabel, pst, ist, location, comingSoonStream }) {
    return (
        <div className="frame p-8 sm:p-10 text-center relative">
            <MarigoldBadge className="mx-auto w-14 h-14" />
            <p className="mt-4 font-sans uppercase tracking-[0.3em] text-[11px] text-maroon">{tag}</p>
            <h3 className="mt-3 font-serif text-3xl sm:text-4xl text-ink">{title}</h3>
            <p className="mt-4 font-sans text-stone-700">{dateLabel}</p>

            <div className="mt-5 inline-flex flex-col gap-1 text-sm">
                <span className="font-serif italic text-stone-700">
                    <Clock className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5 text-sage" />
                    {pst} <span className="text-stone-400 mx-1">·</span> {ist}
                </span>
            </div>

            <div className="mt-5 inline-flex items-center gap-2 text-sage">
                <MapPin className="w-4 h-4" />
                <span className="font-sans text-sm">{location}</span>
            </div>

            <div className="mt-4 inline-flex items-center gap-2 text-stone-500">
                <Youtube className="w-4 h-4 text-maroon" />
                <span className="font-sans text-xs uppercase tracking-[0.25em]">{comingSoonStream}</span>
            </div>
        </div>
    );
}

export function Invite({ wedding, guestName, note }) {
    const wedDate = new Date(wedding.wedding_date); // Jun 28, 2026 8:00 AM PST
    const sangeetDateStr = "Saturday, June 27, 2026";
    const weddingDateStr = "Sunday, June 28, 2026";

    return (
        <div className="paper-bg min-h-screen relative overflow-hidden" data-testid="invite-page">
            <MarigoldGarland className="botanical-side-left" />
            <MarigoldGarland className="botanical-side-right" />

            {/* Hero with logo centerpiece */}
            <section className="relative pt-16 sm:pt-24 pb-16 sm:pb-24 px-6">
                <div className="max-w-4xl mx-auto text-center relative">
                    {/* Floating butterflies */}
                    <Butterfly className="absolute left-[10%] top-2 w-10 sm:w-14 animate-flutter opacity-80" />
                    <Butterfly className="absolute right-[12%] top-16 w-7 sm:w-10 animate-flutter opacity-70" style={{ animationDelay: "1.5s" }} />
                    <HeartDoodle className="absolute left-[18%] top-[55%] w-8 opacity-70 hidden sm:block" />

                    <div className="watercolor-halo">
                        <img
                            src="/brand/logo.jpeg"
                            alt="Divya & Anmol logo"
                            className="logo-blend mx-auto w-44 sm:w-64 h-auto select-none"
                            data-testid="hero-logo"
                        />
                    </div>

                    <p className="mt-2 font-sans uppercase tracking-[0.4em] text-[10px] sm:text-xs text-maroon">
                        {wedding.hashtag}
                    </p>

                    <p className="mt-8 font-sans uppercase tracking-[0.4em] text-[10px] sm:text-xs text-sage">
                        We are getting married
                    </p>
                    <h1 className="mt-4 font-serif text-5xl sm:text-7xl md:text-8xl text-maroon leading-[0.95]">
                        Divya
                        <span className="block font-serif italic text-2xl sm:text-4xl text-stone-600 my-2">&amp;</span>
                        Anmol
                    </h1>
                    <Flourish className="mx-auto mt-6 w-44" />
                    <p className="mt-6 font-serif italic text-stone-700 text-lg sm:text-xl">
                        request the pleasure of {guestName ? <span className="text-maroon">{guestName}'s</span> : "your"} company
                    </p>
                    <p className="mt-3 font-sans uppercase tracking-[0.3em] text-xs text-stone-500">
                        27 — 28 June 2026 · {wedding.location_city || "San Jose, California"}
                    </p>

                    {note ? (
                        <div className="mt-10 max-w-md mx-auto frame px-6 py-5 text-left" data-testid="invite-personal-note">
                            <p className="font-sans uppercase tracking-[0.3em] text-[10px] text-maroon">
                                A note for {guestName}
                            </p>
                            <p className="mt-2 font-serif italic text-stone-700 text-base sm:text-lg leading-relaxed">
                                "{note}"
                            </p>
                        </div>
                    ) : null}
                </div>
            </section>

            {/* Countdown */}
            <section className="py-16 sm:py-24 px-6 blush-bg">
                <Reveal>
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="font-sans uppercase tracking-[0.4em] text-[10px] sm:text-xs text-maroon">Countdown</p>
                        <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-ink">
                            Until {weddingDateStr}
                        </h2>
                        <div className="mt-10">
                            <Countdown targetIso={wedding.wedding_date} />
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* The Celebrations */}
            <section className="py-20 sm:py-28 px-6 relative">
                <Paisley className="absolute left-6 top-12 w-12 opacity-40 hidden sm:block" />
                <Paisley className="absolute right-6 top-20 w-12 opacity-40 -scale-x-100 hidden sm:block" />
                <div className="max-w-5xl mx-auto">
                    <Reveal>
                        <div className="text-center">
                            <p className="font-sans uppercase tracking-[0.4em] text-[10px] sm:text-xs text-maroon">The Celebrations</p>
                            <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-ink">Two days of joy</h2>
                            <Flourish className="mx-auto mt-6 w-32" />
                        </div>
                    </Reveal>

                    <div className="mt-16 grid md:grid-cols-2 gap-10">
                        <Reveal>
                            <EventCard
                                tag="Day 1 · Sangeet"
                                title="A Night of Music"
                                dateLabel="Saturday, June 27, 2026"
                                pst="5:00 PM PST"
                                ist="5:30 AM IST · 28 June"
                                location={wedding.reception_venue || "Shubham Hall, Sunnyvale"}
                                comingSoonStream="Live stream link · coming soon"
                            />
                        </Reveal>
                        <Reveal delay={120}>
                            <EventCard
                                tag="Day 2 · Wedding"
                                title="The Wedding"
                                dateLabel={weddingDateStr}
                                pst="8:00 AM PST"
                                ist="8:30 PM IST · 28 June"
                                location={wedding.ceremony_venue || "BAPS Mandir, Milpitas"}
                                comingSoonStream="Live stream link · coming soon"
                            />
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Itinerary */}
            <section className="py-20 sm:py-28 px-6 linen-bg">
                <div className="max-w-4xl mx-auto">
                    <Reveal>
                        <div className="text-center">
                            <p className="font-sans uppercase tracking-[0.4em] text-[10px] sm:text-xs text-maroon">Itinerary</p>
                            <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-ink">27 — 28 June 2026</h2>
                            <Flourish className="mx-auto mt-6 w-32" />
                        </div>
                    </Reveal>

                    <div className="mt-14 grid md:grid-cols-2 gap-12">
                        <Reveal>
                            <h3 className="font-serif text-2xl text-maroon flex items-center gap-2">
                                <Music className="w-5 h-5" /> Sangeet
                            </h3>
                            <p className="mt-1 font-sans text-xs uppercase tracking-[0.2em] text-stone-500">{sangeetDateStr} · 5:00 PM PST</p>
                            <ul className="mt-6 space-y-5">
                                {sangeetItinerary.map((s) => (
                                    <li key={s.time} className="flex gap-5 items-baseline">
                                        <span className="font-serif italic text-maroon text-lg w-24 shrink-0 tabular-nums">{s.time}</span>
                                        <span className="font-sans text-stone-700">{s.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                        <Reveal delay={120}>
                            <h3 className="font-serif text-2xl text-maroon flex items-center gap-2">
                                <Sparkles className="w-5 h-5" /> Wedding
                            </h3>
                            <p className="mt-1 font-sans text-xs uppercase tracking-[0.2em] text-stone-500">{weddingDateStr} · 8:00 AM PST</p>
                            <ul className="mt-6 space-y-5">
                                {weddingItinerary.map((s) => (
                                    <li key={s.time} className="flex gap-5 items-baseline">
                                        <span className="font-serif italic text-maroon text-lg w-24 shrink-0 tabular-nums">{s.time}</span>
                                        <span className="font-sans text-stone-700">{s.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Photo gallery */}
            <section className="py-20 sm:py-28 px-6 relative">
                <Sunburst className="absolute -left-10 top-10 w-56 opacity-15 hidden sm:block" />
                <Sunburst className="absolute -right-10 bottom-10 w-56 opacity-15 hidden sm:block" />
                <div className="max-w-6xl mx-auto relative">
                    <Reveal>
                        <div className="text-center">
                            <p className="font-sans uppercase tracking-[0.4em] text-[10px] sm:text-xs text-maroon">Moments</p>
                            <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-ink">Fragments of us</h2>
                            <Flourish className="mx-auto mt-6 w-32" />
                        </div>
                    </Reveal>
                    <div className="mt-14 grid grid-cols-12 gap-3 sm:gap-4">
                        {/* Big editorial portrait */}
                        <Reveal className="col-span-12 md:col-span-7 md:row-span-2">
                            <figure className="relative h-72 sm:h-[520px] overflow-hidden">
                                <img src={galleryImgs[0]} alt="Divya & Anmol" loading="lazy" className="w-full h-full object-cover" />
                                <figcaption className="absolute bottom-4 left-4 font-serif italic text-bone text-sm drop-shadow">— under the dome</figcaption>
                            </figure>
                        </Reveal>
                        <Reveal className="col-span-6 md:col-span-5" delay={60}>
                            <img src={galleryImgs[1]} alt="Cliffside sunset" loading="lazy" className="w-full h-44 sm:h-[252px] object-cover" />
                        </Reveal>
                        <Reveal className="col-span-6 md:col-span-5" delay={120}>
                            <img src={galleryImgs[2]} alt="Bay Area cycle ride" loading="lazy" className="w-full h-44 sm:h-[252px] object-cover" />
                        </Reveal>
                        <Reveal className="col-span-7 md:col-span-7" delay={140}>
                            <img src={galleryImgs[3]} alt="Reflection pool" loading="lazy" className="w-full h-48 sm:h-[280px] object-cover" />
                        </Reveal>
                        <Reveal className="col-span-5 md:col-span-5" delay={180}>
                            <img src={galleryImgs[4]} alt="A holiday together" loading="lazy" className="w-full h-48 sm:h-[280px] object-cover" />
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Live stream coming soon */}
            <section className="py-20 sm:py-28 px-6 blush-bg">
                <div className="max-w-3xl mx-auto text-center frame p-10">
                    <Youtube className="mx-auto w-7 h-7 text-maroon" />
                    <p className="mt-3 font-sans uppercase tracking-[0.4em] text-[10px] sm:text-xs text-maroon">Live stream</p>
                    <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-ink">Joining from afar?</h2>
                    <p className="mt-4 font-serif italic text-stone-700">
                        We'll share the YouTube live links here closer to the day so you can witness the vows wherever you are.
                    </p>
                    <p className="mt-6 font-sans uppercase tracking-[0.3em] text-xs text-maroon">Coming soon</p>
                </div>
            </section>

            {/* Guestbook */}
            <Guestbook />

            {/* Signoff */}
            <section className="py-24 sm:py-32 px-6 text-center">
                <img src="/brand/logo.jpeg" alt="logo" className="logo-blend mx-auto w-24 h-auto opacity-90" />
                <p className="mt-6 font-sans uppercase tracking-[0.4em] text-[10px] sm:text-xs text-maroon">{wedding.hashtag}</p>
                <h2 className="mt-3 font-serif italic text-4xl sm:text-6xl text-maroon">
                    With love, {wedding.bride_name} &amp; {wedding.groom_name}
                </h2>
                <p className="mt-8 font-sans text-stone-500 text-sm max-w-md mx-auto">
                    Please come prepared to dance — and to stay for the after party.
                </p>
            </section>
        </div>
    );
}
