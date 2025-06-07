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

    const transformedRooms = rooms.map(room => ({
      ...room,
      images: room.images.map(image => image.url),
      amenities: room.amenities.map(amenity => amenity.name),
      // Bookings are still included but not typed on client; this is fine for now,
      // but could be omitted if truly unused: delete room.bookings; or select them out.
    }));
    return NextResponse.json(transformedRooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json(
      { error: 'Error fetching rooms' },
      { status: 500 }
    );
  }
} 