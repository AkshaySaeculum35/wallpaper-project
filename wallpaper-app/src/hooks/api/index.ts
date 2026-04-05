import { useCallback, useRef, useState } from "react";
import type { PexelsPhoto } from "../../types";

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY ?? "";
const PER_PAGE = 20;

const CATEGORY_QUERIES: Record<string, string> = {
  Featured: "wallpaper 4k",
  Nature: "nature landscape",
  Abstract: "abstract art",
  Technology: "technology digital",
  Space: "space galaxy cosmos",
  Animals: "wildlife animals",
  Architecture: "architecture building",
  Ocean: "ocean sea waves",
};

export function usePexels() {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);
  const categoryRef = useRef<string>("Featured");

  const fetchPhotos = useCallback(
    async (category: string, reset = false) => {
      if (loading) return;
      setLoading(true);

      const page = reset ? 1 : pageRef.current;
      const query = CATEGORY_QUERIES[category] ?? category;

      try {
        const res = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${PER_PAGE}&page=${page}&orientation=landscape`,
          { headers: { Authorization: API_KEY } },
        );
        const data = await res.json();
        const newPhotos: PexelsPhoto[] = data.photos ?? [];

        setPhotos((prev) => (reset ? newPhotos : [...prev, ...newPhotos]));
        setHasMore(!!data.next_page);
        pageRef.current = page + 1;
        categoryRef.current = category;
      } catch (err) {
        console.error("Pexels fetch error:", err);
      } finally {
        setLoading(false);
      }
    },
    [loading],
  );

  const changeCategory = useCallback(
    (category: string) => {
      pageRef.current = 1;
      fetchPhotos(category, true);
    },
    [fetchPhotos],
  );

  const loadMore = useCallback(() => {
    fetchPhotos(categoryRef.current, false);
  }, [fetchPhotos]);

  return { photos, loading, hasMore, fetchPhotos, changeCategory, loadMore };
}
