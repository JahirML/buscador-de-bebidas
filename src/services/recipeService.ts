import axios from "axios";
import {
  CategoryApiResponseSchema,
  DrinksAPIResponse,
  RecipeAPIResponseSchema,
} from "../utils/recipes-schema";
import type { Drink, SearchFilter } from "../types";

export async function getCategories() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

  const { data } = await axios(url);
  const result = CategoryApiResponseSchema.safeParse(data);
  //   console.log(result);
  if (result.success) {
    return result.data;
  }
}

export async function getRecipe(filters: SearchFilter) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`;

  const { data } = await axios(url);
  // console.log(data);
  const result = DrinksAPIResponse.safeParse(data);
  // console.log(result);
  if (result.success) {
    return result.data;
  }
}

export async function getRecipeCocktail(id: Drink["idDrink"]) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  const { data } = await axios(url);
  // console.log(data);
  const result = RecipeAPIResponseSchema.safeParse(data.drinks[0]);
  // console.log(result);
  if (result.success) {
    return result.data;
  }
}
