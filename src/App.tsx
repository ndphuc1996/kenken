import { useState, useEffect, MouseEvent } from 'react';
import { 
  Compass, 
  MapPin, 
  Calendar as CalendarIcon, 
  ChevronDown, 
  Music, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Gift 
} from 'lucide-react';
import { TIMELINE_DATA } from './data';
import { TimelineMonth } from './types';
import WishWall from './components/WishWall';
import SpaceGallery from './components/SpaceGallery';
import Constellation from './components/Constellation';
import TimelineCard from './components/TimelineCard';

export default function App() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [isStoneActivating, setIsStoneActivating] = useState(false);
  const [countdown, setCountdown] = useState({ days: 3, hours: 14, minutes: 22, seconds: 40 });
  const [soundActive, setSoundActive] = useState(false);
  const [galleryTab, setGalleryTab] = useState<string>('all');

  // Setup dynamic countdown to June 13, 2026 11:00:00
  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2026-06-13T11:00:00+07:00');
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setCountdown({ days, hours, minutes, seconds });
      } else {
        // Celebration completed / reached target
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  // Time stone travel logic
  const handleActivateTimeStone = () => {
    if (isStoneActivating) return;
    setIsStoneActivating(true);
    
    setTimeout(() => {
      const timelineSection = document.getElementById('timeline-0');
      if (timelineSection) {
        const offset = 80; // height of top navbar + spacing buffer to center Newborn card
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = timelineSection.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        setActiveSection('timeline');
      }
    }, 1100); // Allow time for the awesome portal opening/spin effects

    setTimeout(() => {
      setIsStoneActivating(false);
    }, 2500);
  };

  const toggleCardFlip = (id: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleTimelineNodeClick = (id: number, _month: string) => {
    const timelineCard = document.getElementById(`timeline-${id}`);
    if (timelineCard) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = timelineCard.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection('timeline');
    }
  };

  const [activeSection, setActiveSection] = useState('home');

  // Track active section on scroll dynamically
  useEffect(() => {
    const handleScrollActive = () => {
      const sections = ['home', 'timeline', 'venue', 'gallery', 'wish'];
      const scrollPosition = window.scrollY + 100; // 64px navbar height + offset buffer

      // If at the very top, set to home directly
      if (window.scrollY < 120) {
        setActiveSection('home');
        return;
      }

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollActive);
    return () => window.removeEventListener('scroll', handleScrollActive);
  }, []);

  // Smooth scroll handler with support for top sticky navbar offset (64px)
  const handleScrollTo = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === '#') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setActiveSection('home');
      return;
    }
    
    // Redirect '#timeline' scroll target to target the specific Newborn card 'timeline-0'
    const targetElementId = targetId === '#timeline' ? 'timeline-0' : targetId.replace('#', '');
    const element = document.getElementById(targetElementId);
    if (element) {
      // Use custom offsets for specific sections: 80px for timeline/newborn, 40px for venue, 64px for others
      const offset = targetId === '#venue' ? 40 : (targetId === '#timeline' ? 80 : 64);
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(targetId.replace('#', ''));
    }
  };

  const scrollToVenue = () => {
    const element = document.getElementById('venue');
    if (element) {
      // Use offset (40px) for venue section to align it nicely closer to the top navbar
      const offset = 40;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection('venue');
    }
  };

  return (
    <div className="bg-[#0a0d1c] text-[#dfe1f6] font-body-md min-h-screen relative overflow-x-hidden select-none pb-16 md:pb-0">
      
      {/* Top Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-margin-desktop w-full h-16 fixed z-50 top-0 bg-[#0a0d1c]/40 backdrop-blur-xl border-b border-white/5">
        <a 
          href="#" 
          onClick={(e) => handleScrollTo(e, '#')}
          className="font-display text-lg md:text-2xl text-[#d3bbff] tracking-tighter font-semibold hover:text-[#10B981] transition-colors"
        >
          Ken's Multiverse
        </a>
        <div className="hidden md:flex gap-8 items-center">
          <a 
            onClick={(e) => handleScrollTo(e, '#timeline')}
            className={`font-label text-xs uppercase tracking-widest pb-1 transition-all duration-300 cursor-pointer ${
              activeSection === 'timeline'
                ? 'text-[#10B981] border-b-2 border-[#10B981] font-semibold'
                : 'text-on-surface-variant hover:text-[#10B981]'
            }`} 
            href="#timeline"
          >
            Timeline
          </a>
          <a 
            onClick={(e) => handleScrollTo(e, '#venue')}
            className={`font-label text-xs uppercase tracking-widest pb-1 transition-all duration-300 cursor-pointer ${
              activeSection === 'venue'
                ? 'text-[#10B981] border-b-2 border-[#10B981] font-semibold'
                : 'text-on-surface-variant hover:text-[#10B981]'
            }`} 
            href="#venue"
          >
            Venue
          </a>
          <a 
            onClick={(e) => handleScrollTo(e, '#gallery')}
            className={`font-label text-xs uppercase tracking-widest pb-1 transition-all duration-300 cursor-pointer ${
              activeSection === 'gallery'
                ? 'text-[#10B981] border-b-2 border-[#10B981] font-semibold'
                : 'text-on-surface-variant hover:text-[#10B981]'
            }`} 
            href="#gallery"
          >
            Gallery
          </a>
          <a 
            onClick={(e) => handleScrollTo(e, '#wish')}
            className={`font-label text-xs uppercase tracking-widest pb-1 transition-all duration-300 cursor-pointer ${
              activeSection === 'wish'
                ? 'text-[#10B981] border-b-2 border-[#10B981] font-semibold'
                : 'text-on-surface-variant hover:text-[#10B981]'
            }`} 
            href="#wish"
          >
            Wish
          </a>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Audio atmosphere toggle */}
          {/* <button 
            onClick={() => setSoundActive(!soundActive)}
            className="p-2 rounded-full border border-white/5 hover:border-[#10B981]/20 bg-[#171b2a]/40 text-on-surface-variant hover:text-white transition-colors text-xs flex items-center gap-1.5 focus:outline-none"
            title="Bật/Tắt Nhạc Nền Vũ Trụ"
          >
            {soundActive ? <Volume2 size={16} className="text-[#10B981]" /> : <VolumeX size={16} />}
            <span className="text-[10px] uppercase font-mono tracking-wider hidden sm:inline">COSMIC HUM</span>
          </button> */}

          <button 
            onClick={scrollToVenue}
            className="bg-[#6d28d9] hover:bg-[#5b00c5] text-[#dfe1f6] px-6 py-2 rounded-full font-label text-xs tracking-wider font-semibold active:scale-95 transition-transform hover:shadow-[0_0_15px_rgba(109,40,217,0.5)] cursor-pointer"
          >
            THƯ MỜI
          </button>
        </div>
      </nav>

      {/* Atmospheric sounds embedding (soft space synth background) */}
      {soundActive && (
        <iframe 
          src="https://www.youtube.com/embed/S_gInD9M9u0?autoplay=1&mute=0&loop=1&playlist=S_gInD9M9u0" 
          className="hidden w-0 h-0"
          allow="autoplay"
        />
      )}

      {/* Scene 1: The Sanctum of Time (Hero Header) */}
      <section id="home" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-16">
        
        {/* Background cosmic galaxy layers */}
        <div className="absolute inset-0 z-0 select-none">
          <img 
            className="w-full h-full object-cover opacity-35 mix-blend-lighten pointer-events-none" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpZs4yHKClk1jUtRHdIHM5NhfungqXGydjywt8p5Dxh9qimxe8HVcWNkZgZQw-KZeQZztwceyRz5CxFAuw3mhRilecesSWwE4RTAYb70r0d04zGd0l7xB24xY378hlNt7rLmlhM_uuVB8ODn4WQXPzmBgR1rzEodDm1vXrKP83z5KqES5bamfagMqh9HU6Mzq1tvktc4tnPpjztMbZdW5Vz34IYOMl3dysQXTVfujqFAfZK_mTGJQRzWW6_g9skVhTBakXUy4ILzU"
            alt="Intricate cosmic nebula background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0d1c]/80 to-[#0a0d1c] pointer-events-none" />
        </div>

        {/* Floating space dust indicators */}
        <div className="absolute inset-0 pointer-events-none z-[1]">
          <div className="absolute w-2.5 h-2.5 bg-[#10B981] rounded-full blur-[1px] top-1/4 left-1/3 animate-pulse"></div>
          <div className="absolute w-1.5 h-1.5 bg-[#FBBF24] rounded-full blur-[1px] bottom-1/3 right-1/4 animate-pulse delay-500"></div>
          <div className="absolute w-2 h-2 bg-[#d3bbff] rounded-full blur-[2px] top-1/2 right-1/3 animate-pulse delay-1000"></div>
          
          {/* Side runic labels */}
          <div className="absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 rune-text text-[#FBBF24]/20 animate-rune-flicker">
            HISTORY • PRESENT • FUTURE • DESTINY
          </div>
          <div className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 rune-text text-[#FBBF24]/20 animate-rune-flicker delay-700">
            ETERNITY • COSMOS • UNIVERSAL • LIGHT
          </div>
        </div>

        {/* Time Stone & Mandala Center */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl -mt-[76px] sm:-mt-[100px] md:mt-0">
          <div className="relative w-56 h-56 sm:w-60 sm:h-60 md:w-[320px] md:h-[320px] flex items-center justify-center mb-2 md:mb-4 group select-none">
            {/* Runic Orbits */}
            <div className={`absolute inset-0 border-2 eldritch-mandala border-dashed rounded-full transition-all duration-1000 ${
              isStoneActivating ? 'animate-[spin_1s_linear_infinite] scale-125 border-[#10B981] opacity-90' : 'animate-rotate-slow'
            }`}></div>
            <div className={`absolute inset-8 border-[1.5px] border-double border-[#FBBF24]/30 rounded-full transition-all duration-1000 ${
              isStoneActivating ? 'animate-[spin_0.8s_linear_infinite] scale-110 border-[#FBBF24] opacity-90' : 'animate-rotate-reverse'
            }`}></div>
            <div className={`absolute inset-20 border border-[#10B981]/10 rounded-full transition-all duration-1000 ${
              isStoneActivating ? 'animate-[spin_0.5s_linear_infinite] scale-90 border-[#10B981] opacity-70' : 'animate-rotate-slow-bg opacity-30'
            }`}></div>
            <div className="absolute inset-32 bg-[#10B981]/15 rounded-full blur-3xl animate-pulse"></div>
            
            {/* Expanding portal waves */}
            {isStoneActivating && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-[#10B981] animate-ping opacity-80" />
                <div className="absolute -inset-10 rounded-full border border-[#10B981]/60 animate-ping opacity-50 delay-100" />
                <div className="absolute -inset-[80px] rounded-full border border-[#FBBF24]/30 animate-ping opacity-30 delay-200" />
              </>
            )}

            {/* Interactive Time Stone Jade */}
            <div 
              onClick={handleActivateTimeStone}
              className={`relative z-20 w-24 h-32 sm:w-28 sm:h-36 md:w-32 md:h-44 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] time-stone-glow cursor-pointer transition-all duration-1000 flex items-center justify-center group ${
                isStoneActivating 
                  ? 'rotate-[1080deg] scale-135 shadow-[0_0_100px_35px_rgba(16,185,129,0.9)] filter brightness-125' 
                  : 'animate-float animate-pulse-glow hover:scale-110'
              }`}
              title="Nhấp để du hành thời gian!"
            >
              {/* Refraction gloss overlay */}
              <div className="absolute inset-0 overflow-hidden rounded-full opacity-60">
                <div className="w-full h-full bg-[radial-gradient(circle_at_40%_30%,rgba(255,255,255,0.95)_0%,transparent_60%)]"></div>
              </div>
              <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-white/25 rounded-full blur-xl"></div>
              
              {/* Inner galaxy swirl */}
              <span className={`material-symbols-outlined text-white/50 text-4xl group-hover:text-white transition-all duration-1000 ${isStoneActivating ? 'rotate-[1440deg] scale-150 text-white' : 'group-hover:rotate-180'}`}>
                cyclone
              </span>
            </div>

            {/* Orbiting celestial indicators */}
            <span className="material-symbols-outlined text-[#FBBF24] absolute top-2 text-3xl opacity-40 animate-pulse">history</span>
            <span className="material-symbols-outlined text-[#FBBF24] absolute bottom-2 text-3xl opacity-40 animate-pulse delay-300">auto_awesome</span>
            <span className="material-symbols-outlined text-[#FBBF24] absolute left-2 text-3xl opacity-40 animate-pulse delay-500">sparkles</span>
            <span className="material-symbols-outlined text-[#FBBF24] absolute right-2 text-3xl opacity-40 animate-pulse delay-700">hourglass_empty</span>
          </div>

          <h1 className="font-display text-[17px] sm:text-2xl md:text-4xl text-[#d3bbff] mb-2 md:mb-4 leading-tight select-text">
            Bé Ken Đã Hoàn Thành <br className="hidden md:inline" />
            <span className="text-secondary-container italic font-serif">Vòng Quay Đầu Tiên</span> <br className="hidden md:inline" />
            Quanh Mặt Trời
          </h1>
          
          <p className="font-body text-xs md:text-sm text-on-surface-variant mb-3 md:mb-6 max-w-lg duration-300 select-text leading-relaxed">
            Chạm vào <span className="text-[#10B981] font-medium">Time Stone</span> để kích hoạt cỗ máy thời gian, du hành ngược và chứng kiến hành trình kì diệu của nhà du hành vũ trụ nhỏ bé.
          </p>

          <button 
            onClick={handleActivateTimeStone} 
            className="relative overflow-hidden px-6 py-3.5 rounded-full bg-[#1b1f2e] border border-[#10B981]/50 group active:scale-95 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
          >
            <div className="absolute inset-0 portal-shimmer opacity-30 pointer-events-none" />
            <span className="relative z-10 font-label text-xs tracking-[0.2em] font-bold text-[#10B981]">
              KÍCH HOẠT TIME STONE
            </span>
            <div className="absolute inset-0 bg-[#10B981]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </button>
        </div>
      </section>

      {/* Transition Scene: Sequence Initiated indicator */}
      <section className="h-[140px] flex items-center justify-center bg-gradient-to-b from-[#0a0d1c] to-[#05070a] select-none">
        <div 
          onClick={handleActivateTimeStone}
          className="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 duration-300 cursor-pointer group"
        >
          <span className="material-symbols-outlined text-[#10B981] text-4xl animate-bounce group-hover:scale-110 transition-transform">
            keyboard_double_arrow_down
          </span>
          <p className="font-label text-[10px] uppercase tracking-[0.4em] text-secondary-container">
            TIME REVERSAL SEQUENCE INITIATED
          </p>
        </div>
      </section>

      {/* Scene 2: Timeline (Memory Universes) */}
      <section className="py-10 md:py-16 px-4 md:px-margin-desktop bg-[#05070a] relative" id="timeline">
        {/* Glowing Central String */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#10B981] via-[#FBBF24]/50 to-transparent pointer-events-none opacity-60" />

        <div className="max-w-5xl mx-auto flex flex-col gap-12 md:gap-16 relative z-10">
          
          {TIMELINE_DATA.map((item, index) => {
            const isFlipped = !!flippedCards[item.id];
            const isEven = index % 2 === 0;

            return (
              <div 
                key={item.id} 
                id={`timeline-${item.id}`}
                className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative"
              >
                {/* Visual anchor line extension on desktop */}
                <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-1/2 h-0.5 border-t border-dashed border-white/5 pointer-events-none z-0 ${
                  isEven ? 'left-0 pr-12' : 'right-0 pl-12'
                }`} />

                {/* Scroll-triggered slide-in Memory Card */}
                <TimelineCard 
                  item={item} 
                  isEven={isEven} 
                  flippedCards={flippedCards} 
                  toggleCardFlip={toggleCardFlip} 
                />

                {/* Central Circle Month indicator */}
                <div 
                  onClick={() => handleTimelineNodeClick(item.id, item.month)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0a0d1c] border-4 flex items-center justify-center z-20 order-1 md:order-2 shadow-xl hover:scale-110 transition-all cursor-pointer ${
                    item.id === 12 ? 'border-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.3)]' :
                    item.id === 9 ? 'border-[#FBBF24] shadow-[0_0_20px_rgba(251,191,36,0.3)]' :
                    item.id === 6 ? 'border-[#d3bbff] shadow-[0_0_20px_rgba(211,187,255,0.3)]' :
                    item.id === 3 ? 'border-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.2)]' :
                    'border-[#d3bbff] shadow-[0_0_20px_rgba(211,187,255,0.5)]'
                  }`}
                >
                  <span className={`font-mono font-bold text-sm sm:text-base ${
                    item.id === 12 ? 'text-[#10B981]' :
                    item.id === 9 ? 'text-[#FBBF24]' :
                    'text-[#d3bbff]'
                  }`}>
                    {item.month}
                  </span>
                </div>

                {/* Spacer side to maintain clean landscape flow on desktop */}
                <div className={`hidden md:block md:w-[44%] ${isEven ? 'md:order-3' : 'md:order-1'}`} />

              </div>
            );
          })}

        </div>
      </section>

      {/* Constellation decode block */}
      <Constellation />

      {/* Scene: Invitation Portal with Countdown */}
      <section className="py-10 md:py-16 relative bg-[#0f1321] overflow-hidden" id="venue">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.06)_0%,transparent_75%)] pointer-events-none" />

        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          {/* Multi-layered border wrapper */}
          <div className="p-0.5 bg-gradient-to-tr from-secondary-container via-tertiary to-primary rounded-[2.5rem] shadow-[0_0_80px_rgba(251,191,36,0.12)]">
            <div className="bg-[#0f1321]/95 px-4 py-6 md:px-10 md:py-10 rounded-[2.4rem] flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute inset-0 portal-shimmer opacity-10 pointer-events-none" />
              
              <div className="inline-flex p-2 rounded-full bg-[#FBBF24]/10 text-secondary-container mb-1.5 animate-bounce">
                <CalendarIcon size={24} />
              </div>

              <h2 className="font-display text-2xl md:text-4xl text-[#d3bbff] mb-1">
                Lời Mời Từ Đa Vũ Trụ
              </h2>
              
              <p className="font-body text-[#ccc3d7] text-xs md:text-sm max-w-md mb-4 leading-relaxed">
                Hệ thống đếm ngược đã kích hoạt. Hãy định vị phi thuyền của bạn để cập bến đúng thời khắc kỷ niệm sinh nhật bé Ken!
              </p>

              {/* Dynamic timer count list */}
              <div className="flex gap-3 sm:gap-6 justify-center items-center mb-4 relative z-10 font-label">
                
                <div className="flex flex-col items-center bg-[#0a0d1c]/60 px-3 py-1.5 rounded-xl border border-white/5 min-w-[60px] sm:min-w-[80px]">
                  <span className="text-2xl sm:text-4xl font-bold font-mono text-tertiary">
                    {String(countdown.days).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-on-surface-variant tracking-widest uppercase mt-0.5">
                    NGÀY
                  </span>
                </div>

                <div className="text-xl text-white/30 font-bold animate-pulse">:</div>

                <div className="flex flex-col items-center bg-[#0a0d1c]/60 px-3 py-1.5 rounded-xl border border-white/5 min-w-[60px] sm:min-w-[80px]">
                  <span className="text-2xl sm:text-4xl font-bold font-mono text-tertiary">
                    {String(countdown.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-on-surface-variant tracking-widest uppercase mt-0.5">
                    GIỜ
                  </span>
                </div>

                <div className="text-xl text-white/30 font-bold animate-pulse">:</div>

                <div className="flex flex-col items-center bg-[#0a0d1c]/60 px-3 py-1.5 rounded-xl border border-white/5 min-w-[60px] sm:min-w-[80px]">
                  <span className="text-2xl sm:text-4xl font-bold font-mono text-tertiary">
                    {String(countdown.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-on-surface-variant tracking-widest uppercase mt-0.5">
                    PHÚT
                  </span>
                </div>

              </div>

              {/* Location schedule data details */}
              <div className="space-y-3 mb-0 relative z-10 w-full max-w-md bg-[#0a0d1c]/40 p-4 rounded-2xl border border-white/5 text-left text-xs">
                
                <div className="flex items-center gap-3 text-white group">
                  <div className="p-1.5 rounded-lg bg-[#10B981]/10 text-[#10B981]">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="text-white/40 block text-[8px] uppercase tracking-wider">TOẠ ĐỘ ĐỔ BỘ</span>
                    <span className="font-semibold text-white">66/21A, phường Thanh Đức, Tp. Vĩnh Long</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-white group">
                  <div className="p-1.5 rounded-lg bg-[#FBBF24]/10 text-[#FBBF24]">
                    <CalendarIcon size={16} />
                  </div>
                  <div>
                    <span className="text-white/40 block text-[8px] uppercase tracking-wider">THỜI GIAN NHẬP KHÔNG PHẬN</span>
                    <span className="font-semibold text-white">11:00 - Thứ Bảy, Ngày 13 Tháng 06, 2026</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interstellar photo Cabin section */}
      <SpaceGallery activeTab={galleryTab} setActiveTab={setGalleryTab} />

      {/* Cosmic wall section */}
      <WishWall />

      {/* Footer block Section */}
      <footer className="w-full py-12 px-6 md:px-margin-desktop flex flex-col items-center gap-4 border-t border-white/5 bg-[#05070a]">
        <div className="font-display font-semibold text-lg text-[#10B981] opacity-70 italic tracking-widest">
          Ken's Multiverse
        </div>
        <div className="flex gap-6 mt-1.5">
          <a 
            onClick={(e) => handleScrollTo(e, '#timeline')}
            className="font-label text-[10px] text-on-surface-variant hover:text-[#FBBF24] transition-colors uppercase tracking-widest cursor-pointer" 
            href="#timeline"
          >
            MULTIVERSE PROTOCOL
          </a>
          <a 
            onClick={(e) => handleScrollTo(e, '#gallery')}
            className="font-label text-[10px] text-on-surface-variant hover:text-[#FBBF24] transition-colors uppercase tracking-widest cursor-pointer" 
            href="#gallery"
          >
            INTERSTELLAR RIGHTS
          </a>
        </div>
        <div className="font-label text-[9px] text-on-surface-variant opacity-30 mt-4 tracking-widest text-center">
          © 2024 KEN'S MULTIVERSE. ALL FREQUENCIES SECURED.
        </div>
      </footer>

      {/* Bottom NavBar (Mobile Only) for sleek ergonomics */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0a0d1c]/80 backdrop-blur-lg border-t border-white/5 z-50 flex justify-around items-center px-4 rounded-t-2xl">
        <a 
          href="#" 
          onClick={(e) => handleScrollTo(e, '#')}
          className={`flex flex-col items-center p-1.5 transition-colors duration-300 ${
            activeSection === 'home' ? 'text-[#10B981] font-semibold' : 'text-on-surface-variant hover:text-[#10B981]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">home</span>
          <span className="text-[8px] font-label uppercase mt-0.5 tracking-wider">TRỞ VỀ</span>
        </a>
        <a 
          href="#timeline" 
          onClick={(e) => handleScrollTo(e, '#timeline')}
          className={`flex flex-col items-center p-1.5 transition-colors duration-300 ${
            activeSection === 'timeline' ? 'text-[#10B981] font-semibold' : 'text-on-surface-variant hover:text-[#10B981]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">auto_stories</span>
          <span className="text-[8px] font-label uppercase mt-0.5 tracking-wider">HÀNH TRÌNH</span>
        </a>
        <a  
          onClick={scrollToVenue}
          className="flex flex-col items-center justify-center -translate-y-4 w-12 h-12 bg-gradient-to-tr from-[#6d28d9] to-[#10B981] text-white rounded-full shadow-lg border-2 border-[#0a0d1c] active:scale-95 transition-transform cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl animate-pulse">event_available</span>
        </a>
        <a 
          href="#gallery" 
          onClick={(e) => handleScrollTo(e, '#gallery')}
          className={`flex flex-col items-center p-1.5 transition-colors duration-300 ${
            activeSection === 'gallery' ? 'text-[#10B981] font-semibold' : 'text-on-surface-variant hover:text-[#10B981]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">photo_album</span>
          <span className="text-[8px] font-label uppercase mt-0.5 tracking-wider">THƯ VIỆN</span>
        </a>
        <a 
          href="#wish" 
          onClick={(e) => handleScrollTo(e, '#wish')}
          className={`flex flex-col items-center p-1.5 transition-colors duration-300 ${
            activeSection === 'wish' ? 'text-[#10B981] font-semibold' : 'text-on-surface-variant hover:text-[#10B981]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">forum</span>
          <span className="text-[8px] font-label uppercase mt-0.5 tracking-wider">LỜI CHÚC</span>
        </a>
      </nav>
    </div>
  );
}
