import React, { useEffect } from "react";
import PropTypes from "prop-types";

// Components
import Container from "@/components/layout/container";
import SearchBar from "./search-bar";
import { useSearchParams } from "react-router-dom";
import { CircleDollarSign, MapPin, User } from "lucide-react";

const cities = [
    { value: "all", label: "Vietnam" },
    { value: "hcm", label: "Ho Chi Minh" },
    { value: "hn", label: "Ha Noi" },
    { value: "dn", label: "Da Nang" },
    { value: "others", label: "Others" },
]


const SearchResult = () => {
    const [searchParams] = useSearchParams();

    const city = searchParams.get("city");
    const city_label = cities.find((c) => c.value === city)?.label;
    const keyword = searchParams.get("keyword").toLowerCase();

    const [jobs, setJobs] = React.useState([]);
    const [selectedJob, setSelectedJob] = React.useState(null);

    // Get Jobs from API: https://demo-restful-api-itviec.vercel.app/api/jobs

    useEffect(() => {
        fetch("https://demo-restful-api-itviec.vercel.app/api/jobs")
            .then(response => response.json())
            .then(data => {
                // Filter jobs by city and keyword
                if (city !== "all") {
                    data = data.filter(job => job.location.toLowerCase().includes(city));
                }
                if (keyword) {
                    data = data.filter(job => job.title.toLowerCase().includes(keyword));
                }

                setJobs(data);
                if (!selectedJob && data.length > 0)
                    setSelectedJob(data[0]);
            })
            .catch(error => {
                console.error(error);
            });
    });

    const onListItemMouseDown = (id) => {
        setSelectedJob(
            jobs.find(job => job.id === id)
        );
    }

    return (
        <div className="bg-gray-100">
            <div className="bg-linear-gradient py-8">
                <Container>
                    <SearchBar inputCity={city} inputQuery={keyword} />
                </Container>
            </div>
            <div className="px-8 py-8">
                <h1 className="text-2xl font-bold text-foreground">
                    {jobs.length} <span className={keyword ? "text-red-500" : ""}>{keyword || "IT"}</span> {jobs.length == 1 ? "job" : "jobs"} in {city_label}
                </h1>
            </div>
            <div className="px-8 py-8 grid grid-cols-5 gap-5">
                <div className="col-span-2">
                    <ul>
                        {jobs.map(job => (
                            <li
                                key={job.id}
                                className="block max-w-none p-6 mb-6 bg-white rounded-lg flex-col space-y-1"
                                onMouseDown={() => onListItemMouseDown(job.id)}>
                                <p className="text-sm text-gray-500">Posted on {job.posted_day}</p>
                                
                                <a href={`/job-detail?id=${job.id}`}>
                                    <h2 className="text-xl font-bold">{job.title}</h2>
                                </a>
                                <p className="text-base">{job.company?.name}</p>

                                <p className="text-base text-green-600 flex space-x-1">
                                    <CircleDollarSign />
                                    <div>{job.salary}</div>
                                </p>
                                <hr />
                                <p className="flex space-x-1">
                                    <User />
                                    <div className="text-sm">{job.working_model}</div>
                                </p>
                                <p className="flex space-x-1">
                                    <MapPin />
                                    <div className="text-sm">{job.location}</div>
                                </p>
                                <div className="flex space-x-1">
                                    {job.skills.map(skill => (
                                        <span key={skill} className="text-xs p-1 border rounded-full">{skill}</span>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-span-3">
                    <JobDetailInSearchResult job={selectedJob} />
                </div>
            </div>
        </div>
    );
};

SearchResult.propTypes = {
    city: PropTypes.string,
    query: PropTypes.string,
};

const JobDetailInSearchResult = ({ job }) => {
    if (!job) {
        return null;
    }
    // May use the same component for JobDetail in JobDetail page
    // But for now, we just show the title, company name, and salary
    return (
        <div className="p-6 bg-white rounded-lg sticky top-[100px]">
            <div className="flex-col space-y-3">
                <h2 className="text-3xl font-bold">{job.title ?? ""}</h2>
                <p className="text-xl">{job.company?.name ?? ""}</p>
                <p className="text-base text-green-600 flex space-x-1">
                    <CircleDollarSign />
                    <div>{job.salary}</div>
                </p>
                <hr />
                <p>
                    <h2 className="text-2xl font-bold">Description</h2>
                    <p className="text-base">{job.description}</p>
                </p>
            </div>
        </div>
    );
};

JobDetailInSearchResult.propTypes = {
    job: PropTypes.object,
};

export default SearchResult;
