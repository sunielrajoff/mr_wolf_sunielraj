
import { AuthDetails, User } from '../types';
import { getUsers, addUser } from '../services/dataService'; // Import from dataService

const USER_STORAGE_KEY = 'eduCycleCurrentUser';

/**
 * Simulates user login based on email and ID.
 * In a real application, this would involve backend verification.
 * @param authDetails - User's email and identification number.
 * @returns The authenticated user object or null if credentials are invalid.
 */
export const login = (authDetails: AuthDetails, useLocalStorage: boolean = true): User | null => {
  const user = getUsers().find( // Use getUsers from dataService
    (u) => u.email === authDetails.email && u.id === authDetails.id
  );

  if (user) {
    if (useLocalStorage) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
    return user;
  }
  return null;
};

/**
 * Logs out the current user by removing their data from local storage.
 */
export const logout = (useLocalStorage: boolean = true): void => {
  if (useLocalStorage) {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
};

/**
 * Retrieves the currently logged-in user from local storage.
 * @returns The current user object or null if no user is logged in.
 */
export const getCurrentUser = (useLocalStorage: boolean = true): User | null => {
  if (useLocalStorage) {
    const userData = localStorage.getItem(USER_STORAGE_KEY);
    return userData ? (JSON.parse(userData) as User) : null;
  }
  return null;
};

/**
 * Registers a new user and logs them in immediately.
 * @param newUserDetails - Details for the new user, including email, ID, course, year, and senior status.
 * @returns The newly created and logged-in user object, or null if registration failed (e.g., duplicate ID/email).
 */
export const register = (newUserDetails: Omit<User, 'xpPoints'>): User | null => {
  const existingUsers = getUsers();
  // Check for unique ID or email (case-insensitive for email)
  if (existingUsers.some(u => u.id === newUserDetails.id || u.email.toLowerCase() === newUserDetails.email.toLowerCase())) {
    return null; // User with this ID or email already exists
  }

  const userToCreate: User = { ...newUserDetails, xpPoints: 0, computerYear: 1 }; // New users start with 0 XP and computerYear 1
  const addedUser = addUser(userToCreate); // Use addUser from dataService

  if (addedUser) {
    // We don't use useLocalStorage here as registration implies immediate login
    // and the user has already granted permission or is in the process.
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(addedUser));
    return addedUser;
  }
  return null;
};
