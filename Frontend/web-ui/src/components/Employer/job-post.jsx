/*
{
  "job_id": "123e4567-e89b-12d3-a456-426614174000",
  "employer_id": "123e4567-e89b-12d3-a456-426614174000",
  "job_salary": 100000,
  "job_title": "Software Engineer",
  "job_location": "New York",
  "job_type": "Full-time",
  "post_at": "2021-09-01T00:00:00Z",
  "job_skills": "Java, Python, C++",
  "job_top_reasons": "Good salary, Good benefits, Good work-life balance",
  "job_description": "We are looking for a software engineer to join our team. You will be responsible for developing software applications and maintaining existing software applications. You will work with a team of software engineers to develop software applications that meet the needs of our customers. You will also work with other departments to ensure that software applications meet the needs of the business. You will be responsible for writing code, testing code, and debugging code. You will also be responsible for documenting code and providing support to other software engineers. You will work with other departments to ensure that software applications meet the needs of the business. You will be responsible for writing code, testing code, and debugging code. You will also be responsible for documenting code and providing support to other software engineers.",
  "job_responsibility": "Develop software applications, Maintain existing software applications, Work with a team of software engineers, Develop software applications that meet the needs of our customers, Work with other departments to ensure that software applications meet the needs of the business, Write code, Test code, Debug code, Document code, Provide support to other software engineers",
  "job_requirements": "Bachelor's degree in computer science or related field, 3 years of experience in software development, Proficient in Java, Python, C++, Strong problem-solving skills, Strong communication skills, Ability to work in a team environment, Ability to work independently, Ability to work under pressure",
  "job_benefits": "Competitive salary, Health insurance, Dental insurance, Vision insurance, 401(k) plan, Paid time off, Flexible work schedule, Remote work option",
}
 */
// Components
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const JobPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [jobDescription, setJobDescription] = useState("");
  const [jobResponsibility, setJobResponsibility] = useState("");
  const [jobRequirements, setJobRequirements] = useState("");

  const onSubmit = (data) => {
    // Here, you can send the form data to the server using fetch or Axios
    data.job_description = jobDescription;
    data.job_responsibility = jobResponsibility;
    data.job_requirements = jobRequirements;
    console.log(data);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="space-y-6">
          <div className="relative mb-6">
            <input
              type="text"
              id="job_title"
              {...register("job_title", { required: true })}
              className="peer block w-full border border-gray-300 rounded-lg px-3 pt-6 pb-2 focus:outline-[4px] focus:outline-green-200 focus:outline focus:outline-solid"
              placeholder=" "
            />
            <label
              htmlFor="job_title"
              className="absolute top-0 left-3 px-1 my-2 text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-3 text-sm"
            >
              Job Title
              <span className="text-red-500 ml-1">*</span>
            </label>
            {errors.job_title && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="relative mb-6">
            <input
              type="text"
              id="job_location"
              {...register("job_location", { required: true })}
              className="peer block w-full border border-gray-300 rounded-lg px-3 pt-6 pb-2 focus:outline-[4px]  focus:outline-green-200 focus:outline focus:outline-solid"
              placeholder=" "
            />
            <label
              htmlFor="job_location"
              className="absolute top-0 left-3 px-1 my-2 text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-3  text-sm"
            >
              Job Location
              <span className="text-red-500 ml-1">*</span>
            </label>
            {errors.job_location && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="relative mb-6">
            <input
              type="text"
              id="job_type"
              {...register("job_type", { required: true })}
              className="peer block w-full border border-gray-300 rounded-lg px-3 pt-6 pb-2 focus:outline-[4px]  focus:outline-green-200 focus:outline focus:outline-solid"
              placeholder=" "
            />
            <label
              htmlFor="job_type"
              className="absolute top-0 left-3 px-1 my-2 text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-3  text-sm"
            >
              Job Type
              <span className="text-red-500 ml-1">*</span>
            </label>
            {errors.job_type && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="relative mb-6">
            <input
              type="text"
              id="job_salary"
              {...register("job_salary", { required: true })}
              className="peer block w-full border border-gray-300 rounded-lg px-3 pt-6 pb-2 focus:outline-[4px]  focus:outline-green-200 focus:outline focus:outline-solid"
              placeholder=" "
            />
            <label
              htmlFor="job_salary"
              className="absolute top-0 left-3 px-1 my-2 text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-3  text-sm"
            >
              Job Salary
              <span className="text-red-500 ml-1">*</span>
            </label>
            {errors.job_salary && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="relative mb-6">
            <input
              type="text"
              id="job_skills"
              {...register("job_skills", { required: true })}
              className="peer block w-full border border-gray-300 rounded-lg px-3 pt-6 pb-2 focus:outline-[4px]  focus:outline-green-200 focus:outline focus:outline-solid"
              placeholder=" "
            />
            <label
              htmlFor="job_skills"
              className="absolute top-0 left-3 px-1 my-2 text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-3  text-sm"
            >
              Job Skills
              <span className="text-red-500 ml-1">*</span>
            </label>
            {errors.job_skills && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="relative mb-6">
            <input
              type="text"
              id="job_top_reasons"
              {...register("job_top_reasons", { required: true })}
              className="peer block w-full border border-gray-300 rounded-lg px-3 pt-6 pb-2 focus:outline-[4px]  focus:outline-green-200 focus:outline focus:outline-solid"
              placeholder=" "
            />
            <label
              htmlFor="job_top_reasons"
              className="absolute top-0 left-3 px-1 my-2 text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-3  text-sm"
            >
              Job Top Reasons
              <span className="text-red-500 ml-1">*</span>
            </label>
            {errors.job_top_reasons && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="relative mb-6">
            <textarea
              rows={5}
              type="text"
              id="job_benefits"
              {...register("job_benefits", { required: true })}
              className="peer block w-full border border-gray-300 rounded-lg px-3 pt-6 pb-2 focus:outline-[4px] focus:outline-green-200 focus:outline focus:outline-solid"
              placeholder=" "
            />
            <label
              htmlFor="job_benefits"
              className="absolute top-0 left-3 px-1 my-2 text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-3 text-sm"
            >
              Job Benefits
              <span className="text-red-500 ml-1">*</span>
            </label>
            {errors.job_benefits && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="job_description" className="block mb-2 font-medium">
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
                console.log(setJobRequirements(editor.getData()));
              }}
              className="border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <button
          type="submit"
          className="col-span-2 mt-4 bg-[#ED1B2F] hover:bg-red-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default JobPost;
