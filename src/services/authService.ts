import { User, AuthDetails } from '../types';
import { getUsers, updateUser } from './dataService';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_CURRENT_USER_KEY = 'educycle_current_user';

export const login = (authDetails: AuthDetails, useLocalStorage: boolean): User | null => {
  const users = getUsers(useLocalStorage);
  const user = users.find(
    (u) => u.email === authDetails.email && u.id === authDetails.id
  );

  if (user) {
    if (useLocalStorage) {
      localStorage.setItem(LOCAL_STORAGE_CURRENT_USER_KEY, JSON.stringify(user));
    }
    return user;
  }
  return null;
};

export const registerUser = (newUserDetails: Omit<User, 'xpPoints' | 'computerYear'>, useLocalStorage: boolean): User | null => {
  const users = getUsers(useLocalStorage);
  // Check if user with same email or ID already exists
  const existingUser = users.find(
    (u) => u.email === newUserDetails.email || u.id === newUserDetails.id
  );

  if (existingUser) {
    return null; // User already exists
  }

  const newUser: User = {
    ...newUserDetails,
    xpPoints: 0, // New users start with 0 XP
    computerYear: 1, // All new users start at computerYear 1
  };

  if (useLocalStorage) {
    const updatedUsers = [...users, newUser];
    localStorage.setItem(LOCAL_STORAGE_CURRENT_USER_KEY, JSON.stringify(newUser)); // Log in the new user immediately
    localStorage.setItem('educycle_users', JSON.stringify(updatedUsers)); // Update the full user list
  }

  return newUser;
};

export const logout = (useLocalStorage: boolean) => {
  if (useLocalStorage) {
    localStorage.removeItem(LOCAL_STORAGE_CURRENT_USER_KEY);
  }
};

export const getCurrentUser = (useLocalStorage: boolean): User | null => {
  if (useLocalStorage) {
    const user = localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  }
  return null; // In mock mode, there's no persistent current user
};
