export const config = {
    apiBaseUrl: process.env.NEXT_PUBLIC_VERCEL_URL 
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` 
        : 'http://localhost:3000'
} 