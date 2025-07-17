import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore";
import DrinkCard from "../components/DrinkCard";

function IndexPage() {
  const { drinks } = useAppStore((state) => state);

  const hasDrinks = useMemo(() => drinks.drinks.length > 0, [drinks]);

  return (
    <div>
      <h1 className="text-4xl font-extrabold">Recetas</h1>
      {hasDrinks ? (
        <div className="mx-auto my-10 mt-10 grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {drinks.drinks.map((drink) => (
            <DrinkCard key={drink.idDrink} drink={drink} />
          ))}
        </div>
      ) : (
        <p className="my-10 text-center text-2xl">
          No hay resultados aún, utiliza el formulario para buscar
        </p>
      )}
    </div>
  );
}

export default IndexPage;
