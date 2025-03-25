import { NextResponse } from 'next/server';

export const revalidate = 0; // Disable caching

export async function GET() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=Hubli&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`,
            { cache: 'no-store' } // Prevent caching
        );

        if (!response.ok) {
            throw new Error('Failed to fetch weather');
        }

        const data = await response.json();
        
        // Add cache control headers
        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'no-store, max-age=0',
                'Pragma': 'no-cache'
            }
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch weather data' },
            { 
                status: 500,
                headers: {
                    'Cache-Control': 'no-store, max-age=0',
                    'Pragma': 'no-cache'
                }
            }
        );
    }
} 