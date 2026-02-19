"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface MovieCardProps {
    title: string;
    posterUrl: string;
    tmdbId: string;
    onClick: (id: string) => void;
    isSelected?: boolean;
}

export default function MovieCard({
    title,
    posterUrl,
    tmdbId,
    onClick,
    isSelected,
}: MovieCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "group relative aspect-[2/3] rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-500",
                isSelected ? "ring-4 ring-primary shadow-primary/30" : "hover:shadow-primary/20"
            )}
            onClick={() => onClick(tmdbId)}
        >
            <Image
                src={posterUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 15vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority={isSelected}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-lg leading-tight drop-shadow-md">{title}</h3>
                <div className="flex items-center gap-1.5 mt-2 text-primary">
                    <Heart size={14} fill="currentColor" />
                    <span className="text-[10px] uppercase tracking-wider text-white/80 font-bold">Watch Now</span>
                </div>
            </div>

            {isSelected && (
                <div className="absolute top-4 right-4 bg-primary text-white p-2 rounded-full shadow-lg z-10">
                    <Heart size={16} fill="white" />
                </div>
            )}
        </motion.div>
    );
}
