"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function AnimatedBackground() {
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
    );
}
