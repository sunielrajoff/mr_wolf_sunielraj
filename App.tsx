
import React, { useState, useEffect, useCallback } from 'react';
import { Item, User, AuthDetails, ItemStatus, View } from './types';
import * as authService from './services/authService';
import * as dataService from './services/dataService';
import Layout from './components/Layout';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import ItemForm from './components/ItemForm';
import XPLeaderboard from './components/XPLeaderboard';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [authError, setAuthError] = useState<string | null>(null);

  // Initialize data and check for current user on app load
  useEffect(() => {
    const storedUser = authService.getCurrentUser();
    if (storedUser) {
      setCurrentUser(storedUser);
    }
    setItems(dataService.getItems());
    setUsers(dataService.getUsers());
  }, []);

  // Update leaderboard whenever users or items change
  useEffect(() => {
    setLeaderboard(dataService.getLeaderboard());
  }, [users, items]);

  const handleLogin = (authDetails: AuthDetails) => {
    const user = authService.login(authDetails);
    if (user) {
      setCurrentUser(user);
      setAuthError(null);
      setUsers(dataService.getUsers()); // Refresh user list after login
    } else {
      setAuthError('Invalid email or identification number.');
    }
  };

  const handleRegister = (newUserDetails: Omit<User, 'xpPoints'>) => {
    const user = authService.register(newUserDetails);
    if (user) {
      setCurrentUser(user);
      setAuthError(null); // Clear any previous login errors
      setUsers(dataService.getUsers()); // Refresh user list with the new user
      // AuthPage will handle displaying a success message internally before this re-renders.
    } else {
      setAuthError('Registration failed: User with this email or ID already exists.');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setCurrentView('dashboard'); // Reset view on logout
  };

  const handleAddItem = useCallback((newItemData: Omit<Item, 'id' | 'createdAt' | 'course' | 'year'>) => {
    if (!currentUser) return;

    const newItem: Item = {
      ...newItemData,
      id: uuidv4(),
      createdAt: Date.now(),
      seniorId: currentUser.id,
      course: currentUser.course, // Set course from the donating senior
      year: currentUser.year,     // Set year from the donating senior
    };

    dataService.addItem(newItem);
    setItems(dataService.getItems());

    // Award XP to the senior immediately upon item addition
    // The item is already created and in dataService, so we just update the user's XP
    const updatedUser = dataService.updateUser({
      ...currentUser,
      xpPoints: currentUser.xpPoints + newItem.xpValue,
    });

    if (updatedUser) {
      setCurrentUser(updatedUser);
      setUsers(dataService.getUsers()); // Update global user list
      alert(`Item "${newItem.name}" shared! You earned ${newItem.xpValue} XP!`);
    } else {
      // This case should ideally not happen if updateUser is robust
      alert(`Item "${newItem.name}" shared, but XP update failed.`);
    }

    setCurrentView('dashboard'); // Navigate back to dashboard after sharing
  }, [currentUser]);

  const handleItemRequest = useCallback((itemId: string, juniorId: string) => {
    const itemToUpdate = items.find((item) => item.id === itemId);
    if (itemToUpdate && itemToUpdate.status === ItemStatus.AVAILABLE) {
      const updatedItem: Item = {
        ...itemToUpdate,
        status: ItemStatus.REQUESTED,
        juniorId: juniorId,
      };
      dataService.updateItem(updatedItem);
      setItems(dataService.getItems());
      alert(`You have requested "${itemToUpdate.name}". The senior will be notified!`);
    }
  }, [items]);

  const handleMarkAsPickedUp = useCallback((itemId: string, juniorId: string) => {
    const itemToUpdate = items.find((item) => item.id === itemId);
    if (itemToUpdate && itemToUpdate.status === ItemStatus.REQUESTED && itemToUpdate.seniorId === currentUser?.id) {
      const updatedItem: Item = {
        ...itemToUpdate,
        status: ItemStatus.PICKED_UP,
        juniorId: juniorId, // Confirming junior who picked up
      };
      dataService.updateItem(updatedItem);
      setItems(dataService.getItems());
      alert(`Item "${itemToUpdate.name}" marked as picked up by ${juniorId}.`);
    } else {
      alert('Could not mark item as picked up. Check status or permissions.');
    }
  }, [items, currentUser]);


  const renderContent = () => {
    if (!currentUser) {
      return <AuthPage onLogin={handleLogin} onRegister={handleRegister} errorMessage={authError} />;
    }

    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            currentUser={currentUser}
            items={items}
            users={users}
            onItemRequest={handleItemRequest}
            onMarkAsPickedUp={handleMarkAsPickedUp}
            onViewChange={setCurrentView}
          />
        );
      case 'share-item':
        return currentUser.isSenior ? (
          <ItemForm currentUser={currentUser} onAddItem={handleAddItem} />
        ) : (
          <p className="text-center text-xl text-red-300">Only seniors can share items.</p>
        );
      case 'leaderboard':
        return <XPLeaderboard leaderboardUsers={leaderboard} />;
      default:
        return (
          <p className="text-center text-xl text-red-300">Something went wrong!</p>
        );
    }
  };

  return (
    <Layout
      currentUser={currentUser}
      onNavigate={setCurrentView}
      onLogout={handleLogout}
      currentView={currentView}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
