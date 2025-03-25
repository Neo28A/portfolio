import { NextResponse } from 'next/server';

export const revalidate = 0; // Disable caching

export async function GET() {
    // Basic response to test if route is working
    return NextResponse.json({ test: 'Weather API is working' });
} 