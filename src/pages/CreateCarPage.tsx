import React, { useState } from 'react';
import CarForm from '../components/CarForm';
import { createCar } from '../services/carService';
import { useNavigate } from 'react-router';
import type { NewCar } from '../models/Car';

export const CreateCarPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateCar = async (carData: NewCar) => {
    try {
      setLoading(true);
      setError(null);

      const createdCar = await createCar(carData);
      navigate(`/cars/${createdCar.id}`);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Wystąpił błąd podczas dodawania pojazdu'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <CarForm
        title="Utwórz pojazd"
        onSubmit={handleCreateCar}
        submitButtonLabel="Dodaj pojazd"
        isSubmitting={loading}
      />
    </div>
  );
};

export default CreateCarPage;
