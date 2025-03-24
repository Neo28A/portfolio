import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    console.error('Missing coordinates in request');
    return NextResponse.json({ error: 'Missing coordinates' }, { status: 400 });
  }

  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.main?.temp || !data.weather?.[0]?.main) {
      throw new Error('Invalid data structure from Weather API');
    }

    const weatherData = {
      temp: Math.round(data.main.temp),
      condition: data.weather[0].main.toLowerCase(),
    };

    console.log('Weather data:', weatherData); // Debug log
    
    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Error in weather API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather' }, 
      { status: 500 }
    );
  }
} 