import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Use environment variable or hardcode your API key (for demo purposes)
    // In production, always use environment variables for API keys
    const apiKey = process.env.WEATHER_API_KEY || "your_api_key_here";
    
    // Fetch weather for Hubli
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Hubli&aqi=no`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = await response.json();
    
    return NextResponse.json({
      temp: Math.round(data.current.temp_c),
      condition: data.current.condition.text,
      icon: data.current.condition.icon,
      feels_like: Math.round(data.current.feelslike_c)
    });
    
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
} 