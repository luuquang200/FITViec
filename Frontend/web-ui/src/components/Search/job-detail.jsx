import React, { useState } from "react";
import PropTypes from "prop-types";

// Components
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// Icons
import { CircleDollarSign, Heart, MapPin, Laptop, Clock } from "lucide-react";

const JobDetail = ({ job }) => {
    const [isLiked, setIsLiked] = useState(false);

    const handleLiked = () => {
        setIsLiked(!isLiked);
    };

    if (!job) {
        return null;
    }

    return (
        <Card className="sticky top-[76px]">
            <CardHeader>
                {/* "Company logo", "job title", "company name", & "salary" container */}
                <div className="flex items-center space-x-4">
                    <img
                        src="https://placehold.co/300"
                        alt="Company logo"
                        className="aspect-square rounded-lg object-contain sm:w-24"
                    />

                    <div className="space-y-1">
                        <CardTitle>{job.title ?? ""}</CardTitle>

                        <p className="text-lg">{job.company?.name ?? ""}</p>

                        <p className="flex items-center space-x-3 text-base text-green-600">
                            <CircleDollarSign />

                            <div>{job.salary}</div>
                        </p>
                    </div>
                </div>

                {/* Action buttons container */}
                <div className="flex space-x-2 pt-3">
                    <Button className="flex-1">Apply now</Button>

                    <Button
                        variant="icon"
                        className="text-primary"
                        onClick={handleLiked}
                    >
                        <Heart className={isLiked && "fill-current"} />
                    </Button>
                </div>
            </CardHeader>

            <hr className="mx-6 mb-6" />

            <ScrollArea className="h-[calc(100vh - 16px)]">
                <CardContent>
                    {/* Section 1 */}
                    <div className="space-y-2">
                        <CardDescription className="flex items-center space-x-2">
                            <MapPin className="h-5 w-5" />

                            <p className="text-foreground">{job.location}</p>
                        </CardDescription>

                        <CardDescription className="flex items-center space-x-2">
                            <Laptop className="h-5 w-5" />

                            <p className="text-foreground">
                                {job.working_model}
                            </p>
                        </CardDescription>

                        <CardDescription className="flex items-center space-x-2">
                            <Clock className="h-5 w-5" />

                            <p className="text-foreground">{job.posted_day}</p>
                        </CardDescription>

                        <div className="flex space-x-2">
                            <span className="mr-3">Skills:</span>

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
                    </div>

                    <hr className="my-6 border-dashed" />

                    {/* Section 2 */}
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold">
                            Top 3 reasons to join us
                        </h1>

                        <ul className="list-inside list-disc">
                            <li>
                                Attractive salary package and valuable benefits
                            </li>
                            <li>
                                Get the opportunity to access global L&D
                                programs
                            </li>
                            <li>Hybrid and flexible working environment</li>
                        </ul>
                    </div>

                    <hr className="my-6 border-dashed" />

                    {/* Section 3 */}
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold">Job description</h1>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse tincidunt, arcu at accumsan
                            tempus, sem libero vehicula ipsum, in venenatis
                            massa est eu sem. Sed consequat, sem at facilisis
                            rutrum, libero orci posuere velit, eu suscipit erat
                            risus eget dolor. Cras et turpis lacus. Quisque
                            turpis dolor, tincidunt eu consectetur vitae,
                            vehicula sed sapien. Praesent leo lectus, tincidunt
                            sit amet sodales sed, ultrices ut diam. Sed tellus
                            mi, fermentum in mauris at, lobortis efficitur nibh.
                            Praesent a mauris laoreet mauris rutrum
                            pellentesque. Suspendisse rhoncus, justo nec ornare
                            commodo, purus ante fermentum metus, a rutrum odio
                            justo sed arcu. Aliquam vel congue lectus. In mi
                            lacus, tristique ut lacus eu, finibus bibendum orci.
                            Pellentesque venenatis egestas ligula. Vestibulum
                            lacus velit, cursus at odio a, vehicula dignissim
                            nisl. Suspendisse sit amet massa maximus, tempus
                            lorem quis, interdum metus. Sed fringilla elit
                            vestibulum, finibus dui vel, volutpat lacus.
                        </p>
                    </div>
                </CardContent>
            </ScrollArea>
        </Card>
    );
};

JobDetail.propTypes = {
    job: PropTypes.object,
};

export default JobDetail;
