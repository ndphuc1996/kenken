import { useState, useEffect } from 'react';
import { SpaceWish } from '../types';
import { INITIAL_WISHES } from '../data';
import { Search, Star } from 'lucide-react';

export default function WishWall() {
  const [wishes, setWishes] = useState<SpaceWish[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load from localStorage or seed
  useEffect(() => {
    const saved = localStorage.getItem('ken_invitations_wishes');
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
      } catch (e) {
        setWishes(INITIAL_WISHES);
      }
    } else {
      setWishes(INITIAL_WISHES);
      localStorage.setItem('ken_invitations_wishes', JSON.stringify(INITIAL_WISHES));
    }
  }, []);

  const filteredWishes = wishes.filter(w => 
    w.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.relation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-10 md:py-16 px-4 md:px-margin-desktop bg-[#05070a]/95 relative overflow-hidden" id="wish">
      {/* Background stardust */}
      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-[radial-gradient(circle_at_bottom,rgba(211,187,255,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <span className="font-label-md text-[#10B981] tracking-[0.4em] uppercase mb-3 block">
            🌌 Cosmic Blessings Wall
          </span>
          <h2 className="font-headline-lg text-4xl md:text-5xl text-[#d3bbff] mb-4">
            Bức Tường <span className="text-secondary-container italic">Lời Chúc Thiên Hà</span>
          </h2>
          <p className="font-body text-on-surface-variant max-w-xl mx-auto text-sm md:text-base">
            Những thông điệp yêu thương, lời chúc ngập tràn may mắn gửi từ khắp các tinh cầu gửi đến hành tinh tí hon của bé Ken.
          </p>
        </div>

        {/* Messages Display Board with Search */}
        <div className="flex flex-col space-y-6">
          {/* Search filter panel */}
          <div className="flex shadow-inner items-center gap-2 bg-[#0f1321]/40 border border-white/5 px-4 py-3 rounded-2xl max-w-md mx-auto w-full">
            <Search size={18} className="text-on-surface-variant" />
            <input
              type="text"
              placeholder="Tìm lời chúc, người gửi hoặc nhóm quan hệ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-white placeholder-white/30 focus:outline-none w-full"
            />
          </div>

          {/* List wishes (Beautiful Responsive Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWishes.length > 0 ? (
              filteredWishes.map((w) => (
                <div
                  key={w.id}
                  className="bg-[#0f1321]/50 border border-white/5 rounded-2xl p-6 hover:border-[#10B981]/30 hover:bg-[#0f1321]/80 hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between min-h-[220px]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {/* Generics Initials avatar */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#6d28d9] to-[#10B981] flex items-center justify-center font-bold text-white text-sm shadow">
                          {w.sender.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white tracking-wide">
                            {w.sender}
                          </h4>
                          <div className="flex items-center gap-0.5 mt-0.5">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <Star
                                key={idx}
                                size={10}
                                className={
                                  idx < w.starsCount
                                    ? 'text-secondary-container fill-secondary-container'
                                    : 'text-white/10'
                                }
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-white/50">
                          {w.relation}
                        </span>
                        <span className="text-lg">{w.emoji}</span>
                      </div>
                    </div>

                    <p className="text-sm text-on-surface-variant line-clamp-4 leading-relaxed italic font-body">
                      "{w.message}"
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] text-white/30 font-mono">
                    <span>SEC_WISH // SENT</span>
                    <span>
                      {new Date(w.timestamp).toLocaleDateString('vi', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-on-surface-variant flex flex-col justify-center items-center gap-3 bg-[#0f1321]/20 rounded-3xl border border-dashed border-white/5">
                <span className="text-3xl">📡</span>
                <p className="font-label text-sm tracking-widest text-[#ccc3d7]">
                  KHÔNG CÓ LỜI CHÚC NÀO ĐƯỢC TÌM THẤY
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

