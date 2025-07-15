import React from 'react';
import { 
  Calendar, 
  Users, 
  UserPlus, 
  Eye, 
  TrendingUp, 
  TrendingDown,
  Clock,
  Phone,
  Mail,
  Globe,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const DashboardContent = () => {
  // Sample data for charts
  const appointmentData = [
    { name: 'Mon', value: 12 },
    { name: 'Tue', value: 19 },
    { name: 'Wed', value: 15 },
    { name: 'Thu', value: 25 },
    { name: 'Fri', value: 22 },
    { name: 'Sat', value: 18 },
    { name: 'Sun', value: 8 }
  ];

  const contactData = [
    { name: 'Jan', value: 120 },
    { name: 'Feb', value: 180 },
    { name: 'Mar', value: 150 },
    { name: 'Apr', value: 220 },
    { name: 'May', value: 280 },
    { name: 'Jun', value: 350 }
  ];

  const subscriberData = [
    { name: 'Active', value: 1250, color: '#3b82f6' },
    { name: 'Inactive', value: 320, color: '#e5e7eb' },
    { name: 'Pending', value: 180, color: '#f59e0b' }
  ];

  const visitData = [
    { name: '12 AM', value: 120 },
    { name: '6 AM', value: 450 },
    { name: '12 PM', value: 890 },
    { name: '6 PM', value: 1200 },
    { name: '12 AM', value: 600 }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'appointment',
      title: 'New appointment scheduled',
      user: 'John Doe',
      time: '2 minutes ago',
      icon: Calendar,
      color: 'text-blue-500'
    },
    {
      id: 2,
      type: 'contact',
      title: 'Contact form submitted',
      user: 'Sarah Wilson',
      time: '15 minutes ago',
      icon: Mail,
      color: 'text-green-500'
    },
    {
      id: 3,
      type: 'subscriber',
      title: 'New subscriber joined',
      user: 'Mike Johnson',
      time: '1 hour ago',
      icon: UserPlus,
      color: 'text-purple-500'
    },
    {
      id: 4,
      type: 'visit',
      title: 'High traffic from mobile',
      user: 'System',
      time: '2 hours ago',
      icon: Globe,
      color: 'text-orange-500'
    }
  ];

  const StatCard = ({ title, value, change, icon: Icon, color, chart }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="flex items-center space-x-1">
          {change > 0 ? (
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(change)}%
          </span>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="h-20">
        {chart}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your business today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Appointments"
            value="124"
            change={12.5}
            icon={Calendar}
            color="bg-blue-500"
            chart={
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={appointmentData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            }
          />
          
          <StatCard
            title="Contacts"
            value="1,847"
            change={8.2}
            icon={Users}
            color="bg-green-500"
            chart={
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={contactData}>
                  <Bar dataKey="value" fill="#10b981" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            }
          />
          
          <StatCard
            title="Subscribers"
            value="1,750"
            change={15.3}
            icon={UserPlus}
            color="bg-purple-500"
            chart={
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subscriberData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={35}
                    dataKey="value"
                  >
                    {subscriberData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            }
          />
          
          <StatCard
            title="Site Visits"
            value="12,543"
            change={-2.1}
            icon={Eye}
            color="bg-orange-500"
            chart={
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#f97316" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            }
          />
        </div>

        {/* Detailed Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Appointments Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Weekly Appointments</h2>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="text-sm text-green-500 font-medium">+12.5%</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={appointmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Site Visits Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Daily Site Visits</h2>
              <div className="flex items-center space-x-2">
                <TrendingDown className="h-5 w-5 text-red-500" />
                <span className="text-sm text-red-500 font-medium">-2.1%</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={visitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Bar dataKey="value" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Activities</h2>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className={`p-2 rounded-full bg-white ${activity.color}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.user}</p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {activity.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;