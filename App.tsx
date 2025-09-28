import React, { useState, useRef, useCallback } from 'react';
import { Thumbnail } from './types';
import { ThumbnailGrid } from './components/ThumbnailGrid';

// Add this to inform TypeScript about the global html2canvas function
declare global {
  interface Window {
    html2canvas: (element: HTMLElement, options?: Partial<{
      useCORS: boolean;
      scale: number;
      backgroundColor: string | null;
      logging: boolean;
    }>) => Promise<HTMLCanvasElement>;
  }
}

const App: React.FC = () => {
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mainContentRef = useRef<HTMLElement>(null); // Ref for the main content area

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // FIX: Explicitly type `file` as `File` to resolve type errors.
    const newThumbnails: Thumbnail[] = Array.from(files).map((file: File, index) => {
      const title = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
      return {
        id: `${Date.now()}-${index}`,
        file,
        title,
        previewUrl: URL.createObjectURL(file)
      };
    });

    setThumbnails(prev => [...prev, ...newThumbnails]);

    // Clear the input value to allow re-uploading the same file(s)
    if (event.target) {
      event.target.value = '';
    }
  }, []);

  const handleDeleteThumbnail = useCallback((id: string) => {
    setThumbnails(currentThumbnails => {
      const thumbToDelete = currentThumbnails.find(t => t.id === id);
      if (thumbToDelete) {
        URL.revokeObjectURL(thumbToDelete.previewUrl);
      }
      return currentThumbnails.filter(t => t.id !== id);
    });
  }, []);

  const handleTitleChange = useCallback((id: string, newTitle: string) => {
    setThumbnails(prev =>
      prev.map(t => t.id === id ? { ...t, title: newTitle } : t)
    );
  }, []);

  const handleReorder = useCallback((reorderedThumbnails: Thumbnail[]) => {
    setThumbnails(reorderedThumbnails);
  }, []);

  const triggerFileSelect = () => fileInputRef.current?.click();

  const handleScreenshot = useCallback(async () => {
    if (typeof window.html2canvas === 'undefined') {
      console.error('html2canvas library is not loaded.');
      alert('Screenshot functionality is currently unavailable. Please refresh the page and try again.');
      return;
    }

    const elementToCapture = mainContentRef.current;
    if (!elementToCapture) return;

    try {
      const canvas = await window.html2canvas(elementToCapture, {
        useCORS: true,
        scale: window.devicePixelRatio,
        backgroundColor: '#f4f4f5', // bg-zinc-100 from tailwindcss
        logging: false,
      });

      const link = document.createElement('a');
      link.download = 'thumbnail_preview.png';
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to take screenshot:', error);
      alert('An error occurred while taking the screenshot. Please try again.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 font-sans">
      <header className="bg-white/50 backdrop-blur-sm sticky top-0 z-10 p-4 shadow-lg border-b border-zinc-200">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            Thumbnail Previewer
          </h1>
          <div className="flex items-center gap-4">
            {thumbnails.length > 0 && (
              <button
                onClick={handleScreenshot}
                className="bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center gap-2"
                aria-label="Take screenshot and download"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 6a2 2 0 012-2h1.172a2 2 0 011.414.586l.828.828A2 2 0 008.828 6H12a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    <path fillRule="evenodd" d="M10 9a3 3 0 100 6 3 3 0 000-6zm-1 3a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
                </svg>
                Screenshot
              </button>
            )}
            <button
              onClick={triggerFileSelect}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              Upload More
            </button>
          </div>
        </div>
      </header>

      <main ref={mainContentRef} className="container mx-auto p-4 md:p-8">
        <input
          type="file"
          multiple
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {thumbnails.length === 0 ? (
          <div className="text-center py-20">
            <div
              onClick={triggerFileSelect}
              className="cursor-pointer group inline-block p-10 border-2 border-dashed border-zinc-300 hover:border-blue-500 rounded-2xl transition-all duration-300 hover:bg-zinc-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-zinc-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h2 className="mt-4 text-xl font-semibold text-zinc-700">Upload Thumbnails</h2>
              <p className="mt-1 text-sm text-zinc-500">Click or drag files here to preview</p>
            </div>
          </div>
        ) : (
          <ThumbnailGrid
            thumbnails={thumbnails}
            onDelete={handleDeleteThumbnail}
            onTitleChange={handleTitleChange}
            onReorder={handleReorder}
          />
        )}
      </main>
    </div>
  );
};

export default App;