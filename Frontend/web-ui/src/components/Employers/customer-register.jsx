import React, { useState } from "react";
import Container from "@/components/layout/container";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";

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

    return (
        <Container className="w-100 max-w-full">
            <div className="w-100 h-100 grid grid-cols-3 xl:grid-rows-1">
                {/* Left */}
                <div className="w-100 h-100 col-span-2">
                    <div className="mx-auto mb-10 mt-[6vh] max-w-[1100px] ">
                        <div className="flex items-center gap-x-3">
                            <img
                                src="https://itviec.com/assets/logo_black_text-04776232a37ae9091cddb3df1973277252b12ad19a16715f4486e603ade3b6a4.png"
                                className="w-24"
                                alt=""
                            />
                            <h3 className="text-2xl font-bold">
                                CUSTOMER ADMIN SITE
                            </h3>
                        </div>
                        <h1 className="mb-8 mt-12 text-xl font-semibold leading-6">
                            Welcome to FITviec Customer
                        </h1>
                    </div>
                </div>
                {/* Right */}
                <div className="bg-linear-gradient-logo h-100 flex items-center justify-center text-center ">
                    <img
                        src="https://itviec.com/assets/customer/sign_in/logo-a2f6301beddfd012e9c6a71aed3d4cae576e2c7244fb4a41b2ff7c31bbd83f0e.png"
                        alt="logo"
                        className="w-100"
                    />
                </div>
            </div>
        </Container>
    );
};

export default CustomerRegister;
