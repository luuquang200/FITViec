import EmployeeJobNavbar from "./employee-job-navbar";
import Container from "@/components/layout/container";
import { useState } from "react";

import EmployeeJobSave from "./employee-job-save";


const EmployeeJobManagment = () => {
    const[tabOpen, setTabOpen] = useState("save");
    return (
      <div className=" min-h-screen bg-gray-200 w-full">
      <EmployeeJobNavbar />
      <EmployeeJobSave/>
    </div>
    );
};
  
export default EmployeeJobManagment;