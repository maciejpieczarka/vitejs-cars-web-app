import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import type { Car } from '../models/Car';
import { getCarById, updateCar } from '../services/carService';
import CarForm from '../components/CarForm';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const EditCarPage = () => {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    if (!id) return;
    const fetchCar = async () => {
      try {
        setLoading(true);
        setError(null);

        const carResponse = await getCarById(id, controller.signal);
        setCar(carResponse);
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Wystapil nieoczekiwany blad');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCar();

    return () => {
      controller.abort();
    };
  }, [id]);

  const handleUpdateCar = async (formData: Omit<Car, 'id'>) => {
    if (!id) return;

    const updatedCar: Car = {
      ...formData,
      id
    };

    try {
      setSaving(true);
      setError(null);

      await updateCar(id, updatedCar);

      navigate(`/cars/${id}`);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Wystąpił nieoczekiwany błąd'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 gap-2 inline-flex items-center text-sm font-semibold text-slate-50 hover:text-slate-300 transition-colors"
      >
        <FaArrowLeft />
        Powrót
      </button>
      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-slate-900 border-r-transparent mb-4" />
          <p className="text-slate-500 font-medium">
            Ładowanie szczegółów pojazdu...
          </p>
        </div>
      ) : car ? (
        <CarForm
          title={`Edytuj pojazd ${car.id}`}
          key={car.id}
          initialData={car}
          onSubmit={handleUpdateCar}
          submitButtonLabel="Zapisz zmiany"
          isSubmitting={saving}
        />
      ) : (
        <div>
          <h1 className="text-2xl font-black mb-2">Nie odnaleziono pojazdu </h1>
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default EditCarPage;
