import React, { useEffect, useState } from 'react';
import type { Car } from '../models/Car';
import { getCarById } from '../services/carService';
import { useNavigate, useParams } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

type DetailsParams = {
  id: string;
};

const CarDetailsPage = () => {
  const [car, setCar] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams<DetailsParams>();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    async function loadCar() {
      if (!params.id) return;
      try {
        setIsLoading(true);
        setError(null);
        const loadedCar = await getCarById(params.id, controller.signal);
        setCar(loadedCar);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }

        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Wystapil nieznany blad');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }
    loadCar();

    return () => {
      controller.abort();
    };
  }, [params.id]);

  const fuelTypes = ['Benzyna', 'Diesel', 'Hybryda', 'Elektryczny', 'LPG'];
  const bodyTypes = ['Sedan', 'Kombi', 'Hatchback', 'SUV', 'Coupe'];

  const specs = car
    ? [
        { label: 'Nadwozie', value: bodyTypes[car.bodyType] },
        {
          label: 'Rok produkcji',
          value: new Date(car.productionDate).toLocaleDateString()
        },
        { label: 'Paliwo', value: fuelTypes[car.fuelType] },
        { label: 'Pojemność silnika', value: `${car.engineCapacity} cm³` },
        {
          label: 'Średnie spalanie',
          value: `${car.averageFuelConsumption} l/100km`
        },
        { label: 'Pojemność bagażnika', value: `${car.luggageCapacity} l` },
        { label: 'Liczba drzwi', value: car.doorsNumber }
      ]
    : [];

  if (error) {
    return <div>Wystapil blad: {error}</div>;
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 gap-2 inline-flex items-center text-sm font-semibold text-slate-50 hover:text-slate-300 transition-colors"
        >
          <FaArrowLeft />
          Powrót
        </button>

        {isLoading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-slate-900 border-r-transparent mb-4" />
            <p className="text-slate-500 font-medium">
              Ładowanie szczegółów pojazdu...
            </p>
          </div>
        ) : car ? (
          <div className="bg-white rounded-2xl shadow-sm shadow-slate-50 border border-slate-200 overflow-hidden">
            <div className="relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-slate-50 p-8 sm:p-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 overflow-hidden">
              <div className="relative z-10">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                  {car.brand}
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">
                  {car.model}
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                  ID pojazdu: #{params.id}
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-center p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 w-28 h-28 shrink-0">
                <img
                  src="../../assets/car.svg"
                  alt={`${car.brand} ${car.model}`}
                />
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                Specyfikacja techniczna
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {specs.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between hover:border-slate-200 transition-colors"
                  >
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      {item.label}
                    </span>
                    <span className="text-base font-semibold text-slate-800 mt-1">
                      {item.value || '—'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-12 text-center">
            <h2 className="text-xl font-bold text-slate-900">
              Nie udało się wczytać danych pojazdu
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Pojazd o podanym identyfikatorze nie istnieje lub wystąpił błąd
              połączenia z serwerem.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="mt-6 px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Wróć do listy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetailsPage;
