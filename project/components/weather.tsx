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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get user's location
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 5000,
            enableHighAccuracy: false
          });
        });

        const { latitude, longitude } = position.coords;
        
        console.log('Fetching weather for:', latitude, longitude); // Debug log

        const response = await fetch(
          `/api/weather?lat=${latitude}&lon=${longitude}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch weather');
        }
        
        const data = await response.json();
        console.log('Weather data:', data); // Debug log
        setWeather(data);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setError(error instanceof Error ? error.message : 'Failed to load weather');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
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

  if (loading) {
    return (
      <div className="flex items-center gap-1.5 text-[14px] text-muted-foreground/90">
        <Cloud size={16} className="animate-pulse" />
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-1.5 text-[14px] text-muted-foreground/90">
        <Cloud size={16} />
        <span>--°C</span>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="flex items-center gap-1.5 text-[14px] text-muted-foreground/90">
      {getWeatherIcon(weather.condition)}
      <span>{weather.temp}°C</span>
    </div>
  );
} 