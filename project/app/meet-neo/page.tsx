"use client"

import Link from 'next/link';
import { useConversation } from '@11labs/react';
import { useCallback, useState, useEffect } from 'react';

export default function MeetNeo() {
    const [speaking, setSpeaking] = useState(false);
    const [connected, setConnected] = useState(false);
    const [userSpeaking, setUserSpeaking] = useState(false);
    
    const conversation = useConversation({
        onConnect: () => {
            console.log('Connected');
            setConnected(true);
        },
        onDisconnect: () => {
            console.log('Disconnected');
            setConnected(false);
            setUserSpeaking(false);
        },
        onMessage: (message) => console.log('Message:', message),
        onError: (error) => console.error('Error:', error),
        onSpeechStart: () => {
            setSpeaking(true);
            setUserSpeaking(false);
        },
        onSpeechEnd: () => setSpeaking(false),
        onUserSpeechStart: () => setUserSpeaking(true),
        onUserSpeechEnd: () => setUserSpeaking(false),
    });

    const getSignedUrl = async (): Promise<string> => {
        const response = await fetch("/api/get-signed-url");
        if (!response.ok) {
            throw new Error(`Failed to get signed url: ${response.statusText}`);
        }
        const { signedUrl } = await response.json();
        return signedUrl;
    };

    const startConversation = useCallback(async () => {
        try {
            // Request microphone permission
            await navigator.mediaDevices.getUserMedia({ audio: true });
            
            const signedUrl = await getSignedUrl();
            
            // Start the conversation with the signed URL
            await conversation.startSession({
                signedUrl,
            });
        } catch (error) {
            console.error('Failed to start conversation:', error);
        }
    }, [conversation]);

    const stopConversation = useCallback(async () => {
        await conversation.endSession();
    }, [conversation]);

    return (
        <main className="flex flex-col items-center px-4 py-16 bg-[#fdfff4] min-h-screen">
            <div className="w-full max-w-[568px]">
                <nav className="flex items-center justify-between mb-12 animate-on-load">
                    <Link 
                        href="/"
                        className="text-sm font-medium text-muted-foreground/90 hover:text-[#DA7756] transition-colors"
                    >
                        ← Back home
                    </Link>
                </nav>

                <div className="flex flex-col items-center justify-center gap-8 animate-on-load delay-100">
                    <button 
                        onClick={connected ? stopConversation : startConversation}
                        className="relative w-[160px] h-[160px] rounded-full bg-[#DA7756] shadow-lg focus:outline-none overflow-hidden"
                        aria-label={connected ? "Stop conversation" : "Start conversation"}
                    >
                        {/* Inner glow effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/20 to-white/30 opacity-30"></div>
                        
                        {/* Dynamic wave animation when connected and speaking */}
                        {connected && (
                            <>
                                <div className="absolute inset-0 rounded-full overflow-hidden">
                                    <div className={`absolute inset-0 ${speaking ? 'animate-wave-slow' : ''}`}>
                                        <div className="absolute inset-[-20%] rounded-full bg-[#DA7756]/70 blur-md"></div>
                                    </div>
                                    <div className={`absolute inset-0 ${speaking ? 'animate-wave-medium' : ''}`}>
                                        <div className="absolute inset-[-10%] rounded-full bg-[#DA7756]/80 blur-sm"></div>
                                    </div>
                                    {/* Ripple effect when speaking */}
                                    {speaking && (
                                        <div className="absolute inset-0">
                                            <div className="absolute inset-[-5%] animate-ping rounded-full bg-white/20 duration-1000"></div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                        
                        {/* Pulse animation ring */}
                        <div className={`absolute -inset-4 rounded-full bg-gradient-to-br from-[#DA7756]/30 to-transparent ${speaking || userSpeaking ? 'animate-pulse' : ''}`}></div>
                        
                        {/* Live indicator */}
                        {connected && (
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-[10px] font-medium text-white/90">LIVE</span>
                            </div>
                        )}

                    </button>

                    <div className="text-center space-y-4">
                        {/* <h1 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-orange-400 to-orange-200 bg-clip-text text-transparent">
                            Hey, I'm Iva! 👋
                        </h1> */}
                        <p className="text-xs text-muted-foreground/80 italic">
                            {connected ? '' : 'Meet Iva "Intelligent Virtual Assistant", My personal AI assistant.'}
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-[480px]">
                            {connected ? 'Try asking: "What are Chetan\'s recent works?" or "How can I contact Chetan?"' : 'Click the orb to start or stop talking with me!'}
                        </p>
                        
                    </div>
                </div>
            </div>
        </main>
    );
} 