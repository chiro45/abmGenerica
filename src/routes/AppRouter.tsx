import { Route, Routes } from "react-router-dom";
import { ScreenPersona } from "../components/pages/ScreenPersona";
import { NavBar } from "../components/ui/NavBar/NavBar";

export const AppRouter = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ScreenPersona />} />
      </Routes>
    </>
  );
};
