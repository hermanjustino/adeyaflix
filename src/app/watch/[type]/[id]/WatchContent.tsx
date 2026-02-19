"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleHeart, Play, List, Calendar, Star, Clock } from "lucide-react";
import Player from "@/components/Player";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import { cn } from "@/lib/utils";

interface WatchContentProps {
    initialData: any;
    type: "movie" | "tv";
    id: string;
}

export default function WatchContent({ initialData, type, id }: WatchContentProps) {
    const [season, setSeason] = useState(1);
    const [episode, setEpisode] = useState(1);
    const [episodes, setEpisodes] = useState<any[]>([]);
    const [isTVDetailsLoading, setIsTVDetailsLoading] = useState(false);

    useEffect(() => {
        if (type === "tv") {
            setIsTVDetailsLoading(true);
            fetch(`/api/tv?id=${id}&season=${season}`)
                .then((res) => res.json())
                .then((data) => setEpisodes(data.episodes || []))
                .catch((err) => console.error("Error fetching season details:", err))
                .finally(() => setIsTVDetailsLoading(false));
        }
    }, [type, id, season]);

    const details = initialData;
    const releaseDate = details.release_date || details.first_air_date;
    const rating = details.vote_average?.toFixed(1);
    const runtime = details.runtime || (details.episode_run_time && details.episode_run_time[0]);

    return (
        <main className="min-h-screen bg-background selection:bg-primary/20 pb-20">
            <AnimatedBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                <Header />

                {/* Media Info Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
                    {/* Left Column: Info */}
                    <div className="lg:col-span-4 space-y-8 order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                                    {details.title || details.name}
                                </h1>
                                {details.tagline && (
                                    <p className="text-xl text-primary font-medium italic opacity-80">
                                        "{details.tagline}"
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-4 items-center text-sm font-medium text-foreground/60">
                                <div className="flex items-center gap-1.5 bg-white/50 px-3 py-1 rounded-full border border-white/20">
                                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                    <span>{rating}</span>
                                </div>
                                {releaseDate && (
                                    <div className="flex items-center gap-1.5 bg-white/50 px-3 py-1 rounded-full border border-white/20">
                                        <Calendar size={14} />
                                        <span>{new Date(releaseDate).getFullYear()}</span>
                                    </div>
                                )}
                                {runtime && (
                                    <div className="flex items-center gap-1.5 bg-white/50 px-3 py-1 rounded-full border border-white/20">
                                        <Clock size={14} />
                                        <span>{runtime} min</span>
                                    </div>
                                )}
                                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/10 uppercase tracking-wider text-[10px] font-bold">
                                    {type === "movie" ? "Movie" : "TV Series"}
                                </div>
                            </div>

                            <p className="text-lg text-foreground/70 leading-relaxed font-light">
                                {details.overview}
                            </p>

                            {/* TV Selectors (Mobile optimized version for left col) */}
                            {type === "tv" && (
                                <div className="space-y-4 pt-4">
                                    <div className="bg-white/30 backdrop-blur-xl border border-white/20 rounded-3xl p-6 space-y-6 shadow-xl">
                                        <div className="flex items-center gap-3 text-primary mb-2">
                                            <List size={20} />
                                            <span className="font-bold">Select Episode</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 ml-1">Season</label>
                                                <select
                                                    value={season}
                                                    onChange={(e) => {
                                                        setSeason(parseInt(e.target.value));
                                                        setEpisode(1);
                                                    }}
                                                    className="w-full bg-white/50 border border-white/20 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                                >
                                                    {details.seasons?.filter((s: any) => s.season_number > 0).map((s: any) => (
                                                        <option key={s.id} value={s.season_number}>
                                                            Season {s.season_number}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 ml-1">Episode</label>
                                                <select
                                                    value={episode}
                                                    onChange={(e) => setEpisode(parseInt(e.target.value))}
                                                    className="w-full bg-white/50 border border-white/20 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                                >
                                                    {episodes.map((ep: any) => (
                                                        <option key={ep.id} value={ep.episode_number}>
                                                            Ep {ep.episode_number}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Right Column: Player */}
                    <div className="lg:col-span-8 order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div className="p-4 rounded-[2.5rem] glass shadow-2xl relative overflow-hidden group">
                                <Player
                                    tmdbId={id}
                                    mediaType={type}
                                    season={season}
                                    episode={episode}
                                    className="rounded-[2rem]"
                                />
                            </div>

                            {/* Episode Name Display for TV */}
                            {type === "tv" && episodes.length > 0 && (
                                <div className="text-center px-4">
                                    <h3 className="text-2xl font-bold text-foreground/80">
                                        S{season} E{episode}: {episodes.find(e => e.episode_number === episode)?.name}
                                    </h3>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}
