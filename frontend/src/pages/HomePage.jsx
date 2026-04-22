import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen paper-bg flex items-center justify-center px-6">
            <div className="max-w-xl text-center animate-fade-up">
                <p className="font-sans uppercase tracking-[0.4em] text-[10px] sm:text-xs text-stone-500">
                    Ananya &amp; Arjun
                </p>
                <h1 className="mt-6 font-serif text-5xl sm:text-7xl leading-none text-ink">
                    A wedding<br />
                    <span className="italic text-burgundy">invitation</span>
                </h1>
                <p className="mt-8 font-sans text-stone-600">
                    Each guest receives a personal envelope — sealed with wax, waiting to be opened.
                </p>

                <div className="mt-12 flex flex-col sm:flex-row gap-3 items-center justify-center">
                    <Link
                        to="/invite/our-dearest-friend"
                        className="inline-flex items-center justify-center px-7 h-11 bg-burgundy hover:bg-burgundy-dark text-bone font-sans uppercase tracking-[0.25em] text-xs transition-colors rounded-sm"
                        data-testid="demo-invite-link"
                    >
                        Open a sample invitation <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    <Link
                        to="/guests"
                        className="inline-flex items-center justify-center px-7 h-11 border border-stone-300 hover:bg-stone-50 font-sans uppercase tracking-[0.25em] text-xs transition-colors rounded-sm"
                        data-testid="admin-link"
                    >
                        Manage guest list
                    </Link>
                </div>

                <p className="mt-16 font-serif italic text-stone-500 text-sm">
                    14 · December · 2026 &nbsp;·&nbsp; Udaipur
                </p>
            </div>
        </div>
    );
}
