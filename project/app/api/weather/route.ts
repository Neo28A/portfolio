import { NextResponse } from "next/server";

export const revalidate = 0; // Prevent caching in Next.js

export async function GET() {
    // Log to verify the API key is available
    if (!process.env.WEATHER_API_KEY) {
        console.error("Weather API key is missing");
        return NextResponse.json(
            { error: "Weather API key not configured" },
            { status: 500 }
        );
    }

    try {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=Bengaluru&days=2&aqi=yes`;
        console.log("Fetching weather from:", url.replace(process.env.WEATHER_API_KEY!, 'HIDDEN_KEY'));

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 0 }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Weather API error response:", errorText);
            throw new Error(`Weather API failed with status ${response.status}`);
        }

        const data = await response.json();

        // Validate the required fields exist
        if (!data.current || !data.location || !data.forecast) {
            console.error("Invalid weather data structure:", data);
            throw new Error("Invalid weather data received");
        }

        const weatherData = {
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
            air_quality: data.current.air_quality || {
                co: 0,
                no2: 0,
                o3: 0,
                pm2_5: 0,
                pm10: 0,
            },
        };

        return NextResponse.json(weatherData);

    } catch (error) {
        console.error('Weather API Error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to fetch weather data" },
            { status: 500 }
        );
    }
}
