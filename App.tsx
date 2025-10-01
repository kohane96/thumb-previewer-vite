
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Video } from './types';
import { INITIAL_VIDEOS } from './constants';

// --- Helper Functions ---
const isMobileDevice = () => /Mobi/i.test(navigator.userAgent);


// --- SVG Icon Components ---

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
  </svg>
);

const CastIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 3.666C15.868 3.666 11.234 8.3 11.234 13.432m9.766-3.798a.75.75 0 0 0-.437-.695L9.65 5.233a.75.75 0 0 0-1.049.818l1.124 4.339a.75.75 0 0 0 .695.437h3.411a.75.75 0 0 0 .695-.437L15.36 6.09a.75.75 0 0 0-.437-.695M21 3.666h.008v.008H21v-.008Zm-5.334 15.668a2.667 2.667 0 1 0 0-5.334 2.667 2.667 0 0 0 0 5.334Z" />
  </svg>
);

const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

const MoreVertIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
  </svg>
);

const HomeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

const ShortsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M17.53 7.47a.75.75 0 0 0-1.06 0l-7 7a.75.75 0 0 0 1.06 1.06l7-7a.75.75 0 0 0 0-1.06Z" />
        <path d="M6.47 8.53a.75.75 0 0 0 0 1.06l7 7a.75.75 0 0 0 1.06-1.06l-7-7a.75.75 0 0 0-1.06 0Z" />
    </svg>
);

const SubscriptionsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
  </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const ClipboardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 6.45 3.75H4.5a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 4.5 21h9a2.25 2.25 0 0 0 2.25-2.25V9.75M15 3.75H9" />
  </svg>
);


// --- Reusable UI Components ---

const Header: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <header className={`flex items-center justify-between p-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>
    <ArrowLeftIcon className="w-6 h-6" />
    <h1 className="text-lg font-medium">ほにゃららCH</h1>
    <div className="flex items-center space-x-4">
      <CastIcon className="w-6 h-6" />
      <SearchIcon className="w-6 h-6" />
      <MoreVertIcon className="w-6 h-6" />
    </div>
  </header>
);

const Tabs: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <nav className={`flex border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
    <div className={`py-3 px-4 text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>ホーム</div>
    <div className={`py-3 px-4 text-sm font-medium relative border-b-2 ${isDarkMode ? 'text-white border-white' : 'text-black border-black'}`}>動画</div>
    <div className={`py-3 px-4 text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>ショート</div>
    <div className={`py-3 px-4 text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>再生リスト</div>
  </nav>
);

const Footer: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <footer className={`flex justify-around items-center py-2 border-t mt-auto ${isDarkMode ? 'border-gray-800 text-gray-300' : 'border-gray-200 text-gray-700'}`}>
    <div className="flex flex-col items-center">
      <HomeIcon className="w-6 h-6" />
      <span className="text-xs mt-1">ホーム</span>
    </div>
    <div className="flex flex-col items-center">
      <ShortsIcon className="w-6 h-6" />
      <span className="text-xs mt-1">ショート</span>
    </div>
    <div className={`w-10 h-10 flex items-center justify-center rounded-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    </div>
    <div className="flex flex-col items-center relative">
      <SubscriptionsIcon className="w-6 h-6" />
      <span className="text-xs mt-1">登録チャンネル</span>
      <div className={`absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 ${isDarkMode ? 'border-black' : 'border-white'}`}></div>
    </div>
    <div className="flex flex-col items-center">
      <img src="https://picsum.photos/seed/user/24/24" alt="My Page" className="w-6 h-6 rounded-full" />
      <span className="text-xs mt-1">マイページ</span>
    </div>
  </footer>
);

const PasteFallbackInput: React.FC<{ onPaste: (e: React.ClipboardEvent) => void; onCancel: () => void; }> = ({ onPaste, onCancel }) => {
    const pasteAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        pasteAreaRef.current?.focus();
    }, []);

    const instruction = isMobileDevice() ? 'このエリアを長押しして「ペースト」' : 'ここに Ctrl+V で貼り付け';

    return (
        <div className="flex items-center gap-2 w-full">
            {/* Fix: The `placeholder` attribute is not valid on a `div`. It has been replaced with a `data-placeholder` attribute and styled with CSS pseudo-elements via Tailwind CSS to function as a placeholder. */}
            <div
                ref={pasteAreaRef}
                onPaste={onPaste}
                contentEditable
                suppressContentEditableWarning
                className="flex-1 text-sm p-2 bg-gray-50 dark:bg-gray-700 border-2 border-dashed border-indigo-400 dark:border-indigo-600 rounded-lg cursor-text focus:outline-none focus:ring-2 focus:ring-indigo-500 empty:before:content-[attr(data-placeholder)] empty:before:text-gray-500 dark:empty:before:text-gray-400"
                aria-label={instruction}
                data-placeholder={instruction}
            />
            <button
                onClick={onCancel}
                type="button"
                className="px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors"
            >
                キャンセル
            </button>
        </div>
    );
};

interface ControlPanelProps {
  onThumbnailChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onPaste: (index: number) => void;
  fileNames: string[];
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
  pasteFallbackTarget: number | null;
  onPasteFromFallback: (e: React.ClipboardEvent) => void;
  onCancelPasteFallback: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
    onThumbnailChange, 
    onPaste,
    fileNames,
    isDarkMode, 
    onDarkModeToggle,
    pasteFallbackTarget,
    onPasteFromFallback,
    onCancelPasteFallback,
}) => {
    const uploaderSections = [
        { label: 'アップロード① (大サムネ + 小サムネ1)', index: 0 },
        { label: 'アップロード② (小サムネ2)', index: 1 },
        { label: 'アップロード③ (小サムネ3)', index: 2 },
    ];
    
    return (
      <div className={`w-full p-6 rounded-xl shadow-lg space-y-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
        <div className="flex justify-between items-start">
          <div>
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>YouTubeサムネイルプレビュー</h2>
          </div>
           <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>ダークモード</span>
            <button
              onClick={onDarkModeToggle}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isDarkMode ? `bg-indigo-600 focus:ring-offset-gray-800` : 'bg-gray-200 focus:ring-offset-white'}`}
              aria-pressed={isDarkMode}
            >
              <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {uploaderSections.map(({ label, index }) => (
              <div key={index} className={`p-4 border rounded-lg space-y-3 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {label}
                </label>
                <div className="flex items-center gap-2">
                    {pasteFallbackTarget === index ? (
                        <PasteFallbackInput onPaste={onPasteFromFallback} onCancel={onCancelPasteFallback} />
                    ) : (
                        <>
                            <input
                              id={`file-upload-${index}`}
                              type="file"
                              accept="image/*"
                              onChange={(e) => onThumbnailChange(index, e)}
                              className="hidden"
                            />
                            <label
                              htmlFor={`file-upload-${index}`}
                              className="cursor-pointer whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-semibold rounded-full text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors"
                            >
                              ファイルを選択
                            </label>
                            <span className={`text-sm truncate min-w-0 flex-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {fileNames[index] || '選択されていません'}
                            </span>
                            <button
                                onClick={() => onPaste(index)}
                                type="button"
                                className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                aria-label={`クリップボードから貼り付け${index + 1}`}
                            >
                                <ClipboardIcon className="w-5 h-5" />
                            </button>
                        </>
                    )}
                </div>
              </div>
          ))}
        </div>
      </div>
    );
};


// --- Preview Components ---

const FeaturedVideo: React.FC<{ video: Video; onTitleChange: (newTitle: string) => void; onThumbnailDelete: () => void; isDarkMode: boolean; }> = ({ video, onTitleChange, onThumbnailDelete, isDarkMode }) => {
  const isUploaded = video.thumbnailUrl.startsWith('data:image');

  return (
    <div className="mb-4">
      <div className="relative">
        <img src={video.thumbnailUrl} alt={video.title} className="w-full aspect-video object-cover" />
        {isUploaded && (
            <button 
                onClick={onThumbnailDelete}
                className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full p-1 hover:bg-opacity-80 transition-opacity"
                aria-label="サムネイルを削除"
            >
                <CloseIcon className="w-4 h-4" />
            </button>
        )}
        <span className="absolute bottom-1.5 right-1.5 bg-black bg-opacity-80 text-white text-[11px] font-medium px-1 py-0.5 rounded-sm">
          {video.duration}
        </span>
      </div>
      <div className="flex items-start p-3 space-x-3">
        <img src={video.channel.iconUrl} alt={video.channel.name} className="w-9 h-9 rounded-full mt-1" />
        <div className="flex-grow">
          <h3 
              className={`text-base leading-tight line-clamp-2 focus:outline-none focus:ring-1 rounded px-1 cursor-text ${isDarkMode ? 'text-white focus:ring-white' : 'text-black focus:ring-black'}`}
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={(e) => onTitleChange(e.currentTarget.textContent || '')}
              onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                      e.preventDefault();
                      e.currentTarget.blur();
                  }
              }}
          >
              {video.title}
          </h3>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {video.channel.name}・{video.views}回視聴・{video.age}
          </p>
        </div>
        <div className="flex-shrink-0">
          <MoreVertIcon className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-black'}`} />
        </div>
      </div>
    </div>
  );
};


const VideoItem: React.FC<{ video: Video; onTitleChange: (newTitle: string) => void; onThumbnailDelete: () => void; isDarkMode: boolean; }> = ({ video, onTitleChange, onThumbnailDelete, isDarkMode }) => {
    const isUploaded = video.thumbnailUrl.startsWith('data:image');
    return (
      <div className="flex p-2 space-x-3">
        <div className="w-40 flex-shrink-0 relative">
          <img src={video.thumbnailUrl} alt={video.title} className="w-full aspect-video object-cover rounded-lg" />
           {isUploaded && (
            <button 
                onClick={onThumbnailDelete}
                className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full p-0.5 hover:bg-opacity-80 transition-opacity"
                aria-label="サムネイルを削除"
            >
                <CloseIcon className="w-3 h-3" />
            </button>
        )}
          <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-[11px] font-medium px-1 py-0.5 rounded-sm">
            {video.duration}
          </span>
        </div>
        <div className="flex-grow">
          <h3 
              className={`text-sm leading-tight line-clamp-2 focus:outline-none focus:ring-1 rounded px-1 cursor-text ${isDarkMode ? 'text-white focus:ring-white' : 'text-black focus:ring-black'}`}
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={(e) => onTitleChange(e.currentTarget.textContent || '')}
              onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                      e.preventDefault();
                      e.currentTarget.blur();
                  }
              }}
            >
              {video.title}
          </h3>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {video.views}回視聴・{video.age}
          </p>
        </div>
        <div className="flex-shrink-0">
          <MoreVertIcon className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-black'}`} />
        </div>
      </div>
    );
};


const AppShell: React.FC<{ children: React.ReactNode; isDarkMode: boolean; }> = ({ children, isDarkMode }) => (
    <div className="w-full max-w-sm flex-shrink-0">
        <div className={`rounded-3xl shadow-2xl overflow-hidden border-4 flex flex-col h-[780px] transition-colors duration-300 ${isDarkMode ? 'bg-[#0f0f0f] border-gray-800' : 'bg-white border-gray-200'}`}>
          {/* Status Bar */}
          <div className={`px-4 py-1 flex justify-between items-center text-xs font-mono flex-shrink-0 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              <span>14:45</span>
              <div className="flex items-center space-x-1">
                <span>📶</span>
                <span>VoLTE</span>
                <span className={`text-[10px] px-1 rounded-sm font-sans ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>66</span>
              </div>
          </div>
          
          <Header isDarkMode={isDarkMode} />
          <Tabs isDarkMode={isDarkMode} />
          <div className="flex-grow overflow-y-auto">
            {children}
          </div>
          <Footer isDarkMode={isDarkMode} />
        </div>
    </div>
);


// --- Main App Component ---

const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>(INITIAL_VIDEOS);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [fileNames, setFileNames] = useState<string[]>(['', '', '']);
  const [pasteFallbackTarget, setPasteFallbackTarget] = useState<number | null>(null);

  const updateThumbnail = useCallback((uploaderIndex: number, imageData: string) => {
    setVideos(currentVideos => {
      const newVideos = [...currentVideos];
      if (uploaderIndex === 0) { // Uploader 1 -> videos[0] and videos[1]
        if (newVideos.length > 0) newVideos[0] = { ...newVideos[0], thumbnailUrl: imageData };
        if (newVideos.length > 1) newVideos[1] = { ...newVideos[1], thumbnailUrl: imageData };
      } else if (uploaderIndex === 1) { // Uploader 2 -> videos[2]
        if (newVideos.length > 2) newVideos[2] = { ...newVideos[2], thumbnailUrl: imageData };
      } else if (uploaderIndex === 2) { // Uploader 3 -> videos[3]
        if (newVideos.length > 3) newVideos[3] = { ...newVideos[3], thumbnailUrl: imageData };
      }
      return newVideos;
    });
  }, []);
  
  const handlePasteFromFallback = useCallback((event: React.ClipboardEvent) => {
    event.preventDefault();
    const items = event.clipboardData?.items;
    if (!items || pasteFallbackTarget === null) {
        setPasteFallbackTarget(null);
        return;
    };

    let imageFound = false;
    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
            const blob = items[i].getAsFile();
            if (blob) {
                imageFound = true;
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageData = e.target?.result as string;
                    if (imageData) {
                        updateThumbnail(pasteFallbackTarget, imageData);
                        setFileNames(names => {
                            const newNames = [...names];
                            newNames[pasteFallbackTarget] = 'クリップボードから貼付';
                            return newNames;
                        });
                    }
                };
                reader.readAsDataURL(blob);
            }
            break; 
        }
    }
    
    if (!imageFound) {
        alert('クリップボードに画像が見つかりませんでした。');
    }
    
    setPasteFallbackTarget(null);

  }, [pasteFallbackTarget, updateThumbnail]);

  const handleThumbnailChange = useCallback((uploaderIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        if (imageData) {
          updateThumbnail(uploaderIndex, imageData);
          setFileNames(names => {
            const newNames = [...names];
            newNames[uploaderIndex] = file.name;
            return newNames;
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }, [updateThumbnail]);

  const handlePaste = useCallback(async (uploaderIndex: number) => {
    try {
      if (!navigator.clipboard?.read) {
        throw new Error('Clipboard API not supported');
      }
      const clipboardItems = await navigator.clipboard.read();
      const imageItem = clipboardItems.find(item => item.types.some(type => type.startsWith('image/')));
      
      if (imageItem) {
        const imageType = imageItem.types.find(type => type.startsWith('image/'))!;
        const blob = await imageItem.getType(imageType);
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageData = event.target?.result as string;
          if (imageData) {
            updateThumbnail(uploaderIndex, imageData);
            setFileNames(names => {
              const newNames = [...names];
              newNames[uploaderIndex] = 'クリップボードから貼付';
              return newNames;
            });
          }
        };
        reader.readAsDataURL(blob);
        return;
      }
      alert('クリップボードに画像が見つかりませんでした。');
    } catch (err) {
      console.warn('Direct clipboard read failed, falling back to paste event:', err);
      setPasteFallbackTarget(uploaderIndex);
    }
  }, [updateThumbnail]);


  const handleTitleChangeById = useCallback((videoId: number, newTitle: string) => {
    setVideos(currentVideos => 
      currentVideos.map((video) => 
        video.id === videoId ? { ...video, title: newTitle } : video
      )
    );
  }, []);

  const handleThumbnailDelete = useCallback((videoId: number) => {
    const videoIndex = videos.findIndex(v => v.id === videoId);
    const originalVideo = INITIAL_VIDEOS.find(v => v.id === videoId);
    if (!originalVideo) return;
    
    setVideos(currentVideos => {
        let newVideos = [...currentVideos];
        if (videoId === videos[0].id) {
            const originalFeatured = INITIAL_VIDEOS.find(v => v.id === videos[0].id);
            const originalSecond = INITIAL_VIDEOS.find(v => v.id === videos[1].id);
            if(originalFeatured) newVideos[0] = { ...newVideos[0], thumbnailUrl: originalFeatured.thumbnailUrl };
            if(originalSecond) newVideos[1] = { ...newVideos[1], thumbnailUrl: originalSecond.thumbnailUrl };
        } else {
             newVideos = newVideos.map(video =>
                video.id === videoId
                    ? { ...video, thumbnailUrl: originalVideo.thumbnailUrl }
                    : video
            );
        }
        return newVideos;
    });

    // Reset corresponding file name
    if (videoIndex === 0 || videoIndex === 1) { // Uploader 1
        setFileNames(currentFileNames => {
            const newFileNames = [...currentFileNames];
            newFileNames[0] = '';
            return newFileNames;
        });
    } else if (videoIndex === 2) { // Uploader 2
        setFileNames(currentFileNames => {
            const newFileNames = [...currentFileNames];
            newFileNames[1] = '';
            return newFileNames;
        });
    } else if (videoIndex === 3) { // Uploader 3
        setFileNames(currentFileNames => {
            const newFileNames = [...currentFileNames];
            newFileNames[2] = '';
            return newFileNames;
        });
    }
  }, [videos]);


  return (
    <div className={`min-h-screen flex flex-col lg:flex-row items-center lg:items-start justify-center p-4 sm:p-8 gap-8 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-slate-100'}`}>
      
      <div className="w-full max-w-lg lg:sticky lg:top-8">
        <ControlPanel 
          onThumbnailChange={handleThumbnailChange}
          onPaste={handlePaste}
          fileNames={fileNames}
          isDarkMode={isDarkMode}
          onDarkModeToggle={() => setIsDarkMode(prev => !prev)}
          pasteFallbackTarget={pasteFallbackTarget}
          onPasteFromFallback={handlePasteFromFallback}
          onCancelPasteFallback={() => setPasteFallbackTarget(null)}
        />
      </div>

      <AppShell isDarkMode={isDarkMode}>
          <main className="flex-grow overflow-y-auto">
            {videos.length > 0 && 
              <FeaturedVideo 
                video={videos[0]} 
                onTitleChange={(newTitle) => handleTitleChangeById(videos[0].id, newTitle)}
                onThumbnailDelete={() => handleThumbnailDelete(videos[0].id)}
                isDarkMode={isDarkMode}
              />
            }
            
            <div className="px-1 pt-2">
                <h2 className={`font-medium text-lg px-2 my-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>人気の動画</h2>
                {videos.slice(1).map((video) => (
                    <VideoItem 
                      key={video.id} 
                      video={video} 
                      onTitleChange={(newTitle) => handleTitleChangeById(video.id, newTitle)}
                      onThumbnailDelete={() => handleThumbnailDelete(video.id)}
                      isDarkMode={isDarkMode}
                    />
                ))}
            </div>
          </main>
      </AppShell>
    </div>
  );
};

export default App;
