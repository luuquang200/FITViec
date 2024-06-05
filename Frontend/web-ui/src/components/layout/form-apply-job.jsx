// Components
import { useState } from "react";
import {Link} from "react-router-dom"
import Logo from "../../assets/logo-itviec.webp";

import { ChevronLeft, Eye } from "lucide-react";

const FormApplyJob = () => {
    const [cvOption, setCvOption] = useState('current');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    

    return (
        <div className=" bg-gray-200 bg-opacity-50">
        {/* Background */}
        <div className="absolute inset-0 left-[-12%] right-[-12%] top-0 bg-linear-gradient rounded-br-[50%] rounded-bl-[50%] h-[400px] "></div>
        
        <div className=" max-w-[884px] ml-auto mr-auto relative">
            {/* Logo */}
            <div className="flex items-center justify-center relative h-[80px] ">
                <Link to="/" className="  flex text-white absolute left-0"> <ChevronLeft /> Back</Link>
                <div className=""><img src={Logo} alt="Logo" className="w-[81px]" /></div>
            </div>
            {/* Body */}
            <div className=" rounded-lg bg-white p-[32px] shadow-lg">
                <h2 className="text-[22px] font-bold ">Junior/Senior QC Engineer (Tester, English) at TPS Software</h2>
                
                <form className="bg-white  pt-6 pb-3 mb-4">
                    {/* Input với label */}
                    <div className="relative mb-6">
                        <input
                            type="text"
                            value={"Nguyễn Văn A"}
                            className="peer block w-full border border-gray-300 rounded-lg px-3 pt-6 pb-2 focus:outline-[4px]  focus:outline-green-200 focus:outline focus:outline-solid"
                            placeholder=" "
                        />
                        <label className="absolute top-0 left-3 px-1 my-2 text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-3  text-sm">
                            {"Your name"}
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                    </div>
                    

                    {/* Selection với radio và nút upload file */}
                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-2">
                            Your CV <span className="text-red-500">*</span>
                        </label>
                        <div className={`mb-4 p-4 border border-gray-300 rounded-lg ${cvOption === 'current' ? 'border-red-500 bg-red-100 bg-opacity-50' : 'border-gray-300'}`}>
                            <label className="inline-flex items-center">
                                <input
                                type="radio"
                                name="cvOption"
                                value="current"
                                checked={cvOption === 'current'}
                                onChange={() => setCvOption('current')}
                                className="form-radio text-red-500 w-6 h-6 cursor-pointer  "
                                />
                                <span className="ml-2 text-gray-700 cursor-pointer ">Use your current CV</span>
                            </label>
                            <div className="ml-4 p-2 text-blue-700 flex items-center">
                            <a href="#" className="">NguyenVanA_CV.pdf</a>
                                <Eye className="ml-2"/>
                            </div>
                        </div>
                        <div className={`mt-4 p-4 border border-gray-300 rounded-lg ${cvOption === 'new' ? 'border-red-500 bg-red-100 bg-opacity-50' : 'border-gray-300'}`}>
                            <label className="inline-flex items-center">
                                <input
                                type="radio"
                                name="cvOption"
                                value="new"
                                checked={cvOption === 'new'}
                                onChange={() => setCvOption('new')}
                                className="form-radio text-red-500 w-6 h-6 cursor-pointer"
                                />
                                <span className="ml-2 text-gray-700 cursor-pointer">Upload new CV</span>
                            </label>
                        
                            <div className="ml-6 mt-2">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="mt-2 block text-md text-gray-700  cursor-pointer focus:outline-none"
                            />
                            {file && <p className="mt-2 text-gray-600">{file.name}</p>}
                            <p className="mt-1 text-sm text-gray-500">We accept .doc, .docx, .pdf files, no password protected, up to 3MB</p>
                            </div>
                        
                        </div>
                    </div>

                    {/* Input với nội dung từ 500 từ */}
                    <div className="mb-4">
                        <label className="block mb-3 ">
                            <span className="text-lg font-bold  "> Cover Leter</span>
                            <span className="text-gray-400 "> (Optional)</span>
                        </label>
                        <div className="my-2">What skills, work projects or achievements make you a strong candidate?</div>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-[4px]  focus:outline-green-200 focus:outline focus:outline-solid"
                            rows="6"
                            maxLength={"500"}
                            placeholder="Details and specific examples will make your application stronger..."
                        ></textarea>
                        <div className=" text-gray-400">500 of 500 characters remaining</div>
                    </div>

                    {/* Button gửi form */}
                    <div className="flex items-center justify-center mt-6">
                        <button
                            className="bg-[#ED1B2F] hover:bg-red-600 text-white w-full font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Send my CV
                        </button>
                        
                    
                    </div>
                </form>
            </div>
        </div>

        </div>



        
    );
};



export default FormApplyJob;

