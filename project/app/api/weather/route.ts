import { NextResponse } from "next/server";

export const revalidate = 0; // Prevent caching in Next.js

export async function GET() {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=Bengaluru&aqi=no`,
            {
                cache: "no-store",
                headers: {
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    Pragma: "no-cache",
                    Expires: "0",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        return NextResponse.json({
            temp: data.current.temp_c,
            condition: data.current.condition.text,
            icon: `https:${data.current.condition.icon}`, // Ensure icon URL is correct
        });

    } catch (error) {
        const errMsg = error instanceof Error ? error.message : "Unknown error occurred";
        return NextResponse.json({ error: errMsg }, { status: 500 });
    }
}
