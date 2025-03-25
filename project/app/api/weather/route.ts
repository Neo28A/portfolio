import { NextResponse } from 'next/server';

export const revalidate = 0; // Disable caching

export async function GET() {
    // Check if API key exists
    if (!process.env.OPENWEATHER_API_KEY) {
        console.error('OpenWeather API key is not configured');
        return NextResponse.json(
            { error: 'Weather API is not configured' },
            { status: 500 }
        );
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=Hubli&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`;
        
        const response = await fetch(url, {
            // Add cache control headers
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Weather API error:', errorData);
            throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();
        
        // Add cache control headers to the response
        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
    } catch (error) {
        console.error('Failed to fetch weather:', error);
        return NextResponse.json(
            { error: 'Failed to fetch weather data' },
            { status: 500 }
        );
    }
} 