'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Room, getRooms } from '@/services/api';

interface SearchBarProps {
  onSearch: (rooms: Room[]) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: '1',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const params: { [key: string]: string } = {};
      if (searchParams.location) params.location = searchParams.location;
      if (searchParams.checkIn) params.checkIn = searchParams.checkIn;
      if (searchParams.checkOut) params.checkOut = searchParams.checkOut;
      if (searchParams.guests) params.guests = searchParams.guests;

      const data = await getRooms(params);
      onSearch(data);

      const queryString = new URLSearchParams(searchParams).toString();
      router.push(`/search?${queryString}`);

    } catch (error) {
      console.error("Error al buscar habitaciones:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <label htmlFor="location" className="sr-only">
            Ubicación
          </label>
          <input
            type="text"
            name="location"
            id="location"
            className="input-primary"
            placeholder="¿Dónde quieres alojarte?"
            value={searchParams.location}
            onChange={(e) =>
              setSearchParams({ ...searchParams, location: e.target.value })
            }
          />
        </div>
        <div className="flex-1">
          <label htmlFor="checkIn" className="sr-only">
            Fecha de entrada
          </label>
          <input
            type="date"
            name="checkIn"
            id="checkIn"
            className="input-primary"
            value={searchParams.checkIn}
            onChange={(e) =>
              setSearchParams({ ...searchParams, checkIn: e.target.value })
            }
          />
        </div>
        <div className="flex-1">
          <label htmlFor="checkOut" className="sr-only">
            Fecha de salida
          </label>
          <input
            type="date"
            name="checkOut"
            id="checkOut"
            className="input-primary"
            value={searchParams.checkOut}
            onChange={(e) =>
              setSearchParams({ ...searchParams, checkOut: e.target.value })
            }
          />
        </div>
        <div className="flex-1">
          <label htmlFor="guests" className="sr-only">
            Huéspedes
          </label>
          <select
            id="guests"
            name="guests"
            className="input-primary"
            value={searchParams.guests}
            onChange={(e) =>
              setSearchParams({ ...searchParams, guests: e.target.value })
            }
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'huésped' : 'huéspedes'}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn-primary">
          <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
          Buscar
        </button>
      </div>
    </form>
  );
} 