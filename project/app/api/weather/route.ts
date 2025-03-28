import { NextResponse } from 'next/server';

export const revalidate = 0; // Disable Next.js cache

export async function GET() {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    
    if (!apiKey) {
      console.error('Weather API key is not configured');
      throw new Error('Weather API key is missing');
    }

    // Add current timestamp to prevent caching
    const timestamp = new Date().getTime();
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Hubli&aqi=no&t=${timestamp}`,
      {
        cache: 'no-store',
        next: { revalidate: 0 },
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Weather API response error:', errorText);
      throw new Error(`Weather API failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    // Log the received temperature for debugging
    console.log('Received weather data:', {
      temp: data.current.temp_c,
      location: data.location.name,
      last_updated: data.current.last_updated,
      timestamp: new Date().toISOString()
    });
    
    return new NextResponse(
      JSON.stringify({
        temp: Math.round(data.current.temp_c),
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
        feels_like: Math.round(data.current.feelslike_c),
        last_updated: data.current.last_updated
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
    
  } catch (error: unknown) {
    console.error('Weather API error:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An unknown error occurred';
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch weather data', 
        details: errorMessage 
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  }
} 