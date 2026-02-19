"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface PlayerProps {
    tmdbId: string;
    mediaType: "movie" | "tv";
    season?: number;
    episode?: number;
    className?: string;
}

export default function Player({
    tmdbId,
    mediaType,
    season = 1,
    episode = 1,
    className,
}: PlayerProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeServer, setActiveServer] = useState<"vidking" | "vidsrc_to" | "vidsrc_me">("vidking");

    useEffect(() => {
        setIsLoaded(false);
    }, [tmdbId, season, episode, activeServer]);

    const servers = {
        vidking: mediaType === "movie"
            ? `https://www.vidking.net/embed/movie/${tmdbId}?color=fb7185&autoPlay=true`
            : `https://www.vidking.net/embed/tv/${tmdbId}/${season}/${episode}?color=fb7185&autoPlay=true`,
        vidsrc_to: mediaType === "movie"
            ? `https://vidsrc.to/embed/movie/${tmdbId}`
            : `https://vidsrc.to/embed/tv/${tmdbId}/${season}/${episode}`,
        vidsrc_me: mediaType === "movie"
            ? `https://vidsrc.me/embed/movie?tmdb=${tmdbId}`
            : `https://vidsrc.me/embed/tv?tmdb=${tmdbId}&s=${season}&e=${episode}`,
    };

    return (
        <div className="space-y-4">
            <div className={cn("relative w-full aspect-video rounded-3xl overflow-hidden glass shadow-2xl transition-all duration-700", !isLoaded && "animate-pulse bg-secondary/20", className)}>
                <iframe
                    src={servers[activeServer]}
                    className={cn("w-full h-full border-none transition-opacity duration-1000", isLoaded ? "opacity-100" : "opacity-0")}
                    allowFullScreen
                    // Added allow-popups for better subtitle setting compatibility
                    sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-popups"
                    onLoad={() => setIsLoaded(true)}
                />
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-primary font-medium animate-bounce">Getting your movie ready... ❤️</div>
                    </div>
                )}
            </div>

            {/* Server Selector */}
            <div className="flex flex-wrap justify-center gap-2">
                <p className="w-full text-center text-[10px] uppercase tracking-widest text-foreground/40 font-bold mb-1">
                    Something wrong? Switch Server (fixes subtitles/loading)
                </p>
                {(Object.keys(servers) as Array<keyof typeof servers>).map((server) => (
                    <button
                        key={server}
                        onClick={() => setActiveServer(server)}
                        className={cn(
                            "px-4 py-2 rounded-full text-xs font-bold transition-all border",
                            activeServer === server
                                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                : "bg-white/50 text-foreground/60 border-white/20 hover:bg-white/80"
                        )}
                    >
                        {server === "vidking" ? "Main Server" : server === "vidsrc_to" ? "Server 2 (Fast)" : "Server 3 (Multi-Sub)"}
                    </button>
                ))}
            </div>
        </div>
    );
}
