import { useEffect, useRef, useState } from "react";
import JobCard from "@/components/ui/job-card";
import ApplyJobSection from "@/components/ui/job-detail-guest/apply-section";
import CompanyInfo from "@/components/ui/job-detail-guest/company-info";
import JobDetailsSection from "@/components/ui/job-detail-guest/job-details-section";
import BasicInfo from "@/components/ui/job-detail-guest/basic-info";
import JobCardSimilar from "@/components/ui/job-detail-guest/job-card";

const JobDetailGuestPage = () => {
  const [isSticky, setIsSticky] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }

    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className=" p-[30px] pb-[150px] bg-gray-200 bg-opacity-50">
        {/* Background */}
        <div className="absolute inset-0 left-[-12%] top-0 bg-linear-gradient rounded-br-[50%] rounded-bl-[70%] h-[400px] "></div>

        {/* Content Body */}
        <div className="grid grid-cols-3 gap-4 relative top-[80px]">
          {/* Information about the job */}
          <div className="col-span-2 pb-8">
            {/* Job title */}
            <div className={`top-[60px] bg-white rounded-t-md ${isSticky ? "sticky" : ""}`} style={{ zIndex: 1 }}>
              <ApplyJobSection />
            </div>

            <BasicInfo />

            {/* Job description */}
            <div id="job-detail-section" style={{ zIndex: 0 }}>
              <JobDetailsSection />
            </div>

            {/* <SimilarJobsSection /> */}
            <h2 className="similar-jobs-title">Việc làm tương tự dành cho bạn</h2>
            <div className="email-notification">
              <div className="notification-text">Nhận các việc làm tương tự qua email</div>
              <button className="notification-button">
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a712dabd9eea41313a1d865e4b2206ec7985cb6ecefbca9eac944936af76bc5d?apiKey=1293b2add2d347908b4e11760098fdbe&" alt="" className="notification-icon" />
                <span className="button-text">Nhận thông báo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <JobCardSimilar
                labels={["Android", "Kotlin", "Flutter"]}
                time="Đăng 5 ngày trước"
                companyLogo="https://cdn.builder.io/api/v1/image/assets/TEMP/d5cef94958a49fc66e4384dee5b730d0cb3317ed17f0641d763a3b0d3ae906be?apiKey=1293b2add2d347908b4e11760098fdbe&"
                companyName="FuelCloud"
                salary="Đăng nhập để xem mức lương"
                position="Tại văn phòng"
                location="Hồ Chí Minh"
                tag="Hot"
                jobTitle="Senior Android Developer (Kotlin, Flutter)"
              />
              <JobCardSimilar
                labels={["Android", "Kotlin", "Flutter"]}
                time="Đăng 5 ngày trước"
                companyLogo="https://cdn.builder.io/api/v1/image/assets/TEMP/d5cef94958a49fc66e4384dee5b730d0cb3317ed17f0641d763a3b0d3ae906be?apiKey=1293b2add2d347908b4e11760098fdbe&"
                companyName="FuelCloud"
                salary="Đăng nhập để xem mức lương"
                position="Tại văn phòng"
                location="Hồ Chí Minh"
                tag="Hot"
                jobTitle="Senior Android Developer (Kotlin, Flutter)"
              />
              <JobCardSimilar
                labels={["Android", "Kotlin", "Flutter"]}
                time="Đăng 5 ngày trước"
                companyLogo="https://cdn.builder.io/api/v1/image/assets/TEMP/d5cef94958a49fc66e4384dee5b730d0cb3317ed17f0641d763a3b0d3ae906be?apiKey=1293b2add2d347908b4e11760098fdbe&"
                companyName="FuelCloud"
                salary="Đăng nhập để xem mức lương"
                position="Tại văn phòng"
                location="Hồ Chí Minh"
                tag="Hot"
                jobTitle="Senior Android Developer (Kotlin, Flutter)"
              />


            </div>


          </div>

          {/* Description about Company */}
          <div className="col-span-1 max-w-[420px] ">
            <div id="company-info" className={`top-[60px] sticky`}>
              <CompanyInfo />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        
        .similar-jobs-title {
          color: #121212;
          width: 100%;
          margin-top: 30px;
          font: 700 22px Lexend, sans-serif;
        }
        
        @media (max-width: 991px) {
          .similar-jobs-title {
            max-width: 100%;
          }
        }
        
        .email-notification {
          justify-content: center;
          border-radius: 8px;
          box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.08);
          background-color: #fff;
          display: flex;
          margin-top: 27px;
          width: 100%;
          gap: 20px;
          font-size: 16px;
          text-align: center;
          padding: 24px 17px;
        }
        
        @media (max-width: 991px) {
          .email-notification {
            max-width: 100%;
            flex-wrap: wrap;
          }
        }
        
        .notification-text {
          color: #121212;
          font-family: Lexend, sans-serif;
          font-weight: 400;
          flex-grow: 1;
          flex-basis: auto;
          margin: auto 0;
          text-align: start;
        }
        
        .notification-button {
          justify-content: center;
          border-radius: 4px;
          border: 1px solid #ed1b2f;
          background-color: #fff;
          display: flex;
          gap: 9px;
          color: #ed1b2f;
          font-weight: 500;
          padding: 10px 21px;
          cursor: pointer;
        }
        
        @media (max-width: 991px) {
          .notification-button {
            padding: 0 20px;
          }
        }
        
        .notification-icon {
          width: 20px;
          height: 20px;
        }
        
        .button-text {
          font-family: Lexend, sans-serif;
          flex-grow: 1;
          flex-basis: auto;
        }
        
      `}</style>
    </>
  );
};



export default JobDetailGuestPage;
