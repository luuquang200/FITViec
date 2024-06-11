import React from "react";

import { CirclePlus, SquarePen } from "lucide-react";

const ProfileContent = ({ title, content, img, icon }) => {
    return (
        <div>
            <div className="relative mt-4 flex  w-full flex-row justify-between rounded-lg bg-white  shadow-lg">
                <div className="ml-2 mt-3 p-4">
                    <p className="text-xl font-bold text-slate-700">{title}</p>
                    <p className="mt-2 text-base text-gray-400">{content}</p>
                </div>
                <div className="mr-16 mt-3 flex flex-row p-4">
                    <div>
                        <img src={img} alt="img" />
                    </div>
                </div>
                {icon ? (
                    <SquarePen className="absolute right-0 top-0 h-5 w-5 translate-x-[-150%] translate-y-6 cursor-pointer text-red-500" />
                ) : (
                    <CirclePlus className="absolute right-0 top-0 h-5 w-5 translate-x-[-150%] translate-y-6 cursor-pointer text-red-500" />
                )}
            </div>
        </div>
    );
};

export default ProfileContent;
