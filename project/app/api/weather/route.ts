import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Use environment variable or hardcode your API key (for demo purposes)
    // In production, always use environment variables for API keys
    const apiKey = process.env.WEATHER_API_KEY || "your_api_key_here";
    
    // Reduce revalidation time to 2 minutes
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Hubli&aqi=no`,
      {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = await response.json();
    
    // Return response with shorter cache duration
    return new NextResponse(
      JSON.stringify({
        temp: Math.round(data.current.temp_c),
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
        feels_like: Math.round(data.current.feelslike_c),
        last_updated: new Date().toISOString() // Add timestamp for debugging
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      }
    );
    
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
} 