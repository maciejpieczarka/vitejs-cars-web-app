import React, { useEffect, useState } from 'react';
import { getCars } from '../services/carService';
import type { Car } from '../models/Car';
import CarCard from '../components/CarCard';
import { useNavigate } from 'react-router';

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
        className="bg-green-600 rounded-lg px-4 py-2"
        onClick={() => navigate('/cars/new')}
      >
        Dodaj samochod
      </button>
    </div>
  );
};

export default CarsPage;
