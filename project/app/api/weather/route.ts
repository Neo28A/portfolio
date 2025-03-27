import { NextResponse } from "next/server";

export const revalidate = 0; // Prevent caching in Next.js

// Add CORS headers
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
    const apiKey = process.env.WEATHER_API_KEY;
    
    if (!apiKey) {
        console.error("[Weather API] API key is missing");
        return new NextResponse(
            JSON.stringify({ error: "API key not configured" }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    ...corsHeaders
                }
            }
        );
    }

    try {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Bengaluru&days=2&aqi=yes`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 0 },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("[Weather API] Error:", {
                status: response.status,
                statusText: response.statusText,
                error: errorText
            });
            
            return new NextResponse(
                JSON.stringify({ 
                    error: "Weather API request failed",
                    status: response.status,
                    details: errorText
                }),
                {
                    status: response.status,
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders
                    }
                }
            );
        }

        const data = await response.json();

        // Validate essential data
        if (!data?.current?.condition?.icon) {
            throw new Error("Invalid weather data structure");
        }

        const weatherData = {
            current: {
                temp_c: data.current.temp_c || 0,
                temp_f: data.current.temp_f || 0,
                condition: data.current.condition.text || "Unknown",
                icon: `https:${data.current.condition.icon}`,
                feelslike_c: data.current.feelslike_c || 0,
                humidity: data.current.humidity || 0,
                wind_kph: data.current.wind_kph || 0,
                wind_dir: data.current.wind_dir || "N/A",
                pressure_mb: data.current.pressure_mb || 0,
                precip_mm: data.current.precip_mm || 0,
                cloud: data.current.cloud || 0,
                uv: data.current.uv || 0,
                last_updated: data.current.last_updated || new Date().toISOString(),
            },
            location: {
                name: data.location?.name || "Bengaluru",
                region: data.location?.region || "",
                country: data.location?.country || "India",
                localtime: data.location?.localtime || new Date().toISOString(),
            },
            forecast: (data.forecast?.forecastday || []).map((day: any) => ({
                date: day.date,
                max_temp_c: day.day?.maxtemp_c || 0,
                min_temp_c: day.day?.mintemp_c || 0,
                condition: day.day?.condition?.text || "Unknown",
                icon: `https:${day.day?.condition?.icon || data.current.condition.icon}`,
                sunrise: day.astro?.sunrise || "N/A",
                sunset: day.astro?.sunset || "N/A",
                moonrise: day.astro?.moonrise || "N/A",
                moonset: day.astro?.moonset || "N/A",
                moon_phase: day.astro?.moon_phase || "N/A",
            })),
            air_quality: {
                co: data.current?.air_quality?.co || 0,
                no2: data.current?.air_quality?.no2 || 0,
                o3: data.current?.air_quality?.o3 || 0,
                pm2_5: data.current?.air_quality?.pm2_5 || 0,
                pm10: data.current?.air_quality?.pm10 || 0,
            },
        };

        return new NextResponse(JSON.stringify(weatherData), {
            headers: {
                'Content-Type': 'application/json',
                ...corsHeaders
            }
        });

    } catch (error) {
        console.error('[Weather API] Critical error:', error);
        return new NextResponse(
            JSON.stringify({
                error: "Server error",
                details: error instanceof Error ? error.message : "Unknown error occurred"
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    ...corsHeaders
                }
            }
        );
    }
}
