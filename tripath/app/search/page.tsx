'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { RoomGrid } from '@/components/RoomGrid'
import { SearchBar } from '@/components/SearchBar'
import type { Room } from '@/services/api'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const params = new URLSearchParams()
        const location = searchParams.get('location')
        const checkIn = searchParams.get('checkIn')
        const checkOut = searchParams.get('checkOut')
        const guests = searchParams.get('guests')

        if (location) params.append('location', location)
        if (checkIn) params.append('checkIn', checkIn)
        if (checkOut) params.append('checkOut', checkOut)
        if (guests) params.append('guests', guests)

        const response = await fetch(`/api/rooms?${params.toString()}`)
        if (!response.ok) {
          throw new Error('Error al buscar habitaciones')
        }

        const data = await response.json()
        setRooms(data)
      } catch (err) {
        setError('Error al buscar habitaciones')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [searchParams])

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Resultados de búsqueda
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl">
            Encontramos {rooms.length} habitaciones que coinciden con tu búsqueda
          </p>
        </div>
        <SearchBar />
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <RoomGrid />
        )}
      </div>
    </main>
  )
} 