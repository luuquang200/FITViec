import  { useState } from 'react';
import EmployerSidebar from './employer-sidebar';
import EmployerMainContent from './employer-main-content';

const EmployerContainer = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex  bg-slate-500">
      <EmployerSidebar onTabChange={handleTabChange} />
      <EmployerMainContent activeTab={activeTab} />
      
    </div>
  );
};

export default EmployerContainer;
