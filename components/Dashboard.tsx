

import React, { useState } from 'react';
import ItemList from './ItemList';
import { Item, User, ItemCategory, ItemStatus } from '../types';
import Button from './Button';
// No longer importing MOCK_USERS, as item filtering now relies on Item's direct properties.

interface DashboardProps {
  currentUser: User;
  items: Item[];
  users: User[]; // Pass all users to resolve senior names for display
  onItemRequest: (itemId: string, juniorId: string) => void;
  onMarkAsPickedUp: (itemId: string, juniorId: string) => void;
  onViewChange: (view: 'dashboard' | 'share-item' | 'leaderboard') => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  currentUser,
  items,
  users,
  onItemRequest,
  onMarkAsPickedUp,
  onViewChange,
}) => {
  const [filterCategory, setFilterCategory] = useState<ItemCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const getSeniorEmail = (seniorId: string): string => {
    const senior = users.find(u => u.id === seniorId);
    return senior ? senior.email.split('@')[0] : 'Unknown Senior';
  };

  const dashboardItems = items
    .filter(item => {
      // Seniors see all their own items, and items they need to take action on
      if (currentUser.isSenior) {
        return item.seniorId === currentUser.id || // Own items
               (item.status === ItemStatus.REQUESTED && getSeniorEmail(item.seniorId) !== currentUser.email.split('@')[0]); // Items they need to mark
      } else {
        // Juniors see items relevant to their course/year AND either available OR picked up by them
        // Fix: Item now has course and year directly, no need for senior lookup here
        return (item.course === currentUser.course && item.year === currentUser.year) &&
               (item.status === ItemStatus.AVAILABLE || item.juniorId === currentUser.id);
      }
    })
    .map(item => {
      // Enhance item with senior's simplified name for display.
      // Removed adding course and year here as they are now directly on the Item type.
      return {
        ...item,
        seniorName: getSeniorEmail(item.seniorId), // Add senior's simplified name for display
      };
    });

  return (
    <div className="space-y-8">
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-xl border border-gray-300 text-center">
        <h2 className="text-4xl font-extrabold text-emerald-700 mb-3">
          Welcome, {currentUser.email.split('@')[0]}!
        </h2>
        <p className="text-xl text-gray-700 mb-4">
          {currentUser.isSenior
            ? `You are a Senior (${currentUser.course}, Class of ${currentUser.year}). Keep contributing!`
            : `You are a Junior (${currentUser.course}, Class of ${currentUser.year}). Explore and learn!`}
        </p>
        <p className="text-lg text-gray-600">
          Your current XP: <span className="font-bold text-emerald-600">{currentUser.xpPoints}</span>
        </p>
        {currentUser.isSenior && (
          <div className="mt-6">
            <Button onClick={() => onViewChange('share-item')} size="lg" className="px-8 py-3">
              Share Your Knowledge
            </Button>
          </div>
        )}
      </div>

      <h3 className="text-2xl font-bold text-emerald-700 mb-4 ml-2">
        {currentUser.isSenior ? 'Your Shared & Requested Items' : 'Available & Your Requested Items'}
      </h3>
      <ItemList
        items={dashboardItems}
        currentUser={currentUser}
        onItemRequest={onItemRequest}
        onMarkAsPickedUp={onMarkAsPickedUp}
        onFilterChange={setFilterCategory}
        currentFilter={filterCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    </div>
  );
};

export default Dashboard;