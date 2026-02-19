"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Play, Film, MessageCircleHeart, ChevronDown, List } from "lucide-react";
import Player from "@/components/Player";
import MovieGallery, { MediaItem } from "@/components/MovieGallery";
import Search from "@/components/Search";
import { cn } from "@/lib/utils";

export default function Home() {
  const [activeMedia, setActiveMedia] = useState<{ id: string; type: "movie" | "tv" }>({
    id: "313369",
    type: "movie",
  });
  const [tvDetails, setTvDetails] = useState<any>(null);
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [episodes, setEpisodes] = useState<any[]>([]);

  const handleSelectMedia = (id: string, type: "movie" | "tv") => {
    setActiveMedia({ id, type });
    setSeason(1);
    setEpisode(1);
    setTvDetails(null);
    setEpisodes([]);
    // Scroll to player smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (activeMedia.type === "tv") {
      fetch(`/api/tv?id=${activeMedia.id}`)
        .then((res) => res.json())
        .then((data) => setTvDetails(data))
        .catch((err) => console.error("Error fetching TV details:", err));
    }
  }, [activeMedia]);

  useEffect(() => {
    if (activeMedia.type === "tv" && activeMedia.id) {
      fetch(`/api/tv?id=${activeMedia.id}&season=${season}`)
        .then((res) => res.json())
        .then((data) => setEpisodes(data.episodes || []))
        .catch((err) => console.error("Error fetching season details:", err));
    }
  }, [activeMedia, season]);

  const [particles, setParticles] = useState<Array<{ id: number; x: string; duration: number; delay: number; size: number }>>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100 + "vw",
        duration: 15 + Math.random() * 10,
        delay: Math.random() * 20,
        size: 20 + Math.random() * 40,
      }))
    );
  }, []);

  return (
    <main className="min-h-screen bg-background selection:bg-primary/20">
      {/* Animated Background Elements - Client Side Only */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: "110vh", x: p.x, opacity: 0 }}
            animate={{
              y: "-10vh",
              opacity: [0, 0.3, 0],
              scale: [0.5, 1, 0.8],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
            className="absolute text-primary/10"
          >
            <Heart size={p.size} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 md:py-16">
        {/* Navigation / Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.location.reload()}
          >
            <h2 className="text-3xl font-bold tracking-tight">
              Adeya<span className="text-gradient">flix</span>
            </h2>
          </motion.div>

          <Search onSelect={handleSelectMedia} />
        </div>

        {/* Hero Section / Player */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-primary/10 mb-6">
              <MessageCircleHeart size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Happy Valentine's Day</span>
            </div>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              A private collection of stories for us. ❤️
            </p>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-4 rounded-[2rem] glass"
            >
              <Player
                tmdbId={activeMedia.id}
                mediaType={activeMedia.type}
                season={season}
                episode={episode}
              />
            </motion.div>

            {/* TV Show Selectors */}
            {activeMedia.type === "tv" && tvDetails && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row items-center gap-4 justify-center"
              >
                <div className="flex items-center gap-2 bg-white/50 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-2 shadow-sm">
                  <List size={18} className="text-primary" />
                  <span className="text-sm font-medium">Season</span>
                  <select
                    value={season}
                    onChange={(e) => {
                      setSeason(parseInt(e.target.value));
                      setEpisode(1);
                    }}
                    className="bg-transparent border-none focus:outline-none text-sm font-bold cursor-pointer"
                  >
                    {tvDetails.seasons?.filter((s: any) => s.season_number > 0).map((s: any) => (
                      <option key={s.id} value={s.season_number}>
                        {s.season_number}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-white/50 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-2 shadow-sm">
                  <Play size={18} className="text-primary" />
                  <span className="text-sm font-medium">Episode</span>
                  <select
                    value={episode}
                    onChange={(e) => setEpisode(parseInt(e.target.value))}
                    className="bg-transparent border-none focus:outline-none text-sm font-bold cursor-pointer max-w-[100px]"
                  >
                    {episodes.map((ep: any) => (
                      <option key={ep.id} value={ep.episode_number}>
                        {ep.episode_number}: {ep.name}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Gallery Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-foreground/80">
              <Film size={24} className="text-primary" />
              Valentine's Classics
            </h2>
          </div>

          <div className="p-8 rounded-[3xl] glass">
            <MovieGallery
              selectedId={activeMedia.id}
              onSelect={handleSelectMedia}
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-32 pb-12 text-center text-foreground/40 text-sm">
          <p>Made with love for you. &copy; 2026</p>
        </footer>
      </div>
    </main>
  );
}
