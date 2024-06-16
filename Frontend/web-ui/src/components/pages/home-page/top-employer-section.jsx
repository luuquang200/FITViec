import { useEffect, useState } from "react";

// Components
import Container from "@/components/layout/container";
import EmployerCard from "@/components/employer-card";

// Assets
import ClipLoader from "react-spinners/ClipLoader";

const TopEmployerSection = () => {
    const [isFetchingEmployers, setIsFetchingEmployers] = useState(false);
    const [employers, setEmployers] = useState([]);

    useEffect(() => {
        const fetchTopEmployers = async () => {
            setIsFetchingEmployers(true);

            try {
                const response = await fetch(
                    "https://employer-service-otwul2bnna-uc.a.run.app/employer/get-top",
                );
                let data = await response.json();

                setEmployers(data.data);

                setIsFetchingEmployers(false);
            } catch (error) {
                console.error(error);

                setIsFetchingEmployers(false);
            }
        };

        fetchTopEmployers();
    }, []);

    return (
        <Container className="py-16 text-center">
            <h1 className="pb-16 text-2xl font-bold text-foreground">
                Top Employers
            </h1>

            {isFetchingEmployers ? (
                <div className="flex items-center justify-center py-4">
                    <ClipLoader color="red" size={100} speedMultiplier={1} />
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-6">
                    {employers.map((employer, index) => (
                        <EmployerCard key={index} employer={employer} />
                    ))}
                </div>
            )}
        </Container>
    );
};

export default TopEmployerSection;
