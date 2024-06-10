/*
{
  "employerId": "string",
  "companyName": "string",
  "companyType": "string",
  "companySize": "string",
  "country": "string",
  "workingDays": "string",
  "overtimePolicy": "string",
  "companyOverview": "string",
  "keySkills": "string",
  "whyLoveWorkingHere": "string",
  "logoUrl": "string",
  "location": "string",
  "workType": "string",
  "images": [
    "string"
  ]
}
*/

import React from "react";
import Select from "react-select";
import { useState } from "react";
import { useForm, Controller, set } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Grid } from "lucide-react";

const companyTypeData = [
  { value: "IT Product", label: "IT Product" },
  { value: "IT Outsourcing", label: "IT Outsourcing" },
];

const companySizeData = [
  { value: "1-20", label: "1-20" },
  { value: "21-50", label: "21-50" },
  { value: "51-100", label: "51-100" },
  { value: "101-200", label: "101-200" },
  { value: "201-500", label: "201-500" },
  { value: "501-1000", label: "501-1000" },
  { value: "1000+", label: "1000+" },
];

const workingDaysData = [
  { value: "Monday - Friday", label: "Monday - Friday" },
  { value: "Monday - Saturday", label: "Monday - Saturday" },
];

const overtimePolicyData = [
  { value: "Yes", label: "Yes" },
  { value: "No OT", label: "No OT" },
];

const EmployerProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const [companyType, setCompanyType] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [workingDays, setWorkingDays] = useState("");
  const [overtimePolicy, setOvertimePolicy] = useState("");
  const [companyOverview, setCompanyOverview] = useState("");
  const [whyLoveWorkingHere, setWhyLoveWorkingHere] = useState("");

  const onSubmit = (data) => {
    // Here, you can send the form data to the server using fetch or Axios
    data.companyType = companyType;
    data.companySize = companySize;
    data.workingDays = workingDays;
    data.overtimePolicy = overtimePolicy;
    data.companyOverview = companyOverview;
    data.whyLoveWorkingHere = whyLoveWorkingHere;
    console.log(data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="col-span-2 space-y-6">
          <div className="relative mb-6">
            <input
              type="text"
              id="company_name"
              {...register("companyName", { required: true })}
              className="peer block w-full border border-gray-300 rounded-lg px-3 pt-6 pb-2 focus:outline-[4px]  focus:outline-green-200 focus:outline focus:outline-solid"
              placeholder=" "
            />
            <label
              htmlFor="company_name"
              className="absolute top-0 left-3 px-1 my-2 text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-3  text-sm"
            >
              Company Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            {errors.companyName && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="company_overview"
              className="block mb-2 font-medium"
            >
              Company Overview
              <span className="text-red-500 ml-1">*</span>
            </label>
            <CKEditor
              {...register("companyOverview", { required: true })}
              onReady={(editor) => {
                editor.editing.view.change((writer) => {
                  writer.setStyle(
                    "height",
                    "16rem",
                    editor.editing.view.document.getRoot()
                  );
                });
              }}
              editor={ClassicEditor}
              data=""
              onChange={(event, editor) => {
                setCompanyOverview(editor.getData());
              }}
              id="company_overview"
              className="border border-gray-300 rounded-lg"
            />
            {errors.companyOverview && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="why_love_working_here"
              className="block mb-2 font-medium"
            >
              Why People Would Love To Work At Your Company
              <span className="text-red-500 ml-1">*</span>
            </label>
            <CKEditor
              {...register("whyLoveWorkingHere", { required: true })}
              onReady={(editor) => {
                editor.editing.view.change((writer) => {
                  writer.setStyle(
                    "height",
                    "16rem",
                    editor.editing.view.document.getRoot()
                  );
                });
              }}
              editor={ClassicEditor}
              data=""
              onChange={(event, editor) => {
                setWhyLoveWorkingHere(editor.getData());
              }}
              id="why_love_working_here"
              className="border border-gray-300 rounded-lg"
            />
            {errors.whyLoveWorkingHere && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative mb-6 w-full border border-gray-300 rounded-lg bg-white">
            <Controller
              control={control}
              defaultValue={companyTypeData[0].value}
              {...register("companyType", { required: true })}
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: "none",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      border: "none",
                      width: "97.5%",
                      top: "90%",
                    }),
                  }}
                  id="company_type"
                  className="peer block w-full px-2 pt-8 pb-2 focus:outline-[4px] focus:outline-green-200 focus:outline focus:outline-solid"
                  placeholder="Company Type"
                  inputRef={ref}
                  value={companyTypeData.filter((c) => value.includes(c.value))}
                  onChange={(val) => {
                    onChange(val.value);
                    setCompanyType(val.value);
                  }}
                  options={companyTypeData}
                />
              )}
            />
            <label
              htmlFor="company_type"
              className="absolute top-0 left-3 px-1 my-2 text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-3 text-sm"
            >
              Company Type
              <span className="text-red-500 ml-1">*</span>
            </label>
            {errors.companyType && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="relative mb-6 w-full border border-gray-300 rounded-lg bg-white">
            <Controller
              control={control}
              defaultValue={companySizeData[0].value}
              {...register("companySize", { required: true })}
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: "none",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      width: "97.5%",
                      border: "none",
                      top: "90%",
                    }),
                  }}
                  id="company_size"
                  className="peer block w-full px-2 pt-8 pb-2 focus:outline-[4px] focus:outline-green-200 focus:outline focus:outline-solid"
                  placeholder="Company Size"
                  inputRef={ref}
                  value={companySizeData.filter((c) => value === c.value)}
                  onChange={(val) => {
                    onChange(val.value);
                    setCompanySize(val.value);
                  }}
                  options={companySizeData}
                />
              )}
            />
            <label
              htmlFor="company_size"
              className="absolute top-0 left-3 px-1 my-2 text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-3 text-sm"
            >
              Company Size
              <span className="text-red-500 ml-1">*</span>
            </label>
            {errors.companySize && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="relative mb-6">
            <input
              type="text"
              id="country"
              {...register("country", { required: true })}
              className="peer block w-full border border-gray-300 rounded-lg px-3 pt-6 pb-2 focus:outline-[4px]  focus:outline-green-200 focus:outline focus:outline-solid"
              placeholder=" "
            />
            <label
              htmlFor="country"
              className="absolute top-0 left-3 px-1 my-2 text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-3  text-sm"
            >
              Country
              <span className="text-red-500 ml-1">*</span>
            </label>
            {errors.country && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="relative mb-6 w-full border border-gray-300 rounded-lg bg-white">
            <Controller
              control={control}
              defaultValue={workingDaysData[0].value}
              {...register("workingDays", { required: true })}
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: "none",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      border: "none",
                      width: "97.5%",
                      top: "90%",
                    }),
                  }}
                  id="working_days"
                  className="peer block w-full px-2 pt-8 pb-2 focus:outline-[4px] focus:outline-green-200 focus:outline focus:outline-solid"
                  placeholder="Working Days"
                  inputRef={ref}
                  value={workingDaysData.filter((c) => value === c.value)}
                  onChange={(val) => {
                    onChange(val.value);
                    setWorkingDays(val.value);
                  }}
                  options={workingDaysData}
                />
              )}
            />
            <label
              htmlFor="working_days"
              className="absolute top-0 left-3 px-1 my-2 text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-3 text-sm"
            >
              Working Days
              <span className="text-red-500 ml-1">*</span>
            </label>
            {errors.workingDays && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="relative mb-6 w-full border border-gray-300 rounded-lg bg-white">
            <Controller
              control={control}
              defaultValue={overtimePolicyData[0].value}
              {...register("overtimePolicy", { required: true })}
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: "none",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      width: "97.5%",
                      border: "none",
                      top: "90%",
                    }),
                  }}
                  id="overtime_policy"
                  className="peer block w-full px-2 pt-8 pb-2 focus:outline-[4px] focus:outline-green-200 focus:outline focus:outline-solid"
                  placeholder="Overtime Policy"
                  inputRef={ref}
                  value={overtimePolicyData.filter((c) => value === c.value)}
                  onChange={(val) => {
                    onChange(val.value);
                    setOvertimePolicy(val.value);
                  }}
                  options={overtimePolicyData}
                />
              )}
            />
            <label
              htmlFor="overtime_policy"
              className="absolute top-0 left-3 px-1 my-2 text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-3 text-sm"
            >
              Overtime Policy
              <span className="text-red-500 ml-1">*</span>
            </label>
            {errors.overtimePolicy && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="relative mb-6">
            <input
              type="text"
              id="key_skills"
              {...register("keySkills", { required: true })}
              className="peer block w-full border border-gray-300 rounded-lg px-3 pt-6 pb-2 focus:outline-[4px]  focus:outline-green-200 focus:outline focus:outline-solid"
              placeholder=" "
            />
            <label
              htmlFor="key_skills"
              className="absolute top-0 left-3 px-1 my-2 text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-3  text-sm"
            >
              Key Skills
              <span className="text-red-500 ml-1">*</span>
            </label>
            {errors.keySkills && (
              <span className="text-red-600">This field is required</span>
            )}
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

export default EmployerProfile;
