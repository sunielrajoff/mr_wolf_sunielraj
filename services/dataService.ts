
import { Item, User, ItemStatus } from '../types';
import { MOCK_ITEMS, MOCK_USERS, XP_VALUES } from '../constants';

const ITEMS_STORAGE_KEY = 'eduCycleItems';
const USERS_STORAGE_KEY = 'eduCycleUsers';

/**
 * Initializes mock data in local storage if not already present.
 * This simulates a persistent database.
 */
const initializeData = (useLocalStorage: boolean = true): void => {
  if (!useLocalStorage) return;
  if (!localStorage.getItem(ITEMS_STORAGE_KEY)) {
    localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(MOCK_ITEMS));
  }
  if (!localStorage.getItem(USERS_STORAGE_KEY)) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(MOCK_USERS));
  }
};

initializeData();

/**
 * Retrieves all items from storage.
 * @returns An array of Item objects.
 */
export const getItems = (useLocalStorage: boolean = true): Item[] => {
  if (!useLocalStorage) return [];
  const itemsData = localStorage.getItem(ITEMS_STORAGE_KEY);
  return itemsData ? (JSON.parse(itemsData) as Item[]) : [];
};

/**
 * Adds a new item to storage.
 * @param newItem - The Item object to add.
 * @returns The added Item object.
 */
export const addItem = (newItem: Item, useLocalStorage: boolean = true): Item => {
  const items = getItems(useLocalStorage);
  const updatedItems = [...items, newItem];
  if (useLocalStorage) {
    localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(updatedItems));
  }
  return newItem;
};

/**
 * Updates an existing item in storage.
 * @param updatedItem - The Item object with updated data.
 * @returns The updated Item object or null if not found.
 */
export const updateItem = (updatedItem: Item, useLocalStorage: boolean = true): Item | null => {
  const items = getItems(useLocalStorage);
  const index = items.findIndex((item) => item.id === updatedItem.id);
  if (index !== -1) {
    const newItems = [...items];
    newItems[index] = updatedItem;
    if (useLocalStorage) {
      localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(newItems));
    }
    return updatedItem;
  }
  return null;
};

/**
 * Retrieves all users from storage.
 * @returns An array of User objects.
 */
export const getUsers = (useLocalStorage: boolean = true): User[] => {
  if (!useLocalStorage) return [];
  const usersData = localStorage.getItem(USERS_STORAGE_KEY);
  return usersData ? (JSON.parse(usersData) as User[]) : [];
};

/**
 * Adds a new user to storage.
 * @param newUser - The User object to add.
 * @returns The added User object, or null if a user with the same ID or email already exists.
 */
export const addUser = (newUser: User, useLocalStorage: boolean = true): User | null => {
  const users = getUsers(useLocalStorage);
  // Check for unique ID and email (case-insensitive for email)
  if (users.some(u => u.id === newUser.id || u.email.toLowerCase() === newUser.email.toLowerCase())) {
    console.error('User with this ID or email already exists.');
    return null;
  }
  const updatedUsers = [...users, newUser];
  if (useLocalStorage) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
  }
  return newUser;
};

/**
 * Updates an existing user in storage.
 * @param updatedUser - The User object with updated data.
 * @returns The updated User object or null if not found.
 */
export const updateUser = (updatedUser: User, useLocalStorage: boolean = true): User | null => {
  const users = getUsers(useLocalStorage);
  const index = users.findIndex((user) => user.id === updatedUser.id);
  if (index !== -1) {
    const newUsers = [...users];
    newUsers[index] = updatedUser;
    if (useLocalStorage) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(newUsers));
    }
    return updatedUser;
  }
  return null;
};

/**
 * Retrieves the leaderboard of seniors sorted by XP points.
 * @returns An array of senior User objects, sorted by XP in descending order.
 */
export const getLeaderboard = (useLocalStorage: boolean = true): User[] => {
  const users = getUsers(useLocalStorage);
  return users
    .filter((user) => user.isSenior)
    .sort((a, b) => b.xpPoints - a.xpPoints);
};

/**
 * Awards XP to a senior for donating an item.
 * @param seniorId - The ID of the senior.
 * @param itemCategory - The category of the donated item to determine XP value.
 */
export const awardXpToSenior = (seniorId: string, itemId: string, useLocalStorage: boolean = true): void => {
  const senior = getUsers(useLocalStorage).find((u) => u.id === seniorId && u.isSenior);
  const item = getItems(useLocalStorage).find((i) => i.id === itemId);

  if (senior && item && item.status === ItemStatus.AVAILABLE) {
    const xpToAdd = XP_VALUES[item.category];
    const updatedSenior: User = { ...senior, xpPoints: senior.xpPoints + xpToAdd };
    updateUser(updatedSenior, useLocalStorage);

    // Mark item as picked up to prevent multiple XP awards for the same item
    const updatedItem: Item = { ...item, status: ItemStatus.PICKED_UP }; // Assuming XP is awarded when it's picked up
    updateItem(updatedItem, useLocalStorage);
  }
};
