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

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // Handle progress events from Vidking
            if (typeof event.data === "string") {
                try {
                    const data = JSON.parse(event.data);
                    if (data.type === "PLAYER_EVENT") {
                        console.log("Player Event:", data.data);
                    }
                } catch (e) {
                    // Ignore non-JSON messages
                }
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    const baseUrl = "https://www.vidking.net/embed";
    const color = "fb7185"; // Rose 400

    const src = mediaType === "movie"
        ? `${baseUrl}/movie/${tmdbId}?color=${color}&autoPlay=true`
        : `${baseUrl}/tv/${tmdbId}/${season}/${episode}?color=${color}&autoPlay=true&nextEpisode=true&episodeSelector=true`;

    return (
        <div className={cn("relative w-full aspect-video rounded-3xl overflow-hidden glass shadow-2xl transition-all duration-700", !isLoaded && "animate-pulse bg-secondary/20", className)}>
            <iframe
                src={src}
                className={cn("w-full h-full border-none transition-opacity duration-1000", isLoaded ? "opacity-100" : "opacity-0")}
                allowFullScreen
                // Hardening against ads using sandbox
                sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                onLoad={() => setIsLoaded(true)}
            />
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-primary font-medium">Getting your movie ready... ❤️</div>
                </div>
            )}
        </div>
    );
}
