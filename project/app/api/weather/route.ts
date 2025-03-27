import { NextResponse } from "next/server";

export const revalidate = 0; // Prevent caching in Next.js

export async function GET() {
    // Add more detailed logging for production debugging
    const apiKey = process.env.WEATHER_API_KEY;
    
    if (!apiKey) {
        console.error("[Weather API] API key is missing in environment variables");
        return NextResponse.json(
            { error: "Configuration error", details: "API key not found" },
            { status: 500 }
        );
    }

    try {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Bengaluru&days=2&aqi=yes`;
        
        // Log the request (without exposing the API key)
        console.log("[Weather API] Requesting weather data for Bengaluru");

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        // Log the response status
        console.log(`[Weather API] Response status: ${response.status}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("[Weather API] Error response:", errorText);
            return NextResponse.json(
                { 
                    error: "API request failed", 
                    status: response.status,
                    details: errorText
                },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Validate the response data
        if (!data.current || !data.location || !data.forecast) {
            console.error("[Weather API] Invalid data structure:", JSON.stringify(data));
            return NextResponse.json(
                { error: "Invalid data", details: "Missing required fields" },
                { status: 500 }
            );
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

        console.log("[Weather API] Successfully fetched weather data");
        return NextResponse.json(weatherData);

    } catch (error) {
        console.error('[Weather API] Error:', error);
        return NextResponse.json(
            { 
                error: "Server error",
                details: error instanceof Error ? error.message : "Unknown error occurred"
            },
            { status: 500 }
        );
    }
}
