import { useEffect } from "react";
import { useAuth } from "@/contexts/authContext";
import { useNavigate } from "react-router-dom";

// Components
import SearchSection from "@/components/layout/search-section";
import TopEmployerSection from "@/components/layout/top-employer-section";

function HomePage() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            if (currentUser.role === "employer") {
                navigate("/employer");
            } else if (currentUser.role === "admin") {
                navigate("/admin");
            }
        }
    }, [currentUser]);

    return (
        <>
            <SearchSection /> <TopEmployerSection />
        </>
    );
}

export default HomePage;
