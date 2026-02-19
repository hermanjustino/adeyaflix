import { NextRequest, NextResponse } from "next/server";
import { getTVDetails, getSeasonDetails } from "@/lib/tmdb";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const season = searchParams.get("season");

    if (!id) {
        return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    try {
        if (season) {
            const data = await getSeasonDetails(id, parseInt(season));
            return NextResponse.json(data);
        } else {
            const data = await getTVDetails(id);
            return NextResponse.json(data);
        }
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch TV details" }, { status: 500 });
    }
}
