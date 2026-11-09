import React, { useEffect, useState } from 'react';
import { getCars } from '../services/carService';
import type { Car } from '../models/Car';
import CarCard from '../components/CarCard';
import { useNavigate } from 'react-router';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';

const CarsPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const controller = new AbortController();
    async function loadCars() {
      try {
        setIsLoading(true);
        setError(null);

        const loadedCars = await getCars(controller.signal);
        setCars(loadedCars);
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Wystapil nieznany blad');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }
    loadCars();

    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading) {
    return <div>Trwa ladowanie...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex items-center flex-col justify-center my-10 px-10 gap-4 overflow-scroll">
      {cars.length > 0 ? (
        cars.map(car => (
          <CarCard id={car.id} brand={car.brand} model={car.model} />
        ))
      ) : (
        <p>Brak samochodów w bazie danych.</p>
      )}
      <button
        className="inline-flex items-center gap-2 bg-green-300 hover:bg-green-400 text-gray-950 font-semibold py-2 px-4 rounded"
        onClick={() => navigate('/cars/new')}
      >
        <FaPlus />
        Dodaj samochod
      </button>
    </div>
  );
};

export default CarsPage;
