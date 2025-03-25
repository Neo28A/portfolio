"use client"

import { useEffect, useState } from 'react'
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, Loader2 } from 'lucide-react'

interface WeatherData {
    main: {
        temp: number
    }
    weather: [{
        main: string
        description: string
    }]
}

export function Weather() {
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [retryCount, setRetryCount] = useState(0)

    const fetchWeather = async () => {
        try {
            const response = await fetch('/api/weather', {
                cache: 'no-store',
                headers: {
                    'Accept': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Weather fetch error:', errorData);
                throw new Error(errorData.error || 'Failed to fetch weather');
            }

            const data = await response.json()
            setWeather(data)
            setError(null)
            setRetryCount(0)
        } catch (error) {
            console.error('Error fetching weather:', error)
            setError('Failed to load weather')
            
            // Retry logic
            if (retryCount < 3) {
                setTimeout(() => {
                    setRetryCount(prev => prev + 1)
                    fetchWeather()
                }, 2000) // Retry after 2 seconds
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchWeather()
        
        // Update every 30 seconds
        const interval = setInterval(fetchWeather, 30 * 1000)
        
        // Cleanup interval on unmount
        return () => clearInterval(interval)
    }, [])

    const getWeatherIcon = (weatherMain: string) => {
        switch (weatherMain.toLowerCase()) {
            case 'clear':
                return <Sun size={16} className="text-yellow-400" />
            case 'clouds':
                return <Cloud size={16} className="text-gray-400" />
            case 'rain':
            case 'drizzle':
                return <CloudRain size={16} className="text-blue-400" />
            case 'snow':
                return <CloudSnow size={16} className="text-blue-200" />
            case 'thunderstorm':
                return <CloudLightning size={16} className="text-yellow-600" />
            case 'mist':
            case 'fog':
            case 'haze':
                return <CloudFog size={16} className="text-gray-400" />
            default:
                return <Sun size={16} className="text-yellow-400" />
        }
    }

    if (loading) {
        return (
            <div className="flex items-center gap-2 text-muted-foreground/80">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-[14px] font-medium">Loading...</span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center gap-2 text-muted-foreground/80">
                <span className="text-[14px] font-medium">--°C</span>
            </div>
        )
    }

    if (!weather) return null

    return (
        <div className="flex items-center gap-2 group">
            <div className="transition-transform duration-300 group-hover:scale-110">
                {getWeatherIcon(weather.weather[0].main)}
            </div>
            <span className="text-[14px] font-medium text-muted-foreground/80">
                {Math.round(weather.main.temp)}°C
            </span>
        </div>
    )
} 