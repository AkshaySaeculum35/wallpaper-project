export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  alt: string;
}

export type Category =
  | "Featured"
  | "Nature"
  | "Abstract"
  | "Technology"
  | "Space"
  | "Animals"
  | "Architecture"
  | "Ocean";
