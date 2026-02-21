export enum ItemCategory {
  BOOKS = 'Books',
  NOTES = 'Notes',
  LAB_ESSENTIALS = 'Lab Essentials',
  INSTRUMENTS = 'Instruments',
  QUESTION_PAPERS = 'Question Papers',
  OTHER = 'Other',
}

export enum ItemStatus {
  AVAILABLE = 'Available',
  REQUESTED = 'Requested',
  PICKED_UP = 'Picked Up',
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

export type View = 'dashboard' | 'share-item' | 'leaderboard' | 'promote-self';

export type PermissionStatus = 'prompt' | 'granted' | 'denied';

export interface Item {
  id: string;
  name: string;
  description: string;
  category: ItemCategory;
  seniorId: string;
  juniorId?: string; // Optional, only set when requested/picked up
  status: ItemStatus;
  pickupPoint: PickupPoint;
  xpValue: number;
  imageUrl?: string;
  createdAt: number;
  course: string; // Course of the donating senior
  year: number;   // Year of the donating senior
}

export interface User {
  id: string;
  email: string;
  isSenior: boolean;
  course: string;
  year: number;
  xpPoints: number;
  computerYear: number; // New field for tracking computer years
}

export interface AuthDetails {
  email: string;
  id: string;
}

