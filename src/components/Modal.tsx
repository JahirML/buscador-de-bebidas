import { useEffect, useRef, type JSX } from "react";
import { useAppStore } from "../stores/useAppStore";
import type { Recipe } from "../types";

function Modal() {
  const ref = useRef<HTMLDivElement>(null);
  const { selectedRecipe, closeModal } = useAppStore((state) => state);
  const { strDrink, strDrinkThumb, strInstructions } = selectedRecipe;
  // console.log(selectedRecipe);

  const handleClickFavorite = useAppStore((state) => state.handleClickFavorite);
  const favoriteExists = useAppStore((state) => state.favoriteExists);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);
  useEffect(() => {
    document.body.style.overflow = selectedRecipe ? "hidden" : "scroll";

    return () => {
      document.body.style.overflow = "scroll";
    };
  }, [selectedRecipe]);

  function handleClickOutside(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target === ref.current) {
      closeModal();
    }
  }

  function renderIngredients() {
    const ingredients: JSX.Element[] = [];

    for (let i = 1; i <= 6; i++) {
      const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe];
      const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe];
      // ingredients = [...ingredients];
      if (ingredient && measure) {
        ingredients.push(
          <li key={i} className="mb-2 flex items-center gap-2">
            <span className="font-semibold text-orange-500">&gt;</span>
            <span className="font-semibold">{ingredient}-</span>
            <span className="text-gray-600">{measure}</span>
          </li>,
        );
      }
    }
    return ingredients;
  }

  // function addFavorite() {}

  return (
    <div
      ref={ref}
      onClick={handleClickOutside}
      className="fixed top-0 left-0 z-50 flex h-dvh w-full bg-black/[.8] backdrop-blur-sm"
    >
      <section className="relative z-0 m-auto h-[80%] w-[90%] max-w-[500px] rounded-lg bg-white text-gray-900 shadow-2xl transition-all md:w-[40%] xl:w-[30%]">
        <div className="custom-scroll h-full overflow-y-scroll rounded-t-lg">
          <div className="overflow-hidden rounded-t-lg shadow-lg">
            <img
              src={strDrinkThumb}
              alt={`${strDrink} imagen`}
              className="w-full bg-cover bg-center transition-all hover:scale-110"
            />
          </div>
          <div className="mt-5 p-2">
            <h3 className="mb-5 text-center text-lg font-bold uppercase">
              {strDrink}
            </h3>
            <h4 className="mb-3 font-semibold uppercase">Instrucciones</h4>
            <p className="">{strInstructions ? strInstructions : ""}</p>
            <h4 className="mb-3 font-semibold uppercase">Ingredientes</h4>

            <ul>{renderIngredients()}</ul>
          </div>
          <div className="mt-5 flex justify-between gap-3 p-5">
            <button
              onClick={closeModal}
              className="w-full rounded-md bg-red-700 p-2 text-white shadow-lg transition-all hover:bg-red-800 hover:ring-2 hover:ring-red-800 hover:ring-offset-2"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                handleClickFavorite(selectedRecipe);
                closeModal();
              }}
              className="w-full rounded-md bg-orange-500 p-2 text-white hover:bg-orange-600 hover:ring-2 hover:ring-orange-600 hover:ring-offset-2"
            >
              {favoriteExists(selectedRecipe.idDrink)
                ? "Eliminar favorito"
                : "Agregar favorito"}
            </button>
          </div>
        </div>
        <button
          onClick={closeModal}
          className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-red-700 p-2 text-center font-bold text-white"
        >
          X
        </button>
      </section>
    </div>
  );
}

export default Modal;
