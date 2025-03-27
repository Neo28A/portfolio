import { NextResponse } from "next/server";

export const revalidate = 0; // Prevent caching in Next.js

export async function GET() {
    if (!process.env.WEATHER_API_KEY) {
        return NextResponse.json(
            { error: "Weather API key not configured" },
            { status: 500 }
        );
    }

    try {
        // Fetch both current weather and forecast
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=Bengaluru&days=2&aqi=yes`,
            {
                cache: "no-store",
                headers: {
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Weather API request failed");
        }

        const data = await response.json();

        // Format the response with current weather and forecast
        return NextResponse.json({
            current: {
                temp_c: data.current.temp_c,
                temp_f: data.current.temp_f,
                condition: data.current.condition.text,
                icon: `https:${data.current.condition.icon}`,
                feelslike_c: data.current.feelslike_c,
                humidity: data.current.humidity,
                wind_kph: data.current.wind_kph,
                wind_dir: data.current.wind_dir,
                pressure_mb: data.current.pressure_mb,
                precip_mm: data.current.precip_mm,
                cloud: data.current.cloud,
                uv: data.current.uv,
                last_updated: data.current.last_updated,
            },
            location: {
                name: data.location.name,
                region: data.location.region,
                country: data.location.country,
                localtime: data.location.localtime,
            },
            forecast: data.forecast.forecastday.map((day: any) => ({
                date: day.date,
                max_temp_c: day.day.maxtemp_c,
                min_temp_c: day.day.mintemp_c,
                condition: day.day.condition.text,
                icon: `https:${day.day.condition.icon}`,
                sunrise: day.astro.sunrise,
                sunset: day.astro.sunset,
                moonrise: day.astro.moonrise,
                moonset: day.astro.moonset,
                moon_phase: day.astro.moon_phase,
            })),
            air_quality: data.current.air_quality,
        });

    } catch (error) {
        console.error('Weather API Error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to fetch weather data" },
            { status: 500 }
        );
    }
}
