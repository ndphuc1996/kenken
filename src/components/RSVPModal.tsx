import { useState, FormEvent } from 'react';
import { Sparkles, X, ChevronRight, Check, Compass, Ticket, Trash2 } from 'lucide-react';
import { RSVPData } from '../types';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RSVPData) => void;
}

export default function RSVPModal({ isOpen, onClose, onSubmit }: RSVPModalProps) {
  const [name, setName] = useState('');
  const [crewCount, setCrewCount] = useState<number>(1);
  const [relation, setRelation] = useState('Bạn Ba Mẹ');
  const [vehicle, setVehicle] = useState('Tàu Vũ Trụ');
  const [wish, setWish] = useState('');
  const [ticket, setTicket] = useState<RSVPData | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Generate random seed values for interstellar tickets
    const randomSeed = Math.floor(1000 + Math.random() * 9000);
    const newRSVP: RSVPData = {
      id: `rsvp-${Date.now()}`,
      name: name.trim(),
      crewCount,
      relation,
      vehicle,
      wish: wish.trim(),
      confirmedAt: new Date().toISOString(),
      ticketNumber: `NV-GEMINI-${randomSeed}`,
    };

    // Save to localStorage
    const saved = localStorage.getItem('ken_invitations_rsvp');
    const existing = saved ? JSON.parse(saved) : [];
    existing.push(newRSVP);
    localStorage.setItem('ken_invitations_rsvp', JSON.stringify(existing));

    setTicket(newRSVP);
    onSubmit(newRSVP);
  };

  const handleClose = () => {
    setName('');
    setCrewCount(1);
    setRelation('Bạn Ba Mẹ');
    setVehicle('Tàu Vũ Trụ');
    setWish('');
    setTicket(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity duration-300 pointer-events-auto"
        onClick={handleClose}
      />

      {/* Glassmorphic Container */}
      <div className="relative w-full max-w-lg bg-[#0f1321]/90 border border-tertiary/40 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.3)] z-10 transition-all duration-300 max-h-[90vh] flex flex-col">
        {/* Shimmer header background */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-secondary-container via-tertiary to-primary animate-pulse" />
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary-container text-2xl animate-spin-slow">
              cyclone
            </span>
            <h3 className="text-xl font-display font-medium text-white tracking-wide">
              {ticket ? 'VŨ TRỤ PASS KHỞI HÀNH' : 'ĐĂNG KÝ PHI HÀNH ĐOÀN'}
            </h3>
          </div>
          <button 
            onClick={handleClose} 
            className="p-1 rounded-full hover:bg-white/10 text-on-surface-variant hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content area */}
        <div className="overflow-y-auto p-6 space-y-4 font-body custom-scroll">
          {!ticket ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-[#FBBF24] mb-1.5 font-semibold">
                  Danh tính Phi hành gia trưởng
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nhập tên của bạn..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0a0d1c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-tertiary transition-colors"
                />
              </div>

              {/* Grid 2-cols: Crew Count & Relation */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1.5">
                    Số lượng Phi hành đoàn
                  </label>
                  <select
                    value={crewCount}
                    onChange={(e) => setCrewCount(Number(e.target.value))}
                    className="w-full bg-[#0a0d1c] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-tertiary transition-colors"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} người
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1.5">
                    Quan hệ với Ken
                  </label>
                  <select
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    className="w-full bg-[#0a0d1c] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-tertiary transition-colors"
                  >
                    <option value="Ba Mẹ">Ba Mẹ</option>
                    <option value="Gia đình / Họ hàng">Họ hàng / Gia đình</option>
                    <option value="Bạn Ba Mẹ">Bạn Ba Mẹ</option>
                    <option value="Biệt đội Nhí">Đồng đội nhí của Ken</option>
                    <option value="Khách mời danh dự">Khách danh dự</option>
                  </select>
                </div>
              </div>

              {/* Vehicle selector */}
              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1.5">
                  Phương Tiện Di Chuyển Đến Trạm
                </label>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {[
                    { name: 'Tàu Vũ Trụ', icon: '🚀' },
                    { name: 'Đĩa Bay', icon: '🛸' },
                    { name: 'Thảm Bay', icon: '✨' },
                  ].map((v) => (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => setVehicle(v.name)}
                      className={`p-3 rounded-xl border transition-all ${
                        vehicle === v.name
                          ? 'border-tertiary bg-tertiary/10 text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                          : 'border-white/5 bg-[#0a0d1c] text-on-surface-variant hover:border-white/10'
                      }`}
                    >
                      <div className="text-xl mb-1">{v.icon}</div>
                      <div className="font-label truncate">{v.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Blessing */}
              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-[#FBBF24] mb-1.5 font-semibold">
                  Lời chúc gửi phi hành gia nhí Ken
                </label>
                <textarea
                  placeholder="Gửi lời nhắn hoặc những lời chúc tốt lành nhất của bạn vào đa vũ trụ của bé Ken..."
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  rows={3}
                  className="w-full bg-[#0a0d1c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-tertiary transition-colors resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full relative overflow-hidden py-4 rounded-xl bg-gradient-to-r from-tertiary to-[#d3bbff] text-background font-label text-sm font-bold tracking-[0.1em] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300 active:scale-95 cursor-pointer mt-2"
              >
                <span className="flex items-center justify-center gap-1">
                  ĐĂNG KÝ NGAY <ChevronRight size={18} />
                </span>
              </button>
            </form>
          ) : (
            /* Ticket Boarding Pass View */
            <div className="space-y-6 py-2 animate-fade-in text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-tertiary/20 text-tertiary rounded-full mb-2 border border-tertiary/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Check size={28} className="animate-bounce" />
              </div>
              <div>
                <h4 className="font-display text-2xl text-white font-medium">Đăng ký thành công!</h4>
                <p className="text-on-surface-variant text-sm mt-1 max-w-sm mx-auto">
                  Toạ độ KenKen đã được ghi nhớ thành công trên Hệ thống Định vị Vũ trụ của phi hành đoàn!
                </p>
              </div>

              {/* STYLISH BOARDING TICKET */}
              <div className="relative border border-[#FBBF24]/30 rounded-2xl bg-[#0a0d1c]/90 text-left overflow-hidden shadow-[0_0_20px_rgba(251,191,36,0.15)] max-w-sm mx-auto">
                <div className="absolute top-0 right-0 p-3">
                  <Ticket size={24} className="text-secondary-container opacity-40" />
                </div>
                {/* Header Ticket */}
                <div className="border-b border-[#FBBF24]/20 p-4 bg-gradient-to-r from-surface-container-low to-[#0a0d1c]">
                  <span className="text-[10px] font-label text-secondary-container tracking-widest font-semibold block">
                    KEN'S FIRST ORBIT
                  </span>
                  <p className="text-xs text-white/50 tracking-wide">MULTIVERSE BOARDING PASS</p>
                </div>

                {/* Ticket Body */}
                <div className="p-4 space-y-3 relative">
                  {/* Pseudo side cuts representing a physical ticket */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-[#0f1321] rounded-r-full -translate-x-3 border-y border-r border-[#FBBF24]/20" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-[#0f1321] rounded-l-full translate-x-3 border-y border-l border-[#FBBF24]/20" />

                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
                    <div>
                      <span className="text-white/40 block text-[9px] uppercase tracking-wider">PHI HÀNH GIA</span>
                      <span className="text-white font-bold text-sm truncate block">{ticket.name}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[9px] uppercase tracking-wider">MA PHÒNG KHỞI HÀNH</span>
                      <span className="text-secondary-container font-mono font-bold">{ticket.ticketNumber}</span>
                    </div>

                    <div>
                      <span className="text-white/40 block text-[9px] uppercase tracking-wider">THIÊN TRẠM ĐẾN</span>
                      <span className="text-white truncate block font-medium">66/21B, Thanh Đức, Vĩnh Long</span>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[9px] uppercase tracking-wider">PHƯƠNG TIỆN CHUYÊN CHỞ</span>
                      <span className="text-white font-medium">{ticket.vehicle} 🛸</span>
                    </div>

                    <div>
                      <span className="text-white/40 block text-[9px] uppercase tracking-wider">GIỜ PHÓNG</span>
                      <span className="text-white font-medium">11:00 - Thứ Bảy, 13/06/2026</span>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[9px] uppercase tracking-wider">SỐ PHI HÀNH VIÊN</span>
                      <span className="text-white font-semibold font-mono">{ticket.crewCount} Personnel</span>
                    </div>
                  </div>

                  {/* Seed / Code Stamp */}
                  <div className="border-t border-dashed border-white/15 pt-3 flex justify-between items-center text-[10px]">
                    <div className="flex gap-2">
                      <Compass size={12} className="text-tertiary animate-spin-slow" />
                      <span className="text-[#10B981] font-mono tracking-wide">GATE: GEMINI-01</span>
                    </div>
                    <span className="text-white/30 font-mono">SECTOR: GM-2024</span>
                  </div>
                </div>
              </div>

              {/* Close Ticket details */}
              <button
                onClick={handleClose}
                className="px-8 py-2.5 rounded-full border border-white/10 hover:border-[#10B981] text-xs text-white tracking-widest hover:text-tertiary transition-colors"
              >
                KẾT THÚC VÀ ĐÓNG
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
