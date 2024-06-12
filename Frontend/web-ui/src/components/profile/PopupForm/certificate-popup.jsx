import React, { useState } from 'react';
// import { writeEmployee, readEmployee,Employee } from "../employee-transaction";


const CertificatePopup = ({userInfo, onClose}) => {
  const [formData, setFormData] = useState({
    certificateName: '',
    organization: '',
    fromMonth: '',
    fromYear: '',
    certificateURL:'',
    description: ''
  });
  const [errors, setErrors] = useState({});


  // get data from form, save in formData object
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // send or handle data in server
    onClose()
  };

  return (
    <div id="work-experience-popup" className="bg-black/50 flex justify-center fixed top-0 right-0 left-0 z-[999] w-full h-full">
      <div className="bg-white p-8 rounded shadow-md w-3/5 overflow-scroll h-4/6 mt-20 ">
        <div className='flex justify-between'>
        <h2 className="text-xl font-semibold mb-6">Certificates</h2>
          <button onClick={onClose} className='flex self-start'>X</button>
        </div>
        <hr />
        <br></br>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Certificate Name</label>
            <input
              type="text"
              name="certificateName"
              value={formData.certificateName}
              onChange={handleChange}
              className={`w-full mt-1 p-2 border rounded `}
              placeholder="certificate Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Organization</label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className={`w-full mt-1 p-2 border rounded `}
              placeholder="organization"
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700">
              <input
                type="checkbox"
                name="currentlyWorking"
                checked={formData.currentlyWorking}
                onChange={handleChange}
                className="mr-2"
              />
              I am currently Working here
            </label>
          </div> */}
          <div className="flex mb-4">
            <div className="mr-4">
              <label className="block text-gray-700">From</label>
              <select
                name="fromMonth"
                value={formData.fromMonth}
                onChange={handleChange}
                className={`w-full mt-1 p-2 border rounded ${errors.fromMonth ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Month</option>
                {/* Add month options */}
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            <div className="mr-4">
              <label className="block text-gray-700">Year</label>
              <select
                name="fromYear"
                value={formData.fromYear}
                onChange={handleChange}
                className={`w-full mt-1 p-2 border rounded ${errors.fromYear ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Year</option>
                {/* Add year options */}
                {Array.from({ length: 50 }, (_, i) => (
                  <option key={2024 - i} value={2024 - i}>{2024 - i}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-base font-semibold text-slate-700">
              Certificate URL
            </label>
            <input
                type="text"
                name="certificateURL"
                value={formData.certificateURL}
                onChange={handleChange}
                className="mt-1 w-full rounded border-2 p-2 outline-none focus:border-green-500 peer-required:border-red-500"
                placeholder="certificate URL"
                maxLength="200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full mt-1 p-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="description"
              rows="5"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button onClick={onClose} className="bg-white text-black px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
    </div>
    </div>
  );
}

export default CertificatePopup;
