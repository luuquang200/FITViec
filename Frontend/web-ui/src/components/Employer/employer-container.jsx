import  { useEffect, useState } from 'react';
import EmployerSidebar from './employer-sidebar';
import EmployerMainContent from './employer-main-content';
import { useAuth } from '@/contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EmployerContainer = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const {currentUser, loading} = useAuth();
  console.log("currentUser: ", currentUser);
  const navigate = useNavigate();
  // useEffect(()=>{
  //   if (loading) {
  //     console.log("loading:  ", loading);
  //     navigate("/employer");
  //     return;
  //   }
  //   console.log("currentUser: useEffect", currentUser);
  //   if(!currentUser){
  //     console.log("Chưa đăng nhập!");
  //     toast.error("Please Sign in!");
  //     navigate("/for-employers");
  //   }
  //   if(currentUser?.role === "user"){
  //     console.log("Không có quyền truy cập!");
  //     toast.error("Do not access!");
  //     navigate("/");
  //   }
  //   if(currentUser?.role === "admin"){
  //     console.log("Không có quyền truy cập!");
  //     toast.error("Do not access!");
  //     navigate("/admin");
  //   }
  //   }, [currentUser, loading, navigate])
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
