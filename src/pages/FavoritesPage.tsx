import { useMemo } from "react";
import DrinkCard from "../components/DrinkCard";
import { useAppStore } from "../stores/useAppStore";

function FavoritesPage() {
  const { favorites } = useAppStore((state) => state);

  const hasFavorites = useMemo(() => favorites.length, [favorites]);

  return (
    <>
      <h1 className="text-4xl font-black">Your Favorite Drinks</h1>
      {hasFavorites ? (
        <div>
          <div className="mx-auto my-10 mt-10 grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((drink) => (
              <DrinkCard key={drink.idDrink} drink={drink} />
            ))}
          </div>
        </div>
      ) : (
        <p className="my-10 text-center text-xl">
          Los favoritos se mostrarán aquí
        </p>
      )}
    </>
  );
}

export default FavoritesPage;
