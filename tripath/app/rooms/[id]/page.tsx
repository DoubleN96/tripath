'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { getRoom } from '@/services/api'
import type { Room } from '@/services/api'

export default function RoomPage({ params }: { params: { id: string } }) {
  const [room, setRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await getRoom(params.id)
        setRoom(data)
      } catch (err) {
        setError('Error al cargar la habitación')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRoom()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error || !room) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error || 'Habitación no encontrada'}</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-w-16 aspect-h-9 relative rounded-lg overflow-hidden">
              {room.images[0] && (
                <Image
                  src={room.images[0]}
                  alt={room.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {room.images.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  className="aspect-w-16 aspect-h-9 relative rounded-lg overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`${room.title} - Imagen ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{room.title}</h1>
              <p className="mt-2 text-gray-600">{room.location}</p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-primary-600">
                  {room.price}€/mes
                </p>
                <p className="text-sm text-gray-500">
                  Disponible desde{' '}
                  {format(new Date(room.availableFrom), 'd MMM yyyy', {
                    locale: es,
                  })}
                </p>
              </div>
              <button className="btn-primary">Reservar ahora</button>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Descripción
              </h2>
              <p className="text-gray-600 whitespace-pre-line">{room.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Características
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {room.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center space-x-2 text-gray-600"
                  >
                    <svg
                      className="h-5 w-5 text-primary-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 