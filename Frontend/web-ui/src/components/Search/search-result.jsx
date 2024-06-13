import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { toast } from "react-toastify";

// firebase
import { db } from "@/firebase/firebase";
import { setDoc, getDoc, doc } from "firebase/firestore";
import {
    StoreRecentViewedJob,
    StoreSavedJob,
    CheckIsSavedJob,
} from "../Employee/employee-job-management";

// Components
import Container from "@/components/layout/container";
import SearchBar from "@/components/layout/search-bar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import JobDetail from "@/components/Search/job-detail";

// Icons
import { CircleDollarSign, MapPin, Laptop, Filter } from "lucide-react";

const cities = [
    { value: "all", label: "Vietnam" },
    { value: "hcm", label: "Ho Chi Minh" },
    { value: "hn", label: "Ha Noi" },
    { value: "dn", label: "Da Nang" },
    { value: "others", label: "Others" },
];

const SearchResult = () => {
    const [searchParams] = useSearchParams();

    const city = searchParams.get("city");
    const city_label = cities.find((c) => c.value === city)?.label;
    const keyword = searchParams.get("keyword").toLowerCase();

    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isSelectedJobSave, setIsSelectedJobSave] = useState(false);

    const { currentUser } = useAuth();

    // orignal useEffect
    // useEffect(() => {
    //     fetch("https://demo-restful-api-itviec.vercel.app/api/jobs")
    //         .then((response) => response.json())
    //         .then((data) => {
    //             // Filter jobs by city and keyword
    //             if (city !== "all") {
    //                 data = data.filter((job) =>
    //                     job.location.toLowerCase().includes(city),
    //                 );
    //             }
    //             if (keyword) {
    //                 data = data.filter((job) =>
    //                     job.title.toLowerCase().includes(keyword),
    //                 );
    //             }
    //             // data = data.map((job) => {console.log(job)})

    //             setJobs(data);
    //             if (!selectedJob && data.length > 0) setSelectedJob(data[0]);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // });

    // useEffect() with adding saveJob atrribute to every job in the jobs list
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                // Get Jobs from API: https://demo-restful-api-itviec.vercel.app/api/jobs
                const response = await fetch(
                    "https://demo-restful-api-itviec.vercel.app/api/jobs",
                );
                let data = await response.json();

                // Filter jobs by city and keyword
                if (city !== "all") {
                    data = data.filter((job) =>
                        job.location.toLowerCase().includes(city),
                    );
                }
                if (keyword) {
                    data = data.filter((job) =>
                        job.title.toLowerCase().includes(keyword),
                    );
                }

                // Add isSaved attribute to jobs
                const updatedData = await addIsSavedAttribute(
                    data,
                    currentUser,
                );
                setJobs(updatedData);
                if (!selectedJob && updatedData.length > 0)
                    setSelectedJob(updatedData[0]);
            } catch (error) {
                console.error(error);
            }
        };

        fetchJobs();
    }, [city, keyword, currentUser, selectedJob]);

    const addIsSavedAttribute = async (jobs, currentUser) => {
        try {
            const jobsWithIsSaved = await Promise.all(
                jobs.map(async (job) => {
                    const isSaved = await CheckIsSavedJob(job, currentUser);
                    return { ...job, isSaved };
                }),
            );
            return jobsWithIsSaved;
        } catch (error) {
            console.error("Error adding isSaved attribute to jobs:", error);
            return jobs;
        }
    };

    const handleListItemClick = (id) => {
        setSelectedJob(jobs.find((job) => job.id === id));
        let recentJob = jobs.find((job) => job.id === id);
        StoreRecentViewedJob(recentJob, currentUser);
    };

    const selectedJobClassName =
        // The red ring around the selected card
        "relative ring-1 ring-inset ring-primary" +
        // The red line on the left side of the selected card
        " before:absolute before:left-0 before:top-[8px] before:h-[calc(100%-16px)] before:w-1.5 before:rounded-r-lg before:bg-primary before:content-['']" +
        // The red triangle on the right side of the selected card
        " after:absolute after:left-full after:top-1/2 after:h-0 after:w-0 after:border-b-[10px] after:border-l-[10px] after:border-t-[10px] after:border-b-transparent after:border-l-primary after:border-t-transparent after:content-['']";

    return (
        <>
            <div className="bg-linear-gradient py-8">
                <Container>
                    <SearchBar inputCity={city} inputQuery={keyword} />
                </Container>
            </div>

            <div className="bg-gray-100 py-8">
                <Container>
                    {/* "Total jobs" & "filter button" container */}
                    <div className="flex justify-between pb-8">
                        {/* Total jobs headline */}
                        <h1 className="text-3xl font-bold text-foreground">
                            {jobs.length}{" "}
                            <span className={keyword && "text-red-500"}>
                                {keyword || "IT"}
                            </span>{" "}
                            {jobs.length == 1 ? "job" : "jobs"} in {city_label}
                        </h1>

                        {/* Filter button */}
                        <Dialog>
                            <DialogTrigger>
                                <Button
                                    variant="outline"
                                    className="hover:text- border-primary bg-none font-bold text-primary"
                                >
                                    <Filter className="mr-2" />
                                    Filter
                                </Button>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Filter feature coming soon!
                                    </DialogTitle>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* "Job list" & "job detail" container */}
                    <div className="grid grid-cols-10 gap-4">
                        {/* Job list */}
                        <div className="col-span-4">
                            <ul className="space-y-4">
                                {jobs.map((job) => (
                                    <li
                                        key={job.id}
                                        onClick={() =>
                                            handleListItemClick(job.id)
                                        }
                                    >
                                        <Card
                                            // Conditional styling for the selected card
                                            className={
                                                selectedJob.id === job.id &&
                                                selectedJobClassName
                                            }
                                        >
                                            <CardHeader>
                                                {/* Posted date */}
                                                <p className="text-sm text-gray-500">
                                                    Posted on {job.posted_day}
                                                </p>

                                                {/* Job title */}
                                                <CardTitle>
                                                    <Link
                                                        to={`/job-detail?id=${job.id}`}
                                                    >
                                                        {job.title}
                                                    </Link>
                                                </CardTitle>

                                                {/* Company name */}
                                                <p className="text-base">
                                                    {job.company?.name}
                                                </p>

                                                {/* Salary */}
                                                <p className="flex space-x-3 text-green-600">
                                                    <CircleDollarSign />
                                                    <div>{job.salary}</div>
                                                </p>
                                            </CardHeader>

                                            <hr className="mx-6 mb-6 border-dashed" />

                                            <CardContent>
                                                <CardDescription className="flex items-center space-x-2">
                                                    <Laptop className="h-5 w-5" />

                                                    <p className="text-foreground">
                                                        {job.working_model}
                                                    </p>
                                                </CardDescription>

                                                <CardDescription className="flex items-center space-x-2">
                                                    <MapPin className="h-5 w-5" />

                                                    <p className="text-foreground">
                                                        {job.location}
                                                    </p>
                                                </CardDescription>

                                                {/* Skills section */}
                                                <div className="space-x-1 space-y-1 pt-2">
                                                    {job.skills.map((skill) => (
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
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Job detail */}
                        <div className="col-span-6">
                            {selectedJob ? (
                                <JobDetail job={selectedJob} />
                            ) : (
                                <div>No job selected</div>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};

SearchResult.propTypes = {
    city: PropTypes.string,
    query: PropTypes.string,
};

export default SearchResult;
