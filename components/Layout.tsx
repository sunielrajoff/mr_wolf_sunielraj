
import React from 'react';
import Button from './Button';
import { User, View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentUser: User | null;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  currentView: View;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  currentUser,
  onNavigate,
  onLogout,
  currentView,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-emerald-100 text-gray-900 font-nunito">
      {/* Header */}
      <header className="bg-white bg-opacity-95 backdrop-blur-md shadow-xl p-4 sticky top-0 z-10 border-b-2 border-green-300">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-4xl font-extrabold text-green-700 mb-2 sm:mb-0">EduCycle</h1>
          {currentUser && (
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-gray-700">
                Welcome, {currentUser.email.split('@')[0]}!
              </span>
              <Button onClick={onLogout} variant="secondary" size="sm">
                Logout
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Sticky Bottom Navigation (Mobile-first, then responsive for larger screens) */}
      {currentUser && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-md shadow-2xl p-3 z-20 md:sticky md:bottom-auto md:top-auto md:relative md:p-4 border-t-2 border-green-300">
          <div className="container mx-auto flex justify-around md:justify-center md:space-x-8">
            <Button
              onClick={() => onNavigate('dashboard')}
              variant={currentView === 'dashboard' ? 'primary' : 'secondary'}
              className="w-1/3 md:w-auto"
            >
              Dashboard
            </Button>
            {currentUser.isSenior && (
              <Button
                onClick={() => onNavigate('share-item')}
                variant={currentView === 'share-item' ? 'primary' : 'secondary'}
                className="w-1/3 md:w-auto"
              >
                Share Item
              </Button>
            )}
            <Button
              onClick={() => onNavigate('leaderboard')}
              variant={currentView === 'leaderboard' ? 'primary' : 'secondary'}
              className="w-1/3 md:w-auto"
            >
              Leaderboard
            </Button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;