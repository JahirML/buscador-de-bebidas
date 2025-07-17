import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";

import IndexPage from "./pages/IndexPage";
import FavoritesPage from "./pages/FavoritesPage";
import Applayout from "./pages/Applayout";
import "./app.css"; // Assuming you have some global styles

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Applayout />}>
          <Route path="/" index element={<IndexPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-center"
        closeOnClick={true}
        autoClose={3000}
      />
    </BrowserRouter>
  );
}

export default App;
