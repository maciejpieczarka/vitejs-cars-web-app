import React, { useEffect, useState } from 'react';
import { getCars } from '../services/carService';
import type { Car } from '../models/Car';
import CarCard from '../components/CarCard';
import { useNavigate } from 'react-router';
import { FaPlus } from 'react-icons/fa';

const CarsPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function loadCars() {
      const loadedCars = await getCars();
      setCars(loadedCars);
    }

    loadCars();
  }, []);
  return (
    <div className="flex items-center flex-col justify-center my-10 px-10 gap-4 overflow-scroll">
      {cars.length > 0 ? (
        cars.map(car => (
          <CarCard id={car.id} brand={car.brand} model={car.model} />
        ))
      ) : (
        <p>Brak samochodów w bazie danych</p>
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
