import React from "react";

// Components
import { Button } from "@/components/ui/button";

// Assets
import { MapPin, Briefcase } from "lucide-react";

const CompanyHeading = ({ companyDetail, jobOpenings }) => {
    // Destructure the company details
    const { companyName, logoUrl, location } = companyDetail || {};

    return (
        <div className="flex space-x-6">
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
                className="aspect-square w-44 rounded-xl object-cover"
            />

            <div className="flex flex-col space-y-2">
                <h1 className="text-2xl font-semibold">{companyName}</h1>

                <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5" />

                        <p>{location}</p>
                    </div>

                    {jobOpenings > 0 && (
                        <div className="flex items-center space-x-2">
                            <Briefcase className="h-5 w-5" />

                            <p>
                                {jobOpenings} job opening
                                {jobOpenings >= 2 ? "s" : ""}
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex space-x-2 pt-4">
                    <Button>Follow</Button>

                    <Button
                        variant="secondary"
                        onClick={() => toast("Feature coming soon!")}
                    >
                        Write review
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyHeading;
