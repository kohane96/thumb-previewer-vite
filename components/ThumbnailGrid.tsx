import React, { useState } from 'react';
import { Thumbnail } from '../types';
import { ThumbnailCard } from './ThumbnailCard';

interface ThumbnailGridProps {
  thumbnails: Thumbnail[];
  onDelete: (id: string) => void;
  onTitleChange: (id: string, newTitle: string) => void;
  onReorder: (dragIndex: number, hoverIndex: number) => void;
}

export const ThumbnailGrid: React.FC<ThumbnailGridProps> = ({ thumbnails, onDelete, onTitleChange, onReorder }) => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggingIndex(index);
    // This is needed for Firefox to enable dragging
    e.dataTransfer.setData('text/plain', '');
    e.dataTransfer.effectAllowed = 'move';
  };
  
  const handleDragEnter = (index: number) => {
    if (draggingIndex === null || draggingIndex === index) {
      return;
    }
    onReorder(draggingIndex, index);
    // The item is now at the `index` position, so update the dragging index
    setDraggingIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // This is necessary to allow dropping
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
      {thumbnails.map((thumbnail, index) => (
        <div
          key={thumbnail.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragEnter={() => handleDragEnter(index)}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          className={`cursor-move transition-opacity duration-200 ${draggingIndex !== null ? (draggingIndex === index ? 'opacity-40' : '') : ''}`}
        >
          <ThumbnailCard
            thumbnail={thumbnail}
            onDelete={onDelete}
            onTitleChange={onTitleChange}
          />
        </div>
      ))}
    </div>
  );
};
