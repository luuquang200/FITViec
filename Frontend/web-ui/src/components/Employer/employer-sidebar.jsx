import  { useState } from 'react';
import { LayoutDashboard, FileText, CircleUserRound } from 'lucide-react';
import { useAuth } from "../../contexts/authContext";
import PropTypes from "prop-types"
const EmployerSidebar = ({ onTabChange }) => {
  const { currentUser} = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };
  const getTabClassName = (tab) => (
    `flex items-center cursor-pointer p-2 rounded ${
      activeTab === tab ? 'text-primary bg-red-100' : 'text-gray-800 hover:bg-gray-200'
    }`
  );
  return (
    <div className="w-1/5 bg-gray-100 text-gray-900 p-4 overflow-y-auto">
      <div className="flex items-center mb-6">
        <img src={currentUser?.photoUrl} alt="Logo" className="w-10 h-10 mr-2" />
        <div>
          <p className="text-sm font-semibold">{currentUser?.displayName} </p>
          <p className="text-xs text-gray-600">{currentUser?.email} </p>
        </div>
      </div>
      <ul className="space-y-2">
        <li className={getTabClassName('dashboard')} onClick={() => handleTabChange('dashboard')}>
          <span className="mr-4">
            <LayoutDashboard />
          </span>
          <span className="flex-grow">Dashboard</span>
        </li>
        <li className={getTabClassName('job-post')} onClick={() => handleTabChange('job-post')}>
          <span className="mr-4">
            <FileText />
          </span>
          <span className="flex-grow">Job management</span>
        </li>
        <li className={getTabClassName('cv-management')} onClick={() => handleTabChange('cv-management')}>
          <span className="mr-4">
            <CircleUserRound />
          </span>
          <span className="flex-grow">CV management</span>
          {/* <span className="ml-auto bg-primary text-white text-xs px-2 py-1 rounded-full">16</span> */}
        </li>
      </ul>
    </div>
  );
};
EmployerSidebar.propTypes = {
  onTabChange: PropTypes.func.isRequired,
};
export default EmployerSidebar;
