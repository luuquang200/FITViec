// Components
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo-fitviec.webp";

import { ChevronLeft, Eye } from "lucide-react";

const FormApplyJob = () => {
    const [cvOption, setCvOption] = useState("current");
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className=" bg-gray-200 bg-opacity-50">
            {/* Background */}
            <div className="absolute inset-0 left-[-12%] right-[-12%] top-0 h-[400px] rounded-bl-[50%] rounded-br-[50%] bg-linear-gradient "></div>

            <div className=" relative ml-auto mr-auto max-w-[884px]">
                {/* Logo */}
                <div className="relative flex h-[80px] items-center justify-center ">
                    <Link to="/" className="absolute left-0 flex text-white">
                        {" "}
                        <ChevronLeft /> Back
                    </Link>
                    <div className="">
                        <img src={Logo} alt="Logo" className="w-[81px]" />
                    </div>
                </div>
                {/* Body */}
                <div className=" rounded-lg bg-white p-[32px] shadow-lg">
                    <h2 className="text-[22px] font-bold ">
                        Junior/Senior QC Engineer (Tester, English) at TPS
                        Software
                    </h2>

                    <form className="mb-4  bg-white pb-3 pt-6">
                        {/* Input với label */}
                        <div className="relative mb-6">
                            <input
                                type="text"
                                value={"Nguyễn Văn A"}
                                className="focus:outline-solid peer block w-full rounded-lg border border-gray-300 px-3 pb-2 pt-6  focus:outline focus:outline-[4px] focus:outline-green-200"
                                placeholder=" "
                            />
                            <label className="absolute left-3 top-0 my-2 px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2.5 peer-focus:left-3  peer-focus:top-0">
                                {"Your name"}
                                <span className="ml-1 text-red-500">*</span>
                            </label>
                        </div>

                        {/* Selection với radio và nút upload file */}
                        <div className="mb-4">
                            <label className="mb-2 block text-lg font-bold">
                                Your CV <span className="text-red-500">*</span>
                            </label>
                            <div
                                className={`mb-4 rounded-lg border border-gray-300 p-4 ${cvOption === "current" ? "border-red-500 bg-red-100 bg-opacity-50" : "border-gray-300"}`}
                            >
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="cvOption"
                                        value="current"
                                        checked={cvOption === "current"}
                                        onChange={() => setCvOption("current")}
                                        className="form-radio h-6 w-6 cursor-pointer text-red-500  "
                                    />
                                    <span className="ml-2 cursor-pointer text-gray-700 ">
                                        Use your current CV
                                    </span>
                                </label>
                                <div className="ml-4 flex items-center p-2 text-blue-700">
                                    <a href="#" className="">
                                        NguyenVanA_CV.pdf
                                    </a>
                                    <Eye className="ml-2" />
                                </div>
                            </div>
                            <div
                                className={`mt-4 rounded-lg border border-gray-300 p-4 ${cvOption === "new" ? "border-red-500 bg-red-100 bg-opacity-50" : "border-gray-300"}`}
                            >
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="cvOption"
                                        value="new"
                                        checked={cvOption === "new"}
                                        onChange={() => setCvOption("new")}
                                        className="form-radio h-6 w-6 cursor-pointer text-red-500"
                                    />
                                    <span className="ml-2 cursor-pointer text-gray-700">
                                        Upload new CV
                                    </span>
                                </label>

                                <div className="ml-6 mt-2">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="text-md mt-2 block cursor-pointer  text-gray-700 focus:outline-none"
                                    />
                                    {file && (
                                        <p className="mt-2 text-gray-600">
                                            {file.name}
                                        </p>
                                    )}
                                    <p className="mt-1 text-sm text-gray-500">
                                        We accept .doc, .docx, .pdf files, no
                                        password protected, up to 3MB
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Input với nội dung từ 500 từ */}
                        <div className="mb-4">
                            <label className="mb-3 block ">
                                <span className="text-lg font-bold  ">
                                    {" "}
                                    Cover Leter
                                </span>
                                <span className="text-gray-400 ">
                                    {" "}
                                    (Optional)
                                </span>
                            </label>
                            <div className="my-2">
                                What skills, work projects or achievements make
                                you a strong candidate?
                            </div>
                            <textarea
                                className="focus:outline-solid w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow  focus:outline focus:outline-[4px] focus:outline-green-200"
                                rows="6"
                                maxLength={"500"}
                                placeholder="Details and specific examples will make your application stronger..."
                            ></textarea>
                            <div className=" text-gray-400">
                                500 of 500 characters remaining
                            </div>
                        </div>

                        {/* Button gửi form */}
                        <div className="mt-6 flex items-center justify-center">
                            <button
                                className="focus:shadow-outline w-full rounded bg-[#ED1B2F] px-4 py-3 font-bold text-white hover:bg-red-600 focus:outline-none"
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
