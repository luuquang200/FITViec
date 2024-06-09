import { useState } from 'react';
import ReviewModal from './popup-review-cv';
import { toast } from 'react-toastify';

const candidateData = {
  name: "Nguyễn Việt Anh",
  email: "nv.anh933@gmail.com",
  phone: "0989311857",
  status: "CV tiếp nhận",
  code: "0963271f6612e330867f84eddab1542",
  cvUrl: 'Domain_Model.pdf'
};

const CVViewer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
  return (
    <div className="flex p-4 h-screen">
      <ReviewModal isOpen={isModalOpen} onClose={closeModal} />
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
              <button className="bg-green-100 text-green-700 w-1/2 py-2 rounded mr-2">Hẹn phỏng vấn</button>
              <button className="bg-red-100 text-red-700 w-1/2 py-2 rounded">Từ chối</button>
            </div>
          </div>
          <div className="mb-4 flex">
            <div className="font-semibold mb-2">Trạng thái CV:</div>
            <span className="text-gray-600 ml-4">{candidateData.status}</span>
          </div>
          <div>
            <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-4">Đổi trạng thái</button>
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
