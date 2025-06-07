'use client'

import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import type { Room } from '@/services/api'

type RoomCardProps = {
  room: Room
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <Link href={`/rooms/${room.id}`}>
      <div className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        <div className="aspect-w-16 aspect-h-9 relative">
          {room.images[0] && (
            <Image
              src={room.images[0]}
              alt={room.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {room.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {room.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary-600">
              {room.price}€/mes
            </span>
            <span className="text-sm text-gray-500">
              Disponible desde{' '}
              {format(new Date(room.availableFrom), 'd MMM yyyy', {
                locale: es,
              })}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {room.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
              >
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                +{room.amenities.length - 3} más
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
} 