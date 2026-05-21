import { useState, useEffect, useRef } from 'react';
import { TimelineMonth } from '../types';

interface TimelineCardProps {
  item: TimelineMonth;
  isEven: boolean;
  flippedCards: Record<number, boolean>;
  toggleCardFlip: (id: number) => void;
}

export default function TimelineCard({ item, isEven, flippedCards, toggleCardFlip }: TimelineCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Observer for visibility (fade-in animation)
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    // 2. Observer for scroll-activation (hover-like state)
    const activeObserver = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      {
        threshold: 0.25,
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    if (cardRef.current) {
      visibilityObserver.observe(cardRef.current);
      activeObserver.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        visibilityObserver.unobserve(cardRef.current);
        activeObserver.unobserve(cardRef.current);
      }
    };
  }, []);

  const isFlipped = !!flippedCards[item.id];

  return (
    <div 
      ref={cardRef}
      className={`w-full md:w-[44%] order-2 md:order-1 ${isEven ? 'md:order-1' : 'md:order-3'} transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible 
          ? 'opacity-100 translate-x-0 scale-100' 
          : isEven 
            ? 'opacity-0 -translate-x-28 md:-translate-x-36 scale-95' 
            : 'opacity-0 translate-x-28 md:translate-x-36 scale-95'
      }`}
    >
      {/* Perspective Flip Box */}
      <div 
        onClick={() => toggleCardFlip(item.id)}
        className={`perspective-1000 w-full h-[340px] md:h-[380px] cursor-pointer group ${isFlipped ? 'is-flipped' : ''}`}
      >
        <div className="card-inner relative w-full h-full preserve-3d">
          
          {/* FRONT FACE of memory card */}
          <div className={`absolute inset-0 backface-hidden rounded-3xl overflow-hidden border shadow-2xl bg-[#171b2a]/50 transition-all duration-500 ${
            isActive 
              ? 'border-[#10B981]/50 shadow-[0_0_25px_rgba(16,185,129,0.3)] scale-[1.01]' 
              : 'border-white/10 hover:border-[#10B981]/40'
          }`}>
            <img 
              alt={item.title} 
              className={`w-full h-full object-cover transition-all duration-700 ${
                isActive 
                  ? 'scale-105' 
                  : 'group-hover:scale-105'
              }`}
              src={item.image}
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10 select-none">
              <span className="bg-[#0a0d1c]/80 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-label text-[#10B981] border border-white/5 tracking-wider font-semibold">
                KỶ NIỆM ✨
              </span>
              <span className="text-[#FBBF24] font-mono text-xs bg-black/40 px-3 py-1.5 rounded-full border border-white/5 font-semibold">
                {item.month}
              </span>
            </div>
          </div>

          {/* BACK FACE of memory card */}
          <div className={`absolute inset-0 backface-hidden rotate-y-180 glass-panel p-6 md:p-8 rounded-3xl flex flex-col justify-center transition-all duration-500 ${
            isActive 
              ? 'border-[#FBBF24]/50 shadow-[0_0_25px_rgba(251,191,36,0.2)]' 
              : 'border-white/10 hover:border-[#FBBF24]/40'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[#10B981] animate-pulse">
                auto_awesome
              </span>
              <h3 className="font-display font-medium text-xl text-white">
                {item.title}
              </h3>
            </div>

            <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">
              {item.description}
            </p>

            <div className="grid grid-cols-2 gap-3 font-label text-left">
              <div className="bg-[#0a0d1c]/80 p-3 rounded-xl border border-white/5">
                <span className="block text-[#FBBF24] text-[9px] uppercase tracking-wider mb-0.5 font-bold">
                  CHIỀU CAO
                </span>
                <span className="text-sm font-bold text-white font-mono">{item.height || 'N/A'}</span>
              </div>
              
              <div className="bg-[#0a0d1c]/80 p-3 rounded-xl border border-white/5">
                <span className="block text-[#10B981] text-[9px] uppercase tracking-wider mb-0.5 font-bold">
                  CÂN NẶNG
                </span>
                <span className="text-sm font-bold text-white font-mono">{item.weight}</span>
              </div>
              
              <div className="col-span-2 bg-[#0a0d1c]/80 p-3 rounded-xl border border-white/5 flex justify-between items-center text-xs">
                <span className="text-white/40 uppercase tracking-wide text-[9px] font-bold">MỐC ĐẠT ĐƯỢC:</span>
                <span className="text-white font-semibold font-body">{item.achievement}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
