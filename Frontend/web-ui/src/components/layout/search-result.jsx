import PropTypes, { number } from "prop-types";

// Components
import Container from "@/components/layout/container";
import SearchBar from "./search-bar";
import { useSearchParams } from "react-router-dom";

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
    const keyword = searchParams.get("keyword");

    const city_label = cities.find((c) => c.value === city)?.label;

    const numberOfJobs = 0;

    return (
        <div>
            <div className="bg-linear-gradient py-8">
                <Container>
                    <SearchBar inputCity={city} inputQuery={keyword} />
                </Container>
            </div>
            <div className="px-8 py-8">
                <h1 className="text-2xl font-bold text-foreground">
                    {numberOfJobs} <span className={keyword ? "text-red-500" : ""}>{keyword || "IT"}</span> {numberOfJobs == 1 ? "job" : "jobs"} in {city_label}
                </h1>
            </div>
        </div>
    );
};

SearchResult.propTypes = {
    city: PropTypes.string,
    query: PropTypes.string,
};

export default SearchResult;
