import { useState, useEffect } from 'react';
import { Star, X } from 'lucide-react';

export default function Constellation() {
  const [activeStar, setActiveStar] = useState<number | null>(null);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  useEffect(() => {
    if (activeStar !== null) {
      setIsCardFlipped(false);
      const timer = setTimeout(() => {
        setIsCardFlipped(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsCardFlipped(false);
    }
  }, [activeStar]);

  const starAttributes = [
    { id: 1, x: 32, y: 15, attribute: 'Trí tuệ Sáng suốt (Castor)', desc: 'Ngôi sao đại diện cho tư duy nhạy bén, thích khám phá và nhanh nhẹn ghi nhớ mọi âm thanh xung quanh.' },
    { id: 2, x: 24, y: 24, attribute: 'Trái tim Ấm áp (Pollux)', desc: 'Biểu trưng cho nụ cười hiến hậu, tâm hồn nhạy cảm và sự gắn kết yêu thương với gia đình.' },
    { id: 3, x: 58, y: 25, attribute: 'Sự Linh hoạt (Mebsuta)', desc: 'Mang đến cho bé Ken tinh thần vui tươi, năng động, dễ thích nghi với mọi điều mới lạ.' },
    { id: 4, x: 68, y: 31, attribute: 'Sự Tự tin (Alzirr)', desc: 'Tiếp thêm sự mạnh dạn vững vàng, luôn háo hức tiến bước thám hiểm thế giới.' },
    { id: 5, x: 75, y: 31, attribute: 'Đôi mắt Sáng ngời (Tejat)', desc: 'Đôi mắt to tròn láu lỉnh, ánh lên niềm tò mò vô tận và tình yêu rực rỡ với cuộc sống.' },
    { id: 6, x: 38, y: 34, attribute: 'Nhạy bén Lanh lợi (Propus)', desc: 'Phản xạ tuyệt vời và khả năng nhún nhảy nhịp nhàng cực kỳ đáng yêu mỗi khi nghe giai điệu vui.' },
    { id: 7, x: 47, y: 36, attribute: 'Hòa đồng Thân thiện (Wasat)', desc: 'Sự vui tươi tự nhiên giúp kết nối mọi người, mang lại nụ cười ngọt ngào lây lan cho cả căn phòng.' },
    { id: 8, x: 62, y: 46, attribute: 'Hào quang Hộ mệnh (Alhena)', desc: 'Ngôi sao sáng rực rỡ tượng trưng cho sức khỏe bảo hộ tròn đầy, sự may mắn ban phước cho trọn vẹn tuổi thơ Ken.' }
  ];

  const selectedStar = starAttributes.find(s => s.id === activeStar);

  return (
    <section className="py-8 md:py-12 relative min-h-[70vh] md:min-h-[85vh] bg-[#05070a] flex flex-col items-center justify-center overflow-hidden">
      {/* Immersive space dust */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-20 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-500 shadow-[0_0_10px_white]"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-[#FBBF24] rounded-full animate-pulse delay-1000 shadow-[0_0_15px_#FBBF24]"></div>
      </div>

      <div className="text-center z-10 px-4 w-full max-w-2xl -mt-16 sm:-mt-24 md:-mt-8 lg:mt-0">
        <span className="font-label-md text-secondary-container tracking-[0.4rem] uppercase mb-2 md:mb-4 block text-xs md:text-sm">
          Zodiac Protection
        </span>
        <h2 className="font-headline-lg text-4xl md:text-5xl text-white mb-2 md:mb-3 italic">
          Chòm Sao Song Tử
        </h2>
        <p className="font-body text-on-surface-variant max-w-md mx-auto text-sm leading-relaxed mb-4 md:mb-8">
          Ken được sinh ra dưới ánh sáng của chòm sao Song Tử kỳ vĩ. Nhấp vào các <span className="text-secondary-container font-semibold">ngôi sao lung linh</span> giống hệt sơ đồ chòm sao để giải mã nguồn năng lượng thần hộ mệnh ban tặng!
        </p>

        {/* constellation map frame */}
        <div className="relative w-full max-w-[340px] sm:max-w-[420px] mx-auto aspect-square flex items-center justify-center">
          {/* Rotating star ring backgrounds */}
          <div className="absolute inset-0 border border-secondary-container/10 rounded-full animate-rotate-slow"></div>
          <div className="absolute inset-8 border border-tertiary/5 rounded-full animate-rotate-reverse border-dashed"></div>
          <div className="absolute inset-16 border border-white/5 rounded-full animate-pulse"></div>

          {/* Interactive constellation SVG */}
          <svg className="absolute inset-0 w-full h-full text-secondary-container leading-none" style={{ filter: 'none' }} viewBox="0 0 100 100">
            {/* Connection lines representing the Twins Castor & Pollux */}
            {/* 1. Head-to-Head Connector */}
            <line stroke="currentColor" strokeWidth="0.8" className="opacity-80" x1="32" y1="15" x2="24" y2="24" />

            {/* 2. Upper line matching reference image (Castor -> Mebsuta -> Alzirr -> Tejat) */}
            <line stroke="currentColor" strokeWidth="0.8" className="opacity-90" x1="32" y1="15" x2="58" y2="25" />
            <line stroke="currentColor" strokeWidth="0.8" className="opacity-90" x1="58" y1="25" x2="68" y2="31" />
            <line stroke="currentColor" strokeWidth="0.8" className="opacity-90" x1="68" y1="31" x2="75" y2="31" />

            {/* 3. Lower line matching reference image (Pollux -> Propus -> Wasat -> Alhena) */}
            <line stroke="currentColor" strokeWidth="0.8" className="opacity-90" x1="24" y1="24" x2="38" y2="34" />
            <line stroke="currentColor" strokeWidth="0.8" className="opacity-90" x1="38" y1="34" x2="47" y2="36" />
            <line stroke="currentColor" strokeWidth="0.8" className="opacity-90 animate-pulse" x1="47" y1="36" x2="62" y2="46" />

            {/* Clickable Circle Stars */}
            {starAttributes.map((star) => (
              <g 
                key={star.id} 
                onClick={() => setActiveStar(star.id === activeStar ? null : star.id)}
                className="cursor-pointer group"
              >
                {/* Outer pulsing shadow circle for the super bright end star Alhena */}
                <circle
                  cx={star.x}
                  cy={star.y}
                  r={star.id === 8 ? "6" : "4"}
                  className={`fill-secondary-container/20 transition-all duration-300 ${
                    activeStar === star.id ? 'scale-175 fill-tertiary/45 animate-ping' : 'group-hover:scale-125'
                  }`}
                />
                {/* Core star dot */}
                <circle
                  cx={star.x}
                  cy={star.y}
                  r={activeStar === star.id ? (star.id === 8 ? "3.5" : "3") : (star.id === 8 ? "2.5" : "1.8")}
                  className={`transition-colors duration-300 ${
                    activeStar === star.id 
                      ? 'fill-white stroke-tertiary stroke-[0.8px]' 
                      : 'fill-[#FBBF24] group-hover:fill-white'
                  }`}
                />
              </g>
            ))}
          </svg>

          {/* Radar ripple glow for active element */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-56 h-56 border border-secondary-container/5 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Simplified helper instruction at the bottom of the map */}
        <div className="w-full px-4 -mt-[120px] sm:-mt-[152px] flex items-center justify-center z-20 relative">
          <div className="text-xs text-white/50 tracking-widest font-mono italic animate-pulse">
            [ CHẠM VÀO MỘT NGÔI SAO TRÊN BẢN ĐỒ ĐỂ GIẢI MÃ ]
          </div>
        </div>
      </div>

      {/* 3D Card Flip Decryption Popup Modal */}
      {activeStar !== null && (
        <div 
          className="fixed inset-0 z-50 bg-[#05070a]/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveStar(null)}
        >
          <div 
            className="relative animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              className="absolute -top-12 right-0 sm:-right-8 text-white/70 hover:text-white transition-colors p-2 focus:outline-none"
              onClick={() => setActiveStar(null)}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* 3D Flip Card */}
            <div className={`perspective-1000 w-[290px] sm:w-[330px] h-[400px] sm:h-[460px] cursor-pointer ${isCardFlipped ? 'is-flipped' : ''}`}>
              <div className="card-inner relative w-full h-full preserve-3d">
                
                {/* FRONT FACE (Cosmic Cover - mystery card back) */}
                <div
                  className="absolute inset-0 backface-hidden [-webkit-backface-visibility:hidden] rounded-3xl overflow-hidden border border-secondary-container/30 bg-[#0f1321] flex flex-col items-center justify-between p-6 shadow-[0_0_30px_rgba(251,191,36,0.15)] select-none"
                  style={{ visibility: isCardFlipped ? 'hidden' : 'visible', transitionProperty: 'visibility', transitionDelay: isCardFlipped ? '0.4s' : '0s' }}
                >
                  {/* Inner border */}
                  <div className="absolute inset-3 border border-secondary-container/10 rounded-[1.25rem] pointer-events-none" />
                  
                  {/* Top decoration */}
                  <div className="text-center z-10 mt-2">
                    <span className="text-[10px] tracking-[0.3em] font-label text-secondary-container/60 uppercase">
                      GEMINI CONSTELLATION
                    </span>
                  </div>

                  {/* Center Gemini Rune symbol */}
                  <div className="relative flex items-center justify-center w-28 h-28 my-auto z-10">
                    <div className="absolute inset-0 border border-secondary-container/20 rounded-full animate-ping opacity-30"></div>
                    <div className="absolute -inset-2 border border-tertiary/10 rounded-full animate-pulse opacity-40"></div>
                    <div className="absolute inset-0 rounded-full bg-[#FBBF24]/15 blur-xl pointer-events-none"></div>

                    <svg className="w-16 h-16 text-[#FBBF24]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5h6M9 19h6M9 5v14M15 5v14" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5c4 1 10 1 14 0M5 19c4-1 10-1 14 0" />
                    </svg>
                  </div>

                  {/* Bottom decoding text */}
                  <div className="text-center z-10 mb-2">
                    <div className="text-xs text-white/40 tracking-wider font-mono uppercase mb-1">
                      Đang Giải Mã...
                    </div>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#FBBF24] to-transparent mx-auto"></div>
                  </div>
                </div>

                {/* BACK FACE (Decrypted details - card front) */}
                <div
                  className="absolute inset-0 backface-hidden [-webkit-backface-visibility:hidden] rotate-y-180 glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between border border-tertiary/40 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                  style={{ visibility: isCardFlipped ? 'visible' : 'hidden', transitionProperty: 'visibility', transitionDelay: isCardFlipped ? '0s' : '0.4s' }}
                >
                  {/* Inner border */}
                  <div className="absolute inset-3 border border-tertiary/10 rounded-[1.25rem] pointer-events-none" />
                  
                  {/* Top Header Badge */}
                  <div className="flex justify-between items-center z-10 select-none">
                    <span className="bg-tertiary/10 px-2.5 py-1 rounded-full text-[9px] font-label text-tertiary border border-tertiary/20 tracking-wider font-semibold uppercase">
                      Đã Giải Mã ✨
                    </span>
                    <span className="text-[#FBBF24] font-mono text-[10px] bg-black/40 px-2.5 py-1 rounded-full border border-white/5 font-semibold">
                      STAR {selectedStar?.id}
                    </span>
                  </div>

                  {/* Decrypted Info Content */}
                  <div className="my-auto z-10 flex flex-col items-center text-center px-2">
                    {/* Glowing Star Icon */}
                    <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center mb-4 border border-tertiary/20 shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse">
                      <Star size={20} className="text-[#FBBF24] fill-[#FBBF24]" />
                    </div>

                    {/* Attribute Name */}
                    <h3 className="font-display font-medium text-lg sm:text-xl text-white mb-2 tracking-wide leading-tight">
                      {selectedStar?.attribute}
                    </h3>

                    {/* Separator line */}
                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#10B981] to-transparent mb-3"></div>

                    {/* Description text */}
                    <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed text-center max-h-[140px] overflow-y-auto pr-1">
                      {selectedStar?.desc}
                    </p>
                  </div>

                  {/* Bottom Credit */}
                  <div className="text-center z-10 select-none">
                    <span className="text-[9px] tracking-[0.2em] font-label text-white/30 uppercase">
                      Ken's Destiny Guide
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
