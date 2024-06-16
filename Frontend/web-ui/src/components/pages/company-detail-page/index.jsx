import React, { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

// Components
import CompanyInfo from "@/components/pages/company-detail-page/conpany-info";
import JobOpening from "@/components/pages/company-detail-page/job-openings";
import CompanyHeading from "@/components/pages/company-detail-page/company-heading";

import Container from "@/components/layout/container";
import { ScrollArea } from "@/components/ui/scroll-area";

// Assets
import ClipLoader from "react-spinners/ClipLoader";

const CompanyDetailPage = () => {
    const [searchParams] = useSearchParams();

    const [isFetchingCompany, setIsFetchingCompany] = useState(false);
    const [companies, setCompanies] = useState([]);

    const [isFetchingJobs, setIsFetchingJobs] = useState(false);
    const [jobs, setJobs] = useState([]);

    const [isScrolling, setIsScrolling] = useState(false);

    const companyId = searchParams.get("id");

    // Fetch top companies
    useEffect(() => {
        const fetchCompanies = async () => {
            setIsFetchingCompany(true);

            try {
                const response = await fetch(
                    "https://employer-service-otwul2bnna-uc.a.run.app/employer/get-top",
                );
                let data = await response.json();

                setCompanies(data.data);

                setIsFetchingCompany(false);
            } catch (error) {
                console.error(error);

                setIsFetchingCompany(false);
            }
        };

        fetchCompanies();
    }, []);

    // Find the company that matches the company ID
    const companyDetail = companies.find(
        (company) => company.employerId === companyId,
    );

    // Destructure the company details
    const { companyName } = companyDetail || {};

    // Fetch jobs by company
    useEffect(() => {
        const fetchJobs = async () => {
            setIsFetchingJobs(true);

            try {
                const response = await fetch(
                    "https://job-search-service.azurewebsites.net/job-elastic/jobs-by-company",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ value: companyName }),
                    },
                );
                let data = await response.json();

                setJobs(data);

                setIsFetchingJobs(false);
            } catch (error) {
                console.error(error);

                setIsFetchingJobs(false);
            }
        };

        if (companyDetail) {
            fetchJobs();
        }
    }, [companyDetail]);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            window.scrollY > 180 ? setIsScrolling(true) : setIsScrolling(false);
        });
    });

    return (
        <>
            {/* Heading section: company logo, company name, location, number of job openings */}
            <div className="min-h-56 bg-linear-gradient py-6">
                {isFetchingCompany ? (
                    <div className="flex items-center justify-center">
                        <ClipLoader
                            color="rgba(255, 255, 255)"
                            size={70}
                            speedMultiplier={1}
                        />
                    </div>
                ) : (
                    <>
                        <Container className="text-background">
                            <CompanyHeading
                                companyDetail={companyDetail}
                                jobOpenings={jobs.length}
                            />
                        </Container>
                    </>
                )}
            </div>

            {/* Company info & job openings */}
            <div className="min-h-96 bg-muted py-6">
                <Container>
                    <div className="grid grid-cols-12 gap-4">
                        {/* Company info */}
                        <div className="col-span-8">
                            {isFetchingCompany ? (
                                <div className="flex items-center justify-center py-4">
                                    <ClipLoader
                                        color="red"
                                        size={100}
                                        speedMultiplier={1}
                                    />
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <CompanyInfo
                                        companyDetail={companyDetail}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Job openings */}
                        <div className="sticky top-[76px] col-span-4">
                            {isFetchingJobs && (
                                <div className="flex items-center justify-center py-4">
                                    <ClipLoader
                                        color="red"
                                        size={100}
                                        speedMultiplier={1}
                                    />
                                </div>
                            )}

                            {!isFetchingJobs && (
                                <h1 className="text-2xl font-semibold">
                                    {jobs.length} job opening
                                    {jobs.length >= 2 ? "s" : ""}
                                </h1>
                            )}

                            {!isFetchingJobs && (
                                <ScrollArea className="mt-6">
                                    {jobs.map((job, index) => (
                                        <JobOpening key={index} job={job} />
                                    ))}
                                </ScrollArea>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default CompanyDetailPage;
