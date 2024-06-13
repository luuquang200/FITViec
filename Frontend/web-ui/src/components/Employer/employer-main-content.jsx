import PropTypes from 'prop-types';
import Dashboard from './dashboard';
import Candidates from './candidate';
import JobPost from './job-post';


const EmployerMainContent = ({activeTab}) => {
  return (
    <div className="w-4/5 bg-gray-100 p-4">
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'job-post' && <JobPost />}
      {activeTab === 'cv-management' && <Candidates />}
      
    </div>
  );
};
EmployerMainContent.propTypes = {
  activeTab: PropTypes.string.isRequired
};
export default EmployerMainContent;
