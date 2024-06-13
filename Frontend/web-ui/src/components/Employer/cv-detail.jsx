import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from "../../contexts/authContext";
import PropTypes from "prop-types";
import { storage } from "../../firebase/firebase";
import { db } from "../../firebase/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader";
import { ChevronLeft } from 'lucide-react';

const exJobSeekerData = {
  jobSeekerId: "0963271f6612e330867f84eddab1542",
  applicationName: "Nguyễn Việt Anh",
  email: "nv.anh933@gmail.com",
  photoUrl: "", 
};


const exApplicationData = {
  applicationId: "applicationId",
  employerId: "employerId",
  jobId: "jobId",
  jobSeekerId: "jobSeekerId",
  applicationStatus: "in_review",
  applicationName: "applicationName",
  cvLink: "https://firebasestorage.googleapis.com/v0/b/fit-viec.appspot.com/o/cvs%2FDomain_Model.pdf_3e0e5065-d27e-4346-9d55-2bb1bb19b6ab?alt=media&token=c4b2dcda-ae11-407c-ae36-a3a3e58dde3e",
  coverLetter: "coverLetter",
  applyAt: "applyAt",
};

const CVViewer = () => {
  const {applicationId} = useParams();
  const [JobSeekerData, setJobSeekerData] = useState(exJobSeekerData);
  const [applicationData, setApplicationData] = useState(exApplicationData);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();

  console.log("applicationId: ", applicationId);
  console.log("currentUser: ", currentUser);
  //Dữ liệu liên quan đến việc ứng tuyển công việc
  const fetchApplicationData = async (applicationId) => { 
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5173/application/${applicationId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setApplicationData(data);
    } catch (error) {
      console.error('Error fetching Applicant data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  
  //Dữ liệu liên quan đến việc thông tin người ứng tuyển
  const fetchJobSeekerData = async (applicationId) => { 
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5173/application/job-seeker-info/${applicationId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setJobSeekerData(data);
    } catch (error) {
      console.error('Error fetching JobSeeker data:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(JobSeekerData.id);
    toast.success("Copy successfully!")
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

      toast.success(`CV status has been updated to "${newStatus}"`);
    } catch (error) {
      console.error('Error updating candidate status:', error);
      toast.error("Error! Can not update status.");
    }
  };
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">
      <ClipLoader
            color="rgba(239, 68, 68, 1)"
            size={40}
            speedMultiplier={1}
            className="mt-4 "
        />
    </div>;
  }

  if (!applicationData) {
    return <div className="flex justify-center items-center h-screen">No candidate data available.</div>;
  }
  
  return (
    <>
    <div className="h-[40px] ">
        <Link to="/employer" className="ml-8 mt-6 flex  "> 
        <button className="flex items-center rounded-lg bg-red-600 px-3 py-2 text-white disabled:opacity-50">
          <ChevronLeft className="h-5 w-5" />
          <span className="ml-2">Back</span>
        </button></Link>
    </div>
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
            <div className="bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center mr-4">
            <img src={JobSeekerData?.photoUrl} alt="avatar" className="w-10 h-10 mr-2" />
            </div>
            
            <div>
              <div className="font-bold">{JobSeekerData?.applicationName}</div>
              <div className="text-sm text-gray-600">{JobSeekerData.email} </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="font-semibold mb-2">Change CV status : </div>
            <div className="flex items-center justify-between">
              <button onClick={() => updateApplicationStatus('accepted')} className="bg-green-100 text-green-700 w-1/2 py-2 rounded mr-2">Interview</button>
              <button onClick={() => updateApplicationStatus('rejected')} className="bg-red-100 text-red-700 w-1/2 py-2 rounded">Reject</button>
            </div>
          </div>
          <div className="mb-4 flex">
            <div className="font-semibold mb-2">CV status:</div>
            <span className="text-gray-600 ml-4">{applicationData.applicationStatus}</span>
          </div>
          <div>
            
            <button onClick={downloadCV} className="bg-gray-200 text-gray-700 px-4 py-2 rounded w-full mb-2 hover:bg-blue-500 hover:text-white ">Download CV PDF</button>
            <div className="text-gray-600 my-2">Applicant ID</div>
            <div className="bg-gray-100 text-gray-800 px-4 py-2 mb-2 text-center border-gray-300 border-2 rounded overflow-hidden text-ellipsis whitespace-nowrap">{JobSeekerData?.jobSeekerId}</div>
            <button onClick={copyCodeToClipboard} className="bg-gray-200 text-gray-700 px-4 py-2 rounded w-full mb-2 hover:bg-blue-500 hover:text-white"> Copy code to clipboard </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}


export default CVViewer;
