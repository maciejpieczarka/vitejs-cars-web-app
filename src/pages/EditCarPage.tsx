import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import type { Car } from '../models/Car';
import { getCarById, updateCar } from '../services/carService';
import CarForm from '../components/CarForm';

const EditCarPage = () => {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const fetchCar = async () => {
      try {
        setLoading(true);
        setError(null);

        const carResponse = await getCarById(id);
        setCar(carResponse);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : 'Wystąpił błąd pobierania'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
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

      const res = await updateCar(id, updatedCar);

      navigate(`/cars/${res.id}`);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Wystąpił nieoczekiwany błąd'
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Ładowanie danych pojazdu...</p>;
  }

  return (
    <div>
      <h2>Edycja pojazdu</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {car ? (
        <CarForm
          key={car.id}
          initialData={car}
          onSubmit={handleUpdateCar}
          submitButtonLabel="Zapisz zmiany"
          isSubmitting={saving}
        />
      ) : (
        <p>Nie znaleziono pojazdu.</p>
      )}
    </div>
  );
};

export default EditCarPage;
