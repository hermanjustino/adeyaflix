import React from "react";
import { getMovieDetails, getTVDetails } from "@/lib/tmdb";
import WatchContent from "./WatchContent";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{
        type: string;
        id: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { type, id } = await params;
    const details = type === "movie" ? await getMovieDetails(id) : await getTVDetails(id);

    return {
        title: `${details.title || details.name} | Adeyaflix`,
        description: details.overview,
    };
}

export default async function WatchPage({ params }: PageProps) {
    const { type, id } = await params;

    const details = type === "movie" ? await getMovieDetails(id) : await getTVDetails(id);

    return (
        <WatchContent
            initialData={details}
            type={type as "movie" | "tv"}
            id={id}
        />
    );
}
