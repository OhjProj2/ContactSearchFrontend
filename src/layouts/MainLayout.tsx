import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function MainLayout() {
  return (
    <>
      <Header />
      <main className="p-6 max-w-7xl m-auto">
        <Outlet />
      </main>
      
    </>
  );
}