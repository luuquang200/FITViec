import { useEffect } from "react";
import { useAuth } from "@/contexts/authContext";
import { useNavigate } from "react-router-dom";

// Components
import SearchSection from "@/components/pages/home-page/search-section";
import TopEmployerSection from "@/components/pages/home-page/top-employer-section";
import UserProFileSection from "@/components/layout/user-profile-section";

function HomePage() {
    const { userLoggedIn, currentUser } = useAuth();
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
            <SearchSection />

            {userLoggedIn && <UserProFileSection />}

            <TopEmployerSection />
        </>
    );
}

export default HomePage;
