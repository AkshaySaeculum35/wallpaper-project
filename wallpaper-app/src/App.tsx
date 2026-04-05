import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import WallpaperDetailPage from "./pages/wallpaper-detail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/wallpaper/:id" element={<WallpaperDetailPage />} />
    </Routes>
  );
}
