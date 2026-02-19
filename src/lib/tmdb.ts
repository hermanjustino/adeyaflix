import { config } from "./config";

export async function searchTMDB(query: string) {
    if (!config.tmdbApiKey) {
        console.warn("TMDB_API_KEY is missing");
        return [];
    }

    const res = await fetch(
        `${config.databaseApiUrl}/search/multi?query=${encodeURIComponent(query)}&api_key=${config.tmdbApiKey}`
    );
    const data = await res.json();

    return data.results?.filter((item: any) => item.media_type === "movie" || item.media_type === "tv") || [];
}

export async function getTrending() {
    const res = await fetch(
        `${config.databaseApiUrl}/trending/all/week?api_key=${config.tmdbApiKey}`
    );
    const data = await res.json();
    return data.results || [];
}

export async function getTVDetails(id: string) {
    const res = await fetch(
        `${config.databaseApiUrl}/tv/${id}?api_key=${config.tmdbApiKey}`
    );
    return await res.json();
}

export async function getSeasonDetails(tvId: string, seasonNumber: number) {
    const res = await fetch(
        `${config.databaseApiUrl}/tv/${tvId}/season/${seasonNumber}?api_key=${config.tmdbApiKey}`
    );
    return await res.json();
}
