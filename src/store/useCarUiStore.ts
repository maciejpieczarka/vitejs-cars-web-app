import { create } from 'zustand';

import { persist } from 'zustand/middleware';

interface CarUiStore {
  searchTerm: string;
  showFavoritesOnly: boolean;
  favoriteCarIds: string[];

  setSearchTerm: (val: string) => void;
  setShowFavoritesOnly: (val: boolean) => void;
  toggleFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
}

export const useCarUiStore = create<CarUiStore>()(
  persist(
    set => ({
      searchTerm: '',
      showFavoritesOnly: false,
      favoriteCarIds: [],

      setSearchTerm: term => {
        set({
          searchTerm: term
        });
      },

      setShowFavoritesOnly: val => {
        set({
          showFavoritesOnly: val
        });
      },
      toggleFavorite: id => {
        set(state => ({
          favoriteCarIds: state.favoriteCarIds.includes(id)
            ? state.favoriteCarIds.filter(item => item !== id)
            : [...state.favoriteCarIds, id]
        }));
      },
      removeFavorite: id => {
        set(state => ({
          favoriteCarIds: state.favoriteCarIds.filter(item => item !== id)
        }));
      },
      clearFavorites: () => {
        set({
          favoriteCarIds: []
        });
      }
    }),
    {
      name: 'cars-ui-store',
      partialize: state => ({
        favoriteCarIds: state.favoriteCarIds
      })
    }
  )
);
