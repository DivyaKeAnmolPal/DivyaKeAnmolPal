import { Countdown } from "./Countdown";
import { Reveal } from "./Reveal";
import { MapPin, Calendar, Heart } from "lucide-react";

const heroImg = "https://images.pexels.com/photos/20180399/pexels-photo-20180399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const venue1 = "https://images.unsplash.com/photo-1763553113391-a659bee36e06?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMHZlbnVlJTIwdGFibGV8ZW58MHx8fHwxNzc2ODk5NjMwfDA&ixlib=rb-4.1.0&q=85";
const venue2 = "https://images.pexels.com/photos/16120230/pexels-photo-16120230.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const couple = "https://images.unsplash.com/photo-1707193392435-c789b2845ea8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjB3ZWRkaW5nJTIwY291cGxlJTIwZmlsbXxlbnwwfHx8fDE3NzY4OTk2MjZ8MA&ixlib=rb-4.1.0&q=85";

const story = [
    { year: "2019", title: "The first hello", body: "A rainy café in Bangalore, a borrowed umbrella, and a conversation that lasted until the lights went out." },
    { year: "2022", title: "The long road", body: "Two cities, one playlist. Letters written on napkins and a promise to always come back home to each other." },
    { year: "2025", title: "The proposal", body: "On the rooftop of her grandmother's house, under a sky full of kites and jasmine, she said yes." },
    { year: "2026", title: "Forever", body: "And now, dearest friend, we ask you to witness the next chapter." },
];

export function Invite({ wedding, guestName }) {
    const weddingDate = new Date(wedding.wedding_date);
    const dateLong = weddingDate.toLocaleDateString("en-US", {
        weekday: "long", month: "long", day: "numeric", year: "numeric",
    });
    const timeStr = weddingDate.toLocaleTimeString("en-US", {
        hour: "numeric", minute: "2-digit",
    });

    return (
        <div className="paper-bg min-h-screen" data-testid="invite-page">
            {/* Hero */}
            <section className="relative h-[92vh] min-h-[620px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(${heroImg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "saturate(0.85) brightness(0.72)",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-[#FAF9F6]" />
                <div className="relative z-10 text-center px-6 animate-fade-up">
                    <p className="text-[11px] sm:text-xs uppercase tracking-[0.4em] text-white/85 font-sans">
                        Together with their families
                    </p>
                    <h1 className="mt-6 font-serif text-5xl sm:text-7xl md:text-8xl text-white leading-none">
                        {wedding.bride_name}
                        <span className="block font-serif italic text-3xl sm:text-5xl text-white/90 my-3 sm:my-5">and</span>
                        {wedding.groom_name}
                    </h1>
                    <div className="divider max-w-xs mx-auto mt-10 text-white/70">
                        <Heart className="w-4 h-4" />
                    </div>
                    <p className="mt-6 text-white font-serif italic text-lg sm:text-xl">
                        invite {guestName ? <span className="underline decoration-white/60 underline-offset-4">{guestName}</span> : "you"} to celebrate their wedding
                    </p>
                    <p className="mt-8 text-white/90 font-sans uppercase tracking-[0.3em] text-xs sm:text-sm">
                        {dateLong.toUpperCase()}
                    </p>
                </div>
            </section>

            {/* Countdown */}
            <section className="py-20 sm:py-28 px-6">
                <Reveal>
                    <div className="max-w-5xl mx-auto text-center">
                        <p className="font-sans uppercase tracking-[0.3em] text-xs text-stone-500">The wait begins</p>
                        <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Counting the days</h2>
                        <div className="mt-10">
                            <Countdown targetIso={wedding.wedding_date} />
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* Our story */}
            <section className="py-20 sm:py-28 px-6 bg-[#F5F5F0]">
                <div className="max-w-4xl mx-auto">
                    <Reveal>
                        <div className="text-center">
                            <p className="font-sans uppercase tracking-[0.3em] text-xs text-stone-500">Chapters</p>
                            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Our little story</h2>
                        </div>
                    </Reveal>
                    <div className="mt-16 relative">
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-stone-300 hidden md:block" />
                        <div className="space-y-12 md:space-y-20">
                            {story.map((s, i) => (
                                <Reveal key={s.year} delay={i * 60}>
                                    <div className={`md:grid md:grid-cols-2 md:gap-14 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                                        <div className={`${i % 2 ? "md:text-left" : "md:text-right"}`}>
                                            <div className="font-sans uppercase text-xs tracking-[0.3em] text-burgundy">{s.year}</div>
                                            <h3 className="mt-2 font-serif text-3xl text-ink">{s.title}</h3>
                                        </div>
                                        <div className="mt-4 md:mt-0">
                                            <p className="font-sans text-stone-600 leading-relaxed">{s.body}</p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Schedule */}
            <section className="py-20 sm:py-28 px-6">
                <div className="max-w-5xl mx-auto">
                    <Reveal>
                        <div className="text-center">
                            <p className="font-sans uppercase tracking-[0.3em] text-xs text-stone-500">The day</p>
                            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Order of events</h2>
                        </div>
                    </Reveal>
                    <div className="mt-14 grid md:grid-cols-2 gap-8">
                        <Reveal>
                            <div className="bg-white border border-stone-200 p-10">
                                <Calendar className="w-5 h-5 text-burgundy" />
                                <div className="mt-4 font-sans uppercase tracking-[0.3em] text-xs text-stone-500">Ceremony</div>
                                <h3 className="mt-2 font-serif text-3xl">{timeStr}</h3>
                                <p className="mt-3 font-sans text-stone-600">{wedding.ceremony_venue}</p>
                                <p className="mt-6 font-serif italic text-stone-500">Vows beneath the marigold canopy.</p>
                            </div>
                        </Reveal>
                        <Reveal delay={80}>
                            <div className="bg-white border border-stone-200 p-10">
                                <Calendar className="w-5 h-5 text-olive" />
                                <div className="mt-4 font-sans uppercase tracking-[0.3em] text-xs text-stone-500">Reception</div>
                                <h3 className="mt-2 font-serif text-3xl">Dinner &amp; dancing, 8:00 PM</h3>
                                <p className="mt-3 font-sans text-stone-600">{wedding.reception_venue}</p>
                                <p className="mt-6 font-serif italic text-stone-500">Bring your dancing shoes and an appetite.</p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Venue */}
            <section className="py-20 sm:py-28 px-6 bg-[#F5F5F0]">
                <div className="max-w-5xl mx-auto">
                    <div className="md:grid md:grid-cols-12 md:gap-10 items-center">
                        <Reveal className="md:col-span-5">
                            <p className="font-sans uppercase tracking-[0.3em] text-xs text-stone-500">Where</p>
                            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">{wedding.ceremony_venue.split(",")[0]}</h2>
                            <p className="mt-4 font-sans text-stone-600 leading-relaxed">
                                A palace by the lake, where arches open onto still water and the air smells of neem and night jasmine. We can't imagine a more fitting place to say 'I do'.
                            </p>
                            <div className="mt-6 inline-flex items-center gap-2 text-burgundy">
                                <MapPin className="w-4 h-4" />
                                <span className="font-sans text-sm">{wedding.ceremony_venue}</span>
                            </div>
                        </Reveal>
                        <Reveal className="md:col-span-7 mt-8 md:mt-0" delay={120}>
                            <div className="aspect-[4/3] overflow-hidden">
                                <img src={venue1} alt="Venue" className="w-full h-full object-cover" />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-20 sm:py-28 px-6">
                <div className="max-w-5xl mx-auto">
                    <Reveal>
                        <div className="text-center">
                            <p className="font-sans uppercase tracking-[0.3em] text-xs text-stone-500">Moments</p>
                            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Fragments of us</h2>
                        </div>
                    </Reveal>
                    <div className="mt-14 grid grid-cols-12 gap-4">
                        <Reveal className="col-span-12 md:col-span-7">
                            <img src={couple} alt="Couple" className="w-full h-[440px] object-cover grayscale" />
                        </Reveal>
                        <Reveal className="col-span-6 md:col-span-5" delay={60}>
                            <img src={venue2} alt="Venue decor" className="w-full h-[210px] object-cover" />
                        </Reveal>
                        <Reveal className="col-span-6 md:col-span-5" delay={120}>
                            <img src={venue1} alt="Reception" className="w-full h-[210px] object-cover" />
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Signoff */}
            <section className="py-20 sm:py-28 px-6 text-center">
                <p className="font-sans uppercase tracking-[0.3em] text-xs text-stone-500">{wedding.hashtag}</p>
                <h2 className="mt-3 font-serif italic text-4xl sm:text-6xl text-burgundy">
                    With love, {wedding.bride_name} &amp; {wedding.groom_name}
                </h2>
                <p className="mt-8 font-sans text-stone-500 text-sm">
                    Please come prepared to dance until the stars fade.
                </p>
            </section>
        </div>
    );
}
