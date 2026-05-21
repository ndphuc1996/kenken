import { useState } from 'react';
import { GALLERY_PHOTOS } from '../data';
import { GalleryPhoto } from '../types';
import { ChevronLeft, ChevronRight, X, Eye } from 'lucide-react';

export default function SpaceGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const categories = [
    { value: 'all', label: 'Tất cả' },
    { value: 'infant', label: 'Sơ sinh - 3 Tháng' },
    { value: 'sitting', label: '6 - 9 Tháng' },
    { value: 'standing', label: '12 Tháng' },
    { value: 'cosmic', label: 'Khoảnh khắc khác' },
  ];

  const handleOpenLightbox = (photo: GalleryPhoto, index: number) => {
    setSelectedPhoto(photo);
    setActiveIndex(index);
    setIsFlipped(false);
  };

  const handleCloseLightbox = () => {
    setSelectedPhoto(null);
    setActiveIndex(-1);
    setIsFlipped(false);
  };

  const filteredPhotos = GALLERY_PHOTOS.filter(photo => {
    if (activeTab === 'all') return true;
    return photo.category === activeTab;
  });

  const handlePrev = () => {
    if (activeIndex <= 0) {
      const nextIdx = filteredPhotos.length - 1;
      setSelectedPhoto(filteredPhotos[nextIdx]);
      setActiveIndex(nextIdx);
    } else {
      const nextIdx = activeIndex - 1;
      setSelectedPhoto(filteredPhotos[nextIdx]);
      setActiveIndex(nextIdx);
    }
  };

  const handleNext = () => {
    if (activeIndex >= filteredPhotos.length - 1) {
      const nextIdx = 0;
      setSelectedPhoto(filteredPhotos[nextIdx]);
      setActiveIndex(nextIdx);
    } else {
      const nextIdx = activeIndex + 1;
      setSelectedPhoto(filteredPhotos[nextIdx]);
      setActiveIndex(nextIdx);
    }
  };

  return (
    <section className="py-10 md:py-16 px-4 md:px-margin-desktop bg-[#0a0d1c] relative" id="gallery">
      {/* Structural visual grid accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d3bbff]/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <span className="font-label-md text-secondary-container tracking-[0.4em] uppercase mb-3 block">
            🪐 Star Map of Memories
          </span>
          <h2 className="font-headline-lg text-4xl md:text-5xl text-white mb-4">
            Khoang Ảnh <span className="text-tertiary italic">Đa Vũ Trụ</span> Ken
          </h2>
          <p className="font-body text-on-surface-variant max-w-xl mx-auto text-sm md:text-base">
            Quay ngược thời gian xem lại các khoảnh khắc dễ thương của phi hành gia nhí được chụp tại các điểm dừng chân trong 12 tháng qua.
          </p>

          {/* Categories Horizontal Scroll */}
          <div className="flex justify-center flex-wrap gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setActiveTab(cat.value);
                  setSelectedPhoto(null);
                }}
                className={`px-4 sm:px-6 py-2 rounded-full font-label text-xs tracking-wider transition-all duration-300 ${
                  activeTab === cat.value
                    ? 'bg-[#10B981] text-[#0a0d1c] font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                    : 'bg-[#171b2a] text-on-surface-variant hover:text-white hover:bg-[#262939] border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => handleOpenLightbox(photo, index)}
              className="group h-[340px] md:h-[380px] relative rounded-3xl overflow-hidden border border-white/10 bg-[#171b2a] cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:border-[#10B981]/50 transition-all duration-500"
            >
              <img
                src={photo.url}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-[10px] font-mono tracking-widest text-[#10B981] uppercase mb-1">
                  STAGE // {photo.category.toUpperCase()}
                </span>
                <h4 className="text-white text-base font-semibold tracking-wide">
                  {photo.title}
                </h4>
                <p className="text-xs text-white/60 line-clamp-1 mt-1">
                  {photo.description}
                </p>
              </div>

              {/* Eye hover indicator */}
              <div className="absolute top-4 right-4 bg-background/80 backdrop-blur rounded-full p-2 text-[#10B981] border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye size={16} />
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Backdrop Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-background/95 backdrop-blur-md p-4 overflow-y-auto animate-fade-in">
            <button
              onClick={handleCloseLightbox}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-colors z-[160]"
            >
              <X size={24} />
            </button>

            {/* Photo core panel */}
            <div className="max-w-4xl w-full flex flex-col items-center my-auto py-8">
              
              {/* Image and Flip Frame Container */}
              <div className="relative w-full h-[400px] sm:h-[480px] md:h-[580px] max-h-[65vh] rounded-3xl overflow-visible shadow-2xl">
                
                {/* 3D Flip Card */}
                <div 
                  onClick={() => setIsFlipped(!isFlipped)}
                  className={`perspective-1000 w-full h-full cursor-pointer ${isFlipped ? 'is-flipped' : ''}`}
                >
                  <div className="card-inner relative w-full h-full preserve-3d transition-transform duration-[850ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                    
                    {/* FRONT FACE: Image */}
                    <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden border border-white/10 bg-black">
                      <img
                        src={selectedPhoto.url}
                        alt={selectedPhoto.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Timeline-style bottom tags overlay */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10 select-none">
                        <span className="bg-[#0a0d1c]/80 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-label text-[#10B981] border border-white/5 tracking-wider font-semibold">
                          ẢNH CHỤP 🪐
                        </span>
                        <span className="text-[#FBBF24] font-mono text-xs bg-black/40 px-3 py-1.5 rounded-full border border-white/5 font-semibold">
                          {selectedPhoto.category === 'infant' ? '0 - 3M' : selectedPhoto.category === 'sitting' ? '6 - 9M' : selectedPhoto.category === 'standing' ? '12M' : 'COSMIC'}
                        </span>
                      </div>
                    </div>
                    
                    {/* BACK FACE: Details (Styled like Timeline Card Back) */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 glass-panel p-6 md:p-10 rounded-3xl flex flex-col justify-center transition-all duration-500 border-[#10B981]/30 hover:border-[#FBBF24]/50 shadow-[0_0_25px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(251,191,36,0.3)]">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="material-symbols-outlined text-[#10B981] animate-pulse">
                          auto_awesome
                        </span>
                        <h3 className="font-display font-medium text-xl md:text-2xl text-white">
                          {selectedPhoto.title}
                        </h3>
                      </div>

                      <p className="font-body text-xs md:text-sm text-on-surface-variant leading-relaxed mb-6 text-left max-w-lg">
                        {selectedPhoto.description}
                      </p>

                      <div className="grid grid-cols-2 gap-3 font-label text-left w-full max-w-lg">
                        <div className="bg-[#0a0d1c]/80 p-3 rounded-xl border border-white/5">
                          <span className="block text-[#FBBF24] text-[9px] uppercase tracking-wider mb-0.5 font-bold">
                            PHÂN LOẠI
                          </span>
                          <span className="text-xs font-bold text-white font-mono uppercase">
                            {selectedPhoto.category === 'infant' ? 'Sơ sinh - 3 Tháng' : selectedPhoto.category === 'sitting' ? '6 - 9 Tháng' : selectedPhoto.category === 'standing' ? '12 Tháng' : 'Khác'}
                          </span>
                        </div>
                        
                        <div className="bg-[#0a0d1c]/80 p-3 rounded-xl border border-white/5">
                          <span className="block text-[#10B981] text-[9px] uppercase tracking-wider mb-0.5 font-bold">
                            VỊ TRÍ PHI THUYỀN
                          </span>
                          <span className="text-xs font-bold text-white font-mono">
                            HÌNH {activeIndex + 1} / {filteredPhotos.length}
                          </span>
                        </div>
                        
                        <div className="col-span-2 bg-[#0a0d1c]/80 p-3 rounded-xl border border-white/5 flex justify-between items-center text-[10px] md:text-xs">
                          <span className="text-white/40 uppercase tracking-wide text-[9px] font-bold">ĐỊA ĐIỂM DU HÀNH:</span>
                          <span className="text-[#10B981] font-semibold font-body">Trạm Vũ Trụ Ken</span>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>

                {/* Inner-framed Navigation Buttons */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                    handlePrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 border border-white/10 text-white hover:bg-black/40 hover:scale-105 active:scale-95 transition-all duration-300 z-[160] shadow-md"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                    handleNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 border border-white/10 text-white hover:bg-black/40 hover:scale-105 active:scale-95 transition-all duration-300 z-[160] shadow-md"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
                
              </div>

              {/* Interaction Hint */}
              <div className="text-center mt-4 select-none">
                <span className="text-[9px] font-mono tracking-[0.25em] text-[#10B981]/70 uppercase animate-pulse">
                  [ CHẠM VÀO ẢNH ĐỂ XEM CHI TIẾT KỶ NIỆM ]
                </span>
              </div>

            </div>
          </div>
        )}
      </div>
    </section>
  );
}
