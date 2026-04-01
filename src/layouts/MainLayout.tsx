import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function MainLayout() {
  return (
    <>
      <Header />
      <main className="pt-6">
        <Outlet />
      </main>
      
    </>
  );
}