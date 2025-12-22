
import { ItemCategory, ItemStatus, PickupPoint, Item, User } from './types';

export const XP_VALUES: Record<ItemCategory, number> = {
  [ItemCategory.BOOKS]: 100,
  [ItemCategory.NOTES]: 50,
  [ItemCategory.LAB_ESSENTIALS]: 75,
  [ItemCategory.INSTRUMENTS]: 150,
  [ItemCategory.QUESTION_PAPERS]: 60,
  [ItemCategory.OTHER]: 40,
};

export const PICKUP_POINTS_LIST: PickupPoint[] = [
  PickupPoint.LIBRARY,
  PickupPoint.STUDENT_UNION,
  PickupPoint.CHEMISTRY_LAB,
  PickupPoint.PHYSICS_DEPT,
  PickupPoint.ADMIN_BLDG,
  PickupPoint.LECTURE_HALL_A,
  PickupPoint.COMPUTER_LAB_C,
];

// Mock Data
export const MOCK_USERS: User[] = [
  { id: 'SENIOR001', email: 'senior1@college.edu', isSenior: true, course: 'Computer Science', year: 2024, xpPoints: 1200 },
  { id: 'SENIOR002', email: 'senior2@college.edu', isSenior: true, course: 'Electrical Engineering', year: 2024, xpPoints: 950 },
  { id: 'SENIOR003', email: 'senior3@college.edu', isSenior: true, course: 'Computer Science', year: 2025, xpPoints: 1500 },
  { id: 'JUNIOR001', email: 'junior1@college.edu', isSenior: false, course: 'Computer Science', year: 2025, xpPoints: 0 },
  { id: 'JUNIOR002', email: 'junior2@college.edu', isSenior: false, course: 'Electrical Engineering', year: 2025, xpPoints: 0 },
  { id: 'JUNIOR003', email: 'junior3@college.edu', isSenior: false, course: 'Computer Science', year: 2026, xpPoints: 0 },
  { id: 'SENIOR004', email: 'senior4@college.edu', isSenior: true, course: 'Physics', year: 2024, xpPoints: 800 },
  { id: 'SENIOR005', email: 'senior5@college.edu', isSenior: true, course: 'Computer Science', year: 2024, xpPoints: 1100 },
];

export const MOCK_ITEMS: Item[] = [
  {
    id: 'ITEM001',
    name: 'Introduction to Algorithms (Cormen)',
    description: 'Comprehensive textbook on algorithms. Slightly used.',
    category: ItemCategory.BOOKS,
    seniorId: 'SENIOR001',
    status: ItemStatus.AVAILABLE,
    pickupPoint: PickupPoint.LIBRARY,
    xpValue: XP_VALUES[ItemCategory.BOOKS],
    imageUrl: 'https://picsum.photos/200/300?random=1',
    createdAt: Date.now() - 86400000 * 5, // 5 days ago
    course: 'Computer Science', // Added for SENIOR001
    year: 2024, // Added for SENIOR001
  },
  {
    id: 'ITEM002',
    name: 'Digital Circuits Lab Manual',
    description: 'All experiments completed and annotated.',
    category: ItemCategory.LAB_ESSENTIALS,
    seniorId: 'SENIOR002',
    status: ItemStatus.AVAILABLE,
    pickupPoint: PickupPoint.CHEMISTRY_LAB,
    xpValue: XP_VALUES[ItemCategory.LAB_ESSENTIALS],
    imageUrl: 'https://picsum.photos/200/300?random=2',
    createdAt: Date.now() - 86400000 * 3, // 3 days ago
    course: 'Electrical Engineering', // Added for SENIOR002
    year: 2024, // Added for SENIOR002
  },
  {
    id: 'ITEM003',
    name: 'Data Structures & Algorithms Notes',
    description: 'Handwritten notes for CS201, very detailed.',
    category: ItemCategory.NOTES,
    seniorId: 'SENIOR003',
    status: ItemStatus.AVAILABLE,
    pickupPoint: PickupPoint.STUDENT_UNION,
    xpValue: XP_VALUES[ItemCategory.NOTES],
    imageUrl: 'https://picsum.photos/200/300?random=3',
    createdAt: Date.now() - 86400000 * 1, // 1 day ago
    course: 'Computer Science', // Added for SENIOR003
    year: 2025, // Added for SENIOR003
  },
  {
    id: 'ITEM004',
    name: 'Oscilloscope (Basic Model)',
    description: 'Functional basic oscilloscope, good for first-year EE labs.',
    category: ItemCategory.INSTRUMENTS,
    seniorId: 'SENIOR002',
    status: ItemStatus.AVAILABLE,
    pickupPoint: PickupPoint.PHYSICS_DEPT,
    xpValue: XP_VALUES[ItemCategory.INSTRUMENTS],
    imageUrl: 'https://picsum.photos/200/300?random=4',
    createdAt: Date.now() - 86400000 * 7, // 7 days ago
    course: 'Electrical Engineering', // Added for SENIOR002
    year: 2024, // Added for SENIOR002
  },
  {
    id: 'ITEM005',
    name: 'Calculus III Question Papers (2020-2023)',
    description: 'Collection of past exam papers with solutions.',
    category: ItemCategory.QUESTION_PAPERS,
    seniorId: 'SENIOR001',
    juniorId: 'JUNIOR001',
    status: ItemStatus.PICKED_UP,
    pickupPoint: PickupPoint.LIBRARY,
    xpValue: XP_VALUES[ItemCategory.QUESTION_PAPERS],
    imageUrl: 'https://picsum.photos/200/300?random=5',
    createdAt: Date.now() - 86400000 * 10, // 10 days ago
    course: 'Computer Science', // Added for SENIOR001
    year: 2024, // Added for SENIOR001
  },
  {
    id: 'ITEM006',
    name: 'Operating Systems Textbook (Silberschatz)',
    description: 'Key concepts highlighted. CS course material.',
    category: ItemCategory.BOOKS,
    seniorId: 'SENIOR003',
    status: ItemStatus.AVAILABLE,
    pickupPoint: PickupPoint.LIBRARY,
    xpValue: XP_VALUES[ItemCategory.BOOKS],
    imageUrl: 'https://picsum.photos/200/300?random=6',
    createdAt: Date.now() - 86400000 * 2, // 2 days ago
    course: 'Computer Science', // Added for SENIOR003
    year: 2025, // Added for SENIOR003
  },
];