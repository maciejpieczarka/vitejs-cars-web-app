import axios from 'axios';
import type { Car, NewCar } from '../models/Car';

import { apiClient } from '../api/apiCLient';

function createServiceError(err: unknown, message: string): Error {
  if (axios.isAxiosError(err)) {
    if (err.response) {
      return new Error(`${message} Status HTTP: ${err.response.status}.`, {
        cause: err
      });
    }

    if (err.request) {
      return new Error(`${message} Brak odpowiedzi z serwera.`, { cause: err });
    }

    return new Error(`${message}, ${err.message}`, { cause: err });
  }

  return new Error(message, { cause: err });
}

export async function getCars(signal?: AbortSignal): Promise<Car[]> {
  try {
    const response = await apiClient.get<Car[]>('/cars', { signal });
    return response.data;
  } catch (err) {
    if (axios.isCancel(err)) {
      throw err;
    }

    throw createServiceError(err, 'nie udalo sie pobrać samochodów');
  }
}

export async function getCarById(
  id: string,
  signal?: AbortSignal
): Promise<Car> {
  try {
    const response = await apiClient<Car>(`/cars/${id}`, { signal });

    return response.data;
  } catch (err) {
    if (axios.isCancel(err)) {
      throw err;
    }

    throw createServiceError(err, 'Nie udalo sie pobrac samochodu');
  }
}

export async function createCar(car: NewCar): Promise<Car> {
  try {
    const response = await apiClient.post<Car>('/cars', car);

    return response.data;
  } catch (err) {
    throw createServiceError(err, 'Nie udalo sie dodac samochodu');
  }
}

export async function updateCar(id: string, car: NewCar): Promise<void> {
  try {
    await apiClient.put<Car>(`/cars/${id}`, car);
  } catch (err) {
    throw createServiceError(err, 'Nie udalo sie zaaktualizowac samochodu');
  }
}

export async function deleteCar(id: string): Promise<void> {
  try {
    await apiClient.delete(`/cars/${id}`);
  } catch (err) {
    throw createServiceError(err, 'Nie udalo sie usunac samochodu');
  }
}
