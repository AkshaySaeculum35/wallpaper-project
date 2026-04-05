import { Spin } from "antd";
import { useEffect, useRef } from "react";

import type { PexelsPhoto } from "../../types";
import WallpaperCard from "./component/wallpaper-card";

interface WallpaperGridProps {
  photos: PexelsPhoto[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const WallpaperGrid = ({
  photos,
  loading,
  hasMore,
  onLoadMore,
}: WallpaperGridProps) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loading, onLoadMore]);

  if (!loading && photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-white/40">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          className="mb-4 opacity-30"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
          <path
            d="M21 15l-5-5L5 21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <p className="text-lg font-medium">No wallpapers found</p>
        <p className="mt-1 text-sm">Try a different search or category</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {photos.map((photo, i) => (
            <WallpaperCard key={`${photo.id}-${i}`} photo={photo} index={i} />
          ))}

          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="skeleton aspect-video w-full rounded-2xl"
              />
            ))}
        </div>

        <div ref={sentinelRef} className="h-4" />

        {loading && photos.length > 0 && (
          <div className="flex flex-col items-center gap-3 py-10">
            <Spin size="large" />
            <p className="text-sm text-white/40">Loading more wallpapers...</p>
          </div>
        )}

        {!hasMore && photos.length > 0 && (
          <p className="py-8 text-center text-sm text-white/30">
            You've reached the end ✨
          </p>
        )}
      </div>
    </div>
  );
};
export default WallpaperGrid;
