import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location')
    const checkIn = searchParams.get('checkIn')
    const checkOut = searchParams.get('checkOut')
    const guests = searchParams.get('guests')

    const rooms = await prisma.room.findMany({
      where: {
        AND: [
          location ? { location: { contains: location, mode: 'insensitive' } } : {},
          checkIn ? { availableFrom: { lte: new Date(checkIn) } } : {},
          checkOut ? { availableTo: { gte: new Date(checkOut) } } : {},
          guests ? { maxGuests: { gte: parseInt(guests) } } : {},
        ],
      },
      include: {
        amenities: true,
        images: true,
      },
    })

    return NextResponse.json(rooms)
  } catch (error) {
    console.error('Error fetching rooms:', error)
    return NextResponse.json(
      { error: 'Error al obtener las habitaciones' },
      { status: 500 }
    )
  }
} 