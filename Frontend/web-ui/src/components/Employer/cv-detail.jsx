import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from "../../contexts/authContext";
import PropTypes from "prop-types";
const exCandidateData = {
  id: "0963271f6612e330867f84eddab1542",
  name: "Nguyễn Việt Anh",
  email: "nv.anh933@gmail.com",
};
const exJobData = {
  jobId: "abca45673",
  jobStatus: "enable",
  jobTitle: "Công việc nặng nhọc",
};

const exApplicationData = {
  applicationId: "applicationId",
  employerId: "employerId",
  jobId: "jobId",
  jobSeekerId: "jobSeekerId",
  applicationStatus: "null",
  applicationName: "applicationName",
  cvLink: "http://employer-service-otwul2bnna-uc.a.run.app/uploads/1cf32878-8912-467f-be46-538c5d32370d.pdf",
  coverLetter: "coverLetter",
  applyAt: "applyAt",
};

const CVViewer = () => {
  const {applicationId} = useParams();
  const [JobSeekerData, setJobSeekerData] = useState(exCandidateData);
  const [applicationData, setApplicationData] = useState(exApplicationData);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  console.log(currentUser);
  //Dữ liệu liên quan đến việc ứng tuyển công việc
  const fetchApplicationData = async (applicationId) => { 
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5173/application/${applicationId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setApplicationData(data);
    } catch (error) {
      console.error('Error fetching Applicant data:', error);
      toast.error("Có lỗi xảy ra khi lấy dữ liệu thông tin ứng tuyển.");
    } finally {
      setLoading(false);
    }
  };
  //Dữ liệu liên quan đến việc thông tin người ứng tuyển
  const fetchJobSeekerData = async (JobSeekerId) => { 
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5173/job-seeker/${JobSeekerId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setJobSeekerData(data);
    } catch (error) {
      console.error('Error fetching JobSeeker data:', error);
      toast.error("Có lỗi xảy ra khi lấy dữ liệu ứng viên.");
    } finally {
      setLoading(false);
    }
  };


  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(JobSeekerData.id);
    toast.success("Mã đã được sao chép thành công!")
  };
  
  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = applicationData.cvLink;
    link.target = "_blank";
    link.download = applicationData.cvLink.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const updateApplicationStatus = async (newStatus) => {
    if (!applicationData) return;
    //update applicant status (need verify employerId <-> currentUser.uid)
    try {
      const response = await fetch(`http://localhost:1200/application/${newStatus}/${applicationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setApplicationData((prevData) => ({
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

  if (!applicationData) {
    return <div className="flex justify-center items-center h-screen">Không có dữ liệu ứng viên.</div>;
  }
  console.log("applicationData.cvUrl: ", applicationData.cvLink );
  return (
    <div className="flex p-4 h-screen">
      {/* Left Section for PDF Content */}
      <div className="w-2/3 bg-gray-100 p-4 border-r">
        <iframe 
          src={applicationData.cvLink}
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
              <div className="font-bold">{JobSeekerData.name}</div>
              <div className="text-sm text-gray-600">{JobSeekerData.email} </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="font-semibold mb-2">Đổi trạng thái CV : </div>
            <div className="flex items-center justify-between">
              <button onClick={() => updateApplicationStatus('interview')} className="bg-green-100 text-green-700 w-1/2 py-2 rounded mr-2">Hẹn phỏng vấn</button>
              <button onClick={() => updateApplicationStatus('rejected')} className="bg-red-100 text-red-700 w-1/2 py-2 rounded">Từ chối</button>
            </div>
          </div>
          <div className="mb-4 flex">
            <div className="font-semibold mb-2">Trạng thái CV:</div>
            <span className="text-gray-600 ml-4">{applicationData.status}</span>
          </div>
          <div>
            
            <button onClick={downloadCV} className="bg-gray-200 text-gray-700 px-4 py-2 rounded w-full mb-2">Tải CV PDF</button>
            <div className="text-gray-600">Mã ứng viên</div>
            <div className="bg-gray-100 text-gray-800 px-4 py-2 mb-2 text-center border-gray-300 border-2 rounded overflow-hidden text-ellipsis whitespace-nowrap">{JobSeekerData.id}</div>
            <button onClick={copyCodeToClipboard} className="bg-gray-300 text-gray-700 px-4 py-2 rounded w-full mb-2">Sao chép mã</button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default CVViewer;
