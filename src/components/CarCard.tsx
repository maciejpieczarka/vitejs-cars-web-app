import React from 'react';
import { useNavigate } from 'react-router';
import { deleteCar } from '../services/carService';

type CarProps = {
  id: string;
  brand: string;
  model: string;
};

const CarCard = ({ id, brand, model }: CarProps) => {
  const navigate = useNavigate();

  const handleDelete = (carBrand: string, carModel: string, carId: string) => {
    if (
      window.confirm(
        `Czy na pewno chcesz usunac pojazd ${carBrand} ${carModel}?`
      )
    ) {
      deleteCar(carId);
    }
  };

  return (
    <div className="w-full bg-gray-700 p-5 flex rounded-lg  items-center justify-between">
      <div>
        <h2 className="text-3xl">{brand}</h2>
        <h3 className="text-lg">{model}</h3>
      </div>

      <div className="inline-flex gap-4 ">
        <button
          onClick={() => navigate(`/cars/${id}`)}
          data-width="full"
          className="w-full  bg-white text-black rounded-lg p-2 hover:bg-gray-100 cursor-pointer"
        >
          Details
        </button>
        <button
          onClick={() => navigate(`/cars/${id}/edit`)}
          data-width="full"
          className="w-full  bg-white text-black rounded-lg p-2 hover:bg-gray-100 cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(brand, model, id)}
          data-width="full"
          className="w-full  bg-red-400 text-black rounded-lg p-2  hover:opacity-90 cursor-pointer"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CarCard;
