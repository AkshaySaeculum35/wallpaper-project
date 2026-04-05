import "@splidejs/react-splide/css";

import { Splide, SplideSlide } from "@splidejs/react-splide";
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

interface HeroSliderProps {
  slides: PexelsPhoto[];
  activeCategory: Category;
  onCategoryChange: (cat: Category) => void;
}

const HeroSlider = ({
  slides,
  activeCategory,
  onCategoryChange,
}: HeroSliderProps) => {
  const displaySlides = slides.slice(0, 6);

  return (
    <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
      {displaySlides.length > 0 ? (
        <Splide
          options={{
            type: "loop",
            autoplay: true,
            interval: 4000,
            speed: 1000,
            pauseOnHover: true,
            arrows: true,
            pagination: true,
            height: "100%",
          }}
          className="h-full"
        >
          {displaySlides.map((photo) => (
            <SplideSlide key={photo.id}>
              <div className="relative h-full w-full">
                <img
                  src={photo.src.large2x}
                  alt={photo.alt || "wallpaper"}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/80" />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      ) : (
        <div className="skeleton h-full w-full" />
      )}

      {/* Overlay content */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <div className="fade-in-up pointer-events-none">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
            Explore &amp; Download
          </p>
          <h1 className="mb-4 text-3xl font-extrabold leading-tight text-white drop-shadow-2xl md:text-5xl lg:text-6xl">
            Discover Stunning
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Wallpapers
            </span>{" "}
            for Your Screen
          </h1>
          <p className="text-base text-white/60 md:text-lg">
            Millions of free high-resolution wallpapers, curated for you.
          </p>
        </div>
      </div>

      {/* Category tabs pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-8">
        <div className="pointer-events-auto w-full max-w-4xl overflow-x-auto">
          <Tabs
            activeKey={activeCategory}
            onChange={(key) => onCategoryChange(key as Category)}
            centered
            items={CATEGORIES.map((cat) => ({ key: cat, label: cat }))}
            className="hero-tabs"
          />
        </div>
      </div>
    </section>
  );
};
export default HeroSlider;
