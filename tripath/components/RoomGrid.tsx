'use client';

import { useEffect, useState } from 'react';
import { RoomCard } from './RoomCard';
import { getRooms } from '@/services/api';
import type { Room } from '@/services/api';

interface RoomGridProps {
  initialRooms?: Room[];
}

export function RoomGrid({ initialRooms }: RoomGridProps) {
  const [rooms, setRooms] = useState<Room[]>(initialRooms || []);
  const [loading, setLoading] = useState(!initialRooms);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialRooms) {
      const fetchRooms = async () => {
        try {
          const data = await getRooms();
          setRooms(data);
        } catch (err) {
          setError('Error al cargar las habitaciones');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchRooms();
    }
  }, [initialRooms]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No se encontraron habitaciones disponibles</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
} 