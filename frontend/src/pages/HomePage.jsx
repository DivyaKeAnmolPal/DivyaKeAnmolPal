import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Flourish, Butterfly, HeartDoodle } from "../components/Botanicals";

export default function HomePage() {
    return (
        <div className="min-h-screen paper-bg flex items-center justify-center px-6 relative overflow-hidden">
            <Butterfly className="absolute left-[15%] top-[20%] w-10 animate-flutter opacity-70" />
            <Butterfly className="absolute right-[18%] top-[28%] w-8 animate-flutter opacity-60" style={{ animationDelay: "1.4s" }} />
            <HeartDoodle className="absolute left-[12%] bottom-[20%] w-8 opacity-60" />

            <div className="max-w-xl text-center animate-fade-up relative z-10">
                <div className="watercolor-halo">
                    <img
                        src="/brand/logo.jpeg"
                        alt="Divya & Anmol"
                        className="logo-blend mx-auto w-40 sm:w-52 h-auto select-none"
                    />
                </div>
                <p className="mt-4 font-sans uppercase tracking-[0.4em] text-[10px] sm:text-xs text-maroon">
                    #DivyakeAnmolpal
                </p>
                <h1 className="mt-6 font-serif text-5xl sm:text-7xl leading-none text-ink">
                    A wedding<br />
                    <span className="italic text-maroon">invitation</span>
                </h1>
                <Flourish className="mx-auto mt-6 w-36" />
                <p className="mt-8 font-sans text-stone-700">
                    Each guest receives a personal envelope — sealed with wax, waiting to be opened.
                </p>

                <div className="mt-12 flex flex-col sm:flex-row gap-3 items-center justify-center">
                    <Link
                        to="/invite/our-dearest-friend"
                        className="inline-flex items-center justify-center px-7 h-11 bg-maroon hover:bg-maroon-dark text-bone font-sans uppercase tracking-[0.25em] text-xs transition-colors rounded-sm"
                        data-testid="demo-invite-link"
                    >
                        Open a sample invitation <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    <Link
                        to="/guests"
                        className="inline-flex items-center justify-center px-7 h-11 border border-maroon/40 text-maroon hover:bg-maroon/5 font-sans uppercase tracking-[0.25em] text-xs transition-colors rounded-sm"
                        data-testid="admin-link"
                    >
                        Manage guest list
                    </Link>
                </div>

                <p className="mt-16 font-serif italic text-stone-500 text-sm">
                    27 &amp; 28 · June · 2026 &nbsp;·&nbsp; San Jose, California
                </p>
            </div>
        </div>
    );
}
