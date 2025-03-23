"use client"

import Link from 'next/link';

export default function MeetNeo() {
    return (
        <main className="flex flex-col items-center px-4 py-16 bg-[#fdfff4] min-h-screen">
            <div className="w-full max-w-[568px]">
                <nav className="flex items-center justify-between mb-12 animate-on-load">
                    <Link 
                        href="/"
                        className="text-sm font-medium text-muted-foreground/90 hover:text-primary transition-colors"
                    >
                        ← Back home
                    </Link>
                </nav>

                <div className="flex flex-col items-center justify-center gap-8 animate-on-load delay-100">
                    {/* AI Assistant Dot */}
                    <div className="relative w-[210px] h-[210px] rounded-full bg-gradient-to-br from-orange-400 via-orange-200 to-white shadow-lg hover:scale-105 transition-transform duration-700">
                        {/* Inner glow effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/30 to-white/50 opacity-70"></div>
                        
                        {/* Pulse animation ring */}
                        <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-orange-200/20 to-transparent animate-pulse"></div>
                        
                        {/* Shine effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent rotate-45 animate-shine"></div>

                        {/* Floating animation */}
                        <div className="absolute inset-0 rounded-full animate-float"></div>
                    </div>

                    <div className="text-center space-y-4">
                        <h1 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-orange-400 to-orange-200 bg-clip-text text-transparent">
                            Hey, I'm Neo! 👋
                        </h1>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-[480px]">
                            I'm Chetan's AI assistant, here to help you learn more about him. Ask me about his work, 
                            experience, or interests in data science and machine learning. I have access to his portfolio 
                            and can provide detailed insights about his projects and skills.
                        </p>
                        <p className="text-xs text-muted-foreground/80 italic">
                            Try asking: "What are Chetan's main areas of expertise?" or "Tell me about his recent projects"
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
} 