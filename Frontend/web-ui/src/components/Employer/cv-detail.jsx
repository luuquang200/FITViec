import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from "../../contexts/authContext";
import PropTypes from "prop-types";
const exCandidateData = {
  name: "Nguyễn Việt Anh",
  email: "nv.anh933@gmail.com",
  phone: "0989311857",
  status: "CV tiếp nhận",
  code: "0963271f6612e330867f84eddab1542",
  cvUrl: "Domain_Model.pdf"
};

const CVViewer = ({ jobId}) => {
  const { candidateId } = useParams(); 
  console.log("candidateId: ", candidateId);
  const [candidateData, setCandidateData] = useState(exCandidateData);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  console.log(candidateData);
  const fetchCandidateData = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5173/job-seeker/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCandidateData(data);
    } catch (error) {
      console.error('Error fetching candidate data:', error);
      toast.error("Có lỗi xảy ra khi lấy dữ liệu ứng viên.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log("candidateId: ", candidateId);
  //   setLoading(true);
  //   //if (candidateId) {
  //     //fetchCandidateData(candidateId);
  //     setTimeout(()=>{
  //       setCandidateData(exCandidateData);
  //       setLoading(false);
  //       console.log("candidateId 2: ", candidateId);
  //     }, 3000);

  //   //}
  // }, []);


  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(candidateData.code);
    toast.success("Mã đã được sao chép thành công!")
  };
  
  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = candidateData.cvUrl;
    link.download = candidateData.cvUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const updateCandidateStatus = async (newStatus) => {
    if (!candidateData) return;
    //update candidate status (verify employerId <-> currentUser.uid)
    try {
      const response = await fetch(`http://localhost:5173/api/candidates/${candidateId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus , employerId: currentUser.uid, jobId: jobId }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setCandidateData((prevData) => ({
        ...prevData,
        status: newStatus,
      }));

      toast.success(`Trạng thái CV đã được cập nhật thành ${newStatus}`);
    } catch (error) {
      console.error('Error updating candidate status:', error);
      toast.error("Có lỗi xảy ra khi cập nhật trạng thái CV.");
    }
  };
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!candidateData) {
    return <div className="flex justify-center items-center h-screen">Không có dữ liệu ứng viên.</div>;
  }
  console.log("candidateData.cvUrl: ", candidateData.cvUrl );
  return (
    <div className="flex p-4 h-screen">
      {/* Left Section for PDF Content */}
      <div className="w-2/3 bg-gray-100 p-4 border-r">
        <iframe 
          src={candidateData.cvUrl}
          title="CV PDF Viewer"
          className="w-full h-full"
        />
      </div>

      {/* Right Section for CV Details and Actions */}
      <div className="w-1/3 p-4">
        <div className="bg-white shadow-lg p-4">
          <div className="flex items-center mb-4">
            <div className="bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center mr-4">PB</div>
            <div>
              <div className="font-bold">{candidateData.name}</div>
              <div className="text-sm text-gray-600">{candidateData.email} | {candidateData.phone}</div>
            </div>
          </div>
          <div className="mb-4">
            <div className="font-semibold mb-2">Đổi trạng thái CV : </div>
            <div className="flex items-center justify-between">
              <button onClick={() => updateCandidateStatus('interview')} className="bg-green-100 text-green-700 w-1/2 py-2 rounded mr-2">Hẹn phỏng vấn</button>
              <button onClick={() => updateCandidateStatus('rejected')} className="bg-red-100 text-red-700 w-1/2 py-2 rounded">Từ chối</button>
            </div>
          </div>
          <div className="mb-4 flex">
            <div className="font-semibold mb-2">Trạng thái CV:</div>
            <span className="text-gray-600 ml-4">{candidateData.status}</span>
          </div>
          <div>
            
            <button onClick={downloadCV} className="bg-gray-200 text-gray-700 px-4 py-2 rounded w-full mb-2">Tải CV PDF</button>
            <div className="text-gray-600">Mã ứng viên</div>
            <div className="bg-gray-100 text-gray-800 px-4 py-2 mb-2 text-center border-gray-300 border-2 rounded overflow-hidden text-ellipsis whitespace-nowrap">{candidateData.code}</div>
            <button onClick={copyCodeToClipboard} className="bg-gray-300 text-gray-700 px-4 py-2 rounded w-full mb-2">Sao chép mã</button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default CVViewer;
