import React, { useMemo, useState } from 'react';
import { Thumbnail } from '../types';

interface ThumbnailCardProps {
  thumbnail: Thumbnail;
  onDelete: (id: string) => void;
  onTitleChange: (id: string, newTitle: string) => void;
}

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);


export const ThumbnailCard: React.FC<ThumbnailCardProps> = ({ thumbnail, onDelete, onTitleChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const metadata = useMemo(() => {
      const views = (Math.floor(Math.random() * 8000) + 1000);
      const viewString = views > 10000 ? `${(views / 10000).toFixed(1)}万` : views.toLocaleString();
      
      const timeAgoValue = Math.floor(Math.random() * 11) + 1;
      const timeUnit = Math.random() > 0.5 ? 'か月前' : '年前';
      const timeAgo = `${timeAgoValue} ${timeUnit}`;

      return {
          views: `${viewString}回視聴`,
          time: timeAgo,
      };
  }, []); // Empty dependency array ensures this is calculated only once per card instance.

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange(thumbnail.id, e.target.value);
  }

  return (
    <div 
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-2">
        <img
          src={thumbnail.previewUrl}
          alt={thumbnail.title}
          className="w-full aspect-video object-cover rounded-xl bg-zinc-200 shadow-lg group-hover:rounded-none transition-all duration-300"
        />
        <div className="absolute bottom-1 right-1 bg-black/75 text-white text-xs font-bold px-1.5 py-0.5 rounded">
          {`${Math.floor(Math.random() * 40) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`}
        </div>
        <button
          onClick={() => onDelete(thumbnail.id)}
          className={`absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
          aria-label="Delete thumbnail"
        >
          <CloseIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-zinc-300 mt-0.5"></div>
        <div className="flex-1">
          <input
            type="text"
            value={thumbnail.title}
            onChange={handleTitleChange}
            className="w-full bg-transparent text-zinc-900 font-medium text-base leading-snug p-0 border-none focus:ring-0 focus:outline-none placeholder-zinc-500"
            placeholder="Enter title"
          />
          <div className="text-zinc-500 text-sm mt-1">
            <p>チャンネル名</p> {/* Channel Name Placeholder */}
            <p>{metadata.views} • {metadata.time}</p>
          </div>
        </div>
      </div>
    </div>
  );
};