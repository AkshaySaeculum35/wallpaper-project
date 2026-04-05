import { DownloadOutlined, ExpandOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import type { PexelsPhoto } from "../../../../types";

interface WallpaperCardProps {
  photo: PexelsPhoto;
  index: number;
}

const WallpaperCard = ({ photo, index }: WallpaperCardProps) => {
  const navigate = useNavigate();

  const handlePreview = () => {
    navigate(`/wallpaper/${photo.id}`, { state: { photo } });
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = photo.src.original;
    link.download = `wallpaper-${photo.id}.jpg`;
    link.target = "_blank";
    link.click();
  };

  return (
    <div
      className="wallpaper-card fade-in-up group relative cursor-pointer overflow-hidden rounded-2xl bg-[#111118]"
      style={{ animationDelay: `${(index % 20) * 40}ms` }}
      onClick={handlePreview}
    >
      {/* Image */}
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={photo.src.large}
          alt={photo.alt || "wallpaper"}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Hover overlay */}
      <div className="overlay absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 backdrop-blur-[2px]">
        <Button
          type="primary"
          icon={<ExpandOutlined />}
          size="large"
          onClick={(e) => {
            e.stopPropagation();
            handlePreview();
          }}
          style={{
            background: "rgba(124,58,237,0.9)",
            border: "none",
            borderRadius: "50px",
          }}
        >
          Preview
        </Button>
        <Button
          icon={<DownloadOutlined />}
          size="middle"
          onClick={handleDownload}
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "white",
            borderRadius: "50px",
          }}
        >
          Download
        </Button>
      </div>

      {/* Photographer */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-black/80 to-transparent p-3 transition-transform duration-300 group-hover:translate-y-0">
        <p className="truncate text-xs text-white/70">
          📷 {photo.photographer}
        </p>
      </div>
    </div>
  );
};
export default WallpaperCard;
