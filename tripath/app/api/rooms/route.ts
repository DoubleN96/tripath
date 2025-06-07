import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const location = searchParams.get('location');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const guests = searchParams.get('guests');

    const rooms = await prisma.room.findMany({
      where: {
        ...(location && { location: { contains: location, mode: 'insensitive' } }),
        ...(checkIn && { availableFrom: { lte: new Date(checkIn) } }),
        ...(checkOut && { availableTo: { gte: new Date(checkOut) } }),
        ...(guests && { maxGuests: { gte: parseInt(guests) } }),
      },
      include: {
        bookings: true,
        amenities: true,
        images: true,
      },
    });

    return NextResponse.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json(
      { error: 'Error fetching rooms' },
      { status: 500 }
    );
  }
} 