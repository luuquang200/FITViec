import { Routes, Route } from "react-router-dom";
// Components
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MainTablet from "@/components/layout/main-tablet";
import SearchSection from "@/components/layout/search-section";
import TopEmployerSection from "@/components/layout/top-employer-section";
import SearchResult from "./components/layout/search-result";
import JobDetailGuestPage from "./components/ui/job-detail-guest/job-detail-guest";
import ProfileManagement from "./components/profile/profile-management";

import SignIn from "./components/Authentications/signin";
import SignUp from "./components/Authentications/signup";
import VerifyEmail from "./components/Authentications/verify-email";
import ForgotPassword from "./components/Authentications/forgot-password";
import ResetPassword from "./components/Authentications/reset-password";

import { AuthProvider } from "./contexts/authContext";
import ToastContainerNotification from "./components/Notifications/ToastContainerNotification";
import ProtectedRouteVerify from "./lib/protect-verify-email";

function App() {
    return (
        <AuthProvider>
            <ToastContainerNotification />
            <Header />
            <div className="h-[88px]" />
            <Routes>
                <Route path="/sign_in" element={<SignIn />} />
                <Route path="/sign_up" element={<SignUp />} />
                <Route
                    path="/"
                    element={
                        <>
                            <SearchSection /> <TopEmployerSection />
                        </>
                    }
                />
                <Route path="/job-detail" element={<MainTablet />} />
                <Route path="/search" element={<SearchResult />} />
                <Route
                    path="/job-detail-guest"
                    element={<JobDetailGuestPage />}
                />
                <Route path="/profile-cv" element={<ProfileManagement />} />
                <Route path="/profile-cv" element={<ProfileManagement />} />
                <Route
                    path="/verify_email"
                    element={
                        <ProtectedRouteVerify>
                            <VerifyEmail />
                        </ProtectedRouteVerify>
                    }
                />
                <Route path="/forgot_password" element={<ForgotPassword />} />
                <Route path="/reset_password" element={<ResetPassword />} />
            </Routes>
            <Footer />
        </AuthProvider>
    );
}

export default App;
