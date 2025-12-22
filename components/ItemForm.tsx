
import React, { useState } from 'react';
import { Item, ItemCategory, PickupPoint, User, ItemStatus } from '../types';
import { XP_VALUES, PICKUP_POINTS_LIST } from '../constants';
import Button from './Button';

interface ItemFormProps {
  currentUser: User;
  onAddItem: (item: Omit<Item, 'id' | 'createdAt' | 'course' | 'year'>) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ currentUser, onAddItem }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ItemCategory>(ItemCategory.BOOKS);
  const [pickupPoint, setPickupPoint] = useState<PickupPoint>(PICKUP_POINTS_LIST[0]);
  const [imageUrl, setImageUrl] = useState(''); // Simple text input for image URL

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Omit<Item, 'id' | 'createdAt' | 'course' | 'year'> = {
      name,
      description,
      category,
      seniorId: currentUser.id,
      status: ItemStatus.AVAILABLE,
      pickupPoint,
      xpValue: XP_VALUES[category],
      imageUrl: imageUrl || `https://picsum.photos/400/250?random=${Date.now()}`, // Default image if none provided
    };
    onAddItem(newItem);
    // Reset form
    setName('');
    setDescription('');
    setCategory(ItemCategory.BOOKS);
    setPickupPoint(PICKUP_POINTS_LIST[0]);
    setImageUrl('');
  };

  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-sm p-6 rounded-lg shadow-2xl border border-gray-300 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-emerald-700 mb-6 text-center">Share a New Item</h2>
      <p className="text-gray-700 text-center mb-8">
        Help juniors by sharing your used academic resources. You'll earn XP points for every contribution!
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
            Item Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 rounded-md bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., 'Linear Algebra Textbook', 'Chem Lab Coat'"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            className="w-full p-2 rounded-md bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a brief description of the item's condition, course relevance, etc."
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="category" className="block text-gray-700 text-sm font-semibold mb-2">
            Category
          </label>
          <select
            id="category"
            className="w-full p-2 rounded-md bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={category}
            onChange={(e) => setCategory(e.target.value as ItemCategory)}
          >
            {Object.values(ItemCategory).map((cat) => (
              <option key={cat} value={cat}>
                {cat} (XP: {XP_VALUES[cat]})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="pickupPoint" className="block text-gray-700 text-sm font-semibold mb-2">
            Preferred Pickup Point
          </label>
          <select
            id="pickupPoint"
            className="w-full p-2 rounded-md bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={pickupPoint}
            onChange={(e) => setPickupPoint(e.target.value as PickupPoint)}
          >
            {PICKUP_POINTS_LIST.map((point) => (
              <option key={point} value={point}>
                {point}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-semibold mb-2">
            Image URL (Optional)
          </label>
          <input
            type="text"
            id="imageUrl"
            className="w-full p-2 rounded-md bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Paste image link here (e.g., from Imgur, Google Photos)"
          />
        </div>
        <Button type="submit" className="w-full p-3 text-lg">
          Share Item (Earn {XP_VALUES[category]} XP)
        </Button>
      </form>
    </div>
  );
};

export default ItemForm;