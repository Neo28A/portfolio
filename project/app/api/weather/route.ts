import { NextResponse } from "next/server";

export const revalidate = 0; // Prevent caching in Next.js

export async function GET() {
    try {
        // Enhanced API call with more parameters
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=Bengaluru&aqi=yes`,
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
        
        // Return enhanced weather data
        return NextResponse.json({
            temp: data.current.temp_c,
            feels_like: data.current.feelslike_c,
            condition: data.current.condition.text,
            is_day: data.current.is_day,
            icon: `https:${data.current.condition.icon}`,
            humidity: data.current.humidity,
            wind_kph: data.current.wind_kph,
            wind_dir: data.current.wind_dir,
            pressure_mb: data.current.pressure_mb,
            precip_mm: data.current.precip_mm,
            cloud: data.current.cloud,
            uv: data.current.uv,
            last_updated: data.current.last_updated
        });

    } catch (error) {
        const errMsg = error instanceof Error ? error.message : "Unknown error occurred";
        return NextResponse.json({ error: errMsg }, { status: 500 });
    }
}
