import { useState, useEffect } from 'react';
import {   ChevronLeftIcon,  ChevronRightIcon, Search } from 'lucide-react';
import CandidateItem from './candidate-item';
import ClipLoader from "react-spinners/ClipLoader";
import { useAuth } from '@/contexts/authContext';


const exCandidates = [
  {
    photoUrl: 'MA',
    jobSeekerId: '12345abc',
    applicationName: 'Nguyễn Thu Huyền',
    jobTittle: 'Chiến dịch tuyển Nhà , Tuyển nhân viên kế toán Ngân hàng ABCD...',
    jobId: '#408580',
    email: 'banglangtim@gmail.com',
    applyAt: '05/06/2023 14:38',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'TK',
    jobSeekerId: '12345abc',
    applicationName: 'Trần Hữu Khoa',
    jobTittle: 'Tuyển nhân viên kế toán Ngân hàng ABCD ...',
    jobId: '#408583',
    email: 'thuukhoa@gmail.com',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'MA',
    jobSeekerId: '12345abc',
    applicationName: 'Nguyễn Thanh Thúy',
    jobTittle: 'Chiến dịch tuyển Chọn ...',
    jobId: '#408580',
    email: 'banglthanhthuy@gmail.com',
    applyAt: '05/06/2023 14:38',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'VB',
    jobSeekerId: '12345abc',
    applicationName: 'Trần Văn Bá',
    jobTittle: 'Tuyển nhân viên kinh, Tuyển nhân viên kế toán Ngân hàng ABCD Tuyển nhân viên kinh',
    jobId: '#408583',
    email: 'thanh.vb@gmail.com',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'TT',
    jobSeekerId: '12345abc',
    applicationName: 'Trần Thanh Tâm',
    jobTittle: 'Tuyển Tester',
    jobId: '#408580',
    email: 'thanh.td@gmail.com',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'BT',
    jobSeekerId: '12345abc',
    applicationName: 'Phạm Quang Bình',
    jobTittle: 'Tuyển C&B',
    jobId: '#408589',
    email: 'binhpham@gmail.net',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'MA',
    jobSeekerId: '12345abc',
    applicationName: 'Nguyễn Thu Huyền',
    jobTittle: 'Chiến dịch tuyển Nhà , Tuyển nhân viên kế toán Ngân hàng ABCD...',
    jobId: '#408580',
    email: 'banglangtim@gmail.com',
    applyAt: '05/06/2023 14:38',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'TK',
    jobSeekerId: '12345abc',
    applicationName: 'Trần Hữu Khoa',
    jobTittle: 'Tuyển nhân viên kế toán Ngân hàng ABCD ...',
    jobId: '#408583',
    email: 'thuukhoa@gmail.com',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'MA',
    jobSeekerId: '12345abc',
    applicationName: 'Nguyễn Thanh Thúy',
    jobTittle: 'Chiến dịch tuyển Chọn ...',
    jobId: '#408580',
    email: 'banglthanhthuy@gmail.com',
    applyAt: '05/06/2023 14:38',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'VB',
    jobSeekerId: '12345abc',
    applicationName: 'Trần Văn Bá',
    jobTittle: 'Tuyển nhân viên kinh, Tuyển nhân viên kế toán Ngân hàng ABCD Tuyển nhân viên kinh',
    jobId: '#408583',
    email: 'thanh.vb@gmail.com',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'TT',
    jobSeekerId: '12345abc',
    applicationName: 'Trần Thanh Tâm',
    jobTittle: 'Tuyển Tester',
    jobId: '#408580',
    email: 'thanh.td@gmail.com',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'BT',
    jobSeekerId: '12345abc',
    applicationName: 'Phạm Quang Bình',
    jobTittle: 'Tuyển C&B',
    jobId: '#408589',
    email: 'binhpham@gmail.net',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'MA',
    jobSeekerId: '12345abc',
    applicationName: 'Nguyễn Thu Huyền',
    jobTittle: 'Chiến dịch tuyển Nhà , Tuyển nhân viên kế toán Ngân hàng ABCD...',
    jobId: '#408580',
    email: 'banglangtim@gmail.com',
    applyAt: '05/06/2023 14:38',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'TK',
    jobSeekerId: '12345abc',
    applicationName: 'Trần Hữu Khoa',
    jobTittle: 'Tuyển nhân viên kế toán Ngân hàng ABCD ...',
    jobId: '#408583',
    email: 'thuukhoa@gmail.com',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'MA',
    jobSeekerId: '12345abc',
    applicationName: 'Nguyễn Thanh Thúy',
    jobTittle: 'Chiến dịch tuyển Chọn ...',
    jobId: '#408580',
    email: 'banglthanhthuy@gmail.com',
    applyAt: '05/06/2023 14:38',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'VB',
    jobSeekerId: '12345abc',
    applicationName: 'Trần Văn Bá',
    jobTittle: 'Tuyển nhân viên kinh, Tuyển nhân viên kế toán Ngân hàng ABCD Tuyển nhân viên kinh',
    jobId: '#408583',
    email: 'thanh.vb@gmail.com',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'TT',
    jobSeekerId: '12345abc',
    applicationName: 'Trần Thanh Tâm',
    jobTittle: 'Tuyển Tester',
    jobId: '#408580',
    email: 'thanh.td@gmail.com',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'BT',
    jobSeekerId: '12345abc',
    applicationName: 'Phạm Quang Bình',
    jobTittle: 'Tuyển C&B',
    jobId: '#408589',
    email: 'binhpham@gmail.net',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
];

const statusOptions = {
  'in_review': 'CV received' ,
  'accepted': 'Interview',
  'rejected': 'Reject'
};

const exJobOptions = [
  {
    jobId: 'J001',
    jobName: 'Nhân viên kinh doanh '
  },
  {
    jobId: 'J002',
    jobName: 'Lập trình viên'
  },
  {
    jobId: 'J003',
    jobName: 'Nhân viên thiết kế'
  },
  {
    jobId: 'J004',
    jobName: 'Nhân viên marketing'
  },
  {
    jobId: 'J005',
    jobName: 'Nhân viên chăm sóc khách hàng'
  }
];

const Candidates = () => {
  const {currentUser} = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [jobOptions, setJobOptions] = useState([]); //exapmle jobOptions
  const [selectedJob, setSelectedJob] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [candidates, setCandidates] = useState([]); //example candidates
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const candidatesPerPage = 8;
  const fetchCandidates = async (employerId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://application-service-otwul2bnna-uc.a.run.app/application/by-employer/${employerId}`, {
        headers: {
          "Authorization": currentUser?.accessToken,
        }
      });
      const data = await response.json(); 
      //const data = exCandidates;
      console.log("data candidate: ", data);
      setCandidates(data);

      //console.log('currentPage : ', currentPage);
      const startIdx = (currentPage - 1) * candidatesPerPage;
      const endIdx = startIdx + candidatesPerPage;
      setResults(data.slice(startIdx, endIdx));
      setTotalPages(Math.ceil(data.length / candidatesPerPage));
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchJobOptions = async (employerId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://job-search-service.azurewebsites.net/job-elastic/jobs-by-employer-id/${employerId}`,{
        headers: {
          "Authorization": currentUser?.accessToken,
        }
      });
      const data = await response.json();
      //console.log('data jobOptions: ', data);
      if(data.length ===0){
        setJobOptions(exJobOptions);
      }else{
        setJobOptions(data);
      }
    } catch (error) {
      console.error('Error fetching JobOptions:', error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchJobOptions(currentUser?.uid);
    //console.log("jobOptions: ", jobOptions);
    fetchCandidates(currentUser?.uid);
    console.log("candidates: ", candidates);
  }, [currentPage]);
  //console.log("jobOptions: ", jobOptions);
  //console.log("candidates: ", candidates);
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      console.log("searchQuery: ", searchQuery, "- selctedStatus: ", selectedStatus,"- selctedJob: ", selectedJob);

      const filteredCandidates = candidates.filter(candidate =>
        candidate.applicationName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedStatus === 'all' || candidate.applicationStatus === selectedStatus) &&
        (selectedJob === 'all' || candidate.jobId === selectedJob) 
      );
      console.log("filteredCandidate: ", filteredCandidates);
      setCurrentPage(1);
      const startIdx = (currentPage - 1) * candidatesPerPage;
      const endIdx = startIdx + candidatesPerPage;
      setTotalPages(Math.ceil(filteredCandidates.length / candidatesPerPage));
      setResults(filteredCandidates.slice(startIdx, endIdx));
      
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleJobChange = (e) => {
    setSelectedJob(e.target.value);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      
    }
  };
  return (
    <div className="p-4 bg-white mb-[60px]">
      <h2 className="text-lg font-bold">CV Management</h2>
      <br/>
      <div className="flex justify-between items-center mb-4">
        <div className="w-1/2">
          <p>Search: </p>
          <div className="flex space-x-2 items-center my-2">
            <input
              type="text"
              placeholder="Search by name, email,..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded px-2 py-1 text-sm w-full"
            />
            <Search 
              className="cursor-pointer text-gray-500 w-5 h-5"
              onClick={handleSearch}
            />
          </div>
        </div>
        <div className="flex w-2/5 space-x-2">
          <div className="w-1/2">
            <p>Status: </p>
            <select 
              value={selectedStatus} 
              onChange={handleStatusChange} 
              className="border rounded px-2 py-1 my-2 text-sm w-full"
            >
              <option value="all">All</option>
              {Object.entries(statusOptions).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <p>Job: </p>
            <select 
              value={selectedJob} 
              onChange={handleJobChange} 
              className="border rounded px-2 py-1 my-2 text-sm w-full"
            >
              <option value="all">All</option>
              {jobOptions.map((job) => (
                <option key={job.jobId} value={job.jobId} title={job.jobName}>
                  {truncateText(job.jobName, 50)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
            <ClipLoader
                color="rgba(239, 68, 68, 1)"
                size={40}
                speedMultiplier={1}
                className="mt-4 "
            />
        </div>
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full border rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Applicant</th>
                <th className="p-2 text-left">Job</th>
                <th className="p-2 text-left">Information</th>
                <th className="p-2 text-left">Apply At</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {(results.length > 0 ) ? results.map((candidate, index) => (
                <CandidateItem key={index} candidate={candidate} statusOptions={statusOptions} />
              )):(
                <tr>
                  <td colSpan="5" className="p-2 text-center">Have no result.</td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination */}
          {results.length > 0 && <div className="mt-4 flex items-center justify-between">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center rounded-lg bg-red-600 px-3 py-2 text-white disabled:opacity-50"
                >
                    <ChevronLeftIcon className="h-5 w-5" />
                    <span className="ml-2">Previous</span>
                </button>
                <span className="text-sm text-gray-700">
                    Page{" "}
                    <strong>
                        {currentPage } of {totalPages}
                    </strong>
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center rounded-lg bg-red-600 px-3 py-2 text-white disabled:opacity-50"
                >
                    <span className="mr-2">Next</span>
                    <ChevronRightIcon className="h-5 w-5" />
                </button>
          </div>}
          
          
        </div>
      )}
    </div>
  );
};

export default Candidates;
