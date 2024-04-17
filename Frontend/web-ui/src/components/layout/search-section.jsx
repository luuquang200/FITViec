// Components
import Container from "@/components/layout/container";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Search, MapPin } from "lucide-react";

const trendingNow = [
    "Java",
    "ReactJS",
    ".NET",
    "Tester",
    "PHP",
    "Business Analyst",
    "NodeJS",
    "Manager",
];

const SearchSection = () => {
    return (
        <div className="bg-linear-gradient py-16 pt-36">
            <Container>
                <h1 className="text-2xl font-bold text-background">
                    1,031 IT Jobs For "Chất" Developers
                </h1>

                <div className="mt-8 grid grid-cols-5 gap-x-2">
                    <Select>
                        <SelectTrigger>
                            <SelectValue
                                placeholder={
                                    <div className="flex items-center">
                                        <MapPin className="mr-1 text-muted-foreground" />{" "}
                                        All Cities
                                    </div>
                                }
                            />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All Cities</SelectItem>
                                <SelectItem value="hcm">Ho Chi Minh</SelectItem>
                                <SelectItem value="hn">Ha Noi</SelectItem>
                                <SelectItem value="dn">Da Nang</SelectItem>
                                <SelectItem value="others">Others</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Input
                        type="text"
                        placeholder="Enter keyword skill (Java, iOS,...), job title, company,..."
                        className="col-span-3"
                    />

                    <Button>
                        <Search className="mr-2" />
                        Search
                    </Button>
                </div>

                <div className="mt-8 flex flex-wrap items-center space-x-4">
                    <h1 className="text-lg text-background">Trending now:</h1>

                    {trendingNow.map((item, index) => (
                        <Badge
                            key={index}
                            variant="outline"
                            className="border-muted-foreground text-base font-normal text-background"
                        >
                            {item}
                        </Badge>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default SearchSection;
