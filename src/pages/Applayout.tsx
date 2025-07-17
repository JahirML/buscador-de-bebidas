import { Outlet } from "react-router";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useAppStore } from "../stores/useAppStore";
import { useEffect } from "react";

function Applayout() {
  const { modal } = useAppStore((state) => state);
  const loadFromLocalStorage = useAppStore(
    (state) => state.loadFromLocalStorage,
  );
  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);
  return (
    <>
      <Header />
      <main className="container mx-auto px-5 py-16">
        <Outlet />
      </main>
      {modal && <Modal />}
    </>
  );
}

export default Applayout;
