// Components
import { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom"
import Logo from "../../assets/logo-fitviec.webp";
import { ChevronLeft, Eye } from "lucide-react";
import { useAuth } from "@/contexts/authContext";
import { toast } from "react-toastify";

const job_detail = {
    "employerId": "hansentechnologies",
    "jobStatus": "enanble",
    "jobId": "en232k4n234i2",
    "jobSalary": "You'll love it",
    "jobTitle": "Software Developer (Java)",
    "jobLocation":  "100 Xuan Thuy Street, Thao Dien Ward, Thu Duc City, Ho Chi Minh",
    "jobType": "Hybrid",
    "jobSkills": "Java,SQL",
    "jobTopReasons": "Global Company- Develop Your Career & English\nCompetitive Salary, and company profit share\nOnsite opportunities",
    "jobDescription": "About The Role\nExciting opportunity for an enthusiastic Java Software Developer with at least 4 years of experience to join our CIS-P Team in Ho Chi Minh City. Take a key role in driving success as you collaborate with our team to provide enterprise CRM solutions to the utilities sector with key customers in Australia, Ireland, the USA and Japan.\nAbout You\nYou are an enthusiastic individual with proven experience and strong Java knowledge of J2EE, design patterns, core libraries and frameworks such as Spring, Hibernate and Java messaging frameworks. \nYou possess a curious nature and thrive in diverse technical environments, where your skills in SQL, exposure to DevOps, and experience working in Linux environments are highly valued.\nYou have good command of English and Vietnamese communication with eagerness to work with complicated business requirements, and implementation to technical specifications.",
    "jobResponsibility": "Design, code, and test software as part of the Agile team\nUpdate status and technical documents in Jira\nTroubleshoot and escalate issues\nParticipate in R&D program where we are using Docker, Kafka, Kubernetes",
    "jobRequirement": "Have strong Java knowledge: Java or Java EE (certified).\nGood English and Vietnamese communication.\nKnowledge of typical patterns, core libraries and frameworks.\nObject-Oriented Analysis, Design, and Implementation skills.\nHave solid SQL Knowledge.\nHave exposure to DevOps aspects including Bash Script and Perl on Linux.\nHave good skills in Enterprise Java, including:\nSpring and Hibernate.\nJava messaging (e.g., ActiveMQ).\nAre experienced and comfortable with:\nEclipse as the main IDE.\nWorking in an Agile environment (we use JIRA).\nHas actual experience working with Linux (e.g., Working daily on Linux as the main development environment).",
    "jobBenefit": "Competitive Market Rate Salary - full salary (including SI contribution) during the probation period and 13th-month salary\nTwice yearly salary review\nFull participation in the annual Hansen Profit Share Program\nGreat Leave Options – including 12 days annual leave during Year 1, increasing to 15 days annual leave and 12 days paid sick leave per year).\nPremium healthcare for employee and dependents (spouse and {all} children and support for parents). Also, free comprehensive annual check-up for employees.\nHigh-speed Internet credit: VND 5,5million/year\nWellness benefit: VND 2million annually for fitness package/devices\nFree lunch, snacks, and drink in our new modern offices, which have a cool open atmosphere with an outdoor cafe, bar, and recreation area in District 2 – including free scooter parking\nContinuous Learning and Development, including personalised LinkedIn Learning – online content platform.\nWork from Home opportunities supported.\nReward and Recognition - Company sponsored trips and events, tenure milestones and global recognition program.\nNew, modern developer laptop, 2 large monitors, and headset.\nAn international work environment, highly skilled colleagues to learn from both locally and globally where you can develop your IT career and English skills.",
    "employerInfo": {
        "companyName": "Hansen Technologies",
        "companyType": "IT Product",
        "companySize": "100 - 150",
        "country": "Australia",
        "workingDays": "Monday - Friday",
        "overtimePolicy": "No OT",
        "companyOverview": "Closing the Distance",
        "keySkills": ".......",
        "whyLoveWorkingHere": ".......",
        "logoUrl": "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBKzU2TWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--8e742bd0e69c208965fc50909defe9ab3c64c42b/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmtCcWpBPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--79eee5883893a012786006950460867831e6f661/image_2023_02_16T04_32_21_317Z.png",
        "location": "...........",
        "workType": "hardcode",
        "image": "https://cdn.builder.io/api/v1/image/assets/TEMP/d5daf5335140db7fa166023188d3eb55c01cfa497937c6436722a294b7d9b22d?apiKey=1293b2add2d347908b4e11760098fdbe&"
    }
  }
const FormApplyJob = () => {
    const {jobId} = useParams();
    const { currentUser} = useAuth();
    console.log("currentUser form apply: ", currentUser);
    const [cvOption, setCvOption] = useState('current');
    const [file, setFile] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');
    const [jobDetail, setJobDetail] = useState(job_detail);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        toast.success("upload ok");
    };
    const handleCoverLetterChange = (e) => {
        const inputValue = e.target.value;
        // Giới hạn độ dài của cover letter không quá 500 ký tự
        if (inputValue.length <= 500) {
            setCoverLetter(inputValue);
        }
    };
    //Call API get job infor
    // useEffect(() => {
    //     const fetchJobDetail = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:5173/api/jobDetail/${jobId}`);
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         const data = await response.json();
    //         setJobDetail(data.jobDetail);
    //     } catch (error) {
    //         console.error('Error fetching jobDetail:', error);
    //     }
    //     };

    //     fetchJobDetail();
    // }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //Gửi CV mới
        if (cvOption === "new" && !file) {
            toast.error('Please select a file before submitting');
            console.error('Please select a file before submitting');
            return;
        }
    
        try {
            //  Gửi file CV và nhận CV_url
            let cvUrl = cvOption === "new" ? await uploadCV(file) : currentUser.cvUrl;
            const formData = new FormData();
            formData.append('userId', currentUser?.id); 
            formData.append('jobId', jobId); // jobId đã được nhận từ useParams
            formData.append('coverletter', coverLetter); 
            formData.append('CV_url', cvUrl); // cvUrl đã nhận được từ uploadCV
            // Duyệt qua các cặp khóa / giá trị trong FormData và tạo một đối tượng có thể log được
            const formDataObject = {};
            for (let pair of formData.entries()) {
                formDataObject[pair[0]] = pair[1];
            }

            // Log đối tượng có thể log được
            console.log("formData: ", formDataObject);

            const response = await fetch('http://localhost:4999/application/create', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                toast.error("Failed to submit application!")
                throw new Error('Failed to submit application');
            }
            toast.success("Application submitted successfully!")
            console.log('Application submitted successfully');
        } catch (error) {
            toast.error("Error submitting application!")
            console.error('Error submitting application:', error);
        }
    };

    const uploadCV = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file, file.name); 
    
            const response = await fetch('https://employer-service-otwul2bnna-uc.a.run.app/images/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (!response.ok) {
                toast.error("Failed to upload CV!")
                throw new Error('Failed to upload CV');
            }
            const data = await response.json();
            const cvUrl = data.url;
            toast.success("CV uploaded successfully!")
            console.log('CV uploaded successfully:', cvUrl);
            return cvUrl;
        } catch (error) {
            toast.error("Error uploading CV!")
            console.error('Error uploading CV:', error);
            throw error;
        }
    };
    
    return (
        <div className=" p-[30px] pb-[150px] bg-gray-200 bg-opacity-50">
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
                <h2 className="text-[22px] font-bold ">{jobDetail.jobTitle}</h2>
                
                <form className="bg-white  pt-6 pb-3 mb-4" onSubmit={handleSubmit}> 
                    {/* Input với label */}
                    <div className="relative mb-6">
                        <input
                            type="text"
                            value={currentUser.displayName}
                            className="peer block w-full border border-gray-300 rounded-lg px-3 pt-6 pb-2 focus:outline-[4px]  focus:outline-green-200 focus:outline focus:outline-solid"
                            placeholder=" "
                        />
                        <label className="absolute top-0 left-3 px-1 my-2 text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-3  text-sm">
                            {"Your name"}
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                    </div>
                    

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
                            value={coverLetter}
                            onChange={handleCoverLetterChange}
                        ></textarea>
                        <div className=" text-gray-400">{500 - coverLetter.length} of 500 characters remaining</div>
                    </div>

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
