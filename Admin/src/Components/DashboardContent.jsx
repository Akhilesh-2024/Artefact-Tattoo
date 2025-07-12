import React from 'react';

const DashboardContent = () => {
  const stats = [
    { title: 'Total Users', value: '2,543', change: '+12%', color: 'bg-blue-500' },
    { title: 'Revenue', value: '$45,231', change: '+8%', color: 'bg-green-500' },
    { title: 'Orders', value: '1,234', change: '+23%', color: 'bg-yellow-500' },
    { title: 'Conversion', value: '3.2%', change: '+2%', color: 'bg-purple-500' },
  ];

  const activities = [
    'User John Smith registered',
    'New order #1234 received',
    'Payment processed for order #1233',
    'System backup completed',
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Dashboard</h2>
        <p className="text-gray-600">Here's what's happening with your account today.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 md:p-6 rounded-lg shadow border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 md:w-12 md:h-12 ${stat.color} rounded flex items-center justify-center`}>
                <div className="w-5 h-5 md:w-6 md:h-6 bg-white rounded opacity-30"></div>
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">{stat.change} from last month</p>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-4 md:p-6 rounded-lg shadow border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center p-3 bg-gray-50 rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
              <span className="text-gray-700 text-sm md:text-base">{activity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;