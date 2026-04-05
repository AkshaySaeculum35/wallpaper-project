import { Tabs } from "antd";
import type { Category, PexelsPhoto } from "../../types";

const CATEGORIES: Category[] = [
  "Featured",
  "Nature",
  "Abstract",
  "Technology",
  "Space",
  "Animals",
  "Architecture",
  "Ocean",
];

interface HeroProps {
  slides: PexelsPhoto[];
  activeCategory: Category;
  onCategoryChange: (cat: Category) => void;
}

const HeroContent = ({
  slides,
  activeCategory,
  onCategoryChange,
}: HeroProps) => {
  const bg = slides[0]?.src.large2x;

  return (
    <div className="relative w-full bg-gray-900">
      {/* Fixed height image, no crop */}
      {bg && (
        <img src={bg} alt="hero" className="h-72 w-full object-cover md:h-96" />
      )}
      {!bg && <div className="h-72 w-full bg-gray-800 md:h-96" />}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-white drop-shadow md:text-4xl">
          Discover Stunning Wallpapers
        </h1>
        <p className="mt-2 text-sm text-white/75">
          Free high-resolution wallpapers for every screen
        </p>
      </div>

      {/* Category tabs pinned to bottom of image */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-1">
        <div className="mx-auto max-w-7xl">
          <Tabs
            activeKey={activeCategory}
            onChange={(key) => onCategoryChange(key as Category)}
            items={CATEGORIES.map((cat) => ({ key: cat, label: cat }))}
            className="hero-tabs mb-0"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
