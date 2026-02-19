"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Search from "./Search";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

    const handleSelectMedia = (id: string, type: "movie" | "tv") => {
        router.push(`/watch/${type}/${id}`);
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
            >
                <Link href="/">
                    <h2 className="text-3xl font-bold tracking-tight cursor-pointer">
                        Adeya<span className="text-gradient">flix</span>
                    </h2>
                </Link>
            </motion.div>

            <Search onSelect={handleSelectMedia} />
        </div>
    );
}
