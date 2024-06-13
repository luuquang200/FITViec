
import { Mail} from 'lucide-react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

const CandidateItem = ({ candidate , statusOptions}) => {
  return (
    <tr className="border-t">
      <td className="p-2 flex items-center">
        <div
          className={`w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full text-white font-bold mr-2`}
        >
          {candidate.photoUrl}
        </div>
        <div>
          <p className='text-wrap'>{candidate.applicationName}</p>
        </div>
      </td>
      <td className="p-2">
        <p className=''>{candidate.jobTittle}</p>
        <p className="text-xs text-gray-500">{candidate.jobId}</p>
      </td>
      <td className="p-2">
        <div className="flex items-center mb-1">
          <span className="text-primary mr-2">
            <Mail size={12} />
          </span>
          <span className='text-sm'>{candidate.email}</span>
        </div>
      </td>
      <td className="p-2">
        
        <p className='text-sm'>{candidate.applyAt}</p>
        
      </td>
      <td className="p-2">
        <Link to={`/cv-detail/${candidate.jobSeekerId}`}>
          <button className="text-blue-500 border border-blue-500 rounded px-2 py-1">
            {statusOptions[candidate.applicationStatus]}
          </button>
        </Link>
      </td>
    </tr>
  );
};



CandidateItem.propTypes = {
    candidate: PropTypes.shape({
      photoUrl: PropTypes.string.isRequired,
      jobSeekerId:  PropTypes.string.isRequired,
      applicationName: PropTypes.string.isRequired,
      jobTittle: PropTypes.string.isRequired,
      jobId: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      applyAt: PropTypes.string.isRequired,
      applicationStatus: PropTypes.string.isRequired,
    }).isRequired,
    statusOptions: PropTypes.object.isRequired
  };
export default CandidateItem;
