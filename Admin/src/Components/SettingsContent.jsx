import React from 'react';

const SettingsContent = () => {
  const notificationSettings = [
    { label: 'Email notifications', checked: true },
    { label: 'Push notifications', checked: false },
    { label: 'SMS notifications', checked: true },
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Settings</h2>
        <p className="text-gray-600">Manage your application settings and preferences.</p>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="John Doe"
              />
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
        
        <div className="bg-white p-4 md:p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <div className="space-y-3">
            {notificationSettings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-700">{setting.label}</span>
                <input
                  type="checkbox"
                  defaultChecked={setting.checked}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-4 md:p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Security</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm new password"
              />
            </div>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsContent;