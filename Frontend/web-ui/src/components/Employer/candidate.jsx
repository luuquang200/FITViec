import { useState, useEffect } from 'react';
import {   ChevronLeftIcon,  ChevronRightIcon, Search } from 'lucide-react';
import CandidateItem from './candidate-item';
import ClipLoader from "react-spinners/ClipLoader";
import { useAuth } from '@/contexts/authContext';


const exCandidates = [
  {
    photoUrl: 'MA',
    jobSeekerId: 'abc408580',
    applicationName: 'Nguyễn Thu Huyền',
    jobTittle: 'Chiến dịch nhân viên kế toán Ngân hàng ABCD',
    jobId: '#408580',
    email: 'banglangtim@gmail.com',
    applyAt: '05/06/2023 14:38',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'TK',
    jobSeekerId: '1253234as',
    applicationName: 'Trần Hữu AAAA',
    jobTittle: 'Tuyển nhân viên kế toán Ngân hàng ABCD',
    jobId: '#408581',
    email: 'thuukhoa@gmail.com',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'MA',
    jobSeekerId: 'abc408582',
    applicationName: 'Nguyễn Thanh Thúy',
    jobTittle: 'Chiến dịch tuyển Chọn nhân tài trẻ',
    jobId: '#408582',
    email: 'banglthanhthuy408582@gmail.com',
    applyAt: '05/06/2023 14:38',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'VB',
    jobSeekerId: 'abc408583',
    applicationName: 'Trần Văn Bá',
    jobTittle: 'Tuyển nhân viên kinh, Tuyển nhân viên kế toán Ngân hàng nhà nước',
    jobId: '#408583',
    email: 'thanh.vb@gmail.com',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'TT',
    jobSeekerId: 'abc408584',
    applicationName: 'Trần Thanh Tâm',
    jobTittle: 'Tuyển Tester',
    jobId: '#408584',
    email: 'thanh.td@gmail.com',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'BT',
    jobSeekerId: 'abc408585',
    applicationName: 'Phạm Quang Bình',
    jobTittle: 'Tuyển C&B',
    jobId: '#408585',
    email: 'binhpham@gmail.net',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'MA',
    jobSeekerId: 'abc408586',
    applicationName: 'Nguyễn Thu BBBB',
    jobTittle: 'Chiến dịch tuyển Nhà , Tuyển nhân viên kế toán Ngân hàng A',
    jobId: '#408586',
    email: 'banglangtim408586@gmail.com',
    applyAt: '05/06/2023 14:38',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'TK',
    jobSeekerId: 'abc408587',
    applicationName: 'Trần Hữu Khoa',
    jobTittle: 'Tuyển nhân viên kế toán Ngân hàng bb',
    jobId: '#408587',
    email: 'thuukhoa408587@gmail.com',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'CC',
    jobSeekerId: 'abc408588',
    applicationName: 'Nguyễn Thanh CCCC',
    jobTittle: 'Chiến dịch tuyển Chọn ...',
    jobId: '#408588',
    email: 'banglthanhthuy408588@gmail.com',
    applyAt: '05/06/2023 14:38',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'VD',
    jobSeekerId: 'abc408589',
    applicationName: 'Trần Văn DDD',
    jobTittle: 'Tuyển nhân viên kinh, Tuyển nhân viên kế toán Ngân hàng ABCD Tuyển nhân viên kinh',
    jobId: '#408589',
    email: 'thanh.vb408589@gmail.com',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'accepted',
  },
  {
    photoUrl: 'TT',
    jobSeekerId: 'abc408590',
    applicationName: 'Trần Thanh Tâm Can',
    jobTittle: 'Tuyển Designer',
    jobId: '#408590',
    email: 'thanh.td408590@gmail.com',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'TH',
    jobSeekerId: '12345abc408591',
    applicationName: 'Phạm Quang Bình Em',
    jobTittle: 'Tuyển C&B',
    jobId: '#408591',
    email: 'binhpham408591@gmail.net',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'HA',
    jobSeekerId: 'abc408592',
    applicationName: 'Nguyễn Thu Hằng',
    jobTittle: 'Chiến dịch tuyển Nhà , Tuyển nhân viên kế toán Trưởng',
    jobId: '#408592',
    email: 'banglangtim408592@gmail.com',
    applyAt: '05/06/2023 14:38',
    coverLetter: 'coverLetter',
    applicationStatus: 'rejected',
  },
  {
    photoUrl: 'HT',
    jobSeekerId: 'abc408593',
    applicationName: 'Trần Hữu Tuấn',
    jobTittle: 'Tuyển nhân viên kế toán Ngân hàng ABC',
    jobId: '#408593',
    email: 'thuutuan@gmail.com',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
  },
  {
    photoUrl: 'MU',
    jobSeekerId: 'abc408594',
    applicationName: 'Nguyễn Thanh Mai',
    jobTittle: 'Chiến dịch tuyển Chọn ...',
    jobId: '#408594',
    email: 'banglthanhhang94@gmail.com',
    applyAt: '05/06/2023 14:38',
    coverLetter: 'coverLetter',
    applicationStatus: 'accepted',
  },
  {
    photoUrl: 'HH',
    jobSeekerId: 'abc408595',
    applicationName: 'Hoàng Hà',
    jobTittle: 'Tuyển nhân viên kinh, Tuyển nhân viên kế toán Ngân hàng ABCD Tuyển nhân viên kinh',
    jobId: '#408595',
    email: 'thanh.HoaHoa@gmail.com',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'rejected',
  },
  {
    photoUrl: 'TO',
    jobSeekerId: 'abc408596',
    applicationName: 'Trần Tan Ong',
    jobTittle: 'Tuyển Tester',
    jobId: '#408596',
    email: 'thanh.to.96@gmail.com',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'rejected',
  },
  {
    photoUrl: 'BK',
    jobSeekerId: 'abc408597',
    applicationName: 'Phạm Quang Bình Kha',
    jobTittle: 'Tuyển C&B',
    jobId: '#408597',
    email: 'binhpham97@gmail.net',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'accepted',
  },
];

const statusOptions = {
  'in_review': 'CV received' ,
  'accepted': 'Accepted',
  'rejected': 'Rejected'
};
const exJobOptions = exCandidates.map(job => {
  return {
    jobId: job.jobId,
    jobTitle: job.jobTittle,
  }
})



const Candidates = () => {
  const {currentUser} = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [jobOptions, setJobOptions] = useState([]); //exapmle jobOptions
  const [selectedJob, setSelectedJob] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [filterResults, setFilterResults] = useState([]);
  const [candidates, setCandidates] = useState([]); //example candidates
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const candidatesPerPage = 3;
  const fetchCandidates = async (employerId) => {
    setIsLoading(true);
    try {
      // const response = await fetch(`https://application-service-otwul2bnna-uc.a.run.app/application/by-employer/${employerId}`, {
      //   headers: {
      //     "Authorization": currentUser?.accessToken,
          
      //   }
      // });
      // const data = await response.json(); 
      const data = exCandidates;
      //console.log("data candidate: ", data);
      setCandidates(data);
      const exJobOptions = data.map(job => {
        return {
          jobId: job.jobId,
          jobTitle: job.jobTittle,
        }
      })
      setJobOptions(exJobOptions);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // const fetchJobOptions = async (employerId) => {
  //   setIsLoading(true);
  //   try {
  //     console.log(employerId);
  //     // const response = await fetch(`https://job-search-service.azurewebsites.net/job-elastic/jobs-by-employer-id/${employerId}`,{
  //     //   headers: {
  //     //     "Authorization": currentUser?.accessToken,
  //     //   }
  //     // });
  //     //const data = await response.json();
  //     //console.log('data jobOptions: ', data);
  //     // if(data.length ===0){
  //       setJobOptions(exJobOptions);
  //     // }else{
  //     //    setJobOptions(data);
  //     //}
  //   } catch (error) {
  //     console.error('Error fetching JobOptions:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  useEffect(() => {
    console.log("call fetch");

    //fetchJobOptions(currentUser?.uid);
    //console.log("jobOptions: ", jobOptions);
    fetchCandidates(currentUser?.uid);
    console.log("-- results in:  ", results);
  }, []);

  console.log("results out:  ", results);
  //console.log("jobOptions: ", jobOptions);
  //console.log("candidates: ", candidates);
  useEffect(()=>{
    console.log("2 - candidates: ", candidates);
    console.log("2 - filter: ", filterResults);
    console.log('2- currentPage : ', currentPage);
    const renderResult = (data) => {
      const startIdx = (currentPage - 1) * candidatesPerPage;
      const endIdx = startIdx + candidatesPerPage;
      setResults(data.slice(startIdx, endIdx));
      setTotalPages(Math.ceil(data.length / candidatesPerPage));
    }
    console.log("check: ",filterResults.length === 0);
    if(filterResults.length === 0 && searchQuery ==='' && selectedJob ==='' && selectedStatus === '' ){
      console.log("render candidate");
      renderResult(candidates);
    }else{
      console.log("render filter result");
      renderResult(filterResults);
    }
  }, [currentPage, filterResults, candidates])
  
  useEffect(()=>{
    console.log("[selectedJob, selectedStatus]");
    handleSearch();
  }, [selectedJob, selectedStatus])

  

  // const handleSearch = async () => {
  //   setIsLoading(true);
  //   try {
  //     console.log("searchQuery: ", searchQuery, "- selctedStatus: ", selectedStatus,"- selctedJob: ", selectedJob);

  //     const filteredCandidates = candidates.filter(candidate =>
  //       candidate.applicationName.toLowerCase().includes(searchQuery.toLowerCase()) &&
  //       (selectedStatus === 'all' || candidate.applicationStatus === selectedStatus) &&
  //       (selectedJob === 'all' || candidate.jobId === selectedJob) 
  //     );
  //     console.log("filteredCandidate: ", filteredCandidates);
      
  //     const startIdx = (1 - 1) * candidatesPerPage;
  //     const endIdx = startIdx + candidatesPerPage;
  //     setTotalPages(Math.ceil(filteredCandidates.length / candidatesPerPage));
  //     setResults(filteredCandidates.slice(startIdx, endIdx));
  //     setCurrentPage(1);
      
  //   } catch (error) {
  //     console.error('Error fetching search results:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleSearch = async () => {
  //   setIsLoading(true);
  //   try {
  //     console.log("searchQuery: ", searchQuery, "- selectedStatus: ", selectedStatus, "- selectedJob: ", selectedJob);
  //     const lowerCaseSearchQuery = searchQuery.toLowerCase();
  //     const filteredCandidates = candidates.filter(candidate => {
  //       const { applicationName, jobTittle, jobId, email, applicationStatus, jobSeekerId } = candidate;
  //       const matchesSearchQuery = lowerCaseSearchQuery === '' ? true :
  //         applicationName.toLowerCase().includes(lowerCaseSearchQuery) ||
  //         jobTittle.toLowerCase().includes(lowerCaseSearchQuery) ||
  //         jobId.toLowerCase().includes(lowerCaseSearchQuery) ||
  //         email.toLowerCase().includes(lowerCaseSearchQuery) ||
  //         applicationStatus.toLowerCase().includes(lowerCaseSearchQuery) ||
  //         jobSeekerId.toLowerCase().includes(lowerCaseSearchQuery);
  //       const matchesStatus = (selectedStatus === '' || applicationStatus === selectedStatus);
  //       const matchesJob = (selectedJob === '' || jobId === selectedJob);
  
  //       return matchesSearchQuery && matchesStatus && matchesJob;
  //     });
  
  //     console.log("filteredCandidates: ", filteredCandidates);
  //     setFilterResults(filteredCandidates);
  //     setCurrentPage(1);
      
  //   } catch (error) {
  //     console.error('Error fetching search results:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const removeVietnameseTones = (str) => {
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D');
    return str;
  };
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      console.log("searchQuery: ", searchQuery, "- selectedStatus: ", selectedStatus, "- selectedJob: ", selectedJob);
  
      const lowerCaseSearchQuery = removeVietnameseTones(searchQuery.toLowerCase());
  
      const filteredCandidates = candidates.filter(candidate => {
        const { applicationName, jobTittle, jobId, email, applicationStatus, jobSeekerId } = candidate;
  
        const normalizedApplicationName = removeVietnameseTones(applicationName.toLowerCase());
        const normalizedJobTittle = removeVietnameseTones(jobTittle.toLowerCase());
        const normalizedJobId = removeVietnameseTones(jobId.toLowerCase());
        const normalizedEmail = removeVietnameseTones(email.toLowerCase());
        const normalizedApplicationStatus = removeVietnameseTones(applicationStatus.toLowerCase());
        const normalizedJobSeekerId = removeVietnameseTones(jobSeekerId.toLowerCase());
  
        const matchesSearchQuery = lowerCaseSearchQuery === '' ? true :
          normalizedApplicationName.includes(lowerCaseSearchQuery) ||
          normalizedJobTittle.includes(lowerCaseSearchQuery) ||
          normalizedJobId.includes(lowerCaseSearchQuery) ||
          normalizedEmail.includes(lowerCaseSearchQuery) ||
          normalizedApplicationStatus.includes(lowerCaseSearchQuery) ||
          normalizedJobSeekerId.includes(lowerCaseSearchQuery);
  
        const matchesStatus = (selectedStatus === '' || applicationStatus === selectedStatus);
        const matchesJob = (selectedJob === '' || jobId === selectedJob);
  
        return matchesSearchQuery && matchesStatus && matchesJob;
      });
  
      console.log("filteredCandidates: ", filteredCandidates);
      setFilterResults(filteredCandidates);
      setCurrentPage(1);
  
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
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
              onKeyDown={handleKeyDown}
              className="border rounded px-2 py-1 text-sm w-full"
            />
            <Search 
              className={`cursor-pointer text-gray-700 w-7 h-7 `}
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
              <option value="">All</option>
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
              <option value="">All</option>
              {jobOptions.map((job) => (
                <option key={job.jobId} value={job.jobId} title={job.jobTitle}>
                  {truncateText(job.jobTitle, 50)}
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
                <th className="p-2 text-left w-1/5">Applicant</th>
                <th className="p-2 text-left w-2/5">Job</th>
                <th className="p-2 text-left w-1/5">Information</th>
                <th className="p-2 text-left w-1/5">Apply At</th>
                <th className="p-2 text-left w-1/5">Status</th>
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
