import React, { useState } from 'react';
import type { Car, NewCar } from '../models/Car';

interface CarFormProps {
  initialData?: Car | null;
  title: string;
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
  title,
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
      className="bg-white rounded-2xl shadow-sm shadow-slate-50 border border-slate-200 overflow-hidden text-slate-900"
    >
      <div className="relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-slate-50 p-8 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold ">{title}</h1>
      </div>

      <div className="px-8 sm:px-10 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Marka */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="brand"
              className="text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Marka <span className="text-rose-500">*</span>
            </label>
            <input
              id="brand"
              name="brand"
              type="text"
              value={formData.brand}
              onChange={handleChange}
              placeholder="np. Toyota, BMW"
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 shadow-sm transition-all outline-none hover:border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
          </div>

          {/* Model */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="model"
              className="text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Model <span className="text-rose-500">*</span>
            </label>
            <input
              id="model"
              name="model"
              type="text"
              value={formData.model}
              onChange={handleChange}
              placeholder="np. Corolla, Seria 3"
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 shadow-sm transition-all outline-none hover:border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
          </div>

          {/* Liczba drzwi */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="doorsNumber"
              className="text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Liczba drzwi <span className="text-rose-500">*</span>
            </label>
            <input
              id="doorsNumber"
              name="doorsNumber"
              type="number"
              min="1"
              value={formData.doorsNumber}
              onChange={handleChange}
              placeholder="np. 5"
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 shadow-sm transition-all outline-none hover:border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
          </div>

          {/* Pojemność bagażnika */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="luggageCapacity"
              className="text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Pojemność bagażnika (l) <span className="text-rose-500">*</span>
            </label>
            <input
              id="luggageCapacity"
              name="luggageCapacity"
              type="number"
              min="0"
              value={formData.luggageCapacity}
              onChange={handleChange}
              placeholder="np. 450"
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 shadow-sm transition-all outline-none hover:border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
          </div>

          {/* Pojemność silnika */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="engineCapacity"
              className="text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Pojemność silnika (cm³) <span className="text-rose-500">*</span>
            </label>
            <input
              id="engineCapacity"
              name="engineCapacity"
              type="number"
              min="0"
              value={formData.engineCapacity}
              onChange={handleChange}
              placeholder="np. 1998"
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 shadow-sm transition-all outline-none hover:border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
          </div>

          {/* Średnie spalanie */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="averageFuelConsumption"
              className="text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Średnie spalanie (l/100km){' '}
              <span className="text-rose-500">*</span>
            </label>
            <input
              id="averageFuelConsumption"
              name="averageFuelConsumption"
              type="number"
              step="0.1"
              min="0"
              value={formData.averageFuelConsumption}
              onChange={handleChange}
              placeholder="np. 6.5"
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 shadow-sm transition-all outline-none hover:border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
          </div>

          {/* Rodzaj paliwa */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="fuelType"
              className="text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Rodzaj paliwa <span className="text-rose-500">*</span>
            </label>
            <select
              id="fuelType"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 shadow-sm transition-all outline-none hover:border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            >
              <option value="" disabled>
                Wybierz rodzaj paliwa...
              </option>
              <option value={1}>Benzyna</option>
              <option value={2}>Diesel</option>
              <option value={3}>LPG</option>
              <option value={4}>Elektryczny</option>
              <option value={5}>Hybryda</option>
            </select>
          </div>

          {/* Typ nadwozia */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="bodyType"
              className="text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Typ nadwozia <span className="text-rose-500">*</span>
            </label>
            <select
              id="bodyType"
              name="bodyType"
              value={formData.bodyType}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 shadow-sm transition-all outline-none hover:border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            >
              <option value="" disabled>
                Wybierz typ nadwozia...
              </option>
              <option value={1}>Sedan</option>
              <option value={2}>Kombi</option>
              <option value={3}>Hatchback</option>
              <option value={4}>SUV</option>
              <option value={5}>Coupe</option>
            </select>
          </div>

          {/* Data produkcji - rozciągnięta na 2 kolumny na desktopie */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label
              htmlFor="productionDate"
              className="text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Data produkcji <span className="text-rose-500">*</span>
            </label>
            <input
              id="productionDate"
              name="productionDate"
              type="date"
              value={formData.productionDate}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 shadow-sm transition-all outline-none hover:border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mx-8 sm:mx-10 mb-6 bg-green-300 hover:bg-green-400 px-4 py-2 rounded-lg"
      >
        {isSubmitting ? 'Zapisywanie...' : submitButtonLabel}
      </button>
    </form>
  );
};

export default CarForm;
