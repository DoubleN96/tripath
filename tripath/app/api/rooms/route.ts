import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        bookings: true,
      },
    });
    return NextResponse.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json({ error: 'Error fetching rooms' }, { status: 500 });
  }
} 