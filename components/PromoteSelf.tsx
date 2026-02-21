import React, { useState } from 'react';
import { User } from '../types';
import Button from './Button';
import * as dataService from '../services/dataService';

interface PromoteSelfProps {
  currentUser: User;
  onUserUpdate: (updatedUser: User) => void;
  onViewChange: (view: 'dashboard' | 'share-item' | 'leaderboard' | 'promote-self') => void;
}

const PromoteSelf: React.FC<PromoteSelfProps> = ({ currentUser, onUserUpdate, onViewChange }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePromote = () => {
    if (currentUser.isSenior) {
      setError('You are already a senior!');
      return;
    }

    const newComputerYear = currentUser.computerYear + 1;
    let updatedUser: User = {
      ...currentUser,
      computerYear: newComputerYear,
    };

    if (newComputerYear >= 4) { // Assuming 4 computer years to become a senior
      updatedUser = { ...updatedUser, isSenior: true };
      setMessage(`Congratulations! You are now a Senior! You have completed ${newComputerYear} computer years.`);
    } else {
      setMessage(`You have completed computer year ${newComputerYear}. Keep up the great work!`);
    }

    const result = dataService.updateUser(updatedUser, localStorage.getItem('local_storage_permission') === 'granted');

    if (result) {
      onUserUpdate(result);
      setTimeout(() => onViewChange('dashboard'), 3000);
    } else {
      setError('Failed to update your computer year. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4">
      <div className="bg-white bg-opacity-95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border-2 border-blue-100 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Complete Your Computer Year</h2>
        <p className="text-lg text-gray-700 mb-6">
          Current Computer Year: <span className="font-bold text-blue-600">{currentUser.computerYear}</span>
        </p>
        <p className="text-gray-600 mb-8">
          Progress through your academic journey. Once you complete 4 computer years, you will be promoted to a Senior!
        </p>

        {message && <p className="text-green-600 font-medium mb-4">{message}</p>}
        {error && <p className="text-red-600 font-medium mb-4">{error}</p>}

        <Button
          onClick={handlePromote}
          className="w-full p-3 text-lg bg-blue-500 hover:bg-blue-600 text-white"
          disabled={currentUser.isSenior}
        >
          {currentUser.isSenior ? 'Already a Senior' : 'Complete Next Computer Year'}
        </Button>

        <Button
          onClick={() => onViewChange('dashboard')}
          className="w-full p-3 text-lg mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800"
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default PromoteSelf;
