import React, { useState } from "react";
import AdminSidebar from "./admin-sidebar";
import EmployerManagement from "./employers-management";
import JobManagement from "./jobs-management";
import JobDetail from "./job-detail";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [selectedJob, setSelectedJob] = useState(null);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSelectedJob(null); // Reset selected job when changing tabs
    };

    const renderContent = () => {
        if (selectedJob) {
            return (
                <JobDetail
                    job={selectedJob}
                    onBack={() => setSelectedJob(null)}
                />
            );
        }
        switch (activeTab) {
            case "employer-management":
                return <EmployerManagement />;
            case "job-management":
                return <JobManagement onSelectJob={setSelectedJob} />;
            default:
                return <JobManagement onSelectJob={setSelectedJob} />;
        }
    };

    return (
        <div className="flex">
            <AdminSidebar onTabChange={handleTabChange} />
            <div className="ml-64 w-4/5 p-4">{renderContent()}</div>
        </div>
    );
};

export default AdminDashboard;
