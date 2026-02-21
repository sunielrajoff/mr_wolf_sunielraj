import React from 'react';
import { PermissionStatus } from '../types';

interface PermissionBannerProps {
  permissionStatus: PermissionStatus;
  onGrantPermission: (granted: boolean) => void;
}

const PermissionBanner: React.FC<PermissionBannerProps> = ({ permissionStatus, onGrantPermission }) => {
  if (permissionStatus === 'granted') {
    return null; // Don't show if permission is granted
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 shadow-lg z-50 flex items-center justify-between">
      <p className="text-sm md:text-base">
        EduCycle uses local storage to save your data on this device for a seamless experience.
        Would you like to grant permission?
      </p>
      <div className="flex space-x-2">
        <button
          onClick={() => onGrantPermission(true)}
          className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm font-medium"
        >
          Grant Permission
        </button>
        <button
          onClick={() => onGrantPermission(false)}
          className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
        >
          Deny
        </button>
      </div>
    </div>
  );
};

export default PermissionBanner;
