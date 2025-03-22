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

                <section className="flex flex-col gap-6 animate-on-load delay-100">
                    <div className="space-y-4">
                        <h1 className="text-[40px] font-semibold tracking-[-1.8px] leading-[1.2]">
                            <span className="bg-gradient-to-r from-orange-400 to-orange-200 bg-clip-text text-transparent">
                                Hey, I'm Neo! 👋
                            </span>
                        </h1>
                        
                        <p className="text-[15px] leading-7 text-muted-foreground tracking-[-0.3px]">
                            Welcome to my digital garden! Say hello to Neo, my personal voice assistant!✨ Neo is here to answer your questions about me—whether it’s my work, projects, or journey in tech.
                        </p>

                        <div className="p-4 rounded-lg bg-orange-50/50 border border-orange-100">
                            <p className="text-[14px] leading-6 text-orange-700/90 font-medium">
                                It's still in development, but I can’t wait for you to try it out soon!
                                {/* "The best way to predict the future is to create it. I believe in the power of data to transform how we understand and interact with the world around us." */}
                            </p>
                        </div>

                        <p className="text-[15px] leading-7 text-muted-foreground tracking-[-0.3px]">
                            {/* It's still in development, but I can’t wait for you to try it out soon!" */}
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
} 