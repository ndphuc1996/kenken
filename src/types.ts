export interface TimelineMonth {
  id: number;
  month: string;
  title: string;
  description: string;
  height?: string;
  weight: string;
  achievement: string;
  image: string;
  color: 'tertiary' | 'secondary-container' | 'primary' | 'surface-tint';
}

export interface SpaceWish {
  id: string;
  sender: string;
  relation: string;
  message: string;
  timestamp: string;
  starsCount: number; // For cosmic star glow rating
  emoji: string;
  avatarSeed: string; // Dynamic avatar seed
}

export interface RSVPData {
  id: string;
  name: string;
  crewCount: number;
  relation: string;
  vehicle: string;
  wish: string;
  confirmedAt: string;
  ticketNumber: string;
}

export interface GalleryPhoto {
  id: number;
  url: string;
  category: 'infant' | 'crawling' | 'sitting' | 'standing' | 'cosmic';
  title: string;
  description: string;
}
