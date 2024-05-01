// Components
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MainTablet from "@/components/layout/main-tablet";
import SearchSection from "@/components/layout/search-section"; 
import TopEmployerSection from "@/components/layout/top-employer-section";
import SearchResult from "./components/layout/search-result";
import JobDetailGuestPage from "./components/ui/job-detail-guest/job-detail-guest";

import { Routes, Route} from "react-router-dom";

function App() {
    return (
        
          <>
            <Header />
            <div className="h-[88px]"/>
            <Routes>
              <Route path="/" element={<><SearchSection/> <TopEmployerSection/></>} />
              <Route path="/job-detail" element={<MainTablet/>} />
              <Route path="/search" element={<SearchResult/>} />
              <Route path="/job-detail-guest" element={<JobDetailGuestPage/>} />
            </Routes>
            <Footer />
          </>
        
      );
}

export default App;
