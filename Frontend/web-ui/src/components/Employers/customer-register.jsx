import React, { useState } from "react";
import Container from "@/components/layout/container";
import { Eye, EyeOff, ChevronDown, ChevronUp, PhoneCall } from "lucide-react";

import { useAuth } from "../../contexts/authContext";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
const CustomerRegister = () => {
    const { userLoggedIn, setInSingUpInPage } = useAuth();

    useEffect(() => {
        setInSingUpInPage(true);
        return () => setInSingUpInPage(false); // Reset the state when the component is unmounted
    }, [setInSingUpInPage]);

    const [showPolicy, setShowPolicy] = useState(true);

    return (
        <Container className="w-full max-w-full">
            <div className="grid h-full w-full grid-cols-3 xl:grid-rows-1">
                {/* Left */}
                <div className="bg-itviec-register-employer bg-content col-span-2 h-full w-full bg-bottom bg-no-repeat">
                    {/* Header */}
                    <div className="mx-auto mb-8 mt-[6vh] max-w-[1000px] ">
                        <div className="flex items-center gap-x-3">
                            <img
                                src="https://itviec.com/assets/logo_black_text-04776232a37ae9091cddb3df1973277252b12ad19a16715f4486e603ade3b6a4.png"
                                className="w-24"
                                alt=""
                            />
                            <h3 className="text-3xl font-bold">
                                CUSTOMER ADMIN SITE
                            </h3>
                        </div>
                        <h1 className="mb-4 mt-6 text-2xl font-semibold leading-6">
                            Sign Up For Customer Account
                        </h1>
                        <span className="text-sm  text-gray-600 ">
                            Let's create advantages for businesses by
                            experiencing deep application recruitment technology
                            AI & Hiring Funnel.
                        </span>
                    </div>
                    {/* Regulations */}
                    <div className="mx-auto mb-8 max-w-[1000px] rounded-lg border-2 border-red-500 p-4">
                        <div
                            className="flex cursor-pointer items-center justify-between"
                            onClick={() =>
                                setShowPolicy((prevShow) => !prevShow)
                            }
                        >
                            <span className="text-lg font-semibold">
                                Regulations
                            </span>
                            <span>
                                {showPolicy ? <ChevronUp /> : <ChevronDown />}
                            </span>
                        </div>
                        {/* policy */}
                        <div
                            className={`transition-max-height overflow-hidden duration-300 ease-in-out ${
                                showPolicy ? "max-h-[500px]" : "max-h-0"
                            }`}
                        >
                            <div className="text-sm text-gray-600">
                                <div className="py-4">
                                    <span>
                                        To ensure service quality,
                                        <strong> FITviec </strong>
                                    </span>
                                    <span className="font-semibold text-red-500">
                                        does not allow a user to create many
                                        different accounts
                                    </span>
                                    <span> .</span>
                                </div>
                                <div className="py-4">
                                    <span>
                                        If a violation is detected,{" "}
                                        <strong>FITviec</strong> will stop
                                        providing services to all duplicate
                                        accounts or block all access to{" "}
                                        <strong>FITviec's </strong> website
                                        system. In case customers have used up
                                        all 3 free job postings,{" "}
                                        <strong>FITviec </strong>
                                        supports activating unlimited job
                                        postings after the business provides
                                        business license information.
                                    </span>
                                </div>
                                <div className="py-4">
                                    <span>
                                        If you have any questions, please
                                        contact Customer Service Hotline :
                                    </span>
                                </div>
                                <div className="text-xl font-semibold">
                                    <PhoneCall className="mr-4 inline h-8 w-8 rounded-full border-2 border-gray-700 bg-white p-[5px]" />
                                    (+84) 123 345 567
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Account */}
                    <div className="mx-auto mb-8 max-w-[1000px] ">
                        {/* Account Information */}
                        <div>
                            <h1 className="mb-2 mt-6 text-2xl font-semibold ">
                                Account
                            </h1>
                        </div>
                    </div>
                </div>
                {/* Right */}
                <div className="bg-linear-gradient-logo flex h-full items-center justify-center text-center ">
                    <img
                        src="https://itviec.com/assets/customer/sign_in/logo-a2f6301beddfd012e9c6a71aed3d4cae576e2c7244fb4a41b2ff7c31bbd83f0e.png"
                        alt="logo"
                        className="w-full"
                    />
                </div>
            </div>
        </Container>
    );
};

export default CustomerRegister;
