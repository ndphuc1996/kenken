import { TimelineMonth, SpaceWish, GalleryPhoto } from './types';

// Newborn
import nb0 from './assets/images/newborn/nb-0.jpg';
import nb1 from './assets/images/newborn/nb-1.jpg';
import nb2 from './assets/images/newborn/nb-2.jpg';

// 1 Month
import m1_0 from './assets/images/1-month/1m-0.jpg';
import m1_1 from './assets/images/1-month/1m-1.jpg';
import m1_2 from './assets/images/1-month/1m-2.jpg';

// 3 Month
import m3_0 from './assets/images/3-month/3m-0.jpg';
import m3_1 from './assets/images/3-month/3m-1.jpg';
import m3_2 from './assets/images/3-month/3m-2.jpg';

// 6 Month
import m6_0 from './assets/images/6-month/6m-0.jpg';
import m6_1 from './assets/images/6-month/6m-1.jpg';
import m6_2 from './assets/images/6-month/6m-2.jpg';

// 9 Month
import m9_0 from './assets/images/9-month/9m-0.jpg';
import m9_1 from './assets/images/9-month/9m-1.jpg';
import m9_2 from './assets/images/9-month/9m-2.jpg';

// 12 Month
import m12_0 from './assets/images/12-month/12m-0.jpg';
import m12_1 from './assets/images/12-month/12m-1.jpg';
import m12_2 from './assets/images/12-month/12m-2.jpg';

export const TIMELINE_DATA: TimelineMonth[] = [
  {
    id: 12,
    month: '12M',
    title: 'Tháng 12: Nhà Thám Hiểm',
    description: 'Ken đã có thể tự tin bước đi những bước đầu tiên trên bề mặt hành tinh mới, tò mò nhìn ngắm và chạm tay vào tất cả mọi thứ xung quanh trạm.',
    height: '78 cm',
    weight: '10.5 kg',
    achievement: 'Bước đi đầu đời',
    image: m12_0,
    color: 'tertiary'
  },
  {
    id: 9,
    month: '9M',
    title: 'Tháng 9: Đứng Vững Trên Trại',
    description: 'Bắt đầu vịn tay đứng dậy ở mọi góc tường, bàn trà và "phiêu" theo những bản nhạc phim Marvel yêu thích mà Ba Mẹ bật.',
    height: '74 cm',
    weight: '9.2 kg',
    achievement: 'Đứng vịn tự lập',
    image: m9_0,
    color: 'secondary-container'
  },
  {
    id: 6,
    month: '6M',
    title: '6M: Khám Phá Hương Vị',
    description: 'Lần đầu tiên ngồi vững vàng và khám phá những hương vị ăn dặm đầu đời. Ken rất mê món cháo bông cải xanh và cà rốt nghiền!',
    height: '69 cm',
    weight: '8.1 kg',
    achievement: 'Ngồi vững & Ăn dặm',
    image: m6_0,
    color: 'primary'
  },
  {
    id: 3,
    month: '3M',
    title: 'Tháng 3: Ngước Nhìn Thiên Hà',
    description: 'Cổ đã cứng cáp hoàn toàn, biết lẫy sành điệu, bắt đầu hóng chuyện cực kỳ lanh lợi và đã biết bật cười thành tiếng khi đùa nghịch.',
    height: '61 cm',
    weight: '6.5 kg',
    achievement: 'Lẫy giỏi & hóng hớt',
    image: m3_0,
    color: 'tertiary'
  },
  {
    id: 1,
    month: '1M',
    title: 'Tháng 1: Điểm Khởi Đầu',
    description: 'Bắt đầu biết nhìn chăm chú vào khuôn mặt của Ba Mẹ, phản xạ nhạy bén với âm thanh và có những nụ cười biểu cảm đầu đời cực kỳ đáng yêu.',
    height: '52 cm',
    weight: '3.8 kg',
    achievement: 'Thích nghi Trái Đất',
    image: m1_0,
    color: 'primary'
  },
  {
    id: 0,
    month: '0M',
    title: 'Sơ Sinh: Chào Thế Giới',
    description: 'Chào mừng Ken đổ bộ đến với đa vũ trụ này. Những ngày đầu ngủ thật ngoan và làm quen với ánh sáng nhẹ cùng âm thanh ru dương của phi thuyền.',
    height: '50 cm',
    weight: '2.7 kg',
    achievement: 'Hạ cánh an toàn',
    image: nb0,
    color: 'surface-tint'
  }
];

export const INITIAL_WISHES: SpaceWish[] = [
  {
    id: 'w-1',
    sender: 'Ba Mẹ Ken',
    relation: 'Phụ huynh',
    message: 'Chào mừng con yêu đã hoàn thành một vòng quay rực rỡ quanh Mặt Trời. Cảm ơn con đã mang đến tiếng cười và ngập tràn năng lượng vũ trụ ấm áp cho trạm trung chuyển nhỏ của ba mẹ. Ba mẹ yêu con vô tận!',
    timestamp: '2026-05-20T10:00:00Z',
    starsCount: 5,
    emoji: '🛸',
    avatarSeed: 'BaMe'
  },
  {
    id: 'w-2',
    sender: 'Bà Ngoại',
    relation: 'Gia đình',
    message: 'Chúc bé cưng của bà luôn khoẻ mạnh, hay ăn chóng lớn, mỉm cười tươi tắn mỗi ngày như vầng thái dương. Sau này lớn lên, con sẽ tự vẽ nên một dải ngân hà rực rỡ của riêng mình nhé!',
    timestamp: '2026-05-20T14:30:00Z',
    starsCount: 5,
    emoji: '🌸',
    avatarSeed: 'BaNgoai'
  },
  {
    id: 'w-3',
    sender: 'Chú Tony Stark',
    relation: 'Bạn Ba Mẹ',
    message: 'Happy birthday nhà du hành nhí Ken! Chúc cháu luôn thông minh và có bộ óc thiên tài như chú. Love you 3000!',
    timestamp: '2026-05-21T02:15:00Z',
    starsCount: 5,
    emoji: '🚀',
    avatarSeed: 'Tony'
  },
  {
    id: 'w-4',
    sender: 'Cô 3',
    relation: 'Gia đình',
    message: 'Thần hộ mệnh Song Tử sẽ luôn soi sáng hành trình học hỏi của Ken tinh nghịch. Mau lớn để dì dẫn đi du hành khắp các hành tinh ngon lành nhé!',
    timestamp: '2026-05-21T03:00:00Z',
    starsCount: 4,
    emoji: '✨',
    avatarSeed: 'Cô'
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  // Newborn
  {
    id: 1,
    url: nb0,
    category: 'infant',
    title: 'Sơ Sinh: Chào Thế Giới 🌟',
    description: 'Ken mới hạ cánh, đang ngủ ngon lành trong phi thuyền.'
  },
  {
    id: 2,
    url: nb1,
    category: 'infant',
    title: 'Sơ Sinh: Những Cử Chỉ Nhỏ Bé 🛸',
    description: 'Khoảnh khắc cuộn tròn đáng yêu trong kén ngủ.'
  },
  {
    id: 3,
    url: nb2,
    category: 'infant',
    title: 'Sơ Sinh: Giấc Mơ Thiên Hà 🌌',
    description: 'Ken ngủ thật say sưa bên gối ôm phi thuyền.'
  },

  // 1 Month
  {
    id: 4,
    url: m1_0,
    category: 'infant',
    title: '1 Tháng: Nụ Cười Đầu Đời 😊',
    description: 'Mỉm cười phản xạ siêu dễ thương của Ken.'
  },
  {
    id: 5,
    url: m1_1,
    category: 'infant',
    title: '1 Tháng: Phi Hành Gia Kháu Khỉnh 🛸',
    description: 'Ken nằm ngoan ngắm dải ngân hà đầy màu sắc.'
  },
  {
    id: 6,
    url: m1_2,
    category: 'infant',
    title: '1 Tháng: Khám Phá Phi Thuyền 👀',
    description: 'Ánh mắt trong veo ngơ ngác nhìn ngắm xung quanh.'
  },

  // 3 Month
  {
    id: 7,
    url: m3_0,
    category: 'infant',
    title: '3 Tháng: Ngước Nhìn Thiên Hà 💫',
    description: 'Lẫy cực kỳ cứng cáp và hóng hớt chuyện vui vẻ.'
  },
  {
    id: 8,
    url: m3_1,
    category: 'infant',
    title: '3 Tháng: Đôi Mắt Tinh Anh 🛰️',
    description: 'Chăm chú nhìn ngắm những chuyển động xung quanh.'
  },
  {
    id: 9,
    url: m3_2,
    category: 'infant',
    title: '3 Tháng: Tinh Nghịch Đáng Yêu 🧸',
    description: 'Nụ cười tươi tắn rạng rỡ của phi hành gia nhí.'
  },

  // 6 Month
  {
    id: 10,
    url: m6_0,
    category: 'sitting',
    title: '6 Tháng: Hương Vị Ăn Dặm 🥦',
    description: 'Ken rất mê món cháo bông cải xanh và cà rốt nghiền.'
  },
  {
    id: 11,
    url: m6_1,
    category: 'sitting',
    title: '6 Tháng: Ngồi Vững Vàng 🚀',
    description: 'Tự tin ngồi chơi cùng phi thuyền đồ chơi.'
  },
  {
    id: 12,
    url: m6_2,
    category: 'sitting',
    title: '6 Tháng: Vui Vẻ Cùng Ba Mẹ ☀️',
    description: 'Nụ cười giòn giã mang năng lượng vũ trụ ấm áp.'
  },

  // 9 Month
  {
    id: 13,
    url: m9_0,
    category: 'sitting',
    title: '9 Tháng: Vịn Đứng Tự Lập 🏡',
    description: 'Ken thích đứng vịn ở sofa để ngắm cảnh.'
  },
  {
    id: 14,
    url: m9_1,
    category: 'sitting',
    title: '9 Tháng: Thám Hiểm Các Phòng 🗺️',
    description: 'Bò siêu nhanh để khám phá trạm vũ trụ nhỏ.'
  },
  {
    id: 15,
    url: m9_2,
    category: 'sitting',
    title: '9 Tháng: Nhún Nhảy Phiêu Nhạc 🎵',
    description: 'Cực kỳ thích thú nhún nhảy theo nhạc phim Marvel.'
  },

  // 12 Month
  {
    id: 16,
    url: m12_0,
    category: 'standing',
    title: '12 Tháng: Nhà Thám Hiểm 🥾',
    description: 'Ken tự tin bước đi những bước đầu tiên trên hành tinh mới.'
  },
  {
    id: 17,
    url: m12_1,
    category: 'standing',
    title: '12 Tháng: Hành Trình 1 Tuổi 🎉',
    description: 'Mốc sinh nhật đầy tự hào của phi hành gia nhí.'
  },
  {
    id: 18,
    url: m12_2,
    category: 'standing',
    title: '12 Tháng: Chinh Phục Không Gian 🌠',
    description: 'Nụ cười tỏa sáng chúc mừng hành trình 1 năm rực rỡ.'
  }
];
