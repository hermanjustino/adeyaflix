"use client";

import React from "react";
import { motion } from "framer-motion";
import { Film, MessageCircleHeart } from "lucide-react";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import MovieGallery from "@/components/MovieGallery";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20">
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 md:py-16">
        <Header />

        {/* Hero Section */}
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
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
              Adeya<span className="text-gradient">flix</span>
            </h1>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
              A private collection of stories curated with love. ❤️<br />
              Find your next favorite movie or show together.
            </p>
          </motion.div>
        </section>

        {/* Gallery Section */}
        <section className="space-y-12">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold flex items-center gap-3 text-foreground/80">
              <Film size={28} className="text-primary" />
              Valentine's Classics
            </h2>
          </div>

          <div className="p-8 rounded-[3.5rem] glass shadow-2xl">
            <MovieGallery
              selectedId=""
              onSelect={(id, type) => {
                // Navigate to watch page
                window.location.href = `/watch/${type}/${id}`;
              }}
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
