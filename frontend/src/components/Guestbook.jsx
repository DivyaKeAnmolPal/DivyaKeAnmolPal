import { useEffect, useState, useRef } from "react";
import { Heart, Send, ImagePlus, X } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { listGuestbook, createGuestbookEntry, fileUrl } from "../lib/api";
import { LeafBadge } from "./Botanicals";

function timeAgo(iso) {
    const t = new Date(iso).getTime();
    const m = Math.max(1, Math.floor((Date.now() - t) / 60000));
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function Guestbook() {
    const [entries, setEntries] = useState([]);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const fileRef = useRef(null);

    const reload = async () => {
        try { setEntries(await listGuestbook()); } catch { /* ignore */ }
    };
    useEffect(() => { reload(); }, []);

    const onFile = (e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        if (f.size > 8 * 1024 * 1024) { toast.error("Image too large (8MB max)"); return; }
        setPhoto(f);
        const url = URL.createObjectURL(f);
        setPreview(url);
    };

    const clearPhoto = () => {
        setPhoto(null);
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
        if (fileRef.current) fileRef.current.value = "";
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) return;
        setSubmitting(true);
        try {
            await createGuestbookEntry({ name: name.trim(), message: message.trim(), photo });
            toast.success("Thank you for your wishes");
            setName(""); setMessage("");
            clearPhoto();
            reload();
        } catch (err) {
            toast.error("Could not post — please try again");
        } finally { setSubmitting(false); }
    };

    return (
        <section className="py-20 sm:py-28 px-6 linen-bg" data-testid="guestbook-section">
            <div className="max-w-4xl mx-auto">
                <div className="text-center">
                    <p className="font-sans uppercase tracking-[0.4em] text-[10px] sm:text-xs text-sage">Guestbook</p>
                    <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-ink">
                        Leave us a wish
                    </h2>
                    <p className="mt-4 font-serif italic text-stone-600 max-w-md mx-auto">
                        A note, a memory, a photograph — anything you'd like us to keep forever.
                    </p>
                </div>

                <form onSubmit={onSubmit} className="mt-12 frame bg-bone p-6 sm:p-10" data-testid="guestbook-form">
                    <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                            <label className="font-sans uppercase tracking-[0.25em] text-[10px] text-sage">Your name</label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Asha"
                                className="mt-2 h-11 rounded-sm font-serif text-lg"
                                data-testid="guestbook-name-input"
                            />
                        </div>
                        <div className="flex items-end">
                            {preview ? (
                                <div className="relative w-full h-11 flex items-center gap-3">
                                    <img src={preview} alt="preview" className="h-11 w-11 object-cover border border-sage/40" />
                                    <span className="font-sans text-xs text-stone-600 truncate flex-1">Photo attached</span>
                                    <button type="button" onClick={clearPhoto} className="text-stone-500 hover:text-terracotta" aria-label="Remove photo">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <label className="inline-flex items-center gap-2 h-11 px-4 border border-dashed border-sage/50 cursor-pointer hover:bg-sage/5 transition-colors w-full font-sans text-xs uppercase tracking-[0.2em] text-sage">
                                    <ImagePlus className="w-4 h-4" /> Add a photo (optional)
                                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} data-testid="guestbook-photo-input" />
                                </label>
                            )}
                        </div>
                    </div>
                    <div className="mt-5">
                        <label className="font-sans uppercase tracking-[0.25em] text-[10px] text-sage">Your message</label>
                        <Textarea
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Wishing you a lifetime of love…"
                            className="mt-2 rounded-sm font-serif text-base"
                            data-testid="guestbook-message-input"
                        />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <Button
                            type="submit"
                            disabled={submitting || !name.trim() || !message.trim()}
                            className="bg-sage hover:bg-sage-dark text-bone rounded-sm uppercase tracking-[0.25em] text-xs h-11 px-7"
                            data-testid="guestbook-submit"
                        >
                            <Send className="w-4 h-4 mr-2" /> Send wishes
                        </Button>
                    </div>
                </form>

                <div className="mt-14 grid md:grid-cols-2 gap-5">
                    {entries.length === 0 ? (
                        <p className="md:col-span-2 text-center font-serif italic text-stone-500">
                            Be the first to leave a wish.
                        </p>
                    ) : entries.map((e, i) => (
                        <article
                            key={e.id}
                            className="bg-bone border border-sage/20 p-6 relative"
                            data-testid={`guestbook-entry-${i}`}
                        >
                            <LeafBadge className="absolute -top-3 -right-3 w-9 h-9 bg-bone p-1" />
                            {e.photo_path && (
                                <img
                                    src={fileUrl(e.photo_path)}
                                    alt="Guest"
                                    loading="lazy"
                                    className="w-full h-56 object-cover mb-4"
                                />
                            )}
                            <p className="font-serif italic text-stone-700 leading-relaxed text-lg">"{e.message}"</p>
                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Heart className="w-3.5 h-3.5 text-terracotta" />
                                    <span className="font-sans uppercase tracking-[0.25em] text-[11px] text-sage">{e.name}</span>
                                </div>
                                <span className="font-sans text-[10px] text-stone-400">{timeAgo(e.created_at)}</span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
