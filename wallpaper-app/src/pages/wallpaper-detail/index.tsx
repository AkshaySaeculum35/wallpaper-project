import {
  ArrowLeftOutlined,
  CameraOutlined,
  CompressOutlined,
  DownloadOutlined,
  ExpandAltOutlined,
  ExpandOutlined,
  FileImageOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { Button, Spin, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { PexelsPhoto } from '../../types';

const WallpaperDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const photo = location.state?.photo as PexelsPhoto | undefined;

  const [loaded, setLoaded] = useState(false);
  const [fullView, setFullView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!photo) navigate('/', { replace: true });
  }, [photo, navigate]);

  useEffect(() => {
    const handler = () => { if (!document.fullscreenElement) setFullView(false); };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  if (!photo) return null;

  const handleDownload = async (url: string, label: string) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `wallpaper-${photo.id}-${label}.jpg`;
      link.click();
      URL.revokeObjectURL(blobUrl);
    } catch {
      // fallback: open in new tab
      window.open(url, '_blank');
    }
  };

  const toggleFullView = () => {
    if (!fullView) {
      imgRef.current?.requestFullscreen?.().catch(() => { });
    } else {
      document.exitFullscreen?.().catch(() => { });
    }
    setFullView((v) => !v);
  };

  const megapixels = ((photo.width * photo.height) / 1_000_000).toFixed(1);
  const aspectRatio = (photo.width / photo.height).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Button
            icon={fullView ? <CompressOutlined /> : <ExpandOutlined />}
            onClick={toggleFullView}
          >
            <span className="hidden sm:inline">{fullView ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </Button>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(photo.src.original, 'original')}
          >
            Download
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Image */}
        <div className="overflow-hidden rounded-2xl bg-gray-200 shadow-md">
          {!loaded && (
            <div className="skeleton flex aspect-video items-center justify-center">
              <Spin />
            </div>
          )}
          <img
            ref={imgRef}
            src={photo.src.large2x}
            alt={photo.alt || 'wallpaper'}
            onLoad={() => setLoaded(true)}
            className={`w-full object-contain ${loaded ? 'block' : 'hidden'}`}
          />
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {/* Left: main info */}
          <div className="md:col-span-2 space-y-4">
            {/* Title + photographer */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h1 className="text-lg font-semibold text-gray-800">
                {photo.alt || `Wallpaper #${photo.id}`}
              </h1>
              <hr className="my-3 border-gray-100" />
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <CameraOutlined />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Photographer</p>
                  <a
                    href={photo.photographer_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
                  >
                    {photo.photographer} <LinkOutlined className="text-xs" />
                  </a>
                </div>
              </div>
            </div>

            {/* Image specs */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileImageOutlined /> Image Details
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: 'Width', value: `${photo.width}px` },
                  { label: 'Height', value: `${photo.height}px` },
                  { label: 'Megapixels', value: `${megapixels} MP` },
                  { label: 'Aspect Ratio', value: aspectRatio },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-lg bg-gray-50 p-3 text-center">
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className="mt-1 text-sm font-semibold text-gray-700">{value}</p>
                  </div>
                ))}
              </div>

              {/* Avg color */}
              <div className="mt-3 flex items-center gap-3">
                <div
                  className="h-8 w-8 rounded-lg border border-gray-200 shadow-sm"
                  style={{ background: photo.avg_color }}
                />
                <div>
                  <p className="text-xs text-gray-400">Average Color</p>
                  <p className="text-sm font-medium text-gray-700">{photo.avg_color}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <a href={photo.url} target="_blank" rel="noreferrer">
              <Button block icon={<LinkOutlined />}>
                View on Pexels
              </Button>
            </a>

            <div className="mt-3">
              <Tag color="green" className="w-full text-center">Free to use</Tag>
            </div>

            <button
              onClick={toggleFullView}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2 text-sm text-gray-500 transition hover:border-gray-300 hover:text-gray-700"
            >
              <ExpandAltOutlined />
              {fullView ? 'Exit Fullscreen' : 'View Fullscreen'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallpaperDetailPage;
