"use client";

import React from "react";
import MovieCard from "./MovieCard";

export interface MediaItem {
    id: string;
    title: string;
    poster: string;
    type: "movie" | "tv";
}

const STATIC_ROMANTIC_MOVIES: MediaItem[] = [
    {
        id: "313369",
        title: "La La Land",
        poster: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
        type: "movie",
    },
    {
        id: "597",
        title: "Titanic",
        poster: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
        type: "movie",
    },
    {
        id: "11036",
        title: "The Notebook",
        poster: "https://image.tmdb.org/t/p/w500/qZ3Jg6uD9hX43iL7uS1I7mYy3x.jpg",
        type: "movie",
    },
    {
        id: "122906",
        title: "About Time",
        poster: "https://image.tmdb.org/t/p/w500/i9pD7XfXzP3Z9oA5F9k6J2o4X8j.jpg",
        type: "movie",
    },
    {
        id: "4348",
        title: "Pride & Prejudice",
        poster: "https://image.tmdb.org/t/p/w500/7J976696o7v48vO8S695vU2asAn.jpg",
        type: "movie",
    },
    {
        id: "19404",
        title: "Dilwale Dulhania Le Jayenge",
        poster: "https://image.tmdb.org/t/p/w500/2CAL2936mb67p2Xux9O149711p7.jpg",
        type: "movie",
    },
    {
        id: "1399",
        title: "Game of Thrones",
        poster: "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
        type: "tv",
    }
];

interface MovieGalleryProps {
    onSelect: (id: string, type: "movie" | "tv") => void;
    selectedId: string;
    searchResults?: MediaItem[];
}

export default function MovieGallery({ onSelect, selectedId, searchResults }: MovieGalleryProps) {
    const displayItems = searchResults && searchResults.length > 0 ? searchResults : STATIC_ROMANTIC_MOVIES;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 transition-all duration-500">
            {displayItems.map((item) => (
                <MovieCard
                    key={item.id}
                    tmdbId={item.id}
                    title={item.title}
                    posterUrl={item.poster}
                    onClick={() => onSelect(item.id, item.type)}
                    isSelected={selectedId === item.id}
                />
            ))}
        </div>
    );
}
