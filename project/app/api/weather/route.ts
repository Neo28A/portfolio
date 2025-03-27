import { NextResponse } from "next/server";

export const revalidate = 0; // Prevent caching in Next.js

export async function GET() {
    try {
        const apiKey = process.env.WEATHER_API_KEY;
        
        // Debug: Check if API key exists
        if (!apiKey) {
            console.error('Weather API key is missing');
            throw new Error('Weather API key is not configured');
        }

        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Bengaluru&aqi=yes`,
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
            const errorData = await response.json();
            console.error('Weather API error:', errorData);
            throw new Error(`Weather API failed: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Debug: Log successful response
        console.log('Weather data fetched successfully');
        
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
        // Enhanced error logging
        console.error('Weather API error:', error);
        const errMsg = error instanceof Error ? error.message : "Unknown error occurred";
        return NextResponse.json({ error: errMsg }, { status: 500 });
    }
}
