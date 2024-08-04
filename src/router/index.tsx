import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../screens/home";
import PlayGround from "../screens/playground";

export interface LayoutProps {
  children: React.ReactNode
}

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/playground" element={<Home />} />

        <Route path="/playground/:id" element={<PlayGround />} />

        <Route path="*" element={<h1>Not found</h1>} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;