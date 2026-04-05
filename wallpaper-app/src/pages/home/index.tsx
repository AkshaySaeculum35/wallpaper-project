import { useCallback, useEffect, useState } from "react";
import Header from "../../components/header";
import HeroContent from "../../components/hero-content";
import WallpaperGrid from "../../components/main-content";
import { usePexels } from "../../hooks";
import type { Category } from "../../types";

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
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} />
      <HeroContent
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
