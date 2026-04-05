import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { PexelsPhoto } from '../../../../types';

interface Props {
  photo: PexelsPhoto;
  index: number;
}

const WallpaperCard = ({ photo }: Props) => {
  const navigate = useNavigate();

  const handlePreview = () => {
    navigate(`/wallpaper/${photo.id}`, { state: { photo } });
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch(photo.src.original);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `wallpaper-${photo.id}.jpg`;
      link.click();
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(photo.src.original, '_blank');
    }
  };

  return (
    <div className="wallpaper-card overflow-hidden rounded-lg bg-white shadow-sm" onClick={handlePreview}>
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img
          src={photo.src.large}
          alt={photo.alt || 'wallpaper'}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {/* Action buttons on hover */}
        <div className="card-actions absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40">
          <button
            onClick={(e) => { e.stopPropagation(); handlePreview(); }}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium text-gray-800 shadow-md transition hover:bg-gray-100"
          >
            <EyeOutlined /> Preview
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-md transition hover:bg-blue-700"
          >
            <DownloadOutlined /> Download
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 py-2">
        <p className="truncate text-xs text-gray-500">📷 {photo.photographer}</p>
      </div>
    </div>
  );
};

export default WallpaperCard;
