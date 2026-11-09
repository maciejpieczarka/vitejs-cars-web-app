import React from 'react';
import { useNavigate } from 'react-router';
import { deleteCar } from '../services/carService';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useCarUiStore } from '../store/useCarUiStore';

type CarProps = {
  id: string;
  brand: string;
  model: string;
  onDelete: (val: string) => void;
};

const CarCard = ({ id, brand, model, onDelete }: CarProps) => {
  const navigate = useNavigate();
  const removeFavorite = useCarUiStore(state => state.removeFavorite);
  const isFavorite = useCarUiStore(state => state.favoriteCarIds.includes(id));
  const toggleFavorite = useCarUiStore(state => state.toggleFavorite);

  const handleDelete = (carBrand: string, carModel: string, carId: string) => {
    if (
      window.confirm(
        `Czy na pewno chcesz usunac pojazd ${carBrand} ${carModel}?`
      )
    ) {
      deleteCar(carId);
      removeFavorite(carId);
      onDelete(carId);
    }
  };

  return (
    <div className="w-full bg-gray-700 p-5 flex rounded-lg  items-center justify-between shadow-lg">
      <div>
        <h2 className="text-3xl">{brand}</h2>
        <h3 className="text-lg">{model}</h3>
      </div>

      <div className="inline-flex gap-4 ">
        <button
          onClick={() => navigate(`/cars/${id}`)}
          data-width="full"
          className="bg-gray-100 hover:bg-gray-300 text-gray-950 font-semibold py-2 px-4 rounded"
        >
          Szczegóły
        </button>
        <button
          onClick={() => navigate(`/cars/${id}/edit`)}
          data-width="full"
          className="bg-gray-100 hover:bg-gray-300 text-gray-950 font-semibold py-2 px-4 rounded"
        >
          Edytuj
        </button>
        <button
          onClick={() => handleDelete(brand, model, id)}
          data-width="full"
          className="bg-red-400 hover:bg-red-500 text-gray-950 font-semibold py-2 px-4 rounded"
        >
          Usuń
        </button>

        <button onClick={() => toggleFavorite(id)} type="button">
          {isFavorite ? <FaStar /> : <FaRegStar />}
        </button>
      </div>
    </div>
  );
};

export default CarCard;
