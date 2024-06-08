import React, { useState } from 'react';
import AdminSidebar from './admin-sidebar';
import AccountManagement from './accounts-management';
import JobManagement from './jobs-management';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'account-management':
        return <AccountManagement />;
      case 'job-management':
        return <JobManagement />;
      default:
        return <JobManagement />;
    }
  };

  return (
    <div className="flex">
      <AdminSidebar onTabChange={setActiveTab} />
      <div className="w-4/5 p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
