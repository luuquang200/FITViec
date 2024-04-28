// Components
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MainTablet from "@/components/layout/main-tablet";
import SearchSection from "@/components/layout/search-section"; 
import TopEmployerSection from "@/components/layout/top-employer-section";
import JobDetailGuestPage from "./components/ui/job-detail-guest/job-detail-guest";

import { Routes, Route} from "react-router-dom";

function App() {
    return (
        
          <>
            <Header />
            <Routes>
              <Route path="/" element={<><SearchSection/> <TopEmployerSection/></>} />
              <Route path="/job-detail" element={<MainTablet/>} />
              <Route path="/job-detail-guest" element={<JobDetailGuestPage/>} />
            </Routes>
            <Footer />
          </>
        
      );
}

export default App;
