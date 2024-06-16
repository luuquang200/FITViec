import React from "react";
import { Link } from "react-router-dom";

// Context
import { useAuth } from "@/contexts/authContext";

// Components
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Assets
import { MapPin, CircleDollarSign, Laptop } from "lucide-react";

const JobOpening = ({ job }) => {
    const { userLoggedIn } = useAuth();

    // Destructure the job details
    const {
        jobId,
        postedAt,
        jobTitle,
        company,
        jobSalary,
        jobType,
        jobLocation,
        jobSkills,
        jobBenefit,
    } = job;

    return (
        <Card className="mb-4">
            <CardHeader>
                {/* Posted date */}
                <p className="text-sm text-gray-500">Posted {postedAt}</p>

                {/* Job title */}
                <CardTitle>
                    <Link to={`/job-detail/${jobId}`}>{jobTitle}</Link>
                </CardTitle>

                {/* Company name */}
                <p className="text-base">{company?.name}</p>

                {/* Salary */}
                <p
                    className={`flex space-x-3 ${userLoggedIn ? "text-green-600" : "text-muted-foreground"}`}
                >
                    <CircleDollarSign />

                    {userLoggedIn ? (
                        <p>{jobSalary}</p>
                    ) : (
                        <p>Sign in to view salary</p>
                    )}
                </p>
            </CardHeader>

            <hr className="mx-6 mb-6 border-dashed" />

            <CardContent>
                <CardDescription className="flex items-center space-x-2">
                    <Laptop />

                    <p className="text-foreground">{jobType}</p>
                </CardDescription>

                <CardDescription className="flex items-center space-x-2">
                    <MapPin />

                    <p className="line-clamp-1 max-w-80 text-foreground hover:line-clamp-none">
                        {jobLocation}
                    </p>
                </CardDescription>

                {/* Skills section */}
                <div className="space-x-1 space-y-1 pt-2">
                    {jobSkills.split(",").map((skill) => (
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
                    {jobBenefit
                        .replace(/\\n/g, "\n")
                        .split("\n")
                        .map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                        ))}
                </ul>
            </CardContent>
        </Card>
    );
};

export default JobOpening;
