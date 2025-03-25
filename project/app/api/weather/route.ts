import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Hubli coordinates
        // const lat = "15.3647";
        // const lon = "75.1240";

        // Bengaluru coordinates
        const lat = "12.9716";
        const lon = "77.5946";
        
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}&t=${Date.now()}`,
            {
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        return NextResponse.json({
            temp: Math.round(data.main.temp),
            condition: data.weather[0].main,
            icon: data.weather[0].icon,
            feels_like: Math.round(data.main.feels_like)
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch weather data' },
            { status: 500 }
        );
    }
} 