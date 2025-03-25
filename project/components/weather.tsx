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

    const fetchWeather = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/weather')
            const data = await response.json()
            
            if (data.error) {
                throw new Error(data.error)
            }
            
            setWeather(data)
            setError(null)
        } catch (error) {
            console.error('Error fetching weather:', error)
            setError(error instanceof Error ? error.message : 'Failed to load weather')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchWeather()
        // Update weather every 1 minute
        const interval = setInterval(fetchWeather, 60 * 1000)
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

    if (error) {
        return (
            <div className="flex items-center gap-2 text-muted-foreground/80">
                <Cloud size={16} className="text-gray-400" />
                <span className="text-[14px] font-medium">--°C</span>
            </div>
        )
    }

    if (loading && !weather) {
        return (
            <div className="flex items-center gap-2 text-muted-foreground/80">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-[14px] font-medium">--°C</span>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-2 relative">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                    <Loader2 size={12} className="animate-spin" />
                </div>
            )}
            {weather && (
                <>
                    {getWeatherIcon(weather.weather[0].main)}
                    <span className="text-[14px] font-medium text-muted-foreground/80">
                        {Math.round(weather.main.temp)}°C
                    </span>
                </>
            )}
        </div>
    )
} 