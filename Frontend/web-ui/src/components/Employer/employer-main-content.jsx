
import Dashboard from './dashboard';
import Candidates from './candidate';
import JobApplicants from './strategy-detail';
import CVViewer from './cv-detail';
import JobPost from './job-post';


const EmployerMainContent = ({activeTab}) => {
  return (
    <div className="w-4/5 bg-gray-100 p-4">
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'cv-review' && <CVViewer />}
      {activeTab === 'job-post' && <JobPost />}
      {activeTab === 'cv-management' && <Candidates />}
      
    </div>
  );
};

export default EmployerMainContent;
