import React, { useState } from 'react';
// import { writeEmployee, readEmployee,Employee } from "../employee-transaction";


const AboutMePopup = ({userInfo, onClose}) => {
  const [formData, setFormData] = useState({
    content: ''
  });

  // get data from form, save in formData object
  const handleChange = (e) => {
    const { name, value, } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    // send or handle data in server
    onClose()
  };

  return (
    <div id="work-experience-popup" className="bg-black/50 flex justify-center fixed top-0 right-0 left-0 z-[999] w-full h-full">
      <div className="bg-white p-8 rounded shadow-md w-3/5 overflow-scroll h-1/2 mt-20 ">
        <div className='flex justify-between'>
        <h2 className="text-xl font-semibold mb-6">About me</h2>
          <button onClick={onClose} className='flex self-start'>X</button>
        </div>
        <hr />
        <br></br>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 ">Description</label>
            <textarea
              name="description"
              value={formData.content}
              onChange={handleChange}
              className={`w-full mt-1 p-2 border rounded `}
              placeholder="Description"
              rows="8"
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

export default AboutMePopup;
