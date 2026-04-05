import {
  ArrowLeftOutlined,
  CompressOutlined,
  DownloadOutlined,
  ExpandOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Button, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { PexelsPhoto } from "../../types";

const WallpaperDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const photo = location.state?.photo as PexelsPhoto | undefined;

  const [loaded, setLoaded] = useState(false);
  const [fullView, setFullView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // If navigated directly without state, go back
  useEffect(() => {
    if (!photo) navigate("/", { replace: true });
  }, [photo, navigate]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = photo!.src.original;
    link.download = `wallpaper-${photo!.id}.jpg`;
    link.target = "_blank";
    link.click();
  };

  const toggleFullView = () => {
    if (!fullView) {
      imgRef.current?.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
    setFullView((v) => !v);
  };

  useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement) setFullView(false);
    };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  if (!photo) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/5 bg-[#0a0a0f]/90 px-4 py-3 backdrop-blur-xl md:px-8">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "white",
            borderRadius: "50px",
          }}
        >
          Back
        </Button>

        <div className="flex items-center gap-2">
          <Button
            icon={fullView ? <CompressOutlined /> : <ExpandOutlined />}
            onClick={toggleFullView}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              borderRadius: "50px",
            }}
          >
            <span className="hidden sm:inline">
              {fullView ? "Exit Full View" : "Full View"}
            </span>
          </Button>

          <Button
            icon={<ExportOutlined />}
            href={photo.url}
            target="_blank"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              borderRadius: "50px",
            }}
          >
            <span className="hidden sm:inline">Pexels</span>
          </Button>

          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDownload}
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              border: "none",
              borderRadius: "50px",
            }}
          >
            Download
          </Button>
        </div>
      </div>

      {/* Main image area */}
      <div className="relative flex min-h-[calc(100vh-57px)] flex-col items-center justify-center px-4 py-8 md:px-8">
        {/* Blurred background */}
        <div
          className="pointer-events-none absolute inset-0 scale-110 bg-cover bg-center opacity-20 blur-3xl"
          style={{ backgroundImage: `url(${photo.src.medium})` }}
        />

        {/* Image container */}
        <div
          className="fade-in-up relative z-10 w-full max-w-6xl overflow-hidden rounded-2xl shadow-2xl"
          style={{ boxShadow: "0 40px 120px rgba(0,0,0,0.8)" }}
        >
          {!loaded && (
            <div className="skeleton flex aspect-video w-full items-center justify-center">
              <Spin size="large" />
            </div>
          )}
          <img
            ref={imgRef}
            src={photo.src.large2x}
            alt={photo.alt || "wallpaper"}
            onLoad={() => setLoaded(true)}
            className={`w-full object-contain transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0 absolute"}`}
          />
        </div>

        {/* Info card */}
        <div className="fade-in-up relative z-10 mt-6 w-full max-w-6xl rounded-2xl border border-white/5 bg-white/[0.03] p-5 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-semibold text-white">
                {photo.alt || `Wallpaper #${photo.id}`}
              </h1>
              <p className="mt-1 text-sm text-white/50">
                Photo by{" "}
                <a
                  href={photo.photographer_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-violet-400 hover:underline"
                >
                  {photo.photographer}
                </a>
                {" · "}
                {photo.width} × {photo.height}px
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {/* Resolution badges */}
              {[
                { label: "Original", url: photo.src.original },
                { label: "Large 2x", url: photo.src.large2x },
                { label: "Large", url: photo.src.large },
              ].map(({ label, url }) => (
                <a
                  key={label}
                  href={url}
                  download={`wallpaper-${photo.id}-${label}.jpg`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 transition-colors hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-white"
                >
                  ↓ {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WallpaperDetailPage;
