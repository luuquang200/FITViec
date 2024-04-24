// Components
import { useEffect, useState } from "react";
import Container from "@/components/layout/container";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import JobCard from "@/components/ui/job-card";
import Gallery from "@/components/ui/gallery";

import { Search, MapPin, Heart, CircleDollarSign, ExternalLink, Joystick, Clock, Bell } from "lucide-react";

const images = [
    'https://admin.netlawman.com/uploads/article/original/types-uk-company.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRev3s4mzwXq3Wty6-qbpzemBfABDHjTQRqK1bfU0u1gA&s',
    'https://admin.netlawman.com/uploads/article/original/types-uk-company.jpg',
    'https://admin.netlawman.com/uploads/article/original/types-uk-company.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRev3s4mzwXq3Wty6-qbpzemBfABDHjTQRqK1bfU0u1gA&s',
    'https://admin.netlawman.com/uploads/article/original/types-uk-company.jpg',
    // Thêm các URL hình ảnh khác vào đây
  ];
const LOGO_COMPANY_IMG = "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMS9LSnc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--f77c1653cf49260705bf77be3846954d9b817b70/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oSnlaWE5wZW1WZmRHOWZabWwwV3dkcEFhb3ciLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--bb0ebae071595ab1791dc0ad640ef70a76504047/logo.jpg"
const MainTablet = () => {
    const [isSticky, setIsSticky] = useState(true);
    
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
                    <h1 className=" text-[28px] font-bold   ">Senior DevSecOps Engineer (Python)</h1>
                    <div className="my-4"> Employer Name</div>
                    <div className="flex space-x-2 text-green-500 font-bold" > <CircleDollarSign /> <span>Salary </span></div>
                    <div className="flex justify-between mt-[24px]">
                        <Button className="w-11/12 h-[48px]"> Apply Now</Button>
                        <Heart className="w-1/12 m-auto text-primary h-[32px]"/>
                    </div>
                </div>

                {/* Slide Image */}
                <Gallery images={images}></Gallery>
                {/* Job description */}
                <div className="bg-white rounded-md p-6 mt-8 shadow-md ">
                <div className=" border-dotted border-gray-400 border-b-2 mt-6 pb-6 ">
                    <h2 className="text-2xl font-bold my-4">Top 3 reasons to join us</h2>
                    <ul className="list-disc list-inside ">
                        <li className=" m-2">Very competitive remuneration package</li>
                        <li className=" m-2">Build products for millions of users in Australia</li>
                        <li className=" m-2">Hybrid and flexible working environment</li>
                    </ul>
                </div>
                <div className=" border-dotted border-gray-400 border-b-2 mt-6  pb-6">
                    <h2 className="text-2xl font-bold my-4">Job description</h2>
                    <div className="text-md font-bold italic "> By applying for the above position, you accept and agree that your personal data and any information stated in the attached curriculum vitae (CV) will be used and processed by ITViec and NAB Vietnam for recruitment purposes. The storage and processing of such information will comply with the applicable laws of Vietnam, and the policies and procedures of ITViec and NAB Vietnam regarding personal data, as amended from time to time.</div>
                    <div className="">
                        <h2 className="text-md font-bold mt-6 ">YOUR RESPONSIBILITIES: </h2>
                        <ol className="leading-8"  start={1}>
                            <li>Primary contact in supporting, maintaining and expanding SOAR integrations</li>
                            <li>Creation and maintenance of deployment tooling, including scripts, monitoring, logging, CI/CD pipelines.</li>
                            <li>Building highly scalable and resilient technical solutions that enable rapid development and deployment.</li>
                            <li>Continuous self-development and learning to maintain knowledge of best practice and latest technology developments.</li>
                            <li>Perform “business-as-usual” technology management and support functions for security solutions within the Cyber Platforms and Engineering Portfolio.</li>
                            <li>Perform problem diagnosis and use technical expertise to develop options and solutions to specific problems that are often technical in nature and lead to remediation, repair and recovery activity.</li>
                        </ol>
                    </div>
                </div>
                <div className=" border-dotted border-gray-400 border-b-2 mt-6  pb-6">
                    <h2 className="text-2xl font-bold my-4">Your skills and experience</h2>
                    <ul className=" list-inside list-disc leading-8">
                        <li>
                        5+ years of experience in coding and scripting in latest programming languages (Python, Bash etc.)/ Applicatoon Security 
                        Hands on with coding: Scripting using Python- DevOps/DevSecops Background 
                        Experience of modern secure software development practices & mentoring teams to improve their practices.
                        Building CI/CD pipeline automation, tooling (GitHub, Jenkins, Artifactory, Docker, Ansible and Bamboo) and Compliance as code.
                        Mandatory hands-on experience with Azure or AWS cloud platforms using Terraform or CloudFormation
                        Experience supporting server running both Windows and Linux operating systems
                        Experience with security tools in SAST (static code testing), SCA (software composition analysis), CSS (container security), DAST (dynamic security testing)
                        Good understanding of security concepts related to container security, supply chain and cloud.
                        Technical understanding to assist asset teams triage vulnerabilities and drive prioritisation
                        Proven ability to work both individually and within a team environment (at times with little guidance), build strong relationships and maintain rapport with internal NAB stakeholders and 3rd party service providers
                        Why you'll love working here
                        </li>

                    </ul>
                </div>
                <div className=" border-dotted border-gray-400 border-b-2 mt-6 pb-6">
                    <h2 className="text-2xl font-bold my-4">Your skills and experience</h2>
                    
                    <ul className=" list-inside list-disc leading-8">
                        <li>
                        <strong>1.Generous compensation and benefit package </strong>
                        </li>
                        <li>   
                        Attractive salary and benefits
                        20-day annual leave and 7-day sick leave, etc.
                        13th month salary and Annual Performance Bonus
                        Premium healthcare for yourself and family members
                        </li>
                        <li> 
                        <strong>2. Exciting career and development opportunities</strong>
                        
                        Large scale products with modern technologies in banking domain
                        Clear roadmap for career advancement in both technical and leadership pathways
                        Sponsored certificates in both IT and banking/finance
                        Premium account on Udemy
                        English learning with native teachers
                        </li>
                        <li> 
                        <strong>3. Professional and engaging working environment </strong>

                        Hybrid working model and excellent work-life balance
                        Well-equipped & modern Agile office with fully-stocked pantry
                        Annual company trip and events
                        </li>
                        </ul>
                </div>
                <div className=" mt-4">
                    <h2 className="text-xl font-bold my-4">A DIVERSE AND INCLUSIVE WORKPLACE WORKS BETTER FOR EVERYONE</h2>
                    <div>
                    NAB is a place where colleagues of all genders, sexualities and ages, carers and colleagues with disability, and colleagues from all cultures, races and religions have the opportunity to thrive, connect and grow. 
                    </div>
                    <div className="font-bold mt-8">
                    If this excites you, let's have a chat over a cup of coffee!
                    </div>
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
                            <img className=" rounded-sm h-[120px] min-w-[120px] " src={LOGO_COMPANY_IMG} alt="Logo_company"  />
                        </a>
                        <div className="ml-3 ">
                            <h3 className="text-wrap text-lg font-bold overflow-hidden overflow-ellipsis line-clamp-3">
                                NAB Innovation Centre Vietnam
                            </h3>
                            <a href="#" className=" text-blue-600" >
                                <div className="flex space-x-1">
                                <span>View Company</span>
                                    <span><ExternalLink/></span>
                                </div>
                                
                            </a>
                        </div>

                    </div>
                    <div className="mt-6">
                        <p>The NAB Innovation Centre Vietnam is owned by NAB - Australia’s largest business bank.
                        </p>
                    </div>
                    <div className="mt-6">
                        
                    <div className="flex border-dotted border-b-2 border-gray-400  py-2">
                        <div className="w-1/2 text-gray-500">Company type</div>
                        <div className="w-1/2 text-end">IT Product</div>
                    </div>
                    <div className="flex border-dotted border-gray-400 border-b-2 py-2">
                        <div className="w-1/2 text-gray-500">Company size</div>
                        <div className="w-1/2 text-end">1-50 employees</div>
                    </div>
                    <div className="flex border-dotted border-gray-400 border-b-2 py-2">
                        <div className="w-1/2 text-gray-500">Country</div>
                        <div className="w-1/2 text-end"> Vietnam</div>
                    </div>
                    <div className="flex border-dotted border-gray-400 border-b-2 py-2">
                        <div className="w-1/2 text-gray-500">Working days</div>
                        <div className="w-1/2 text-end">Monday - Saturday</div>
                    </div>
                    <div className="flex py-2">
                        <div className="w-1/2 text-gray-500">Overtime policy</div>
                        <div className="w-1/2 text-end">No OT</div>
                    </div>

                    </div>

                </div>
                
            </div>
        </div>


        </div>
    );
};



export default MainTablet;

