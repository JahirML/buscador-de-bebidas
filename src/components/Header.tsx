import Navbar from "./Navbar";
import { useLocation } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { useAppStore } from "../stores/useAppStore";

function Header() {
  const [searchFilter, setSearchFilter] = useState({
    ingredient: "",
    category: "",
  });
  const { pathname } = useLocation();

  const isHome = useMemo(() => pathname === "/", [pathname]);

  const { fetchCategories, categories, searchRecipes } = useAppStore(
    (state) => state,
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    setSearchFilter({
      ...searchFilter,
      [name]: value,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (Object.values(searchFilter).includes("")) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    // !consultar recetas
    searchRecipes(searchFilter);
  }

  return (
    <header className={`${isHome ? "header-bg" : "bg-slate-800"} `}>
      <div className="container mx-auto px-5 py-16">
        <div className="flex items-center justify-between">
          <div>
            <img src="/logo.svg" alt="Logotipo" className="w-32" />
          </div>
          <Navbar />
        </div>

        {isHome && (
          <form
            onSubmit={handleSubmit}
            className="my-32 space-y-6 rounded-lg bg-orange-400 p-10 shadow md:w-1/2 2xl:w-1/3"
          >
            <div className="space-y-4">
              <label
                // id="ingredient"
                htmlFor="ingredient"
                className="block font-extrabold text-white uppercase"
              >
                Nombre o Ingredientes
              </label>
              <input
                type="text"
                placeholder="Nombre o ingrediente. Ej: Vodka, Café, Tequila..."
                id="ingredient"
                name="ingredient"
                className="w-full rounded-lg bg-slate-100 p-3 focus:outline-none"
                onChange={handleChange}
                value={searchFilter.ingredient}
              />
            </div>
            <div className="space-y-4">
              <label
                htmlFor="category"
                className="block font-extrabold text-white uppercase"
              >
                Categoria
              </label>
              <select
                id="category"
                name="category"
                className="w-full rounded-lg bg-slate-100 p-3 focus:outline-none"
                onChange={handleChange}
                value={searchFilter.category}
              >
                <option value="">Selecciona una categoría</option>
                {categories?.drinks?.map((cat) => (
                  <option key={cat.strCategory} value={cat.strCategory}>
                    {cat.strCategory}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value="Buscar Recetas"
              className="w-full cursor-pointer rounded-lg bg-orange-800 p-2 font-extrabold text-slate-100 uppercase transition-all hover:bg-orange-900"
            />
          </form>
        )}
      </div>
    </header>
  );
}

export default Header;
