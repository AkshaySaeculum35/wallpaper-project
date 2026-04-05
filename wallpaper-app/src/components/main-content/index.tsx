import { Spin } from 'antd';
import { useEffect, useRef } from 'react';
import type { PexelsPhoto } from '../../types';
import WallpaperCard from './component/wallpaper-card';

interface Props {
  photos: PexelsPhoto[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const WallpaperGrid = ({ photos, loading, hasMore, onLoadMore }: Props) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && hasMore && !loading) onLoadMore(); },
      { rootMargin: '300px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loading, onLoadMore]);

  if (!loading && photos.length === 0) {
    return (
      <div className="py-20 text-center text-gray-400">
        <p className="text-base">No wallpapers found</p>
        <p className="text-sm">Try a different search or category</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, i) => (
          <WallpaperCard key={`${photo.id}-${i}`} photo={photo} index={i} />
        ))}
        {loading && Array.from({ length: 8 }).map((_, i) => (
          <div key={`sk-${i}`} className="skeleton aspect-video rounded-lg" />
        ))}
      </div>

      <div ref={sentinelRef} className="h-2" />

      {loading && photos.length > 0 && (
        <div className="flex justify-center py-8">
          <Spin />
          <span className="ml-2 text-sm text-gray-400">Loading more...</span>
        </div>
      )}

      {!hasMore && photos.length > 0 && (
        <p className="py-6 text-center text-sm text-gray-400">No more wallpapers</p>
      )}
    </div>
  );
};

export default WallpaperGrid;
