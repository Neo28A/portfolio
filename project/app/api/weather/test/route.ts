import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        hasApiKey: !!process.env.WEATHER_API_KEY,
        env: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
} 