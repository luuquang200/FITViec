// Components
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Assets
import CardBackgroundSVG from "@/assets/bg-top-emp.svg";
import { ChevronRight } from "lucide-react";

const EmployerCard = ({ employer }) => {
    const { name, logo, skillRequired, location, numOfJobs } = employer;

    return (
        <Card className="relative flex cursor-pointer flex-col justify-between bg-muted/20">
            <div className="absolute">
                <img src={CardBackgroundSVG} alt="Footer image" />
            </div>

            <CardContent className="px-28 pt-10">
                <div className="relative aspect-square cursor-default overflow-hidden rounded-xl bg-white shadow-xl">
                    <img
                        src={logo}
                        alt={name}
                        className="aspect-square w-full object-contain"
                    />
                </div>
            </CardContent>

            <CardContent>
                <div className="flex flex-col items-center space-y-2">
                    <p className="line-clamp-3 text-lg font-semibold">{name}</p>

                    <div className="flex flex-wrap space-x-2 pt-2">
                        {skillRequired.map((skill, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="text-sm font-normal"
                            >
                                {skill}
                            </Badge>
                        ))}
                    </div>
                    {/* <Badge variant="secondary" className="text-sm font-normal">
                        Java
                    </Badge> */}
                </div>
            </CardContent>

            <CardFooter className="flex justify-between bg-muted py-5">
                <h1 className="text-sm">{location}</h1>

                <Button
                    variant="link"
                    size="sm"
                    className="h-min p-0 text-foreground hover:no-underline"
                >
                    {numOfJobs} Jobs <ChevronRight />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default EmployerCard;
