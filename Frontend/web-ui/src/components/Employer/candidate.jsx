import { useState, useEffect } from 'react';
import {  ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import CandidateItem from './candidate-item';

const exCandidates = [
  {
    initials: 'MA',
    id: '12345abc',
    name: 'Nguyễn Thu Huyền',
    jobName: 'Chiến dịch tuyển Nhà , Tuyển nhân viên kế toán Ngân hàng ABCD...',
    jobId: '#408580',
    email: 'banglangtim@gmail.com',
    appliedAt: '05/06/2023 14:38',
    status: 'CV tiếp nhận',
  },
  {
    initials: 'TK',
    id: '12345abc',
    name: 'Trần Hữu Khoa',
    jobName: 'Tuyển nhân viên kế toán Ngân hàng ABCD ...',
    jobId: '#408583',
    email: 'thuukhoa@gmail.com',
    appliedAt: '01/06/2023 15:59',
    status: 'CV tiếp nhận',
  },
  {
    initials: 'MA',
    id: '12345abc',
    name: 'Nguyễn Thanh Thúy',
    jobName: 'Chiến dịch tuyển Chọn ...',
    jobId: '#408580',
    email: 'banglthanhthuy@gmail.com',
    appliedAt: '05/06/2023 14:38',
    status: 'CV tiếp nhận',
  },
  {
    initials: 'VB',
    id: '12345abc',
    name: 'Trần Văn Bá',
    jobName: 'Tuyển nhân viên kinh, Tuyển nhân viên kế toán Ngân hàng ABCD Tuyển nhân viên kinh',
    jobId: '#408583',
    email: 'thanh.vb@gmail.com',
    appliedAt: '01/06/2023 15:59',
    status: 'CV tiếp nhận',
  },
  {
    initials: 'TT',
    id: '12345abc',
    name: 'Trần Thanh Tâm',
    jobName: 'Tuyển Tester',
    jobId: '#408580',
    email: 'thanh.td@gmail.com',
    appliedAt: '01/06/2023 15:59',
    status: 'CV tiếp nhận',
  },
  {
    initials: 'BT',
    id: '12345abc',
    name: 'Phạm Quang Bình',
    jobName: 'Tuyển C&B',
    jobId: '#408589',
    email: 'binhpham@gmail.net',
    appliedAt: '01/06/2023 15:59',
    status: 'CV tiếp nhận',
  },
  {
    initials: 'MA',
    id: '12345abc',
    name: 'Nguyễn Thu Huyền',
    jobName: 'Chiến dịch tuyển Nhà , Tuyển nhân viên kế toán Ngân hàng ABCD...',
    jobId: '#408580',
    email: 'banglangtim@gmail.com',
    appliedAt: '05/06/2023 14:38',
    status: 'CV tiếp nhận',
  },
  {
    initials: 'TK',
    id: '12345abc',
    name: 'Trần Hữu Khoa',
    jobName: 'Tuyển nhân viên kế toán Ngân hàng ABCD ...',
    jobId: '#408583',
    email: 'thuukhoa@gmail.com',
    appliedAt: '01/06/2023 15:59',
    status: 'CV tiếp nhận',
  },
  {
    initials: 'MA',
    id: '12345abc',
    name: 'Nguyễn Thanh Thúy',
    jobName: 'Chiến dịch tuyển Chọn ...',
    jobId: '#408580',
    email: 'banglthanhthuy@gmail.com',
    appliedAt: '05/06/2023 14:38',
    status: 'CV tiếp nhận',
  },
  {
    initials: 'VB',
    id: '12345abc',
    name: 'Trần Văn Bá',
    jobName: 'Tuyển nhân viên kinh, Tuyển nhân viên kế toán Ngân hàng ABCD Tuyển nhân viên kinh',
    jobId: '#408583',
    email: 'thanh.vb@gmail.com',
    appliedAt: '01/06/2023 15:59',
    status: 'CV tiếp nhận',
  },
  {
    initials: 'TT',
    id: '12345abc',
    name: 'Trần Thanh Tâm',
    jobName: 'Tuyển Tester',
    jobId: '#408580',
    email: 'thanh.td@gmail.com',
    appliedAt: '01/06/2023 15:59',
    status: 'CV tiếp nhận',
  },
  {
    initials: 'BT',
    id: '12345abc',
    name: 'Phạm Quang Bình',
    jobName: 'Tuyển C&B',
    jobId: '#408589',
    email: 'binhpham@gmail.net',
    appliedAt: '01/06/2023 15:59',
    status: 'CV tiếp nhận',
  },
  {
    initials: 'MA',
    id: '12345abc',
    name: 'Nguyễn Thu Huyền',
    jobName: 'Chiến dịch tuyển Nhà , Tuyển nhân viên kế toán Ngân hàng ABCD...',
    jobId: '#408580',
    email: 'banglangtim@gmail.com',
    appliedAt: '05/06/2023 14:38',
    status: 'CV tiếp nhận',
  },
  {
    initials: 'TK',
    id: '12345abc',
    name: 'Trần Hữu Khoa',
    jobName: 'Tuyển nhân viên kế toán Ngân hàng ABCD ...',
    jobId: '#408583',
    email: 'thuukhoa@gmail.com',
    appliedAt: '01/06/2023 15:59',
    status: 'CV tiếp nhận',
  },
  {
    initials: 'MA',
    id: '12345abc',
    name: 'Nguyễn Thanh Thúy',
    jobName: 'Chiến dịch tuyển Chọn ...',
    jobId: '#408580',
    email: 'banglthanhthuy@gmail.com',
    appliedAt: '05/06/2023 14:38',
    status: 'CV tiếp nhận',
  },
  {
    initials: 'VB',
    id: '12345abc',
    name: 'Trần Văn Bá',
    jobName: 'Tuyển nhân viên kinh, Tuyển nhân viên kế toán Ngân hàng ABCD Tuyển nhân viên kinh',
    jobId: '#408583',
    email: 'thanh.vb@gmail.com',
    appliedAt: '01/06/2023 15:59',
    status: 'CV tiếp nhận',
  },
  {
    initials: 'TT',
    id: '12345abc',
    name: 'Trần Thanh Tâm',
    jobName: 'Tuyển Tester',
    jobId: '#408580',
    email: 'thanh.td@gmail.com',
    appliedAt: '01/06/2023 15:59',
    status: 'CV tiếp nhận',
  },
  {
    initials: 'BT',
    id: '12345abc',
    name: 'Phạm Quang Bình',
    jobName: 'Tuyển C&B',
    jobId: '#408589',
    email: 'binhpham@gmail.net',
    appliedAt: '01/06/2023 15:59',
    status: 'CV tiếp nhận',
  },
];

const statusOptions = {
  'CV tiếp nhận': 'cv-received',
  'Hẹn phỏng vấn': 'interview',
  'Từ chối': 'rejected'
};

const jobOptions = [
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const candidatesPerPage = 5;

  useEffect(() => {
    // const fetchCandidates = async () => {
    //   setLoading(true);
    //   try {
    //     const response = await fetch(`your-api-endpoint?page=${currentPage}&perPage=${candidatesPerPage}`);
    //     const data = await response.json();
    //     setCandidates(data.candidates);
    //     setTotalPages(data.totalPages);
    //   } catch (error) {
    //     console.error('Error fetching candidates:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // Fake API call for pagination
    console.log('currentPage useEffect: ', currentPage);
    const startIdx = (currentPage - 1) * candidatesPerPage;
    const endIdx = startIdx + candidatesPerPage;
    setCandidates(exCandidates.slice(startIdx, endIdx));
    setTotalPages(Math.ceil(exCandidates.length / candidatesPerPage));
    
  }, [currentPage]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      console.log("searchQuery: ", searchQuery, "- selctedStatus: ", selectedStatus);
      const filteredCandidates = exCandidates.filter(candidate =>
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedStatus === '' || candidate.status === selectedStatus)
      );
      setResults(filteredCandidates);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
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
    console.log("currentPage after change: ", newPage);
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      
    }
  };
  console.log("currentPage render: ", currentPage);
  console.log("totalPage render: ", totalPages);
  return (
    <div className="p-4 bg-white mb-[60px]">
      <h2 className="text-lg font-bold">Quản lý CV ứng viên</h2>
      <br/>
      <div className="flex justify-between items-center mb-4">
        <div className="w-1/2">
          <p>Tìm kiếm: </p>
          <div className="flex space-x-2 items-center my-2">
            <input
              type="text"
              placeholder="Tìm kiếm tên, email, số điện thoại"
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
            <p>Trạng thái: </p>
            <select 
              value={selectedStatus} 
              onChange={handleStatusChange} 
              className="border rounded px-2 py-1 my-2 text-sm w-full"
            >
              <option value="">Tất cả</option>
              {Object.keys(statusOptions).map((status) => (
                <option key={status} value={statusOptions[status]}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <p>Bài đăng: </p>
            <select 
              value={selectedJob} 
              onChange={handleJobChange} 
              className="border rounded px-2 py-1 my-2 text-sm w-full"
            >
              <option value="">Tất cả</option>
              {jobOptions.map((job) => (
                <option key={job.jobId} value={job.jobId} title={job.jobName}>
                  {truncateText(job.jobName, 50)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full border rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Ứng viên</th>
                <th className="p-2 text-left">Bài đăng</th>
                <th className="p-2 text-left">Thông tin liên hệ</th>
                <th className="p-2 text-left">Ngày tiếp nhận</th>
                <th className="p-2 text-left">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {(results.length > 0 ? results : candidates).map((candidate, index) => (
                <CandidateItem key={index} candidate={candidate} />
              ))}
              {results.length === 0 && candidates.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-2 text-center">Không có kết quả tìm kiếm.</td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex justify-center mt-4 space-x-2 sticky bottom-0">
            <button
              onClick={() => handlePageChange(1)}
              className={`px-2 py-2 ${currentPage === 1 ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
            >
              <ChevronFirst />
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`px-2 py-2 ${currentPage === 1 ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
              disabled={currentPage === 1}
            >
              <ChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => {
              if (i + 1 === currentPage || i + 1 === 1 || i + 1 === totalPages) {
                return (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-4 py-2 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  >
                    {i + 1}
                  </button>
                );
              } else if (i + 1 === currentPage - 2 || i + 1 === currentPage + 2) {
                return <span key={i} className="px-4 py-2">...</span>;
              }
              return null;
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`px-2 py-2 ${currentPage === totalPages ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
              disabled={currentPage === totalPages}
            >
              <ChevronRight />
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              className={`px-2 py-2 ${currentPage === totalPages ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
            >
             <ChevronLast />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;
