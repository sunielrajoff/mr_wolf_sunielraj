import { Item, User, ItemStatus } from '../types';
import { MOCK_ITEMS, MOCK_USERS } from '../constants';

const LOCAL_STORAGE_ITEMS_KEY = 'educycle_items';
const LOCAL_STORAGE_USERS_KEY = 'educycle_users';

// Initialize local storage with mock data if it's empty
const initializeData = (useLocalStorage: boolean) => {
  if (useLocalStorage) {
    if (!localStorage.getItem(LOCAL_STORAGE_ITEMS_KEY)) {
      localStorage.setItem(LOCAL_STORAGE_ITEMS_KEY, JSON.stringify(MOCK_ITEMS));
    }
    if (!localStorage.getItem(LOCAL_STORAGE_USERS_KEY)) {
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(MOCK_USERS));
    }
  }
};

export const getItems = (useLocalStorage: boolean): Item[] => {
  initializeData(useLocalStorage);
  if (useLocalStorage) {
    const items = localStorage.getItem(LOCAL_STORAGE_ITEMS_KEY);
    return items ? JSON.parse(items) : [];
  }
  return MOCK_ITEMS;
};

export const getItemById = (itemId: string, useLocalStorage: boolean): Item | undefined => {
  const items = getItems(useLocalStorage);
  return items.find((item) => item.id === itemId);
};

export const addItem = (newItem: Item, useLocalStorage: boolean) => {
  if (useLocalStorage) {
    const items = getItems(useLocalStorage);
    const updatedItems = [...items, newItem];
    localStorage.setItem(LOCAL_STORAGE_ITEMS_KEY, JSON.stringify(updatedItems));
  }
};

export const updateItem = (updatedItem: Item, useLocalStorage: boolean) => {
  if (useLocalStorage) {
    const items = getItems(useLocalStorage);
    const updatedItems = items.map((item) => (item.id === updatedItem.id ? updatedItem : item));
    localStorage.setItem(LOCAL_STORAGE_ITEMS_KEY, JSON.stringify(updatedItems));
  }
};

export const getUsers = (useLocalStorage: boolean): User[] => {
  initializeData(useLocalStorage);
  if (useLocalStorage) {
    const users = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    return users ? JSON.parse(users) : [];
  }
  return MOCK_USERS;
};

export const getUserById = (userId: string, useLocalStorage: boolean): User | undefined => {
  const users = getUsers(useLocalStorage);
  return users.find((user) => user.id === userId);
};

export const updateUser = (updatedUser: User, useLocalStorage: boolean): User | undefined => {
  if (useLocalStorage) {
    const users = getUsers(useLocalStorage);
    const updatedUsers = users.map((user) => (user.id === updatedUser.id ? updatedUser : user));
    localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(updatedUsers));
    return updatedUser; // Return the updated user for immediate state update in App.tsx
  }
  // In mock mode, we don't persist, but return the user for consistent behavior
  return updatedUser;
};

export const getLeaderboard = (useLocalStorage: boolean): User[] => {
  const users = getUsers(useLocalStorage);
  // Filter for seniors and sort by XP points in descending order
  return users
    .filter((user) => user.isSenior)
    .sort((a, b) => b.xpPoints - a.xpPoints);
};
