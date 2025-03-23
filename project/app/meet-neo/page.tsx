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
                        className="text-sm font-medium text-muted-foreground/90 hover:text-primary transition-colors"
                    >
                        ← Back home
                    </Link>
                </nav>

                <div className="flex flex-col items-center justify-center gap-8 animate-on-load delay-100">
                    <button 
                        onClick={connected ? stopConversation : startConversation}
                        className="relative w-[160px] h-[160px] rounded-full bg-gradient-to-br from-orange-200 via-orange-400 to-white shadow-lg focus:outline-none"
                        aria-label={connected ? "Stop conversation" : "Start conversation"}
                    >
                        {/* Inner glow effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/30 to-white/50 opacity-20"></div>
                        
                        {/* Dynamic wave animation when connected */}
                        {connected && (
                            <>
                                <div className="absolute inset-[10%] rounded-full">
                                    <div className="absolute inset-0 animate-wave-slow opacity-30">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-orange-300 to-transparent"></div>
                                    </div>
                                    <div className="absolute inset-0 animate-wave-medium opacity-20">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-orange-400 to-transparent"></div>
                                    </div>
                                    <div className="absolute inset-0 animate-wave-fast opacity-10">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-orange-500 to-transparent"></div>
                                    </div>
                                </div>
                            </>
                        )}
                        
                        {/* Pulse animation ring */}
                        <div className={`absolute -inset-4 rounded-full bg-gradient-to-br from-orange-200/20 to-transparent ${speaking || userSpeaking ? 'animate-pulse' : ''}`}></div>
                        
                        {/* Live indicator */}
                        {connected && (
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-[10px] font-medium text-muted-foreground/80">LIVE</span>
                            </div>
                        )}
                        
                        {/* Status indicator */}
                        {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/80 italic">
                            {!connected && 'Click to start'}
                            {connected && speaking && 'Tap to interrupt'}
                            {connected && userSpeaking && 'Listening...'}
                            {connected && !speaking && !userSpeaking && 'Ready to talk'}
                        </div> */}
                    </button>

                    <div className="text-center space-y-4">
                        {/* <h1 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-orange-400 to-orange-200 bg-clip-text text-transparent">
                            Hey, I'm Iva! 👋
                        </h1>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-[480px]">
                            I'm Chetan's AI assistant, here to help you learn more about him. Ask me about his work, 
                            experience, or interests in data science and machine learning.
                        </p> */}
                        <p className="text-xs text-muted-foreground/80 italic">
                            {connected ? 'Try asking: "What are Chetan\'s skills?" or "How can I contact Chetan?"' : 'Click the orange dot to start talking with me!'}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
} 