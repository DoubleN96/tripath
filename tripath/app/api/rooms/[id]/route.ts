import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const room = await prisma.room.findUnique({
      where: {
        id: params.id,
      },
      include: {
        bookings: true,
        amenities: true,
        images: true,
      },
    });

    if (!room) {
      return NextResponse.json(
        { error: 'Room not found' },
        { status: 404 }
      );
    }

    const transformedRoom = {
      ...room,
      images: room.images.map(image => image.url),
      amenities: room.amenities.map(amenity => amenity.name),
    };
    return NextResponse.json(transformedRoom);
  } catch (error) {
    console.error('Error fetching room:', error);
    return NextResponse.json(
      { error: 'Error fetching room' },
      { status: 500 }
    );
  }
} 