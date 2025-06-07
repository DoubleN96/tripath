export type Room = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  amenities: string[];
  availableFrom: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function getRooms(params?: {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
}): Promise<Room[]> {
  const queryParams = new URLSearchParams();
  if (params?.location) queryParams.append('location', params.location);
  if (params?.checkIn) queryParams.append('checkIn', params.checkIn);
  if (params?.checkOut) queryParams.append('checkOut', params.checkOut);
  if (params?.guests) queryParams.append('guests', params.guests);

  const response = await fetch(`${API_URL}/rooms?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error('Error al obtener las habitaciones');
  }

  return response.json();
}

export async function getRoom(id: string): Promise<Room> {
  const response = await fetch(`${API_URL}/rooms/${id}`);
  if (!response.ok) {
    throw new Error('Error al obtener la habitación');
  }

  return response.json();
} 