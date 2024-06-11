import  { useState } from 'react';
import { LayoutDashboard, BriefcaseBusiness, FileText, CircleUserRound, BarChart4, History, ShoppingCart, FileClock, Settings } from 'lucide-react';
import { useAuth } from "../../contexts/authContext";
const hrUser = {
  avatar: 'https://via.placeholder.com/50',
  name: 'Nguyễn Văn A',
  email: "abcdef@gmail.com",
  companyName: "HCMUS"
}
const EmployerSidebar = ({ onTabChange }) => {
  const { currentUser, inSingUpInPage, isGoogleUser } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Cập nhật user infor
  if(currentUser){
    hrUser.name = currentUser.displayName;
    hrUser.email = currentUser.email;
  }



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
        <img src={hrUser.avatar} alt="Logo" className="w-10 h-10 mr-2" />
        <div>
          <p className="text-sm font-semibold">{hrUser.name} </p>
          <p className="text-xs text-gray-600">{hrUser.email} </p>
          <p className="text-xs text-primary">{hrUser.companyName} </p>
        </div>
      </div>
      <ul className="space-y-2">
        <li className={getTabClassName('dashboard')} onClick={() => handleTabChange('dashboard')}>
          <span className="mr-4">
            <LayoutDashboard />
          </span>
          <span className="flex-grow">Bảng tin</span>
        </li>
        <li className={getTabClassName('cv-review')} onClick={() => handleTabChange('cv-review')}>
          <span className="mr-4">
            <LayoutDashboard />
          </span>
          <span className="flex-grow">CV Review</span>
          <span className="ml-auto bg-primary text-white text-xs px-2 py-1 rounded-full">17</span>
        </li>
        
        <li className={getTabClassName('job-post')} onClick={() => handleTabChange('job-post')}>
          <span className="mr-4">
            <FileText />
          </span>
          <span className="flex-grow">Tin tuyển dụng</span>
        </li>
        <li className={getTabClassName('cv-management')} onClick={() => handleTabChange('cv-management')}>
          <span className="mr-4">
            <CircleUserRound />
          </span>
          <span className="flex-grow">Quản lý CV</span>
          <span className="ml-auto bg-primary text-white text-xs px-2 py-1 rounded-full">16</span>
        </li>
        
      </ul>
    </div>
  );
};

export default EmployerSidebar;
