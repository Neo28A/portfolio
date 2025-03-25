import { NextResponse } from 'next/server';

export const revalidate = 0; // Disable caching

export async function GET() {
    try {
        if (!process.env.OPENWEATHER_API_KEY) {
            console.error('OpenWeather API key is not defined');
            throw new Error('API key not configured');
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=Hubli&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`;
        
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Weather API error:', errorText);
            throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();
        
        // Add cache control headers
        return NextResponse.json(data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Cache-Control': 'no-store, max-age=0',
                'Pragma': 'no-cache'
            }
        });
    } catch (error) {
        console.error('Weather fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch weather data' },
            { 
                status: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Cache-Control': 'no-store, max-age=0',
                    'Pragma': 'no-cache'
                }
            }
        );
    }
} 