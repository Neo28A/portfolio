import { NextResponse } from 'next/server';

export const revalidate = 0; // Disable caching

export async function GET() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=Hubli&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`,
            {
                // Add cache control headers
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch weather');
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
        return NextResponse.json(
            { error: 'Failed to fetch weather data' },
            { status: 500 }
        );
    }
} 