"use client"

import { useEffect, useState } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog } from 'lucide-react';

interface WeatherData {
  temp: number;
  condition: string;
}

export function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Get user's location
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        
        // Replace YOUR_API_KEY with your actual OpenWeatherMap API key
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
        );
        
        const data = await response.json();
        
        setWeather({
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main.toLowerCase(),
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Update weather every 5 minutes
    const interval = setInterval(fetchWeather, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'clear':
        return <Sun size={16} className="text-orange-400" />;
      case 'clouds':
        return <Cloud size={16} className="text-gray-400" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain size={16} className="text-blue-400" />;
      case 'snow':
        return <CloudSnow size={16} className="text-blue-200" />;
      case 'thunderstorm':
        return <CloudLightning size={16} className="text-yellow-400" />;
      case 'mist':
      case 'fog':
      case 'haze':
        return <CloudFog size={16} className="text-gray-400" />;
      default:
        return <Sun size={16} className="text-orange-400" />;
    }
  };

  if (loading) return null;
  if (!weather) return null;

  return (
    <div className="flex items-center gap-1.5 text-[14px] text-muted-foreground/90">
      {getWeatherIcon(weather.condition)}
      <span>{weather.temp}°C</span>
    </div>
  );
} 