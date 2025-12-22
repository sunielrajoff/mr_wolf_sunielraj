
export enum ItemCategory {
  BOOKS = 'Books',
  NOTES = 'Notes',
  LAB_ESSENTIALS = 'Lab Essentials',
  INSTRUMENTS = 'Instruments',
  QUESTION_PAPERS = 'Question Papers',
  OTHER = 'Other'
}

export enum ItemStatus {
  AVAILABLE = 'Available',
  REQUESTED = 'Requested',
  PICKED_UP = 'Picked Up'
}

export enum PickupPoint {
  LIBRARY = 'University Library',
  STUDENT_UNION = 'Student Union Building',
  CHEMISTRY_LAB = 'Chemistry Lab',
  PHYSICS_DEPT = 'Physics Department',
  ADMIN_BLDG = 'Administration Building',
  LECTURE_HALL_A = 'Lecture Hall A',
  COMPUTER_LAB_C = 'Computer Lab C',
}

export interface User {
  id: string; // Unique identification number
  email: string; // College email for verification
  isSenior: boolean;
  course: string; // e.g., 'Computer Science', 'Electrical Engineering'
  year: number; // e.g., 2024, 2025 (representing graduation year or current academic year)
  xpPoints: number;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  category: ItemCategory;
  seniorId: string; // ID of the senior who donated it
  juniorId?: string; // ID of the junior who requested/picked it up
  status: ItemStatus;
  pickupPoint: PickupPoint;
  xpValue: number; // XP points awarded for donating this item
  imageUrl: string; // URL for an image of the item
  createdAt: number; // Timestamp of creation
  course: string; // Added course from the senior who donated it
  year: number;  // Added year from the senior who donated it
}

export interface AuthDetails {
  email: string;
  id: string;
}

export type View = 'dashboard' | 'share-item' | 'leaderboard';