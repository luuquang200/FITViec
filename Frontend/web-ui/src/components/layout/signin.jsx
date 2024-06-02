import React, { useState } from "react";
import Container from "@/components/layout/container";
import { Check } from "lucide-react";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";

import {
    doSignInWithEmailAndPassword,
    doSignInWithGoogle,
} from "@/firebase/auth";
import { useAuth } from "../../contexts/authContext";
import { Navigate } from "react-router-dom";

const SignIn = () => {
    const { userLoggedIn } = useAuth();

    console.log(userLoggedIn);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [isSigningIn, setisSigningIn] = useState(false);

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (!isSigningIn) {
            setisSigningIn(true);
            await doSignInWithEmailAndPassword(email, password);
        }
    };

    const onGoogleSignIn = (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setisSigningIn(true);
            doSignInWithGoogle().catch((err) => {
                setisSigningIn(false);
            });
        }
    };

    const validateEmail = () => {
        if (!email) {
            setEmailError("Can't be blank");
            return;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailError(
                !emailRegex.test(email) ? "Please check your email" : false,
            );
            return;
        }
    };

    const validatePassword = () => {
        if (!password) {
            setPasswordError("Can't be blank");
            return;
        }
        setPasswordError(false);
    };

    return (
        <Container className="py-16 pt-8">
            {/* {userLoggedIn && <Navigate to={"/home"} replace={true} />} */}
            <div className="mb-4 flex gap-x-3">
                <h3 className="text-xl font-bold">Welcome to</h3>
                <img
                    src="https://itviec.com/assets/logo_black_text-04776232a37ae9091cddb3df1973277252b12ad19a16715f4486e603ade3b6a4.png"
                    className="w-20"
                    alt=""
                />
            </div>
            <div className="flex gap-x-32">
                <div className="leftside w-5/12">
                    <div className="mb-6 text-sm text-gray-600">
                        By signing in, you agree to ITviec’s{" "}
                        <a
                            href="#"
                            target="_blank"
                            className="text-blue-700 hover:text-blue-900"
                        >
                            Terms & Conditions
                        </a>{" "}
                        and{" "}
                        <a
                            href="#"
                            target="_blank"
                            className="text-blue-700 hover:text-blue-900"
                        >
                            Privacy Policy
                        </a>{" "}
                        in relation to your privacy information.
                    </div>
                    <button className="flex h-12 w-full items-center justify-center gap-0 rounded-sm border border-red-500 py-2 font-bold text-red-500 hover:bg-red-50">
                        <img
                            src="https://itviec.com/assets/google_logo-af373a5e64715e7d4fcdea711f96995f7fd7a49725b3dd8910d4749b74742cb2.svg"
                            alt="Google Logo"
                            className="h-8 w-8"
                        />
                        <span className="pl-2">Sign In with Google</span>
                    </button>
                    <div className="flex items-center py-4">
                        <div className="flex-grow border-t border-solid border-gray-300"></div>
                        <div className="px-2 font-medium text-gray-900">or</div>
                        <div className="flex-grow border-t border-solid border-gray-300"></div>
                    </div>
                    <div className="mb-3">
                        <label className="mb-1 block">
                            <span className="text-gray-900">Email </span>
                            <abbr className="text-red-500">*</abbr>
                        </label>
                        <input
                            className={`form-input h-12 w-full rounded-sm border ${!emailError && email ? "border-green-500" : emailError ? "border-red-500" : "border-gray-300"} px-4 py-2`}
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError(false);
                            }}
                            onBlur={validateEmail}
                            required
                        />
                        {emailError && (
                            <span className="text-red-500">{emailError}</span>
                        )}
                    </div>
                    <div className="mb-6">
                        <div className="mb-1 flex justify-between">
                            <label className="mb-1 block">
                                <span className="text-gray-900">Password </span>
                                <abbr className="text-red-500">*</abbr>
                            </label>
                            <a
                                href="#"
                                target="_blank"
                                className="text-blue-700 hover:text-blue-900"
                            >
                                Forgot password?
                            </a>
                        </div>
                        <input
                            type="password"
                            className={`form-input h-12 w-full rounded-sm border ${!passwordError && password ? "border-green-500" : passwordError ? "border-red-500" : "border-gray-300"} px-4 py-2`}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordError(false);
                            }}
                            onBlur={validatePassword}
                            required
                        />
                        {passwordError && (
                            <span className="text-red-500">
                                {passwordError}
                            </span>
                        )}
                    </div>
                    <button className="mb-6 flex h-12 w-full items-center justify-center gap-0 rounded-sm bg-red-500 py-2 font-bold text-white hover:bg-red-700">
                        <span>Sign In with Email</span>
                    </button>
                    <div className="mb-6 text-center text-gray-600">
                        Do not have an account?{" "}
                        <a
                            href="/signup"
                            target="_blank"
                            className="text-blue-700 hover:text-blue-900"
                        >
                            Sign up now!
                        </a>
                    </div>
                </div>
                <div className="rightside w-6/12">
                    <h2 className="mb-4 text-xl font-bold">
                        Sign in to get instant access to thousands of reviews
                        and salary information
                    </h2>
                    <ul className="list-none">
                        <li className="flex items-start gap-x-1 pb-3">
                            <Check color="green" />
                            <div className="text-base">
                                View salary to help you negotiate your offer or
                                pay rise
                            </div>
                        </li>
                        <li className="flex items-start gap-x-1 pb-3">
                            <Check color="green" />
                            <div className="text-base">
                                Find out about benefits, interview, company
                                culture via reviews
                            </div>
                        </li>
                        <li className="flex items-start gap-x-1 pb-3">
                            <Check color="green" />
                            <div className="text-base">
                                Easy apply with only 1 click
                            </div>
                        </li>
                        <li className="flex items-start gap-x-1 pb-3">
                            <Check color="green" />
                            <div className="text-base">
                                Manage your own profile &amp; privacy
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </Container>
    );
};

export default SignIn;
