import React, { useEffect, useState } from 'react';
import type { Car } from '../models/Car';
import { getCarById } from '../services/carService';
import { useNavigate, useParams } from 'react-router';

type detailsParams = {
  id: string;
};

const CarDetailsPage = () => {
  const [car, setCar] = useState<Car>();
  const params = useParams<detailsParams>();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCar() {
      const loadedCar = await getCarById(params.id!);
      setCar(loadedCar);
    }
    loadCar();
  });

  return (
    <div className="flex  flex-col gap-2 items-start">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-700 px-6 py-2 rounded-lg cursor-pointer"
      >
        Powrot
      </button>
      {car ? (
        <>
          <h1 className="text-2xl font-black">Dane Samochodu</h1>
          <p>Marka: {car.brand}</p>
          <p>Model: {car.model}</p>
          <p>Ilosc drzwi: {car.doorsNumber}</p>
          <p>Pojemnosc bagazu: {car.luggageCapacity}</p>
          <p>Pojemnosc silnika: {car.engineCapacity}</p>
          <p>Typ paliwa: {car.fuelType}</p>
          <p>Nadwozie: {car.bodyType}</p>
          <p>Data produkcji: {car.productionDate}</p>
          <p>Srednie spalanie: {car.averageFuelConsumption}</p>
        </>
      ) : (
        <h1>Nie udalo sie wczytac daych pojazdu</h1>
      )}
    </div>
  );
};

export default CarDetailsPage;
