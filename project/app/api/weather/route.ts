import { NextResponse } from 'next/server';

export const revalidate = 0; // Disable caching

export async function GET() {
    try {
        // Log to verify API key is available
        console.log('API Key exists:', !!process.env.OPENWEATHER_API_KEY);

        const url = `https://api.openweathermap.org/data/2.5/weather?q=Hubli&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`;
        console.log('Fetching weather from:', url.replace(process.env.OPENWEATHER_API_KEY!, 'HIDDEN_KEY'));

        const response = await fetch(url);
        
        // Log the response status
        console.log('Weather API response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Weather API error response:', errorText);
            return NextResponse.json(
                { error: `API Error: ${response.status}`, details: errorText },
                { status: response.status }
            );
        }

        const data = await response.json();
        console.log('Weather data received:', {
            temp: data.main?.temp,
            weather: data.weather?.[0]?.main
        });

        return NextResponse.json(data);
    } catch (error) {
        console.error('Weather API catch block error:', error);
        return NextResponse.json(
            { error: 'Weather API error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
} 