import React, { useEffect, useState } from 'react';
import { getCars } from '../services/carService';
import type { Car } from '../models/Car';
import CarCard from '../components/CarCard';
import { useNavigate } from 'react-router';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { useCarUiStore } from '../store/useCarUiStore';

const CarsPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  //Zustand
  const searchTerm = useCarUiStore(state => state.searchTerm);
  const setSearchTerm = useCarUiStore(state => state.setSearchTerm);
  const showFavoritesOnly = useCarUiStore(state => state.showFavoritesOnly);
  const setShowFavoritesOnly = useCarUiStore(
    state => state.setShowFavoritesOnly
  );
  const favoriteCarIds = useCarUiStore(state => state.favoriteCarIds);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const visibleCars = cars.filter(car => {
    const matchesSeach =
      car.brand.toLowerCase().includes(normalizedSearch) ||
      car.model.toLowerCase().includes(normalizedSearch);

    const matchesFavorite =
      !showFavoritesOnly || favoriteCarIds.includes(car.id);

    return matchesSeach && matchesFavorite;
  });

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
      <div className=" w-full flex items-center py-2 justify-between">
        <label
          htmlFor="favoritesCheckbox"
          className="inline-flex gap-2 bg-slate-50 py-2 px-4 rounded-2xl"
        >
          <input
            type="checkbox"
            id="favoritesCheckbox"
            onChange={e => {
              setShowFavoritesOnly(e.target.checked);
            }}
          />
          <p className="font-bold text-slate-950">Tylko ulubione</p>
        </label>

        <input
          type="search"
          placeholder="Szukaj samochodu po marce lub modelu..."
          className="bg-slate-50 text-slate-950 py-2 px-4 w-1/2 rounded-2xl overflow-hidden"
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      {cars.length > 0 ? (
        visibleCars.map(car => (
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
