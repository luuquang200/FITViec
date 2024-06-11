import React, { useState } from 'react';
import {
  Camera,
  Trash
} from "lucide-react";


const PersonalInfoPopUp = ({userInfo, onClose}) => {
  // const newEmployee = {Employee};
  const [formData, setFormData] = useState({
    name: userInfo.displayName,
    title: null,
    email: userInfo.email,
    phone: userInfo.phone,
    dob: userInfo.birthday,
    gender: 'male',
    provice: null,
    address: userInfo.address,
    personalLink: userInfo.pLink
  });

  // get data from form, save in formData object
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
      // Handle form submission logic (send data to server)
    onClose()
  };

  const defaultAvt =
    "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png";

    return(<>
 <div id="login-popup" className="bg-black/50 flex justify-center fixed top-0 right-0 left-0 z-[999] w-full h-full">
      <div className="bg-white p-8 rounded shadow-md w-3/5 overflow-scroll h-5/6 mt-20 ">
        <div className='flex justify-between'>
          <h2 className="text-xl font-semibold mb-6">Personal details</h2>
          <button onClick={onClose} className='flex self-start'>X</button>
        </div>

        <hr />
        <div className='flex justify-center'>
          <div className='mt-5'>
            <img className='rounded-full' width="96" height="96" src={userInfo.photoURL? userInfo?.photoURL: defaultAvt} alt="Avatar"/>
            <div className='mt-3 flex flex-row -translate-x-6'>
              <Camera className='mr-2 stroke-red-600'/>
              <p className='mr-3 text-red-600'>Edit</p>
              <Trash className='mr-2'/>
              <p>Delete</p>
            </div>
          </div>
        </div>
        <br></br>
        <form onSubmit={handleSubmit} className="">

          <div className="mb-4">
            <label className="block text-gray-700">Full name</label>
            <input 
              type="text" 
              name ="name"
              defaultValue={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border outline-none focus:border-green-500 peer-required:border-red-500  rounded" placeholder="Full name" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input type="text" className="w-full mt-1 p-2 border rounded" placeholder="Title" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700">Email address</label>
              <input 
              type="email" 
              name ="email"
              defaultValue={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded" placeholder="Email address" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border outline-none focus:border-green-500 peer-required:border-red-500 rounded"
                    placeholder="Phone"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Date of Birth</label>
                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border outline-none focus:border-green-500 peer-required:border-red-500 rounded"
                    placeholder="Date of Birth"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Gender</label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border outline-none focus:border-green-500 peer-required:border-red-500 rounded"
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Provice/city</label>
                <input
                    type="text"
                    name="address"
                    value={formData.provice}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border outline-none focus:border-green-500 peer-required:border-red-500 rounded"
                    placeholder="Current provice/city "
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border outline-none focus:border-green-500 peer-required:border-red-500 rounded"
                    placeholder="Address"
                />
            </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Personal Link</label>
                <input
                    type="text"
                    name="personalLink"
                    value={formData.personalLink}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border outline-none focus:border-green-500 peer-required:border-red-500 rounded"
                    placeholder="Personal Link"
                />
              </div>
            
          <div className="flex justify-end">
            <button onClick={onClose} className="bg-white text-black px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
</div>

      </>
      
    )
}

export default PersonalInfoPopUp