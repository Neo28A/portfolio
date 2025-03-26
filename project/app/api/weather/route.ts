import { NextResponse } from "next/server";

export const revalidate = 0; // Prevent caching

export async function GET() {
    try {
        const lat = "12.9716"; // Bengaluru latitude
        const lon = "77.5946"; // Bengaluru longitude

        if (!process.env.OPENWEATHER_API_KEY) {
            throw new Error("Missing API key in environment variables");
        }

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}&t=${Date.now()}`,
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
            temp: Math.round(data.main.temp),
            condition: data.weather[0].main, // e.g., "Clouds"
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`, // Dark mode-friendly icons
        });

    } catch (error) {
        const errMsg = error instanceof Error ? error.message : "Unknown error occurred";
        return NextResponse.json({ error: errMsg }, { status: 500 });
    }
}
