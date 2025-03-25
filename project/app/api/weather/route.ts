import { NextResponse } from 'next/server';

export const revalidate = 0; // Disable caching

export async function GET() {
    return NextResponse.json({ status: 'API is working' });
} 