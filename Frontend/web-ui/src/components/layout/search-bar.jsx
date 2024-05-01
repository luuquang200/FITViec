import React from "react";
import PropTypes from "prop-types";

// Components
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

import { Search, MapPin } from "lucide-react";

const cities = [
    { value: "all", label: "All Cities" },
    { value: "hcm", label: "Ho Chi Minh" },
    { value: "hn", label: "Ha Noi" },
    { value: "dn", label: "Da Nang" },
    { value: "others", label: "Others" },
]

const SearchBar = ({inputCity, inputQuery}) => {

    const openSearchPage = () => {
        // Get the value of the input text
        const keyword = document.getElementById('keyword').value;

        // Navigate to the search page
        window.location.href = `/search?keyword=${keyword}&city=${city}`;
    };

    const [city, setCity] = React.useState(inputCity || "all");

    return (
        <div className="mt-8 grid grid-cols-5 gap-x-2">
            <Select value={city} onValueChange={setCity}>
                <SelectTrigger>
                    <div className="flex items-center">
                        <MapPin className="mr-1 text-muted-foreground" />{" "}
                        <SelectValue />
                    </div>
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        {cities.map((city) => (
                            <SelectItem key={city.value} value={city.value}>
                                {city.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Input
                id="keyword"
                type="text"
                placeholder="Enter keyword skill (Java, iOS,...), job title, company,..."
                className="col-span-3"
                defaultValue={inputQuery}
            />

            <Button onClick={openSearchPage}>
                <Search className="mr-2" />
                Search
            </Button>
        </div>
    );
};


SearchBar.propTypes = {
    inputCity: PropTypes.string,
    inputQuery: PropTypes.string,
};

export default SearchBar;
