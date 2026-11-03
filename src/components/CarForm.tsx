import React, { useState } from 'react';
import type { Car, NewCar } from '../models/Car';

interface CarFormProps {
  initialData?: Car | null;
  onSubmit: (car: NewCar) => Promise<void> | void;
  submitButtonLabel: string;
  isSubmitting?: boolean;
}

interface CarFormData {
  brand: string;
  model: string;
  doorsNumber: number;
  luggageCapacity: number;
  engineCapacity: number;
  fuelType: number;
  productionDate: string;
  averageFuelConsumption: number;
  bodyType: number;
}

const initialFormData = {
  brand: '',
  model: '',
  doorsNumber: 0,
  luggageCapacity: 0,
  engineCapacity: 0,
  fuelType: 0,
  productionDate: '',
  averageFuelConsumption: 0,
  bodyType: 0
};

const CarForm = ({
  initialData,
  onSubmit,
  submitButtonLabel,
  isSubmitting = false
}: CarFormProps) => {
  const [formData, setFormData] = useState<CarFormData>(() => {
    if (!initialData) return initialFormData;
    return {
      brand: initialData.brand ?? '',
      model: initialData.model ?? '',
      doorsNumber: initialData.doorsNumber ?? '',
      luggageCapacity: initialData.luggageCapacity ?? '',
      engineCapacity: initialData.engineCapacity ?? '',
      fuelType: initialData.fuelType ?? '',
      productionDate: initialData.productionDate
        ? initialData.productionDate.slice(0, 10)
        : '',
      averageFuelConsumption: initialData.averageFuelConsumption ?? '',
      bodyType: initialData.bodyType ?? ''
    };
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        type === 'number' || name === 'fuelType' || name === 'bodyType'
          ? value === ''
            ? ''
            : Number(value)
          : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: NewCar = {
      brand: formData.brand,
      model: formData.model,
      doorsNumber: Number(formData.doorsNumber),
      luggageCapacity: Number(formData.luggageCapacity),
      engineCapacity: Number(formData.engineCapacity),
      fuelType: Number(formData.fuelType),
      productionDate: formData.productionDate,
      averageFuelConsumption: Number(formData.averageFuelConsumption),
      bodyType: Number(formData.bodyType)
    };

    await onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        maxWidth: '450px'
      }}
    >
      <div>
        <label htmlFor="brand">Marka:</label>
        <input
          id="brand"
          name="brand"
          type="text"
          value={formData.brand}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="model">Model:</label>
        <input
          id="model"
          name="model"
          type="text"
          value={formData.model}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="doorsNumber">Liczba drzwi:</label>
        <input
          id="doorsNumber"
          name="doorsNumber"
          type="number"
          min="1"
          value={formData.doorsNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="luggageCapacity">Pojemność bagażnika (l):</label>
        <input
          id="luggageCapacity"
          name="luggageCapacity"
          type="number"
          min="0"
          value={formData.luggageCapacity}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="engineCapacity">Pojemność silnika (cm³):</label>
        <input
          id="engineCapacity"
          name="engineCapacity"
          type="number"
          min="0"
          value={formData.engineCapacity}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="fuelType">Rodzaj paliwa:</label>
        <select
          id="fuelType"
          name="fuelType"
          value={formData.fuelType}
          onChange={handleChange}
          required
        >
          <option value="">Wybierz...</option>
          <option value={1}>Benzyna</option>
          <option value={2}>Diesel</option>
          <option value={3}>LPG</option>
          <option value={4}>Elektryczny</option>
          <option value={5}>Hybryda</option>
        </select>
      </div>

      <div>
        <label htmlFor="bodyType">Typ nadwozia:</label>
        <select
          id="bodyType"
          name="bodyType"
          value={formData.bodyType}
          onChange={handleChange}
          required
        >
          <option value="">Wybierz...</option>
          <option value={1}>Sedan</option>
          <option value={2}>Kombi</option>
          <option value={3}>Hatchback</option>
          <option value={4}>SUV</option>
          <option value={5}>Coupe</option>
        </select>
      </div>

      <div>
        <label htmlFor="productionDate">Data produkcji:</label>
        <input
          id="productionDate"
          name="productionDate"
          type="date"
          value={formData.productionDate}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="averageFuelConsumption">
          Średnie spalanie (l/100km):
        </label>
        <input
          id="averageFuelConsumption"
          name="averageFuelConsumption"
          type="number"
          step="0.1"
          min="0"
          value={formData.averageFuelConsumption}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Zapisywanie...' : submitButtonLabel}
      </button>
    </form>
  );
};

export default CarForm;
