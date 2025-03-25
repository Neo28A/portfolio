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
            const response = await fetch('/api/weather', {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            })
            if (!response.ok) {
                throw new Error('Weather fetch failed')
            }
            const data = await response.json()
            setWeather(data)
            setError(null)
        } catch (error) {
            console.error('Error fetching weather:', error)
            setError('Failed to load weather')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchWeather()
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
        <div className="flex items-center gap-2 relative group">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                    <Loader2 size={12} className="animate-spin" />
                </div>
            )}
            {weather && (
                <>
                    <span className="text-[14px] font-medium text-muted-foreground/80">Bangalore</span>
                    {getWeatherIcon(weather.weather[0].main)}
                    <span className="text-[14px] font-medium text-muted-foreground/80">
                        {Math.round(weather.main.temp)}°C
                    </span>
                    <span className="absolute bottom-full mb-1 text-xs text-muted-foreground/70 bg-white/80 px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        current weather {weather.weather[0].description}
                    </span>
                </>
            )}
        </div>
    )
} 