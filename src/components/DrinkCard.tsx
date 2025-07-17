import { useAppStore } from "../stores/useAppStore";
import type { Drink } from "../types";

type DrinkCardProps = {
  drink: Drink;
};

function DrinkCard({ drink }: DrinkCardProps) {
  const { selectRecipe, favoriteExists } = useAppStore((state) => state);
  const { idDrink } = drink;
  return (
    <div className="relative rounded-lg shadow-xl">
      <div className="overflow-hidden rounded-t-lg">
        <img
          src={drink.strDrinkThumb}
          alt={`Imagen de ${drink.strDrink}`}
          className="transition-all hover:scale-125 hover:rotate-2"
        />
      </div>
      <div className="p-5">
        <h2 className="truncate text-2xl font-black">{drink.strDrink}</h2>
        <button
          type="button"
          className="mt-5 w-full rounded-lg bg-orange-400 p-3 text-lg font-bold text-orange-100 transition-all hover:bg-orange-500 hover:ring-2 hover:ring-orange-500 hover:ring-offset-2"
          onClick={() => selectRecipe(drink.idDrink)}
        >
          Ver receta
        </button>
        {favoriteExists(idDrink) ? (
          <button
            onClick={() => selectRecipe(drink.idDrink)}
            className="flex items-center justify-center"
          >
            <i className="fas fa-bookmark absolute -top-2 -right-2 h-7 w-7 rounded-full bg-orange-500 p-2 text-center text-sm text-white shadow-2xl"></i>
          </button>
        ) : (
          <button
            onClick={() => selectRecipe(drink.idDrink)}
            className="flex items-center justify-center"
          >
            <i className="far fa-bookmark absolute -top-2 -right-2 h-7 w-7 rounded-full bg-orange-500 p-2 text-center text-sm text-white shadow-2xl"></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default DrinkCard;
