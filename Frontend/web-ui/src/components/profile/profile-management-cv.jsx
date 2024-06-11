import * as React from "react";
import Container from "@/components/layout/container";
import { useState, useRef } from "react";

import ProfileNavbar from "./profile-navbar";
import ProfileContent from "./profile-content";

import { Upload, FileText, Check } from "lucide-react";

const ProfileManagementCv = () => {
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/upload", {
                // Thay thế '/upload' bằng URL endpoint của bạn
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("File uploaded successfully.");
            } else {
                alert("File upload failed.");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("File upload failed.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className=" min-h-screen bg-gray-200">
            <ProfileNavbar />

            <Container className=" max-w-[1000px] pb-10 pt-4">
                <div className="mt-4  flex w-full flex-col  rounded-lg bg-white  shadow-lg">
                    <div className="ml-2 mt-3 p-4">
                        <p className="text-xl font-bold text-slate-700">
                            Manage CVs
                        </p>
                        <p className="my-6 text-base text-gray-400">
                            Upload your CV below to use it throughout your
                            application process
                        </p>
                        <div className="w-100  rounded-md border-2 border-gray-300 p-5 shadow-sm ">
                            <div className="relative flex items-center justify-start gap-5">
                                <FileText className="h-12 w-12 text-gray-500" />
                                <div className="flex flex-grow flex-col items-start gap-2">
                                    <p className="text-base font-semibold text-slate-700">
                                        Your own CV
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            style={{ display: "none" }}
                                        />
                                        <button
                                            onClick={handleIconClick}
                                            disabled={uploading}
                                            className="flex items-center gap-2"
                                        >
                                            {/* {uploading
                                                ? "Uploading..."
                                                : "Upload File"} */}
                                            <Upload className="h-5 w-5 text-blue-400" />
                                            <span className="text-blue-600">
                                                Upload
                                            </span>
                                        </button>
                                        <span className="text-base text-gray-400 ">
                                            (Use .doc, .docx or .pdf files, 3MB
                                            and no password protected)
                                        </span>
                                    </div>
                                </div>
                                <button className="absolute right-0 top-0 flex items-center gap-2 rounded bg-gray-200 p-2 text-sm text-slate-700">
                                    <Check className="h-4 w-4 text-slate-500" />
                                    Default
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <ProfileContent
                    title="Cover Letter"
                    content="Introduce yourself and why you'd make a greate hire"
                    img="https://itviec.com/assets/profile/cover_letter_no_info-f9d084dcc48161f6e480d74ea191ad4421e4b7fb2fe89dd2c29a2fdd90f46d49.svg"
                    icon={true}
                />
            </Container>
        </div>
    );
};

export default ProfileManagementCv;
