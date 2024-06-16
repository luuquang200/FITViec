import React, { useEffect, useState } from "react";

import { useSearchParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

// Components
import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// Assets
import ClipLoader from "react-spinners/ClipLoader";
import { MapPin, Briefcase, CircleDollarSign, Laptop } from "lucide-react";

const CompanyDetailPage = () => {
    const [searchParams] = useSearchParams();

    const [isFetchingCompany, setIsFetchingCompany] = useState(false);
    const [companies, setCompanies] = useState([]);

    const [isFetchingJobs, setIsFetchingJobs] = useState(false);
    const [jobs, setJobs] = useState([]);

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
    const {
        companyName,
        companyType,
        companySize,
        country,
        workingDays,
        overtimePolicy,
        companyOverview,
        keySkills,
        whyLoveWorkingHere,
        logoUrl,
        location,
        workType,
    } = companyDetail || {};

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
                    <Container className="text-background">
                        <div className="flex space-x-6">
                            <img
                                src={
                                    logoUrl ||
                                    "https://employer-service-otwul2bnna-uc.a.run.app/uploads/282d4f21-57c1-4fff-b4b2-2a883a59ad99.jpg"
                                }
                                alt={companyName}
                                className="aspect-square w-44 rounded-xl"
                            />

                            <div className="flex flex-col space-y-2">
                                <h1 className="text-2xl font-semibold">
                                    {companyName}
                                </h1>

                                <div className="flex items-center space-x-4 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <MapPin className="h-5 w-5" />

                                        <p>{location}</p>
                                    </div>

                                    {jobs.length > 0 && (
                                        <div className="flex items-center space-x-2">
                                            <Briefcase className="h-5 w-5" />

                                            <p>
                                                {jobs.length} job opening
                                                {jobs.length >= 2 ? "s" : ""}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex space-x-2 pt-4">
                                    <Button>Follow</Button>

                                    <Button
                                        variant="secondary"
                                        onClick={() =>
                                            toast("Feature coming soon!")
                                        }
                                    >
                                        Write review
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Container>
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
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                General information
                                            </CardTitle>
                                        </CardHeader>

                                        <hr className="mx-6 mb-6 border-dashed" />

                                        <CardContent className="grid grid-cols-3 grid-rows-2 gap-4">
                                            <div>
                                                <CardDescription>
                                                    Company type
                                                </CardDescription>

                                                <p>{companyType || "N/A"}</p>
                                            </div>

                                            <div>
                                                <CardDescription>
                                                    Company industry
                                                </CardDescription>

                                                <p>N/A</p>
                                            </div>

                                            <div>
                                                <CardDescription>
                                                    Company size
                                                </CardDescription>

                                                <p>{companySize || "N/A"}</p>
                                            </div>

                                            <div>
                                                <CardDescription>
                                                    Country
                                                </CardDescription>

                                                <p>{country || "N/A"}</p>
                                            </div>

                                            <div>
                                                <CardDescription>
                                                    Working days
                                                </CardDescription>

                                                <p>{workingDays || "N/A"}</p>
                                            </div>

                                            <div>
                                                <CardDescription>
                                                    Overtime policy
                                                </CardDescription>

                                                <p>{overtimePolicy || "N/A"}</p>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                Company overview
                                            </CardTitle>
                                        </CardHeader>

                                        <hr className="mx-6 mb-6 border-dashed" />

                                        <CardContent
                                            dangerouslySetInnerHTML={{
                                                __html: companyOverview,
                                            }}
                                        />
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                Our key skills
                                            </CardTitle>
                                        </CardHeader>

                                        <hr className="mx-6 mb-6 border-dashed" />

                                        <CardContent>
                                            <div className="space-x-1">
                                                {keySkills
                                                    ?.split(",")
                                                    .map((skill) => (
                                                        <Badge
                                                            key={skill}
                                                            variant="outline"
                                                            className="text-sm font-normal"
                                                        >
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                Why you'll love working here
                                            </CardTitle>
                                        </CardHeader>

                                        <hr className="mx-6 mb-6 border-dashed" />

                                        <CardContent
                                            dangerouslySetInnerHTML={{
                                                __html: whyLoveWorkingHere,
                                            }}
                                        />
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Location</CardTitle>
                                        </CardHeader>

                                        <hr className="mx-6 mb-6 border-dashed" />

                                        <CardContent>{location}</CardContent>
                                    </Card>
                                </div>
                            )}
                        </div>

                        {/* Job openings */}
                        <div className="col-span-4">
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
                                    {jobs.map((job) => (
                                        <Card className="mb-4">
                                            <CardHeader>
                                                {/* Posted date */}
                                                <p className="text-sm text-gray-500">
                                                    Posted {job.postedAt}
                                                </p>

                                                {/* Job title */}
                                                <CardTitle>
                                                    <Link
                                                        to={`/job-detail/${job.jobId}`}
                                                    >
                                                        {job.jobTitle}
                                                    </Link>
                                                </CardTitle>

                                                {/* Company name */}
                                                <p className="text-base">
                                                    {job.company?.name}
                                                </p>

                                                {/* Salary */}
                                                <p className="flex space-x-3 text-green-600">
                                                    <CircleDollarSign />

                                                    <p>{job.jobSalary}</p>
                                                </p>
                                            </CardHeader>

                                            <hr className="mx-6 mb-6 border-dashed" />

                                            <CardContent>
                                                <CardDescription className="flex items-center space-x-2">
                                                    <Laptop className="h-5 w-5" />

                                                    <p className="text-foreground">
                                                        {job.jobType}
                                                    </p>
                                                </CardDescription>

                                                <CardDescription className="flex items-center space-x-2">
                                                    <MapPin />

                                                    <p className="line-clamp-1 text-foreground hover:line-clamp-none">
                                                        {job.jobLocation}
                                                    </p>
                                                </CardDescription>

                                                {/* Skills section */}
                                                <div className="space-x-1 space-y-1 pt-2">
                                                    {job.jobSkills
                                                        .split(",")
                                                        .map((skill) => (
                                                            <Badge
                                                                key={skill}
                                                                variant="outline"
                                                                className="text-sm font-normal"
                                                            >
                                                                {skill}
                                                            </Badge>
                                                        ))}
                                                </div>
                                            </CardContent>

                                            <hr className="mx-6 mb-6 border-dashed" />

                                            <CardContent>
                                                <ul className="list-inside list-disc">
                                                    {job.jobBenefit
                                                        .replace(/\\n/g, "\n")
                                                        .split("\n")
                                                        .map(
                                                            (
                                                                benefit,
                                                                index,
                                                            ) => (
                                                                <li key={index}>
                                                                    {benefit}
                                                                </li>
                                                            ),
                                                        )}
                                                </ul>
                                            </CardContent>
                                        </Card>
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
