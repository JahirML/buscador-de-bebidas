import { type StateCreator } from "zustand";
import type { Recipe } from "../types";
import { toast } from "react-toastify";

export type FavoritesSliceType = {
  favorites: Recipe[];
  //   recipeExists: false;
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExists: (id: Recipe["idDrink"]) => boolean;
  loadFromLocalStorage: () => void;
};

export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (
  set,
  get,
) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    const recipeExists = get().favoriteExists(recipe.idDrink);

    if (recipeExists) {
      set((state) => ({
        favorites: state.favorites.filter(
          (fav) => fav.idDrink !== recipe.idDrink,
        ),
      }));
      toast.error("Eliminado de favoritos");
    } else {
      set((state) => ({
        favorites: [...state.favorites, recipe],
      }));
      toast.success("Añadido a favoritos");
    }
    localStorage.setItem("favorites", JSON.stringify(get().favorites));
  },
  favoriteExists: (id) => {
    return get().favorites.some((favorite) => favorite.idDrink === id);
  },
  loadFromLocalStorage: () => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      set({ favorites: JSON.parse(favorites) });
    }
  },
});
