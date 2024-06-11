import React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import { CirclePlus, ChevronDown, ChevronUp } from "lucide-react";

const ProfileProgressBar = () => {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="col-span-1 mt-3 ">
            <div className="h-auto w-full rounded-lg bg-white p-5">
                <div className="grid  grid-cols-3 gap-4 p-4">
                    <div className="col-span-1 flex items-center justify-center">
                        <img
                            width="80"
                            height="80"
                            src="https://img.icons8.com/ios-filled/100/army-star.png"
                            alt="army-star"
                        />
                    </div>
                    <div className="col-span-2 flex flex-col">
                        <p className="text-lg font-medium text-slate-700">
                            Profile Strength
                        </p>
                        <p className="text-lg font-semibold text-amber-500">
                            Poor
                        </p>
                        <p className="text-sm">5% completed</p>
                    </div>
                </div>
                <hr />
                <div>
                    <p className="mb-2 mt-4 text-base font-semibold text-slate-700">
                        Upgrade profile to "Excellent" to unlock Download CV
                    </p>
                    <div className="flex flex-col justify-center">
                        <div className="w-100 mb-0 p-2">
                            <button>
                                <div className="flex items-center gap-2">
                                    <CirclePlus className="h-4 w-4 text-blue-700" />
                                    <p className="text-base text-blue-700">
                                        Add About me
                                    </p>
                                </div>
                            </button>
                        </div>
                        <div className="w-100 mb-0 p-2">
                            <button>
                                <div className="flex items-center gap-2">
                                    <CirclePlus className="h-4 w-4 text-blue-700" />
                                    <p className="text-base text-blue-700">
                                        Add Contact Information
                                    </p>
                                </div>
                            </button>
                        </div>
                        <div className="w-100 mb-0 p-2">
                            <button>
                                <div className="flex items-center gap-2">
                                    <CirclePlus className="h-4 w-4 text-blue-700" />
                                    <p className="text-base text-blue-700">
                                        Add Work Experience
                                    </p>
                                </div>
                            </button>
                        </div>
                        {showMore ? (
                            <></>
                        ) : (
                            <>
                                <div className="w-100 mb-0 p-2">
                                    <button>
                                        <div className="flex items-center gap-2">
                                            <CirclePlus className="h-4 w-4 text-blue-700" />
                                            <p className="text-base text-blue-700">
                                                Add Education
                                            </p>
                                        </div>
                                    </button>
                                </div>
                                <div className="w-100 mb-0 p-2">
                                    <button>
                                        <div className="flex items-center gap-2">
                                            <CirclePlus className="h-4 w-4 text-blue-700" />
                                            <p className="text-base text-blue-700">
                                                Add Skills
                                            </p>
                                        </div>
                                    </button>
                                </div>
                                <div className="w-100 mb-0 p-2">
                                    <button>
                                        <div className="flex items-center gap-2">
                                            <CirclePlus className="h-4 w-4 text-blue-700" />
                                            <p className="text-base text-blue-700">
                                                Add Certificates
                                            </p>
                                        </div>
                                    </button>
                                </div>
                                <div className="w-100 mb-0 p-2">
                                    <button>
                                        <div className="flex items-center gap-2">
                                            <CirclePlus className="h-4 w-4 text-blue-700" />
                                            <p className="text-base text-blue-700">
                                                Add Awards
                                            </p>
                                        </div>
                                    </button>
                                </div>
                                <div className="w-100 mb-0 p-2">
                                    <button>
                                        <div className="flex items-center gap-2">
                                            <CirclePlus className="h-4 w-4 text-blue-700" />
                                            <p className="text-base text-blue-700">
                                                Add Personal Projects
                                            </p>
                                        </div>
                                    </button>
                                </div>
                            </>
                        )}
                        <div className="w-100 mb-0 p-2">
                            <button
                                onClick={() =>
                                    setShowMore((prevShow) => !prevShow)
                                }
                            >
                                <div className="flex items-center gap-2">
                                    {showMore ? (
                                        <ChevronDown className="h-6 w-6 text-gray-700" />
                                    ) : (
                                        <ChevronUp className="h-6 w-6 text-gray-700" />
                                    )}
                                    <p className="text-base text-gray-700">
                                        {showMore
                                            ? "Add more information"
                                            : "Show less"}
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="">
                    <div className="my-4 flex h-3/5 flex-row justify-between">
                        <div className="w-1/4">
                            <img
                                src="https://itviec.com/assets/profile/cv-d4db00ef4c885c25e437715236babd64c7cbb960ddf4771e69e55dd8169dd5ba.svg"
                                alt="CV image"
                            />
                        </div>
                        <p className="w-3/4">
                            Explore CV templates and download your CV
                        </p>
                    </div>
                    <div className="h-2/5">
                        <div className="flex justify-center">
                            <Button className="w-full">
                                Preview and Download CV
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileProgressBar;
