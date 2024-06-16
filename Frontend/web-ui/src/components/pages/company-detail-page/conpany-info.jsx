import React from "react";

const CompanyInfo = ({ companyDetail }) => {
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

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>General information</CardTitle>
                </CardHeader>

                <hr className="mx-6 mb-6 border-dashed" />

                <CardContent className="grid grid-cols-3 grid-rows-2 gap-4">
                    <div>
                        <CardDescription>Company type</CardDescription>

                        <p>{companyType || "N/A"}</p>
                    </div>

                    <div>
                        <CardDescription>Company industry</CardDescription>

                        <p>N/A</p>
                    </div>

                    <div>
                        <CardDescription>Company size</CardDescription>

                        <p>{companySize || "N/A"}</p>
                    </div>

                    <div>
                        <CardDescription>Country</CardDescription>

                        <p>{country || "N/A"}</p>
                    </div>

                    <div>
                        <CardDescription>Working days</CardDescription>

                        <p>{workingDays || "N/A"}</p>
                    </div>

                    <div>
                        <CardDescription>Overtime policy</CardDescription>

                        <p>{overtimePolicy || "N/A"}</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Company overview</CardTitle>
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
                    <CardTitle>Our key skills</CardTitle>
                </CardHeader>

                <hr className="mx-6 mb-6 border-dashed" />

                <CardContent>
                    <div className="space-x-1">
                        {keySkills?.split(",").map((skill) => (
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
                    <CardTitle>Why you'll love working here</CardTitle>
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
        </>
    );
};

export default CompanyInfo;
