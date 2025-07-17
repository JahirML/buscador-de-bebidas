import { create } from "zustand";
import { createRecipeSlice, type RecipeSliceType } from "./recipeSlice";
import { devtools } from "zustand/middleware";
import {
  createFavoritesSlice,
  type FavoritesSliceType,
} from "./favoritesSlice";
import {
  createNotificationSlice,
  type NotificationSliceType,
} from "./notificationsSlice";

export const useAppStore = create<
  RecipeSliceType & FavoritesSliceType & NotificationSliceType
>()(
  devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a),
  })),
);
