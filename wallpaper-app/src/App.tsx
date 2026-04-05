import { ConfigProvider, theme } from "antd";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/home";
import WallpaperDetailPage from "./pages/wallpaper-detail";

export default function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#7c3aed",
          borderRadius: 12,
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
        },
      }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wallpaper/:id" element={<WallpaperDetailPage />} />
      </Routes>
    </ConfigProvider>
  );
}
