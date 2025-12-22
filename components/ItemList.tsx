
import React from 'react';
import { Item, ItemStatus, User, ItemCategory } from '../types';
import Button from './Button';
import { ItemCategory as ItemCategoryEnum } from '../types';

interface ItemListProps {
  items: Item[];
  currentUser: User;
  onItemRequest: (itemId: string, juniorId: string) => void;
  onMarkAsPickedUp: (itemId: string, juniorId: string) => void;
  onFilterChange: (category: ItemCategoryEnum | 'All') => void;
  currentFilter: ItemCategoryEnum | 'All';
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({
  items,
  currentUser,
  onItemRequest,
  onMarkAsPickedUp,
  onFilterChange,
  currentFilter,
  searchQuery,
  onSearchChange,
}) => {

  const canRequest = (item: Item): boolean => {
    return (
      !currentUser.isSenior &&
      item.status === ItemStatus.AVAILABLE &&
      item.seniorId !== currentUser.id && // Cannot request own item
      // Item now directly contains course and year information
      item.course === currentUser.course && // Fix: Access course directly from item
      item.year === currentUser.year // Fix: Access year directly from item
    );
  };

  const canMarkAsPickedUp = (item: Item): boolean => {
    return (
      currentUser.isSenior &&
      item.status === ItemStatus.REQUESTED &&
      item.seniorId === currentUser.id
    );
  };

  const filteredItems = items
    .filter((item) =>
      currentFilter === 'All' ? true : item.category === currentFilter
    )
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.createdAt - a.createdAt); // Sort by most recent

  return (
    <div className="space-y-6">
      <div className="bg-white bg-opacity-90 p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center gap-4 border border-gray-300">
        <label htmlFor="search" className="sr-only">Search Items</label>
        <input
          type="text"
          id="search"
          placeholder="Search items by name or description..."
          className="flex-grow w-full sm:w-auto p-2 rounded-md bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <label htmlFor="categoryFilter" className="sr-only">Filter by Category</label>
        <select
          id="categoryFilter"
          value={currentFilter}
          onChange={(e) => onFilterChange(e.target.value as ItemCategoryEnum | 'All')}
          className="w-full sm:w-auto p-2 rounded-md bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
        >
          <option value="All">All Categories</option>
          {Object.values(ItemCategory).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-center text-xl text-gray-700 mt-8">No items found matching your criteria.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden flex flex-col border border-gray-300"
            >
              <img
                src={item.imageUrl || `https://picsum.photos/400/250?random=${item.id}`}
                alt={item.name}
                className="w-full h-48 object-cover object-center"
              />
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-emerald-700 mb-2">{item.name}</h3>
                <p className="text-gray-700 text-sm mb-1">
                  <span className="font-semibold">Category:</span> {item.category}
                </p>
                <p className="text-gray-600 text-sm mb-3 flex-grow">{item.description}</p>
                <p className="text-gray-700 text-sm mb-1">
                  <span className="font-semibold">Status:</span>{' '}
                  <span
                    className={`font-semibold ${
                      item.status === ItemStatus.AVAILABLE ? 'text-green-600' :
                      item.status === ItemStatus.REQUESTED ? 'text-yellow-600' : 'text-blue-600'
                    }`}
                  >
                    {item.status}
                  </span>
                </p>
                <p className="text-gray-700 text-sm mb-1">
                  <span className="font-semibold">Pickup:</span> {item.pickupPoint}
                </p>
                {item.status === ItemStatus.REQUESTED && item.juniorId && (
                  <p className="text-gray-700 text-sm mb-3">
                    <span className="font-semibold">Requested by:</span> {item.juniorId}
                  </p>
                )}

                <div className="mt-auto pt-3 border-t border-gray-300 flex flex-col space-y-2">
                  {canRequest(item) && (
                    <Button onClick={() => onItemRequest(item.id, currentUser.id)} className="w-full">
                      Request Item
                    </Button>
                  )}
                  {canMarkAsPickedUp(item) && (
                    <Button
                      onClick={() => item.juniorId && onMarkAsPickedUp(item.id, item.juniorId)}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Mark as Picked Up
                    </Button>
                  )}
                  {item.status === ItemStatus.PICKED_UP && item.juniorId === currentUser.id && (
                    <p className="text-green-600 text-center font-semibold">You picked this up!</p>
                  )}
                  {item.status === ItemStatus.REQUESTED && item.juniorId === currentUser.id && (
                    <p className="text-yellow-600 text-center font-semibold">You requested this!</p>
                  )}
                  {item.seniorId === currentUser.id && (
                    <p className="text-emerald-500 text-center text-sm">
                      (Your item, {item.xpValue} XP value)
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemList;