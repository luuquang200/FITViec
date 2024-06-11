// Components
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { Button } from "@/components/ui/button";
import JobCard from "@/components/ui/job-card";
import Gallery from "@/components/ui/gallery";

import { Heart, CircleDollarSign, ExternalLink, Bell} from "lucide-react";

const job_detail = {
    "employerId": "hansentechnologies",
    "jobId": "as8sa7sa8as7",
    "jobStatus": "enanble",
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
        "companyOverview": "..........",
        "keySkills": ".......",
        "whyLoveWorkingHere": ".......",
        "logoUrl": "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBKzU2TWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--8e742bd0e69c208965fc50909defe9ab3c64c42b/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmtCcWpBPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--79eee5883893a012786006950460867831e6f661/image_2023_02_16T04_32_21_317Z.png",
        "location": "...........",
        "workType": ".........",
        "image": "https://cdn.builder.io/api/v1/image/assets/TEMP/d5daf5335140db7fa166023188d3eb55c01cfa497937c6436722a294b7d9b22d?apiKey=1293b2add2d347908b4e11760098fdbe&"
    }
}
const image  = 'https://admin.netlawman.com/uploads/article/original/types-uk-company.jpg';
const LOGO_COMPANY_IMG = "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMS9LSnc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--f77c1653cf49260705bf77be3846954d9b817b70/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oSnlaWE5wZW1WZmRHOWZabWwwV3dkcEFhb3ciLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--bb0ebae071595ab1791dc0ad640ef70a76504047/logo.jpg"
const MainTablet = () => {
    const [isSticky, setIsSticky] = useState(true);
    const [isClickedHeart, setIsClickedHeart] = useState(false);

    const [description, setDescription] = useState('');
    //Call API get job infor
    useEffect(() => {
        const fetchDescription = async () => {
        try {
            const response = await fetch('http://localhost:5173/api/description');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDescription(data.description);
        } catch (error) {
            console.error('Error fetching description:', error);
        }
        };

        fetchDescription();
    }, []);

    //Format sticky company infor
    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 800){
                setIsSticky(false);
            }else {
                setIsSticky(true);
            }

        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    

    return (
        <div className=" p-[30px]  bg-gray-200 bg-opacity-50">
        {/* Background */}
        <div className="absolute inset-0 left-[-12%] top-0 bg-linear-gradient rounded-br-[50%] rounded-bl-[70%] h-[400px] "></div>

        {/* Content Body */}
        <div className="grid grid-cols-3 gap-4 relative">
            {/* Information about the job */}
            <div className="col-span-2 pb-8">
                {/* Job title */}
                <div className={` top-[60px] bg-white p-6 rounded-t-md  ${isSticky ? "sticky" : ""}`}>
                    <h1 className=" text-[28px] font-bold   "> {job_detail?.jobTitle} </h1>
                    <div className="my-4"> {job_detail?.employerInfo?.companyName} </div>
                    <div className="flex space-x-2 text-green-500 font-bold" > <CircleDollarSign /> <span> {job_detail?.jobSalary} </span></div>
                    <div className="flex justify-between mt-[24px]">
                        <Link className="w-11/12 h-[48px]" to={"/form-apply-job"}><Button className="w-full h-[48px] bg-[#ED1B2F] hover:bg-[#C82222]" > Apply Now </Button></Link>
                        <Heart onClick={() => setIsClickedHeart(!isClickedHeart)} className={`w-1/12 m-auto h-[32px] text-[#ED1B2F] cursor-pointer ${isClickedHeart ? ' fill-[#ED1B2F]' : '' }`}/>
                    </div>
                </div>
                

                {/* Slide Image */}
                <Gallery image={image}></Gallery>
                {/* Job description */}
                <div className="bg-white rounded-md p-6 mt-8 shadow-md ">
                <div className=" border-dotted border-gray-400 border-b-2 mt-6 pb-6 ">
                    <h2 className="text-2xl font-bold my-4">Top 3 reasons to join us</h2>
                    <ul className="list-disc list-inside ">
                        <div dangerouslySetInnerHTML={{ __html: job_detail.jobTopReasons }} />
                    </ul>
                </div>
                <div className=" border-dotted border-gray-400 border-b-2 mt-6  pb-6">
                    <h2 className="text-2xl font-bold my-4">Job description</h2>
                    <div className="text-md font-bold italic "> 
                        <div dangerouslySetInnerHTML={{ __html: job_detail.jobDescription }} />
                    </div>
                    <div className="">
                        <h2 className="text-md font-bold mt-6 ">Your responsibility </h2>
                        
                            <div dangerouslySetInnerHTML={{ __html: job_detail.jobResponsibility }} />
                        
                    </div>
                </div>
                <div className=" border-dotted border-gray-400 border-b-2 mt-6  pb-6">
                    <h2 className="text-2xl font-bold my-4">Your skills and experience</h2>
                    <ul className=" leading-8">
                        <li>
                            <div dangerouslySetInnerHTML={{ __html: job_detail?.jobRequirement }} />
                        </li>

                    </ul>
                </div>
                
                <div className=" mt-4">
                    <h2 className="text-xl font-bold my-4">Why you will love working here</h2>
                    <div dangerouslySetInnerHTML={{ __html: job_detail.jobBenefit }} />
                    
                </div>
                </div>
                    
                {/* More jobs for you */}
                <div className="font-bold text-2xl mt-8">
                    More jobs for you
                </div>

                <div className=" flex items-center justify-between space-x-1 bg-white rounded-md p-6 mt-8 shadow-md ">
                    <div>Get similar jobs by email nguyenhoangvinh0004@gmail.com</div>
                    <div className="flex items-center justify-center  space-x-3 outline outline-1 rounded-[3px] border-red-500 text-red-500 leading-[40px] px-6">
                        <span className=" "><Bell  size={24} /></span>
                        <span> Subscribe</span>

                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {/* Job Card 1 */}
                    
                    <JobCard
                        date="April 12, 2024"
                        tag="Hot"
                        jobTitle="Frontend Developer"
                        companyLogo= {LOGO_COMPANY_IMG}
                        companyName="ABC Company"
                        salary="$60,000 - $80,000"
                        position="Full-time"
                        location="New York"
                        labels={["React", "JavaScript", "HTML", "CSS"]}
                    />
                    <JobCard
                        date="April 12, 2024"
                        tag=""
                        jobTitle="Frontend Developer"
                        companyLogo= {LOGO_COMPANY_IMG}
                        companyName="NAB"
                        salary="$60,000 - $80,000"
                        position="Full-time"
                        location="New York"
                        labels={["React", "JavaScript", "HTML"]}
                    />
                    <JobCard
                        date="April 12, 2024"
                        tag="NEW FOR YOU"
                        jobTitle="Frontend Developer iajsbd asdoiua snd( asdoiasdj )"
                        companyLogo= {LOGO_COMPANY_IMG}
                        companyName="ABC Company"
                        salary="$60,000 - $80,000"
                        position="Full-time"
                        location="New York"
                        labels={["React", "JavaScript", "HTML"]}
                    />
                    

                </div>


            </div>

            {/* Description about Company */}
            <div className="col-span-1 max-w-[420px] ">
                <div className="sticky top-[60px] bg-white p-6 rounded-md shadow-md">
                    <div className="flex ">
                        <a href="#">
                            <img className=" rounded-sm h-[120px] w-[120px] " src={job_detail?.employerInfo?.logoUrl} alt={job_detail?.employerInfo?.companyNamel}  />
                        </a>
                        <div className="ml-3 ">
                            <h3 className="text-wrap text-lg font-bold overflow-hidden overflow-ellipsis line-clamp-3">
                                {job_detail?.employerInfo?.companyName}
                            </h3>
                            <a href={`detail-company/companyId`} className=" text-blue-600" >
                                <div className="flex space-x-1">
                                <span>View Company</span>
                                    <span><ExternalLink/></span>
                                </div>
                                
                            </a>
                        </div>

                    </div>
                    <div className="mt-6">
                        <p>{job_detail?.employerInfo?.companyOverview}
                        </p>
                    </div>
                    <div className="mt-6">
                        
                    <div className="flex border-dotted border-b-2 border-gray-400  py-2">
                        <div className="w-1/2 text-gray-500">Company type</div>
                        <div className="w-1/2 text-end">{job_detail?.employerInfo?.companyType}</div>
                    </div>
                    <div className="flex border-dotted border-gray-400 border-b-2 py-2">
                        <div className="w-1/2 text-gray-500">Company size</div>
                        <div className="w-1/2 text-end">{job_detail?.employerInfo?.companySize}</div>
                    </div>
                    <div className="flex border-dotted border-gray-400 border-b-2 py-2">
                        <div className="w-1/2 text-gray-500">Country</div>
                        <div className="w-1/2 text-end"> {job_detail?.employerInfo?.country}</div>
                    </div>
                    <div className="flex border-dotted border-gray-400 border-b-2 py-2">
                        <div className="w-1/2 text-gray-500">Working days</div>
                        <div className="w-1/2 text-end">{job_detail?.employerInfo?.workingDays}</div>
                    </div>
                    <div className="flex py-2">
                        <div className="w-1/2 text-gray-500">Overtime policy</div>
                        <div className="w-1/2 text-end">{job_detail?.employerInfo?.overtimePolicy}</div>
                    </div>

                    </div>

                </div>
                
            </div>
        </div>
       

        
        </div>
    );
};



export default MainTablet;

