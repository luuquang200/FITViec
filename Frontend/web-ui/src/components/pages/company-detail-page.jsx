import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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

// Assets
import ClipLoader from "react-spinners/ClipLoader";
import { MapPin, Briefcase } from "lucide-react";

const CompanyDetailPage = () => {
    const [searchParams] = useSearchParams();

    const [isFetching, setIsFetching] = useState(false);
    const [companies, setCompanies] = useState([]);

    const companyId = searchParams.get("id");

    useEffect(() => {
        const fetchCompanies = async () => {
            setIsFetching(true);

            try {
                const response = await fetch(
                    "https://employer-service-otwul2bnna-uc.a.run.app/employer/get-top",
                );
                let data = await response.json();

                setCompanies(data.data);

                setIsFetching(false);
            } catch (error) {
                console.error(error);

                setIsFetching(false);
            }
        };

        fetchCompanies();
    }, []);

    const companyDetail = companies.find(
        (company) => company.employerId === companyId,
    );

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

    const openingJobs = 175;

    return (
        <>
            <div className="bg-linear-gradient">
                {isFetching ? (
                    <div className="flex items-center justify-center py-4">
                        <ClipLoader
                            color="rgba(255, 255, 255)"
                            size={40}
                            speedMultiplier={1}
                        />
                    </div>
                ) : (
                    <Container className="text-background">
                        <div className="my-6 flex space-x-6">
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

                                    {openingJobs > 0 && (
                                        <div className="flex items-center space-x-2">
                                            <Briefcase className="h-5 w-5" />

                                            <p>
                                                {openingJobs} job opening
                                                {openingJobs >= 2 ? "s" : ""}
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

            <div className="bg-muted">
                <Container>
                    {isFetching ? (
                        <div className="flex items-center justify-center py-4">
                            <ClipLoader
                                color="rgba(255, 255, 255)"
                                size={40}
                                speedMultiplier={1}
                            />
                        </div>
                    ) : (
                        <Card>
                            <CardHeader>
                                <CardTitle>General information</CardTitle>
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
                                    <CardDescription>Country</CardDescription>

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
                    )}
                </Container>
            </div>
        </>
    );
};

export default CompanyDetailPage;
