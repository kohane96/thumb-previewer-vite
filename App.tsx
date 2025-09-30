
import React, { useState, useCallback } from 'react';
import { Video } from './types';
import { INITIAL_VIDEOS } from './constants';

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

interface ControlPanelProps {
  onThumbnailChange1: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onThumbnailChange2: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onThumbnailChange3: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPaste1: (e: React.ClipboardEvent<HTMLDivElement>) => void;
  onPaste2: (e: React.ClipboardEvent<HTMLDivElement>) => void;
  onPaste3: (e: React.ClipboardEvent<HTMLDivElement>) => void;
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
    onThumbnailChange1, 
    onThumbnailChange2, 
    onThumbnailChange3, 
    onPaste1,
    onPaste2,
    onPaste3,
    isDarkMode, 
    onDarkModeToggle 
}) => (
  <div className={`w-full p-6 rounded-xl shadow-lg space-y-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
    <div className="flex justify-between items-start">
      <div>
        <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>YouTubeサムネイルプレビュー</h2>
        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          サムネイルをアップロードしてプレビューします。プレビュー内の動画タイトルをクリックすると直接編集できます。
        </p>
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
      {/* --- Uploader 1 --- */}
      <div 
        onPaste={onPaste1}
        tabIndex={0}
        className={`p-4 border-2 border-dashed rounded-lg space-y-3 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isDarkMode ? 'border-gray-600 hover:border-indigo-400 focus:ring-offset-gray-800' : 'border-gray-300 hover:border-indigo-500 focus:ring-offset-white'}`}
      >
        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          アップロード① (大サムネ + 小サムネ1)
        </label>
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          ファイルを選択するか、このエリアに画像をペーストしてください。
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={onThumbnailChange1}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>

      {/* --- Uploader 2 --- */}
      <div 
        onPaste={onPaste2}
        tabIndex={0}
        className={`p-4 border-2 border-dashed rounded-lg space-y-3 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isDarkMode ? 'border-gray-600 hover:border-indigo-400 focus:ring-offset-gray-800' : 'border-gray-300 hover:border-indigo-500 focus:ring-offset-white'}`}
      >
        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          アップロード② (小サムネ2)
        </label>
         <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          ファイルを選択するか、このエリアに画像をペーストしてください。
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={onThumbnailChange2}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>

      {/* --- Uploader 3 --- */}
      <div 
        onPaste={onPaste3}
        tabIndex={0}
        className={`p-4 border-2 border-dashed rounded-lg space-y-3 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isDarkMode ? 'border-gray-600 hover:border-indigo-400 focus:ring-offset-gray-800' : 'border-gray-300 hover:border-indigo-500 focus:ring-offset-white'}`}
      >
        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          アップロード③ (小サムネ3)
        </label>
         <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          ファイルを選択するか、このエリアに画像をペーストしてください。
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={onThumbnailChange3}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>
    </div>
  </div>
);


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
        <span className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
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
          <span className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
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
  
  const handleSingleThumbnailChange = useCallback((index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        if (imageData) {
          setVideos(currentVideos => {
            const newVideos = [...currentVideos];
            if (index < newVideos.length) {
              newVideos[index] = { ...newVideos[index], thumbnailUrl: imageData };
            }
            return newVideos;
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleThumbnailPaste = useCallback((index: number) => (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
            const file = items[i].getAsFile();
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const imageData = event.target?.result as string;
                    if (imageData) {
                        setVideos(currentVideos => {
                            const newVideos = [...currentVideos];
                            if (index < newVideos.length) {
                                newVideos[index] = { ...newVideos[index], thumbnailUrl: imageData };
                            }
                            return newVideos;
                        });
                    }
                };
                reader.readAsDataURL(file);
            }
            break; // We only handle the first image found
        }
    }
  }, []);

  const handleTitleChangeById = useCallback((videoId: number, newTitle: string) => {
    setVideos(currentVideos => 
      currentVideos.map((video) => 
        video.id === videoId ? { ...video, title: newTitle } : video
      )
    );
  }, []);

  const handleThumbnailDelete = useCallback((videoId: number) => {
    setVideos(currentVideos => {
        const originalVideo = INITIAL_VIDEOS.find(v => v.id === videoId);
        if (!originalVideo) return currentVideos; 
        
        return currentVideos.map(video =>
            video.id === videoId
                ? { ...video, thumbnailUrl: originalVideo.thumbnailUrl }
                : video
        );
    });
  }, []);


  return (
    <div className={`min-h-screen flex flex-col items-center p-4 sm:p-8 gap-8 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-slate-100'}`}>
      
      <div className="w-full max-w-lg">
        <ControlPanel 
          onThumbnailChange1={handleSingleThumbnailChange(0)}
          onThumbnailChange2={handleSingleThumbnailChange(1)}
          onThumbnailChange3={handleSingleThumbnailChange(2)}
          onPaste1={handleThumbnailPaste(0)}
          onPaste2={handleThumbnailPaste(1)}
          onPaste3={handleThumbnailPaste(2)}
          isDarkMode={isDarkMode}
          onDarkModeToggle={() => setIsDarkMode(prev => !prev)}
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
                {videos.map((video) => (
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
