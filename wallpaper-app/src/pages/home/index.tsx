import { useCallback, useEffect, useState } from "react";

import Header from "../../components/header";
import HeroSlider from "../../components/hero-content";
import type { Category } from "../../types";
import WallpaperGrid from "../../components/main-content";
import { usePexels } from "../../hooks";

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("Featured");
  const { photos, loading, hasMore, fetchPhotos, changeCategory, loadMore } =
    usePexels();

  useEffect(() => {
    fetchPhotos("Featured", true);
  }, []);

  const handleCategoryChange = useCallback(
    (cat: Category) => {
      setActiveCategory(cat);
      changeCategory(cat);
    },
    [changeCategory],
  );

  const handleSearch = useCallback(
    (query: string) => {
      if (!query.trim()) {
        changeCategory(activeCategory);
        return;
      }
      changeCategory(query.trim() as Category);
    },
    [activeCategory, changeCategory],
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Header onSearch={handleSearch} />

      <HeroSlider
        slides={photos}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <WallpaperGrid
        photos={photos}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
      />
    </div>
  );
};
export default HomePage;
