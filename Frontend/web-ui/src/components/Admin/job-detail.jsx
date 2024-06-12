import React, { useEffect, useState } from "react";
import CompanyInfo from "@/components/ui/job-detail-guest/company-info";
import JobDetailsSection from "@/components/ui/job-detail-guest/job-details-section";
import BasicInfo from "@/components/ui/job-detail-guest/basic-info";

const JobDetail = ({ job, onBack }) => {
    const [isSticky, setIsSticky] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY <= 800);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleApprove = () => {
        // Handle approve logic here
        console.log("Approved");
    };

    const handleReject = () => {
        // Handle reject logic here
        console.log("Rejected");
    };

    const canApprove = job.jobStatus !== "approved";
    const canReject = job.jobStatus !== "rejected";

    return (
        <div className="relative bg-gray-200 bg-opacity-50 p-[30px] pb-[150px]">
            <button onClick={onBack} className="mb-4 text-blue-500">
                Back to Job Management
            </button>

            <div className="relative grid grid-cols-3 gap-4">
                <div className="col-span-1">
                    <div className="sticky top-[60px]">
                        <div className="rounded-lg bg-white p-4 shadow-lg">
                            {canApprove && (
                                <button
                                    onClick={handleApprove}
                                    className="mb-4 w-full rounded-md bg-green-500 px-4 py-2 text-white shadow-lg transition duration-200 hover:bg-green-600"
                                >
                                    Approve
                                </button>
                            )}
                            {canReject && (
                                <button
                                    onClick={handleReject}
                                    className="w-full rounded-md bg-red-500 px-4 py-2 text-white shadow-lg transition duration-200 hover:bg-red-600"
                                >
                                    Reject
                                </button>
                            )}
                        </div>
                        <CompanyInfo job_detail={job} />
                    </div>
                </div>

                <div className="col-span-2 pb-8">
                    <div
                        className={`top-[60px] rounded-t-md bg-white ${
                            isSticky ? "sticky" : ""
                        }`}
                        style={{ zIndex: 1 }}
                    >
                        <div className="p-4">
                            <h1 className="text-2xl font-bold">
                                {job.jobTitle}
                            </h1>
                            <p className="text-gray-600">{job.jobLocation}</p>
                            <p className="text-gray-600">{job.jobType}</p>
                            <p className="text-gray-600">{job.postedAt}</p>
                        </div>
                    </div>

                    <BasicInfo job_detail={job} />

                    <div id="job-detail-section">
                        <JobDetailsSection job_detail={job} />
                    </div>
                </div>
            </div>

            <style jsx>{`
                .similar-jobs-title {
                    color: #121212;
                    width: 100%;
                    margin-top: 30px;
                    font:
                        700 22px Lexend,
                        sans-serif;
                }
                @media (max-width: 991px) {
                    .similar-jobs-title {
                        max-width: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default JobDetail;
