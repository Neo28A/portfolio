import { NextResponse } from 'next/server';

export const revalidate = 0; // Disable caching

export async function GET(request: Request) {
    const API_KEY = process.env.OPENWEATHER_API_KEY;
    const city = "Bengaluru"; // You can make this dynamic if needed

    try {
        // Log the API key (first few characters only for security)
        console.log('API Key available:', !!API_KEY);
        if (!API_KEY) {
            throw new Error('OpenWeather API key is not configured');
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        console.log('Fetching weather from:', url.replace(API_KEY, 'HIDDEN'));

        const response = await fetch(url, {
            // Add cache control headers
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });

        // Log the OpenWeather API response
        console.log('OpenWeather API Response:', {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries())
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('OpenWeather API Error:', errorText);
            throw new Error(`OpenWeather API failed: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        console.log('Weather data received:', data);

        // Validate the data structure
        if (!data.main || !data.weather) {
            throw new Error('Invalid weather data format received from OpenWeather API');
        }

        // Add cache control headers to the response
        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
    } catch (error) {
        console.error('Weather API error:', error);
        return NextResponse.json(
            { 
                error: error instanceof Error ? error.message : 'Failed to fetch weather data',
                timestamp: new Date().toISOString()
            },
            { status: 500 }
        );
    }
} 