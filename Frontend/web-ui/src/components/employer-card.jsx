import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

// Components
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Assets
import CardBackgroundSVG from "@/assets/bg-top-emp.svg";
import { ChevronRight } from "lucide-react";

const EmployerCard = ({ employer }) => {
    const { employerId, companyName, logoUrl, keySkills, location } = employer;

    const [isFetchingJobs, setIsFetchingJobs] = useState(false);
    const [jobs, setJobs] = useState([]);

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

        fetchJobs();
    }, []);

    return (
        <Link to={`/companies?id=${employerId}`}>
            <Card className="relative flex h-full cursor-pointer flex-col justify-between bg-muted/20">
                <div className="absolute">
                    <img src={CardBackgroundSVG} alt="Footer image" />
                </div>

                <CardContent className="px-28 pt-10">
                    <div className="relative aspect-square overflow-hidden rounded-xl bg-white shadow-xl">
                        <img
                            src={
                                logoUrl ||
                                "https://employer-service-otwul2bnna-uc.a.run.app/uploads/282d4f21-57c1-4fff-b4b2-2a883a59ad99.jpg"
                            }
                            // Fallback to default logo if the image is not found
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/logo-default.webp";
                            }}
                            alt={companyName}
                            className="aspect-square w-full object-contain"
                        />
                    </div>
                </CardContent>

                <CardContent>
                    <div className="flex flex-col items-center space-y-2">
                        <p className="line-clamp-3 text-lg font-semibold">
                            {companyName}
                        </p>

                        {keySkills && (
                            <div className="flex flex-wrap space-x-2 pt-2">
                                {keySkills.split(",").map((skill, index) => (
                                    <Badge
                                        key={index}
                                        variant="secondary"
                                        className="text-sm font-normal"
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between bg-muted py-5">
                    <h1 className="text-sm">{location || "TP Hồ Chí Minh"}</h1>

                    {isFetchingJobs ? (
                        <p>Fetching jobs...</p>
                    ) : (
                        <Button
                            variant="link"
                            size="sm"
                            className="h-min p-0 text-foreground hover:no-underline"
                        >
                            {jobs.length} Job{jobs.length > 1 ? "s" : ""}{" "}
                            <ChevronRight />
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </Link>
    );
};

export default EmployerCard;
