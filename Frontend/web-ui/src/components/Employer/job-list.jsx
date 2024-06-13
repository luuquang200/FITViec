import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/*
{
  "employerId": "string",
  "jobId": "string",
  "jobTitle": "string",
  "jobDescription": "string",
  "jobLocation": "string",
  "jobType": "string",
  "jobCategory": "string",
  "jobSalary": "string",
  "postedAt": "string",
  "closingAt": "string"
}
*/
const mockData = [
  {
    employerId: "1",
    jobId: "1",
    jobTitle: "Software Engineer",
    jobDescription: "Developing software",
    jobLocation: "Bangalore",
    jobType: "Full Time",
    jobCategory: "Software",
    jobSalary: "10LPA",
    postedAt: "2021-08-01",
    closingAt: "2021-08-15",
  },
  {
    employerId: "2",
    jobId: "2",
    jobTitle: "Software Engineer",
    jobDescription: "Developing software",
    jobLocation: "Bangalore",
    jobType: "Full Time",
    jobCategory: "Software",
    jobSalary: "10LPA",
    postedAt: "2021-08-01",
    closingAt: "2021-08-15",
  },
  {
    employerId: "3",
    jobId: "3",
    jobTitle: "Software Engineer",
    jobDescription: "Developing software",
    jobLocation: "Bangalore",
    jobType: "Full Time",
    jobCategory: "Software",
    jobSalary: "10LPA",
    postedAt: "2021-08-01",
    closingAt: "2021-08-15",
  },
  {
    employerId: "4",
    jobId: "4",
    jobTitle: "Software Engineer",
    jobDescription: "Developing software",
    jobLocation: "Bangalore",
    jobType: "Full Time",
    jobCategory: "Software",
    jobSalary: "10LPA",
    postedAt: "2021-08-01",
    closingAt: "2021-08-15",
  },
  {
    employerId: "5",
    jobId: "5",
    jobTitle: "Software Engineer",
    jobDescription: "Developing software",
    jobLocation: "Bangalore",
    jobType: "Full Time",
    jobCategory: "Software",
    jobSalary: "10LPA",
    postedAt: "2021-08-01",
    closingAt: "2021-08-15",
  },
  {
    employerId: "6",
    jobId: "6",
    jobTitle: "Software Engineer",
    jobDescription: "Developing software",
    jobLocation: "Bangalore",
    jobType: "Full Time",
    jobCategory: "Software",
    jobSalary: "10LPA",
    postedAt: "2021-08-01",
    closingAt: "2021-08-15",
  },
];

const JobList = () => {
  const [searchResults, setSearchResults] = useState(mockData);
  const handleSearch = (value) => {
    const results = mockData.filter((item) => {
      return item.jobTitle.toLowerCase().includes(value.toLowerCase());
    });
    setSearchResults(results);
  };

  return (
    <>
      <Input
        type="text"
        onInput={(e) => handleSearch(e.target.value)}
        placeholder="Search"
      />
      <Search />
      {searchResults.length === 0 ? (
        <p>No results found</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Job ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Posted Day</TableHead>
              <TableHead>Expired Day</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {searchResults.map((item) => (
              <TableRow key={item.jobId}>
                <TableCell className="font-medium">{item.jobId}</TableCell>
                <TableCell>{item.jobTitle}</TableCell>
                <TableCell>{item.jobLocation}</TableCell>
                <TableCell>{item.jobSalary}</TableCell>
                <TableCell>
                  {item.closingAt > new Date().toISOString()
                    ? "Active"
                    : "Expired"}
                </TableCell>
                <TableCell>{item.postedAt}</TableCell>
                <TableCell>{item.closingAt}</TableCell>
                <TableCell>
                  <button className="text-blue-500">View</button>
                  <button className="text-red-500">Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default JobList;
