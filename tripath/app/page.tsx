'use client';

import { useState } from 'react';
import { SearchBar } from "@/components/SearchBar";
import { RoomGrid } from "@/components/RoomGrid";
import { Map } from "@/components/Map";
import { Room } from '@/services/api';

export default function Home() {
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Encuentra tu próxima habitación
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl">
            Miles de habitaciones en alquiler en toda España. Reserva tu estancia con confianza.
          </p>
        </div>
        <SearchBar onSearch={setFilteredRooms} />
        <RoomGrid initialRooms={filteredRooms} />
      </div>
    </main>
  );
}
