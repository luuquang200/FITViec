import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/authContext";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ClipLoader } from "react-spinners";

const JobList = () => {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getJobList = async () => {
    try {
      const response = await fetch(
        "https://employer-service-otwul2bnna-uc.a.run.app/employer/get-all-jobs",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${currentUser.accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        return response.json().then((data) => {
          return data;
        });
      }
    } catch {
      console.log("Error");
    }
  };

  const deleteJob = async (employerId, jobId) => {
    try {
      const response = await fetch(
        `https://employer-service-otwul2bnna-uc.a.run.app/employer/delete-job?employerId=${employerId}&jobId=${jobId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${currentUser.accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        return response.json().then((data) => {
          return data;
        });
      }
    } catch {
      console.log("Error");
    }
  };

  const handleSearch = (value) => {
    const results = jobs.filter((item) => {
      return item.jobTitle.toLowerCase().includes(value.toLowerCase());
    });
    setSearchResults(results);
  };

  const handleDelete = async (id) => {
    const results = searchResults.filter((item) => {
      return item.jobId !== id;
    });
    setSearchResults(results);
    await deleteJob(currentUser.uid, id);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [jobDescription, setJobDescription] = useState("");
  const [jobResponsibility, setJobResponsibility] = useState("");
  const [jobRequirements, setJobRequirements] = useState("");

  const onSubmit = (data) => {
    data.job_description = jobDescription;
    data.job_responsibility = jobResponsibility;
    data.job_requirements = jobRequirements;
    console.log(data);
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const res = await getJobList();
      setJobs(res);
      setSearchResults(res);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center py-4">
        <div className="w-1/2 flex">
          <Input
            type="text"
            onInput={(e) => handleSearch(e.target.value)}
            placeholder="Search"
            className="w-4/5 px-3 py-2 border rounded"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <ClipLoader
            color="rgba(239, 68, 68, 1)"
            size={40}
            speedMultiplier={1}
            className="mt-4 "
          />
        </div>
      ) : searchResults.length === 0 ? (
        <p className="text-center">No results found</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/5">Job ID</TableHead>
              <TableHead className="w-1/4">Job Title</TableHead>
              <TableHead className="w-1/4">Location</TableHead>
              <TableHead className="w-1/6">Salary</TableHead>
              <TableHead className="w-1/8">Status</TableHead>
              <TableHead className="w-1/7 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {searchResults.map((item) => (
              <TableRow key={item.jobId}>
                <TableCell className="font-medium">{item.jobId}</TableCell>
                <TableCell>{item.jobTitle}</TableCell>
                <TableCell className="break-words">
                  {item.jobLocation}
                </TableCell>
                <TableCell>{item.jobSalary}</TableCell>
                <TableCell
                  className={
                    item.jobStatus === "approved"
                      ? "text-green-600"
                      : item.jobStatus === "pending"
                      ? "text-gray-600"
                      : "text-red-600"
                  }
                >
                  {item.jobStatus}
                </TableCell>
                <TableCell className="flex flex-col">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="bg-blue-500 text-white px-2 py-1 mb-1 rounded text-center">
                        Edit
                      </button>
                    </DialogTrigger>
                    <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-screen">
                      <DialogHeader>
                        <DialogTitle>Edit job</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-6">
                          <div className="relative mb-6">
                            <input
                              type="text"
                              id="job_title"
                              {...register("job_title", { required: true })}
                              className="peer block w-full border border-gray-300 rounded-lg px-3 pt-6 pb-2 focus:outline-[4px] focus:outline-green-200 focus:outline focus:outline-solid"
                              defaultValue={item.jobTitle}
                            />
                            <label
                              htmlFor="job_title"
                              className="absolute top-0 left-3 px-1 my-2 text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-3 text-sm"
                            >
                              Job Title
                              <span className="text-red-500 ml-1">*</span>
                            </label>
                            {errors.job_title && (
                              <span className="px-3 text-red-600">
                                This field is required
                              </span>
                            )}
                          </div>

                          <div className="relative mb-6">
                            <input
                              type="text"
                              id="job_location"
                              {...register("job_location", { required: true })}
                              className="peer block w-full border border-gray-300 rounded-lg px-3 pt-6 pb-2 focus:outline-[4px]  focus:outline-green-200 focus:outline focus:outline-solid"
                              defaultValue={item.jobLocation}
                            />
                            <label
                              htmlFor="job_location"
                              className="absolute top-0 left-3 px-1 my-2 text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-3  text-sm"
                            >
                              Job Location
                              <span className="text-red-500 ml-1">*</span>
                            </label>
                            {errors.job_location && (
                              <span className="px-3 text-red-600">
                                This field is required
                              </span>
                            )}
                          </div>
                          <div className="relative mb-6">
                            <input
                              type="text"
                              id="job_type"
                              {...register("job_type", { required: true })}
                              className="peer block w-full border border-gray-300 rounded-lg px-3 pt-6 pb-2 focus:outline-[4px]  focus:outline-green-200 focus:outline focus:outline-solid"
                              defaultValue={item.jobType}
                            />
                            <label
                              htmlFor="job_type"
                              className="absolute top-0 left-3 px-1 my-2 text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-3  text-sm"
                            >
                              Job Type
                              <span className="text-red-500 ml-1">*</span>
                            </label>
                            {errors.job_type && (
                              <span className="px-3 text-red-600">
                                This field is required
                              </span>
                            )}
                          </div>
                          <div className="relative mb-6">
                            <input
                              type="text"
                              id="job_salary"
                              {...register("job_salary", { required: true })}
                              className="peer block w-full border border-gray-300 rounded-lg px-3 pt-6 pb-2 focus:outline-[4px]  focus:outline-green-200 focus:outline focus:outline-solid"
                              defaultValue={item.jobSalary}
                            />
                            <label
                              htmlFor="job_salary"
                              className="absolute top-0 left-3 px-1 my-2 text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-3  text-sm"
                            >
                              Job Salary
                              <span className="text-red-500 ml-1">*</span>
                            </label>
                            {errors.job_salary && (
                              <span className="px-3 text-red-600">
                                This field is required
                              </span>
                            )}
                          </div>

                          <div className="relative mb-6">
                            <input
                              type="text"
                              id="job_skills"
                              {...register("job_skills", { required: true })}
                              className="peer block w-full border border-gray-300 rounded-lg px-3 pt-6 pb-2 focus:outline-[4px]  focus:outline-green-200 focus:outline focus:outline-solid"
                              defaultValue={item.jobSkills}
                            />
                            <label
                              htmlFor="job_skills"
                              className="absolute top-0 left-3 px-1 my-2 text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-3  text-sm"
                            >
                              Job Skills
                              <span className="text-red-500 ml-1">*</span>
                            </label>
                            {errors.job_skills && (
                              <span className="px-3 text-red-600">
                                This field is required
                              </span>
                            )}
                          </div>

                          <div className="relative mb-6">
                            <input
                              type="text"
                              id="job_top_reasons"
                              {...register("job_top_reasons", {
                                required: true,
                              })}
                              className="peer block w-full border border-gray-300 rounded-lg px-3 pt-6 pb-2 focus:outline-[4px]  focus:outline-green-200 focus:outline focus:outline-solid"
                              defaultValue={item.jobTopReasons}
                            />
                            <label
                              htmlFor="job_top_reasons"
                              className="absolute top-0 left-3 px-1 my-2 text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-3  text-sm"
                            >
                              Job Top Reasons
                              <span className="text-red-500 ml-1">*</span>
                            </label>
                            {errors.job_top_reasons && (
                              <span className="px-3 text-red-600">
                                This field is required
                              </span>
                            )}
                          </div>

                          <div className="relative mb-6">
                            <textarea
                              rows={5}
                              type="text"
                              id="job_benefits"
                              {...register("job_benefits", { required: true })}
                              className="peer block w-full border border-gray-300 rounded-lg px-3 pt-6 pb-2 focus:outline-[4px] focus:outline-green-200 focus:outline focus:outline-solid"
                              defaultValue={item.jobBenefits}
                            />
                            <label
                              htmlFor="job_benefits"
                              className="absolute top-0 left-3 px-1 my-2 text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-3 text-sm"
                            >
                              Job Benefits
                              <span className="text-red-500 ml-1">*</span>
                            </label>
                            {errors.job_benefits && (
                              <span className="px-3 text-red-600">
                                This field is required
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <label
                              htmlFor="job_description"
                              className="block mb-2 font-medium"
                            >
                              Job Description
                            </label>
                            <CKEditor
                              onReady={(editor) => {
                                editor.editing.view.change((writer) => {
                                  writer.setStyle(
                                    "height",
                                    "8rem",
                                    editor.editing.view.document.getRoot()
                                  );
                                });
                              }}
                              editor={ClassicEditor}
                              data=""
                              onChange={(event, editor) => {
                                setJobDescription(editor.getData());
                              }}
                              className="border border-gray-300 rounded-lg"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="job_responsibility"
                              className="block mb-2 font-medium"
                            >
                              Job Responsibility
                            </label>
                            <CKEditor
                              onReady={(editor) => {
                                editor.editing.view.change((writer) => {
                                  writer.setStyle(
                                    "height",
                                    "8rem",
                                    editor.editing.view.document.getRoot()
                                  );
                                });
                              }}
                              editor={ClassicEditor}
                              data=""
                              onChange={(event, editor) => {
                                setJobResponsibility(editor.getData());
                              }}
                              className="border border-gray-300 rounded-lg"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="job_requirements"
                              className="block mb-2 font-medium"
                            >
                              Job Requirements
                            </label>
                            <CKEditor
                              onReady={(editor) => {
                                editor.editing.view.change((writer) => {
                                  writer.setStyle(
                                    "height",
                                    "8rem",
                                    editor.editing.view.document.getRoot()
                                  );
                                });
                              }}
                              editor={ClassicEditor}
                              data=""
                              onChange={(event, editor) => {
                                setJobRequirements(editor.getData());
                              }}
                              className="border border-gray-300 rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handleSubmit(onSubmit)}>
                          Save changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded text-center"
                    onClick={(e) => handleDelete(item.jobId)}
                  >
                    Delete
                  </button>
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
