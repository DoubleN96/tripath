import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const room = await prisma.room.findUnique({
      where: {
        id: params.id,
      },
      include: {
        amenities: true,
        images: true,
      },
    })

    if (!room) {
      return NextResponse.json(
        { error: 'Habitación no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(room)
  } catch (error) {
    console.error('Error fetching room:', error)
    return NextResponse.json(
      { error: 'Error al obtener la habitación' },
      { status: 500 }
    )
  }
} 