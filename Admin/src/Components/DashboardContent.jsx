import React from 'react';

const DashboardContent = () => {
  const stats = [
    { 
      title: 'Total Users', 
      value: '2,543', 
      change: '+12%', 
      color: 'bg-blue-500',
      icon: '👥'
    },
    { 
      title: 'Revenue', 
      value: '$45,231', 
      change: '+8%', 
      color: 'bg-green-500',
      icon: '💰'
    },
    { 
      title: 'Orders', 
      value: '1,234', 
      change: '+23%', 
      color: 'bg-yellow-500',
      icon: '📦'
    },
    { 
      title: 'Conversion', 
      value: '3.2%', 
      change: '+2%', 
      color: 'bg-purple-500',
      icon: '📈'
    },
  ];

  const activities = [
    { text: 'User John Smith registered', time: '2 minutes ago', type: 'user' },
    { text: 'New order #1234 received', time: '5 minutes ago', type: 'order' },
    { text: 'Payment processed for order #1233', time: '12 minutes ago', type: 'payment' },
    { text: 'System backup completed', time: '1 hour ago', type: 'system' },
    { text: 'New product review submitted', time: '2 hours ago', type: 'review' },
  ];

  const getActivityColor = (type) => {
    switch (type) {
      case 'user': return 'bg-blue-500';
      case 'order': return 'bg-green-500';
      case 'payment': return 'bg-yellow-500';
      case 'system': return 'bg-gray-500';
      case 'review': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Welcome to Dashboard
        </h2>
        <p className="text-lg text-gray-600">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                {stat.icon}
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`w-3 h-3 ${getActivityColor(activity.type)} rounded-full mr-4 mt-2 flex-shrink-0`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 font-medium text-sm md:text-base">
                    {activity.text}
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Add New User
            </button>
            <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
              Create Order
            </button>
            <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium">
              Generate Report
            </button>
            <button className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium">
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Performance Overview</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-gray-600">Chart visualization would go here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;