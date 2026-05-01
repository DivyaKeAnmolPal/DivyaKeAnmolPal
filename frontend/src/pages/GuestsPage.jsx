import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Trash2, Plus, ArrowRight, Check } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";
import { listGuests, createGuest, deleteGuest } from "../lib/api";

export default function GuestsPage() {
    const [guests, setGuests] = useState([]);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [copiedSlug, setCopiedSlug] = useState(null);

    const reload = async () => {
        setLoading(true);
        try {
            const data = await listGuests();
            setGuests(data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { reload(); }, []);

    const onAdd = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        setSubmitting(true);
        try {
            await createGuest(name.trim(), message.trim() || null);
            setName("");
            setMessage("");
            toast.success("Invitation added");
            await reload();
        } catch (err) {
            toast.error("Could not add guest");
        } finally {
            setSubmitting(false);
        }
    };

    const urlFor = (slug) => `${window.location.origin}/invite/${slug}`;

    const copyLink = async (slug) => {
        try {
            await navigator.clipboard.writeText(urlFor(slug));
            setCopiedSlug(slug);
            toast.success("Link copied");
            setTimeout(() => setCopiedSlug(null), 1500);
        } catch {
            toast.error("Copy failed");
        }
    };

    const onDelete = async (slug) => {
        await deleteGuest(slug);
        toast.success("Removed");
        reload();
    };

    return (
        <div className="paper-bg min-h-screen" data-testid="admin-guest-list">
            <div className="max-w-4xl mx-auto px-6 py-16 sm:py-20">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-sans uppercase tracking-[0.3em] text-[10px] sm:text-xs text-stone-500">Private · Admin</p>
                        <h1 className="mt-2 font-serif text-4xl sm:text-5xl">The guest list</h1>
                        <p className="mt-3 font-sans text-stone-600 max-w-xl">
                            Add each guest by name. We'll generate a personal envelope with their name embossed on it.
                        </p>
                    </div>
                    <Link
                        to="/"
                        className="hidden sm:inline-flex items-center gap-2 font-sans uppercase tracking-[0.25em] text-xs text-stone-600 hover:text-maroon transition-colors"
                        data-testid="back-home-link"
                    >
                        Home <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                <form onSubmit={onAdd} className="mt-10 bg-white border border-stone-200 p-6 sm:p-8">
                    <label className="font-sans uppercase tracking-[0.25em] text-[10px] text-stone-500">Guest name</label>
                    <Input
                        className="mt-2 h-12 rounded-sm font-serif text-lg"
                        placeholder="e.g. Priya Iyer"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        data-testid="add-guest-input"
                    />

                    <label className="mt-5 block font-sans uppercase tracking-[0.25em] text-[10px] text-stone-500">Personal note (optional)</label>
                    <Textarea
                        className="mt-2 rounded-sm font-serif"
                        rows={2}
                        placeholder="A short, sweet line just for them…"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        data-testid="add-guest-message"
                    />

                    <div className="mt-5 flex justify-end">
                        <Button
                            type="submit"
                            disabled={submitting || !name.trim()}
                            className="bg-maroon hover:bg-maroon-dark text-bone rounded-sm uppercase tracking-[0.25em] text-xs h-11 px-6"
                            data-testid="add-guest-submit"
                        >
                            <Plus className="w-4 h-4 mr-2" /> Create invitation
                        </Button>
                    </div>
                </form>

                <div className="mt-12">
                    <div className="flex items-baseline justify-between">
                        <h2 className="font-serif text-2xl sm:text-3xl">Invited</h2>
                        <span className="font-sans text-xs uppercase tracking-[0.25em] text-stone-500">
                            {guests.length} {guests.length === 1 ? "guest" : "guests"}
                        </span>
                    </div>

                    {loading ? (
                        <p className="mt-6 font-serif italic text-stone-500">Loading…</p>
                    ) : guests.length === 0 ? (
                        <div className="mt-6 border border-dashed border-stone-300 p-10 text-center">
                            <p className="font-serif italic text-stone-500">No invitations yet. Add your first guest above.</p>
                        </div>
                    ) : (
                        <ul className="mt-6 divide-y divide-stone-200 border border-stone-200 bg-white">
                            {guests.map((g) => (
                                <li
                                    key={g.slug}
                                    className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-5"
                                    data-testid={`guest-row-${g.slug}`}
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="font-serif text-xl text-ink truncate">{g.name}</div>
                                        <a
                                            href={urlFor(g.slug)}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="font-sans text-xs text-stone-500 hover:text-maroon truncate block"
                                        >
                                            /invite/{g.slug}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="rounded-sm uppercase tracking-[0.2em] text-[10px] h-9"
                                            onClick={() => copyLink(g.slug)}
                                            data-testid={`copy-link-button-${g.slug}`}
                                        >
                                            {copiedSlug === g.slug ? (
                                                <><Check className="w-3.5 h-3.5 mr-1.5" /> Copied</>
                                            ) : (
                                                <><Copy className="w-3.5 h-3.5 mr-1.5" /> Copy link</>
                                            )}
                                        </Button>
                                        <Link
                                            to={`/invite/${g.slug}`}
                                            className="inline-flex items-center h-9 px-3 border border-stone-200 rounded-sm font-sans uppercase tracking-[0.2em] text-[10px] hover:bg-stone-50"
                                            data-testid={`preview-link-${g.slug}`}
                                        >
                                            Preview
                                        </Link>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            className="rounded-sm h-9 w-9 p-0 text-stone-500 hover:text-maroon"
                                            onClick={() => onDelete(g.slug)}
                                            aria-label="Delete guest"
                                            data-testid={`delete-guest-${g.slug}`}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
