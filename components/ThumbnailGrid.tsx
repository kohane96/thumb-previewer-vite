import React, { useState } from 'react';
import { Thumbnail } from '../types';
import { ThumbnailCard } from './ThumbnailCard';

interface ThumbnailGridProps {
  thumbnails: Thumbnail[];
  onDelete: (id: string) => void;
  onTitleChange: (id: string, newTitle: string) => void;
  onReorder: (thumbnails: Thumbnail[]) => void;
}

export const ThumbnailGrid: React.FC<ThumbnailGridProps> = ({ thumbnails, onDelete, onTitleChange, onReorder }) => {
  // To keep track of the item being dragged
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
    // This improves the visual effect for the drag operation
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault(); // This is necessary to allow dropping
    
    // Prevent reordering if not dragging or dragging over the same item
    if (draggedIndex === null || draggedIndex === index) {
      return;
    }
    
    // Create a new array with the reordered items
    const reorderedThumbnails = [...thumbnails];
    const [draggedItem] = reorderedThumbnails.splice(draggedIndex, 1);
    reorderedThumbnails.splice(index, 0, draggedItem);
    
    // Update the state in the parent component for immediate feedback
    onReorder(reorderedThumbnails);
    
    // Update the dragged index to the new position
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    // Reset the dragged index when the drag operation ends
    setDraggedIndex(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-4 gap-y-8">
      {thumbnails.map((thumbnail, index) => (
        <div
          key={thumbnail.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          className={`cursor-move transition-all duration-300 ${
            draggedIndex === index ? 'opacity-40 scale-95 transform' : ''
          }`}
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