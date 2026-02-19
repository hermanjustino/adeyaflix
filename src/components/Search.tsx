"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface SearchResult {
    id: number;
    title?: string;
    name?: string;
    poster_path: string;
    media_type: "movie" | "tv";
}

interface SearchProps {
    onSelect: (id: string, type: "movie" | "tv") => void;
    className?: string;
}

export default function Search({ onSelect, className }: SearchProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = async (val: string) => {
        setQuery(val);
        if (val.length < 2) {
            setResults([]);
            return;
        }

        setIsLoading(true);
        setIsOpen(true);
        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(val)}`);
            const data = await res.json();
            setResults(data.results || []);
        } catch (e) {
            console.error("Search error:", e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div ref={searchRef} className={cn("relative w-full max-w-xl mx-auto z-50", className)}>
            <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <SearchIcon size={18} className="text-foreground/40 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search for a movie or show..."
                    className="w-full bg-white/50 backdrop-blur-xl border border-white/20 rounded-2xl py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white/80 transition-all text-foreground placeholder:text-foreground/30 shadow-lg"
                />
                {query && (
                    <button
                        onClick={() => { setQuery(""); setResults([]); }}
                        className="absolute inset-y-0 right-4 flex items-center text-foreground/40 hover:text-primary transition-colors"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            <AnimatePresence>
                {isOpen && (results.length > 0 || isLoading) && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute mt-2 w-full glass rounded-2xl overflow-hidden shadow-2xl border border-white/20 max-h-[400px] overflow-y-auto"
                    >
                        {isLoading ? (
                            <div className="p-8 flex justify-center">
                                <Loader2 className="animate-spin text-primary" />
                            </div>
                        ) : (
                            <div className="p-2 space-y-1">
                                {results.map((result) => (
                                    <button
                                        key={result.id}
                                        onClick={() => {
                                            onSelect(result.id.toString(), result.media_type);
                                            setIsOpen(false);
                                            setQuery("");
                                        }}
                                        className="w-full flex items-center gap-4 p-2 rounded-xl hover:bg-primary/10 transition-colors text-left group"
                                    >
                                        <div className="w-12 h-18 rounded-lg overflow-hidden flex-shrink-0 bg-secondary/20">
                                            {result.poster_path ? (
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-foreground/20 italic text-[10px]">No img</div>
                                            )}
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <div className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                                                {result.title || result.name}
                                            </div>
                                            <div className="text-xs text-foreground/40 capitalize">
                                                {result.media_type === "movie" ? "Movie" : "TV Show"}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
