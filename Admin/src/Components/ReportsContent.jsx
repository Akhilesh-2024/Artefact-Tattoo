import React from 'react';

const ReportsContent = () => {
  const reports = [
    { title: 'Monthly Revenue Report', description: 'Detailed breakdown of monthly revenue', type: 'Financial' },
    { title: 'User Activity Report', description: 'User engagement and activity metrics', type: 'Analytics' },
    { title: 'Sales Performance', description: 'Sales team performance analysis', type: 'Sales' },
    { title: 'System Usage Report', description: 'System resources and usage statistics', type: 'Technical' },
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reports</h2>
        <p className="text-gray-600">View and generate reports for your business.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {reports.map((report, index) => (
          <div key={index} className="bg-white p-4 md:p-6 rounded-lg shadow border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
              <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
              <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full w-fit">
                {report.type}
              </span>
            </div>
            <p className="text-gray-600 mb-4 text-sm md:text-base">{report.description}</p>
            <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200 transition-colors">
              Generate Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsContent;