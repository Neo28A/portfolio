import { NextResponse } from "next/server";

export const revalidate = 0; // Prevent caching in Next.js

export async function GET() {
    try {
        const apiKey = process.env.WEATHER_API_KEY;
        
        // More detailed API key check
        if (!apiKey) {
            console.error('[Weather API] API key is missing in environment variables');
            return NextResponse.json({ 
                error: 'API key not configured', 
                env: process.env.NODE_ENV 
            }, { status: 500 });
        }

        console.log('[Weather API] Fetching weather data...');
        
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Bengaluru&aqi=yes`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Cache-Control': 'no-cache'
            },
        });

        // Log the response status
        console.log('[Weather API] Response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[Weather API] Error response:', errorText);
            return NextResponse.json({ 
                error: `API request failed: ${response.status}`,
                details: errorText
            }, { status: response.status });
        }

        const data = await response.json();
        
        // Validate the response data
        if (!data?.current) {
            console.error('[Weather API] Invalid response data:', data);
            return NextResponse.json({ 
                error: 'Invalid response data',
                details: data
            }, { status: 500 });
        }

        console.log('[Weather API] Successfully fetched weather data');

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
        console.error('[Weather API] Unexpected error:', error);
        return NextResponse.json({ 
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        }, { status: 500 });
    }
}
