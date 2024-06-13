import { useState } from "react";
import { User, Briefcase, LayoutDashboard } from "lucide-react";

const adminUser = {
    avatar: "https://cdn-icons-png.flaticon.com/512/9703/9703596.png",
    name: "Adminstrator",
    email: "fitviec@gmail.com",
};

const AdminSidebar = ({ onTabChange }) => {
    const [activeTab, setActiveTab] = useState("job-management");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        onTabChange(tab); // Notify parent component of tab change
    };

    const getTabClassName = (tab) =>
        `flex items-center cursor-pointer p-3 rounded-lg transition-colors duration-200 ${
            activeTab === tab
                ? "text-red-500 bg-red-100"
                : "text-gray-900 hover:bg-gray-200"
        }`;

    return (
        <div className="fixed min-h-screen w-64 bg-gray-100 p-6 text-gray-900 shadow-lg">
            <div className="mb-8 flex items-center">
                <img
                    src={adminUser.avatar}
                    alt="Avatar"
                    className="mr-3 h-12 w-12 rounded-full border-2 border-gray-300"
                />
                <div>
                    <p className="text-base font-semibold">{adminUser.name}</p>
                    <p className="text-sm text-gray-500">{adminUser.email}</p>
                </div>
            </div>
            <ul className="space-y-3">
                <li
                    className={getTabClassName("employer-management")}
                    onClick={() => handleTabChange("employer-management")}
                >
                    <User className="mr-4 h-5 w-5" />
                    <span className="flex-grow">Employers Management</span>
                </li>
                <li
                    className={getTabClassName("job-management")}
                    onClick={() => handleTabChange("job-management")}
                >
                    <Briefcase className="mr-4 h-5 w-5" />
                    <span className="flex-grow">Job Posts Management</span>
                </li>
            </ul>
        </div>
    );
};

export default AdminSidebar;
