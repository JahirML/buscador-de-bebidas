// import { Drink } from "./../types/index";
// import { type  } from "./../types/index";
import type { StateCreator } from "zustand";
import {
  getCategories,
  getRecipe,
  getRecipeCocktail,
} from "../services/recipeService";
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types";

export type RecipeSliceType = {
  categories: Categories;
  drinks: Drinks;
  selectedRecipe: Recipe;
  modal: boolean;
  fetchCategories: () => Promise<void>;
  searchRecipes: (searchFilter: SearchFilter) => Promise<void>;
  selectRecipe: (id: Drink["idDrink"]) => Promise<void>;
  closeModal: () => void;
};
// state creator nos permite definir con un type el estado y las acciones de nuestro slice
// en este caso, el estado es categories y la acción es fetchCategories
export const createRecipeSlice: StateCreator<RecipeSliceType> = (set) => ({
  categories: { drinks: [] },
  drinks: { drinks: [] },
  selectedRecipe: {} as Recipe,
  modal: false,
  fetchCategories: async () => {
    const categories = await getCategories();
    // console.log(categories);

    set({
      categories, // Ensure we handle the case where drinks might be undefined
    });
  },
  searchRecipes: async (filters) => {
    const drinks = await getRecipe(filters);
    set({
      drinks, // Ensure we handle the case where drinks might be undefined
    });
  },
  selectRecipe: async (id) => {
    const selectedRecipe = await getRecipeCocktail(id);
    set({ selectedRecipe, modal: true });
  },
  closeModal: () => {
    set({
      selectedRecipe: {} as Recipe,
      modal: false, // Close the modal by setting it to false
    });
  },
});
