"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { WorkItem } from "@/components/work-item";
import { CollapsibleSection } from "@/components/collapsible-section";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, LineChart, BarChart3, Bot, Lightbulb, Github, Linkedin, Mail, Instagram, Code2, Wrench, Database, GraduationCap, Calendar, Cloud, CloudDrizzle, CloudLightning, CloudRain, CloudSnow, Sun, CloudFog } from "lucide-react";
import { PreviousRoles } from "@/components/previous-roles";
import Link from "next/link";
import { useEffect, useState } from "react"

type WeatherData = {
  current: {
    temp_c: number;
    temp_f: number;
    condition: string;
    icon: string;
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    wind_dir: string;
    pressure_mb: number;
    precip_mm: number;
    cloud: number;
    uv: number;
    last_updated: string;
  };
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  forecast: Array<{
    date: string;
    max_temp_c: number;
    min_temp_c: number;
    condition: string;
    icon: string;
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
  }>;
  air_quality: {
    co: number;
    no2: number;
    o3: number;
    pm2_5: number;
    pm10: number;
  };
};

export default function Home() {
  const [localTime, setLocalTime] = useState<string>("")
  const [gmtTime, setGmtTime] = useState<string>("")
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setLocalTime(now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }))
      setGmtTime(now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'GMT'
      }))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const fetchWeather = async () => {
        try {
            setIsLoadingWeather(true);
            console.log('[Weather] Fetching weather data...');
            
            const response = await fetch('/api/weather', {
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                }
            });

            const data = await response.json();

            if (!response.ok || data.error) {
                console.error('[Weather] API error:', data.error, data.details);
                setWeather(null);
                return;
            }

            console.log('[Weather] Data received successfully');
            setWeather(data);
        } catch (error) {
            console.error('[Weather] Fetch error:', error);
            setWeather(null);
        } finally {
            setIsLoadingWeather(false);
        }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 120000); // Refresh every 2 minutes
    return () => clearInterval(interval);
  }, []);


  const getWeatherIcon = (iconUrl: string) => {
    return (
      <img
        src={iconUrl}
        alt="Weather Icon"
        className="w-8 h-8 filter invert"
      />
    );
  };






  return (
    <main className="flex flex-col items-center px-4 py-14 bg-[#fdfff4] min-h-screen">
      <div className="w-full max-w-[568px]">
        <nav className="flex items-center justify-between mb-12 animate-on-load">
          <div className="flex items-center gap-2">
            <Link href="/meet-neo" rel="noopener noreferrer">
              <div className="w-[24px] h-[24px] rounded-full bg-gradient-to-br from-orange-400 to-orange-200 pulse-animation hover-spin shadow-lg hover:shadow-orange-400/50 relative before:absolute before:inset-0 before:rounded-full before:bg-orange-400/20 before:scale-[1.4] before:opacity-0 hover:before:scale-100 hover:before:opacity-100 before:transition-all before:duration-[2500ms] before:ease-out cursor-pointer"></div>
            </Link>
            <Link href="/meet-neo" rel="noopener noreferrer" className="text-[14px] text-foreground/90 font-medium shimmer-text">
              Meet Iva!
            </Link>
          </div>

          {isLoadingWeather ? (
            <div className="flex items-center gap-2 text-muted-foreground/80">
                <span className="text-sm">Loading weather...</span>
            </div>
          ) : weather ? (
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex items-center gap-2 text-muted-foreground/80 group relative cursor-pointer hover:text-foreground transition-colors">
                  <div className="flex items-center gap-1.5">
                    <img
                      src={weather.current.icon}
                      alt={weather.current.condition}
                      className="w-8 h-8"
                    />
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium">{weather.current.temp_c}°C</span>
                      <span className="text-[10px] text-muted-foreground">{weather.current.condition}</span>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <div className="grid gap-6">
                  {/* Location and Current Weather */}
                  <div className="space-y-2">
                    <h4 className="text-xl font-semibold">
                      {weather.location.name}, {weather.location.country}
                    </h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img src={weather.current.icon} alt={weather.current.condition} className="w-16 h-16" />
                        <div>
                          <div className="text-3xl font-bold">{weather.current.temp_c}°C</div>
                          <div className="text-sm text-muted-foreground">{weather.current.condition}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">Feels like {weather.current.feelslike_c}°C</div>
                        <div className="text-xs text-muted-foreground">
                          Updated: {new Date(weather.current.last_updated).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Current Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Humidity</span>
                        <span>{weather.current.humidity}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Wind</span>
                        <span>{weather.current.wind_kph} km/h {weather.current.wind_dir}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pressure</span>
                        <span>{weather.current.pressure_mb} mb</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">UV Index</span>
                        <span>{weather.current.uv}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cloud Cover</span>
                        <span>{weather.current.cloud}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Precipitation</span>
                        <span>{weather.current.precip_mm} mm</span>
                      </div>
                    </div>
                  </div>

                  {/* Forecast */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-semibold">Forecast</h5>
                    <div className="grid grid-cols-2 gap-4">
                      {weather.forecast.map((day) => (
                        <div key={day.date} className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                          <div className="flex items-center gap-2">
                            <img src={day.icon} alt={day.condition} className="w-8 h-8" />
                            <div className="text-xs">
                              <div>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                              <div className="text-muted-foreground">{day.condition}</div>
                            </div>
                          </div>
                          <div className="text-right text-xs">
                            <div>{day.max_temp_c}°</div>
                            <div className="text-muted-foreground">{day.min_temp_c}°</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Air Quality */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-semibold">Air Quality</h5>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-secondary/50">
                        <div className="text-muted-foreground">PM2.5</div>
                        <div className="font-medium">{weather.air_quality.pm2_5.toFixed(1)}</div>
                      </div>
                      <div className="p-2 rounded-lg bg-secondary/50">
                        <div className="text-muted-foreground">PM10</div>
                        <div className="font-medium">{weather.air_quality.pm10.toFixed(1)}</div>
                      </div>
                      <div className="p-2 rounded-lg bg-secondary/50">
                        <div className="text-muted-foreground">O₃</div>
                        <div className="font-medium">{weather.air_quality.o3.toFixed(1)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground/80">
                <span className="text-sm">Weather unavailable</span>
            </div>
          )}
        </nav>

        <section className="flex flex-col gap-3 pt-1 animate-on-load delay-100">
          <h1 className="text-[40px] font-semibold tracking-[-1.8px] leading-[60px] mb-4">
            <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              Chetan Kittali
            </span>
          </h1>
          
          <div className="flex items-center gap-2 text-[14.9px] tracking-[-0.4px] font-bold text-emperor">
            <span className="text-foreground">data scientist</span>
            <div className="w-1 h-1 rounded-full bg-foreground/70"></div>
            <span className="text-foreground">analyst</span>
            <div className="w-1 h-1 rounded-full bg-foreground/70"></div>
            <span className="text-foreground">researcher</span>
          </div>
          
          <p className="text-[14px] leading-7 text-muted-foreground tracking-[-0.3px]">
            Hi, I'm Chetan, I'm passionate about <span className="text-foreground/90 font-medium">data science</span> and <span className="text-foreground/90 font-medium">building intelligent system</span>. I enjoy exploring AI and <span className="text-foreground/90 font-medium">uncovering patterns in data</span>. Always looking for innovative ways to solve complex problems and learn something new along the way.
          </p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <a href="https://github.com/Neo28A" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/30 backdrop-blur-sm border border-gray-100/30 transition-colors duration-200 hover:border-primary"
            >
              <span className="text-muted-foreground/80 group-hover:text-primary/90 transition-colors duration-200">
                <Github size={16} />
              </span>
              <span className="font-semibold text-muted-foreground/90 text-[13px] tracking-[-0.3px] leading-5 group-hover:text-primary/90 transition-colors duration-200">
                github
              </span>
            </a>
            <a href="https://www.linkedin.com/in/chetan-kittali-44b94928a/" 
                target="_blank" 
                rel="noopener noreferrer" 
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/30 backdrop-blur-sm border border-gray-100/30 transition-colors duration-200 hover:border-primary"
            >
              <span className="text-muted-foreground/80 group-hover:text-primary/90 transition-colors duration-200">
                <Linkedin size={16} />
              </span>
              <span className="font-semibold text-muted-foreground/90 text-[13px] tracking-[-0.3px] leading-5 group-hover:text-primary/90 transition-colors duration-200">
                linkedin
              </span>
            </a>
            <a href="https://x.com/ChetanKittali" 
                target="_blank" 
                rel="noopener noreferrer" 
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/30 backdrop-blur-sm border border-gray-100/30 transition-colors duration-200 hover:border-primary"
            >
              <span className="text-muted-foreground/80 group-hover:text-primary/90 transition-colors duration-200">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </span>
              <span className="font-semibold text-muted-foreground/90 text-[13px] tracking-[-0.3px] leading-5 group-hover:text-primary/90 transition-colors duration-200">
                x
              </span>
            </a>
            <a href="mailto:chetankittali7@gmail.com"
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/30 backdrop-blur-sm border border-gray-100/30 transition-colors duration-200 hover:border-primary"
            >
              <span className="text-muted-foreground/80 group-hover:text-primary/90 transition-colors duration-200">
                <Mail size={16} />
              </span>
              <span className="font-semibold text-muted-foreground/90 text-[13px] tracking-[-0.3px] leading-5 group-hover:text-primary/90 transition-colors duration-200">
                email
              </span>
            </a>
          </div>
        </section>
        
        {/* <section className="section-container mt-6 animate-on-load delay-200">
          <div className="grid grid-cols-4 gap-2 py-2">
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-secondary/20 border border-border/30">
              <LineChart size={16} className="mb-1.5 text-primary" />
              <span className="text-[10px] font-medium text-center">Data Scientist</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-secondary/20 border border-border/30">
              <BarChart3 size={16} className="mb-1.5 text-primary" />
              <span className="text-[10px] font-medium text-center">Visualization</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-secondary/20 border border-border/30">
              <Bot size={16} className="mb-1.5 text-primary" />
              <span className="text-[10px] font-medium text-center">ML Models</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-secondary/20 border border-border/30">
              <Lightbulb size={16} className="mb-1.5 text-primary" />
              <span className="text-[10px] font-medium text-center">Engineer</span>
            </div>
          </div>
        </section> */}
        
        <div className="custom-separator my-3" />
        
        <section className="section-container animate-on-load delay-200">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/90 mb-3">Experience</h2>
          <div className="relative mt-3">
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/50 to-primary/5"></div>
            
            <div className="relative pl-6">
              <div className="absolute left-[-3px] top-2 w-1.5 h-1.5 rounded-full bg-primary ring-2 ring-background"></div>
              
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-semibold text-sm text-primary">Data Science Intern</h3>
                  <span className="text-[10px] font-medium text-muted-foreground/90 px-2 py-0.5 rounded-full bg-secondary/20">2025</span>
                </div>
                
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-5 h-5 rounded-md bg-secondary/30">
                      <span className="text-[10px] font-semibold text-primary">H</span>
                    </div>
                    <h4 className="text-xs font-semibold text-foreground/90">Haegl Technologies</h4>
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground/90">Hubli, India</span>
            </div>
            </div>
            </div>
          </div>

          <PreviousRoles />
        </section>
        
        <div className="custom-separator my-3" />
        
        <section className="section-container animate-on-load delay-400">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/90 mb-3">Recent Work</h2>
          <div className="space-y-0">
            <WorkItem
              title="DocAssist AI"
              href="https://docassist-ai.netlify.app/"
              description="DocAssist is an AI-driven medical support system that helps doctors make informed treatment decisions by analyzing patient data"
              target="_blank"
            />
            <WorkItem 
              title="E-Commerce Product Categorization" 
              href="https://github.com/Neo28A/Hackathon-Ecommerce-Product-Categorization1.git" 
              description="Developed an model which helps to categorize products based on product description"
              target="_blank"
            />
            <WorkItem 
              title="Healthcare Analytics" 
              href="#healthcare-analytics" 
              description="Patient health metrics analysis and visualization"
            />
            <a 
              href="https://github.com/Neo28A" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center p-2 rounded-lg hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground/90 group-hover:text-primary">
                Enter Project Gallery
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-colors"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>
        </section>

        {/* <div className="custom-separator my-3" /> */}

        {/* <section className="section-container animate-on-load delay-300">
          <CollapsibleSection title="Skills & Expertise">
            <div className="block md:hidden">
              <div className="relative space-y-4 mt-2">
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/50 to-primary/5"></div>

                <div className="relative">
                  <div className="pl-6">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Code2 size={14} className="text-primary" />
                      <h3 className="font-semibold text-sm text-foreground/90">Languages</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground/90 px-1.5 py-0.5 bg-secondary/20 rounded">Python</span>
                      <span className="text-xs font-medium text-muted-foreground/90 px-1.5 py-0.5 bg-secondary/20 rounded">SQL</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="pl-6">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Wrench size={14} className="text-primary" />
                      <h3 className="font-semibold text-sm text-foreground/90">Tools</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground/90 px-1.5 py-0.5 bg-secondary/20 rounded">Tableau</span>
                      <span className="text-xs font-medium text-muted-foreground/90 px-1.5 py-0.5 bg-secondary/20 rounded">Excel</span>
                      <span className="text-xs font-medium text-muted-foreground/90 px-1.5 py-0.5 bg-secondary/20 rounded">Scikit-learn</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="pl-6">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Database size={14} className="text-primary" />
                      <h3 className="font-semibold text-sm text-foreground/90">Technologies</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground/90 px-1.5 py-0.5 bg-secondary/20 rounded">TensorFlow</span>
                      <span className="text-xs font-medium text-muted-foreground/90 px-1.5 py-0.5 bg-secondary/20 rounded">PyTorch</span>
                      <span className="text-xs font-medium text-muted-foreground/90 px-1.5 py-0.5 bg-secondary/20 rounded">NLTK / spaCy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Code2 size={14} className="text-primary" />
                    <h3 className="font-semibold text-sm text-foreground/90">Languages</h3>
                  </div>
                  <div className="ml-5 space-y-1 text-xs font-medium text-muted-foreground/90">
                    <p>Python</p>
                    <p>SQL</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Wrench size={14} className="text-primary" />
                    <h3 className="font-semibold text-sm text-foreground/90">Tools</h3>
                  </div>
                  <div className="ml-5 space-y-1 text-xs font-medium text-muted-foreground/90">
                    <p>Tableau</p>
                    <p>Excel</p>
                    <p>Scikit-learn</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Database size={14} className="text-primary" />
                    <h3 className="font-semibold text-sm text-foreground/90">Technologies</h3>
                  </div>
                  <div className="ml-5 space-y-1 text-xs font-medium text-muted-foreground/90">
                    <p>TensorFlow</p>
                    <p>PyTorch</p>
                    <p>NLTK / spaCy</p>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>
        </section> */}

        {/* Add footer at the bottom */}
        <footer className="w-full py-4 mt-8 border-t border-zinc-200/50">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground/70">Chetan Kittali</span>
            <div className="flex items-center gap-4">
              <time className="text-xs text-muted-foreground/70">
                Local Time: {localTime} (GMT: {gmtTime})
              </time>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}