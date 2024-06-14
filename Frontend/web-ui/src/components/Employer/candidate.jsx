import { useState, useEffect } from 'react';
import {   ChevronLeftIcon,  ChevronRightIcon, Search } from 'lucide-react';
import CandidateItem from './candidate-item';
import ClipLoader from "react-spinners/ClipLoader";
import { useAuth } from '@/contexts/authContext';
import PropTypes from "prop-types";


const exCandidates = [
  {
    applicationId: "557aeef1-134e-4f00-afe2-e929560c9934",
    jobSeekerId: 'abc408580',
    applicationName: 'Nguyễn Thu Huyền',
    jobId: '#408580',
    applyAt: '05/06/2023 14:38',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
    employerId: "hansentechnologies",
    cvLink: "https://firebasestorage.googleapis.com/v0/b/fit-viec.appspot.com/o/cvs%2FDomain_Model.pdf_3e0e5065-d27e-4346-9d55-2bb1bb19b6ab?alt=media&token=c4b2dcda-ae11-407c-ae36-a3a3e58dde3e",
    jobInfo: {
        jobId: '#408580',
        jobTitle: 'Chiến dịch nhân viên kế toán Ngân hàng ABCD',
      },
    contactInfo: {
      email: 'banglangtim@gmail.com',
    }
  },
  {
    applicationId: "557aeef1-134e-4f00-afe2-e929560c9935",
    jobSeekerId: '1253234as',
    applicationName: 'Trần Hữu AAAA',
    email: 'thuukhoa@gmail.com',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
    employerId: "hansentechnologies",
    jobId: "#408581",
    cvLink: "https://firebasestorage.googleapis.com/v0/b/fit-viec.appspot.com/o/cvs%2FDomain_Model.pdf_3e0e5065-d27e-4346-9d55-2bb1bb19b6ab?alt=media&token=c4b2dcda-ae11-407c-ae36-a3a3e58dde3e",
    jobInfo: {
      jobTitle: 'Tuyển nhân viên kế toán Ngân hàng ABCD',
      jobId: '#408581',
    },
    contactInfo: {
        "email": "nguyenhuutruc947@gmail.com"
    }
  },
  {
    applicationId: "557aeef1-134e-4f00-afe2-e929560c9936",
    jobSeekerId: 'abc408582',
    applicationName: 'Nguyễn Thanh Thúy',
    email: 'banglthanhthuy408582@gmail.com',
    applyAt: '05/06/2023 14:38',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
    employerId: "hansentechnologies",
    jobId: "#408582",
    cvLink: "https://firebasestorage.googleapis.com/v0/b/fit-viec.appspot.com/o/cvs%2FDomain_Model.pdf_3e0e5065-d27e-4346-9d55-2bb1bb19b6ab?alt=media&token=c4b2dcda-ae11-407c-ae36-a3a3e58dde3e",
    jobInfo: {
      jobTitle: 'Chiến dịch tuyển Chọn nhân tài trẻ',
      jobId: '#408582',
    },
    contactInfo: {
        "email": "nguyenhuutruc947@gmail.com"
    }
  },
  {
    applicationId: "557aeef1-134e-4f00-afe2-e929560c9937",
    jobSeekerId: 'abc408583',
    applicationName: 'Trần Văn Bá',
    email: 'thanh.vb@gmail.com',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
    employerId: "hansentechnologies",
    jobId: "#408583",
    cvLink: "https://firebasestorage.googleapis.com/v0/b/fit-viec.appspot.com/o/cvs%2FDomain_Model.pdf_3e0e5065-d27e-4346-9d55-2bb1bb19b6ab?alt=media&token=c4b2dcda-ae11-407c-ae36-a3a3e58dde3e",
    jobInfo: {
      jobTitle: 'Tuyển nhân viên kinh, Tuyển nhân viên kế toán Ngân hàng nhà nước',
      jobId: '#408583',
    },
    contactInfo: {
        "email": "nguyenhuutruc947@gmail.com"
    }
  },
  {
    applicationId: "557aeef1-134e-4f00-afe2-e929560c9938",
    jobSeekerId: 'abc408584',
    applicationName: 'Trần Thanh Tâm',
    email: 'thanh.td@gmail.com',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
    employerId: "hansentechnologies",
    jobId: "#408584",
    cvLink: "https://firebasestorage.googleapis.com/v0/b/fit-viec.appspot.com/o/cvs%2FDomain_Model.pdf_3e0e5065-d27e-4346-9d55-2bb1bb19b6ab?alt=media&token=c4b2dcda-ae11-407c-ae36-a3a3e58dde3e",
    jobInfo: {
      jobTitle: 'Tuyển Tester',
      jobId: '#408584',
    },
    contactInfo: {
        "email": "nguyenhuutruc947@gmail.com"
    }
  },
  {
    applicationId: "557aeef1-134e-4f00-afe2-e929560c9939",
    jobSeekerId: 'abc408585',
    applicationName: 'Phạm Quang Bình',
    email: 'binhpham@gmail.net',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
    employerId: "hansentechnologies",
    jobId: "#408585",
    cvLink: "https://firebasestorage.googleapis.com/v0/b/fit-viec.appspot.com/o/cvs%2FDomain_Model.pdf_3e0e5065-d27e-4346-9d55-2bb1bb19b6ab?alt=media&token=c4b2dcda-ae11-407c-ae36-a3a3e58dde3e",
    jobInfo: {
      jobTitle: 'Tuyển C&B',
      jobId: '#408585',
    },
    contactInfo: {
        "email": "nguyenhuutruc947@gmail.com"
    }
  },
  {
    applicationId: "557aeef1-134e-4f00-afe2-e929560c9940",
    jobSeekerId: 'abc408586',
    applicationName: 'Nguyễn Thu BBBB',
    jobId: '#408586',
    email: 'banglangtim408586@gmail.com',
    applyAt: '05/06/2023 14:38',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
    employerId: "hansentechnologies",
    cvLink: "https://firebasestorage.googleapis.com/v0/b/fit-viec.appspot.com/o/cvs%2FDomain_Model.pdf_3e0e5065-d27e-4346-9d55-2bb1bb19b6ab?alt=media&token=c4b2dcda-ae11-407c-ae36-a3a3e58dde3e",
    jobInfo: {
      jobTitle: 'Chiến dịch tuyển Nhà , Tuyển nhân viên kế toán Ngân hàng A',
      jobId: '#408586',
    },
    contactInfo: {
        "email": "nguyenhuutruc947@gmail.com"
    }
  },
  {
    applicationId: "557aeef1-134e-4f00-afe2-e929560c9950",
    jobSeekerId: 'abc408587',
    applicationName: 'Trần Hữu Khoa',
    email: 'thuukhoa408587@gmail.com',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
    employerId: "hansentechnologies",
    jobId: "#408587",
    cvLink: "https://firebasestorage.googleapis.com/v0/b/fit-viec.appspot.com/o/cvs%2FDomain_Model.pdf_3e0e5065-d27e-4346-9d55-2bb1bb19b6ab?alt=media&token=c4b2dcda-ae11-407c-ae36-a3a3e58dde3e",
    jobInfo: {
      jobTitle: 'Tuyển nhân viên kế toán Ngân hàng bb',
      jobId: '#408587',
    },
    contactInfo: {
        "email": "nguyenhuutruc947@gmail.com"
    }
  },
  {
    applicationId: "557aeef1-134e-4f00-afe2-e929560c9960",
    jobSeekerId: 'abc408588',
    applicationName: 'Nguyễn Thanh CCCC',
    applyAt: '05/06/2023 14:38',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
    employerId: "hansentechnologies",
    jobId: "5fa75d44-28f8-478a-ae5f-297546abeb9e",
    cvLink: "https://firebasestorage.googleapis.com/v0/b/fit-viec.appspot.com/o/cvs%2FDomain_Model.pdf_3e0e5065-d27e-4346-9d55-2bb1bb19b6ab?alt=media&token=c4b2dcda-ae11-407c-ae36-a3a3e58dde3e",
    jobInfo: {
      "jobId": "5fa75d44-28f8-478a-ae5f-297546abeb9e",
      "jobTitle": "Software Developer (Java)"
    },
    contactInfo: {
        email: 'banglthanhthuy408588@gmail.com',
    }
  },
  {
    applicationId: "557aeef1-134e-4f00-afe2-e929560c9929",
    jobSeekerId: 'abc408589',
    applicationName: 'Trần Văn DDD',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'accepted',
    employerId: "hansentechnologies",
    jobId: "5fa75d44-28f8-478a-ae5f-297546abeb9e",
    cvLink: "https://firebasestorage.googleapis.com/v0/b/fit-viec.appspot.com/o/cvs%2FDomain_Model.pdf_3e0e5065-d27e-4346-9d55-2bb1bb19b6ab?alt=media&token=c4b2dcda-ae11-407c-ae36-a3a3e58dde3e",
    jobInfo: {
      "jobId": "5fa75d44-28f8-478a-ae5f-297546abeb9e",
      "jobTitle": "Software Developer (Java)"
    },
    contactInfo: {
        "email": "nguyetrandddd7@gmail.com"
    }
  },
  {
    applicationId: "557aeef1-134e-4f00-afe2-e929560c9928",
    jobSeekerId: 'abc408590',
    applicationName: 'Trần Thanh Tâm Can',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
    employerId: "hansentechnologies",
    jobId: "#408590",
    cvLink: "https://firebasestorage.googleapis.com/v0/b/fit-viec.appspot.com/o/cvs%2FDomain_Model.pdf_3e0e5065-d27e-4346-9d55-2bb1bb19b6ab?alt=media&token=c4b2dcda-ae11-407c-ae36-a3a3e58dde3e",
    jobInfo: {
      jobTitle: 'Tuyển Designer',
      jobId: '#408590',
    },
    contactInfo: {
      email: 'thanh.td408590@gmail.com',
    }
  },
  {
    applicationId: "557aeef1-134e-4f00-afe2-e929560c9927",
    jobSeekerId: '12345abc408591',
    applicationName: 'Phạm Quang Bình Em',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
    employerId: "hansentechnologies",
    jobId: "5fa75d44-28f8-478a-ae5f-297546abeb9e",
    cvLink: "https://firebasestorage.googleapis.com/v0/b/fit-viec.appspot.com/o/cvs%2FDomain_Model.pdf_3e0e5065-d27e-4346-9d55-2bb1bb19b6ab?alt=media&token=c4b2dcda-ae11-407c-ae36-a3a3e58dde3e",
    jobInfo: {
      "jobId": "5fa75d44-28f8-478a-ae5f-297546abeb9e",
      "jobTitle": "Software Developer (Java)"
    },
    contactInfo: {
      email: 'binhpham408591@gmail.net',
    }
  },
  {
    applicationId: "557aeef1-134e-4f00-afe2-e929560c9926",
    jobSeekerId: 'abc408592',
    applicationName: 'Nguyễn Thu Hằng',
    applyAt: '05/06/2023 14:38',
    coverLetter: 'coverLetter',
    applicationStatus: 'rejected',
    employerId: "hansentechnologies",
    jobId: "5fa75d44-28f8-478a-ae5f-297546abeb9e",
    cvLink: "https://firebasestorage.googleapis.com/v0/b/fit-viec.appspot.com/o/cvs%2FDomain_Model.pdf_3e0e5065-d27e-4346-9d55-2bb1bb19b6ab?alt=media&token=c4b2dcda-ae11-407c-ae36-a3a3e58dde3e",
    jobInfo: {
      "jobId": "5fa75d44-28f8-478a-ae5f-297546abeb9e",
      "jobTitle": "Software Developer (Java)"
    },
    contactInfo: {
      email: 'banglangtim408592@gmail.com',
    }
  },
  {
    applicationId: "557aeef1-134e-4f00-afe2-e929560c9925",
    jobSeekerId: 'abc408593',
    applicationName: 'Trần Hữu Tuấn',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'in_review',
    employerId: "hansentechnologies",
    jobId: "5fa75d44-28f8-478a-ae5f-297546abeb9e",
    cvLink: "https://firebasestorage.googleapis.com/v0/b/fit-viec.appspot.com/o/cvs%2FDomain_Model.pdf_3e0e5065-d27e-4346-9d55-2bb1bb19b6ab?alt=media&token=c4b2dcda-ae11-407c-ae36-a3a3e58dde3e",
    jobInfo: {
      "jobId": "5fa75d44-28f8-478a-ae5f-297546abeb9e",
      "jobTitle": "Software Developer (Java)"
    },
    contactInfo: {
      email: 'thuutuan@gmail.com',
    }
  },
  {
    applicationId: "557aeef1-134e-4f00-afe2-e929560c9924",
    jobSeekerId: 'abc408594',
    applicationName: 'Nguyễn Thanh Mai',
    applyAt: '05/06/2023 14:38',
    coverLetter: 'coverLetter',
    applicationStatus: 'accepted',
    employerId: "hansentechnologies",
    jobId: "#408594",
    cvLink: "https://firebasestorage.googleapis.com/v0/b/fit-viec.appspot.com/o/cvs%2FDomain_Model.pdf_3e0e5065-d27e-4346-9d55-2bb1bb19b6ab?alt=media&token=c4b2dcda-ae11-407c-ae36-a3a3e58dde3e",
    jobInfo: {
      jobTitle: 'Chiến dịch tuyển Chọn ...',
      jobId: '#408594',
    },
    contactInfo: {
      email: 'banglthanhhang94@gmail.com',
    }
  },
  {
    applicationId: "557aeef1-134e-4f00-afe2-e929560c9923",
    jobSeekerId: 'abc408595',
    applicationName: 'Hoàng Hà',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'rejected',
    employerId: "hansentechnologies",
    jobId: "#408595",
    cvLink: "https://firebasestorage.googleapis.com/v0/b/fit-viec.appspot.com/o/cvs%2FDomain_Model.pdf_3e0e5065-d27e-4346-9d55-2bb1bb19b6ab?alt=media&token=c4b2dcda-ae11-407c-ae36-a3a3e58dde3e",
    jobInfo: {
      jobTitle: 'Tuyển nhân viên kinh, Tuyển nhân viên kế toán Ngân hàng ABCD Tuyển nhân viên kinh',
      jobId: '#408595',
    },
    contactInfo: {
      email: 'thanh.HoaHoa@gmail.com',
    }
  },
  {
    applicationId: "557aeef1-134e-4f00-afe2-e929560c9722",
    jobSeekerId: 'abc408596',
    applicationName: 'Trần Tan Ong',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'rejected',
    employerId: "hansentechnologies",
    jobId: "#408596",
    cvLink: "https://firebasestorage.googleapis.com/v0/b/fit-viec.appspot.com/o/cvs%2FDomain_Model.pdf_3e0e5065-d27e-4346-9d55-2bb1bb19b6ab?alt=media&token=c4b2dcda-ae11-407c-ae36-a3a3e58dde3e",
    jobInfo: {
      jobTitle: 'Tuyển Tester',
      jobId: '#408596',
    },
    contactInfo: {
      email: 'thanh.to.96@gmail.com',
    }
  },
  {
    applicationId: "557aeef1-134e-4f00-afe2-e929560c9921",
    jobSeekerId: 'abc408597',
    applicationName: 'Phạm Quang Bình Kha',
    applyAt: '01/06/2023 15:59',
    coverLetter: 'coverLetter',
    applicationStatus: 'accepted',
    employerId: "hansentechnologies",
    jobId: "5fa75d44-28f8-478a-ae5f-297546abeb9e",
    cvLink: "https://firebasestorage.googleapis.com/v0/b/fit-viec.appspot.com/o/cvs%2FDomain_Model.pdf_3e0e5065-d27e-4346-9d55-2bb1bb19b6ab?alt=media&token=c4b2dcda-ae11-407c-ae36-a3a3e58dde3e",
    jobInfo: {
      "jobId": "5fa75d44-28f8-478a-ae5f-297546abeb9e",
      "jobTitle": "Software Developer (Java)"
    },
    contactInfo: {
      email: 'binhpham97@gmail.net',
    }
  },
  {
    applicationId: "557aeef1-134e-4f00-afe2-e929560c9920",
    employerId: "hansentechnologies",
    jobId: "5fa75d44-28f8-478a-ae5f-297546abeb9e",
    jobSeekerId: "nR2D25v2cQVw4gYRtNaE8kqhZgp1",
    applicationStatus: "in_review",
    applicationName: "Nguyễn Hữu Trực",
    cvLink: "https://firebasestorage.googleapis.com/v0/b/fit-viec.appspot.com/o/cvs%2FDomain_Model.pdf_3e0e5065-d27e-4346-9d55-2bb1bb19b6ab?alt=media&token=c4b2dcda-ae11-407c-ae36-a3a3e58dde3e",
    coverLetter: "cover_letter",
    applyAt: "06/12/2024 22:13",
    jobInfo: {
        "jobId": "5fa75d44-28f8-478a-ae5f-297546abeb9e",
        "jobTitle": "Software Developer (Java)"
      },
    contactInfo: {
        "email": "nguyenhuutruc947@gmail.com"
    }
  }
];

const statusOptions = {
  'in_review': 'CV received' ,
  'accepted': 'Accepted',
  'rejected': 'Rejected'
};

const Candidates = ({onCVViewer}) => {
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
      console.log("data candidate: ", data);
      setCandidates(data);
      const exJobOptions = [];
      const jobIdSet = new Set();

      data.forEach(job => {
        const { jobId, jobTitle } = job.jobInfo;
        if (!jobIdSet.has(jobId)) {
          jobIdSet.add(jobId);
          exJobOptions.push({ jobId, jobTitle });
        }
      });
      console.log("exJobOptions: ", exJobOptions);
      setJobOptions(exJobOptions);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates(currentUser?.uid);
  }, []);

  useEffect(()=>{
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

  const removeVietnameseTones = (str) => {
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D');
    return str;
  };
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      console.log("searchQuery: ", searchQuery, "\n- selectedStatus: ", selectedStatus, "- selectedJob: ", selectedJob);
      const lowerCaseSearchQuery = removeVietnameseTones(searchQuery.toLowerCase());
  
      const filteredCandidates = candidates.filter(candidate => {
        const { applicationName, jobInfo , contactInfo, applicationStatus, jobSeekerId } = candidate;
  
        const normalizedApplicationName = removeVietnameseTones(applicationName.toLowerCase());
        const normalizedJobTitle = removeVietnameseTones(jobInfo.jobTitle.toLowerCase());
        const normalizedJobId = removeVietnameseTones(jobInfo.jobId.toLowerCase());
        const normalizedEmail = removeVietnameseTones(contactInfo.email.toLowerCase());
        const normalizedApplicationStatus = removeVietnameseTones(applicationStatus.toLowerCase());
        const normalizedJobSeekerId = removeVietnameseTones(jobSeekerId.toLowerCase());
  
        const matchesSearchQuery = lowerCaseSearchQuery === '' ? true :
          normalizedApplicationName.includes(lowerCaseSearchQuery) ||
          normalizedJobTitle.includes(lowerCaseSearchQuery) ||
          normalizedJobId.includes(lowerCaseSearchQuery) ||
          normalizedEmail.includes(lowerCaseSearchQuery) ||
          normalizedApplicationStatus.includes(lowerCaseSearchQuery) ||
          normalizedJobSeekerId.includes(lowerCaseSearchQuery);
  
        const matchesStatus = (selectedStatus === '' || applicationStatus === selectedStatus);
        const matchesJob = (selectedJob === '' || jobInfo.jobId === selectedJob);
  
        return matchesSearchQuery && matchesStatus && matchesJob;
      });
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
                <CandidateItem key={index} candidate={candidate} statusOptions={statusOptions} onCVViewer= {onCVViewer} />
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

Candidates.propTypes = {
  onCVViewer: PropTypes.func,
}

export default Candidates;
