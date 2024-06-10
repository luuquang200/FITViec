import * as React from "react";
import Container from "@/components/layout/container";
import { Button } from "../ui/button";

const images = {
    CV: "https://itviec.com/assets/profile/cv-d4db00ef4c885c25e437715236babd64c7cbb960ddf4771e69e55dd8169dd5ba.svg",
    PlusIcon: "https://icons8.com/icon/1501/plus",
    cardImage:
        "https://itviec.com/assets/profile/about_me_no_info-c7c9aa8f95cc149ec7646e171c59c2d261d0c9d62da0f5b1fff75886691bd8e9.svg",
};

const atrributeColor = {
    red: "invert(21%) sepia(98%) saturate(6624%) hue-rotate(357deg) brightness(117%) contrast(116%)",
};

const ProfileManagement = () => {
    return (
        <div>
            <div className=" bg-gray-200">
                <div className="box-shadow-normal bg-white">
                    <Container>
                        <ul className="nav align-items-center flex flex-row">
                            <li className="flex h-14 w-40 items-center justify-center">
                                <a
                                    className="nav-link active text-nowrap"
                                    href="/profile-cv"
                                >
                                    Profile
                                </a>
                            </li>

                            <li className="flex h-14 w-40 items-center justify-center">
                                <a
                                    className="nav-link active text-nowrap"
                                    href="/profile-cv"
                                >
                                    Manage CVs
                                </a>
                            </li>

                            <li className="flex h-14 w-40 items-center justify-center">
                                <a
                                    className="nav-link active text-nowrap"
                                    href="/profile-cv"
                                >
                                    Job Preferences
                                </a>
                            </li>
                        </ul>
                    </Container>
                </div>

                <Container className="grid grid-cols-4 gap-4">
                    {/* left box */}
                    <div className="col-span-1 mt-3">
                        <div className="h-auto w-full rounded-lg bg-white">
                            <div className="grid h-32 grid-cols-3">
                                <div className="col-span-1 flex items-center justify-center">
                                    <img
                                        width="80"
                                        height="80"
                                        src="https://img.icons8.com/ios-filled/100/army-star.png"
                                        alt="army-star"
                                    />
                                </div>
                                <div className="col-span-2 flex flex-col items-center justify-center">
                                    <div>
                                        <p className="text-lg">
                                            Profile Strength
                                        </p>
                                        <p className="text-lg text-amber-500">
                                            Poor
                                        </p>
                                        <p className="text-sm">5% completed</p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="h-64">
                                <p className="mt-4 p-3 text-base font-semibold ">
                                    Upgrade profile to "Excellent" to unlock
                                    Download CV
                                </p>
                                <div className="ml-2 mt-1 p-2">
                                    <p className="mb-3 text-base text-blue-600">
                                        + Add About me
                                    </p>
                                    <p className="mb-3 text-base  text-blue-600">
                                        + Add Contact Information
                                    </p>
                                    <p className="mb-3 text-base  text-blue-600">
                                        + Add Work Experience
                                    </p>
                                    <p className="mb-3 text-base  text-gray-600">
                                        ￬ Add More Information
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="h-40">
                                <div className="flex h-3/5 flex-row justify-between p-3">
                                    <div className="w-1/4">
                                        <img src={images.CV} alt="CV image" />
                                    </div>
                                    <p className="w-3/4">
                                        Explore CV templates and download your
                                        CV
                                    </p>
                                </div>
                                <div className="h-2/5">
                                    <div className="flex justify-center">
                                        <Button className="w-11/12">
                                            Preview and Download CV
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-3 mt-3">
                        <div className="grid h-60 w-full grid-cols-6 bg-white">
                            <div className="col-span-1">
                                <div className="mt-3 p-3">
                                    <img
                                        width="96"
                                        height="96"
                                        src="https://img.icons8.com/color/96/circled-user-male-skin-type-7--v1.png"
                                        alt="circled-user-male-skin-type-7--v1"
                                    />
                                </div>
                            </div>
                            <div className="col-span-5">
                                <div className="h-2/5">
                                    <div className="flex flex-row justify-between">
                                        <div className="ml-3 mt-3 p-3">
                                            <p className="text-3xl font-semibold">
                                                Wan bisaka
                                            </p>
                                            <p className="mt-3 text-xl text-gray-400">
                                                Your title
                                            </p>
                                        </div>
                                        <div className="mt-3 p-3">
                                            <img
                                                className="fill-blue-500"
                                                width="25"
                                                height="25"
                                                src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/25/external-compose-text-editor-inkubators-detailed-outline-inkubators.png"
                                                alt="external-compose-text-editor-inkubators-detailed-outline-inkubators"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="col-span-1 ml-3 mt-2 p-3">
                                        <p className="mb-3 text-gray-400">
                                            + Your email
                                        </p>
                                        <p className="mb-3 text-gray-400">
                                            + Your date of birth
                                        </p>
                                        <p className="mb-3 text-gray-400">
                                            + Your current address
                                        </p>
                                    </div>

                                    <div className="col-span-1 mt-2 p-3">
                                        <p className="mb-3 text-gray-400">
                                            + Your phone number
                                        </p>
                                        <p className="mb-3 text-gray-400">
                                            + Your gender
                                        </p>
                                        <p className="mb-3 text-gray-400">
                                            + Your personal link
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex h-32 w-full flex-row justify-between bg-white">
                            <div className="ml-2 mt-3 p-3">
                                <p className="text-2xl font-semibold">
                                    About me
                                </p>
                                <p className="mt-2 text-base text-gray-400">
                                    {" "}
                                    Introduce your strengths and years of
                                    experience
                                </p>
                            </div>
                            <div className="mr-2 mt-3 flex flex-row p-3">
                                <div>
                                    <img src={images.cardImage} alt="" />
                                </div>
                                <div>
                                    <p className="ml-3 text-2xl text-red-500">
                                        +
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex h-32 w-full flex-row justify-between bg-white">
                            <div className="ml-2 mt-3 p-3">
                                <p className="text-2xl font-semibold">
                                    Education
                                </p>
                                <p className="mt-2 text-base text-gray-400">
                                    {" "}
                                    Share your background education
                                </p>
                            </div>
                            <div className="mr-2 mt-3 flex flex-row p-3">
                                <div>
                                    <img src={images.cardImage} alt="" />
                                </div>
                                <div>
                                    <p className="ml-3 text-2xl text-red-500">
                                        +
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex h-32 w-full flex-row justify-between bg-white">
                            <div className="ml-2 mt-3 p-3">
                                <p className="text-2xl font-semibold">
                                    Work Experience
                                </p>
                                <p className="mt-2 text-base text-gray-400">
                                    {" "}
                                    Highlight detailed information about your
                                    job history
                                </p>
                            </div>
                            <div className="mr-2 mt-3 flex flex-row p-3">
                                <div>
                                    <img src={images.cardImage} alt="" />
                                </div>
                                <div>
                                    <p className="ml-3 text-2xl text-red-500">
                                        +
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex h-32 w-full flex-row justify-between bg-white">
                            <div className="ml-2 mt-3 p-3">
                                <p className="text-2xl font-semibold">Skills</p>
                                <p className="mt-2 text-base text-gray-400">
                                    {" "}
                                    Showcase your skills and proficiencies
                                </p>
                            </div>
                            <div className="mr-2 mt-3 flex flex-row p-3">
                                <div>
                                    <img src={images.cardImage} alt="" />
                                </div>
                                <div>
                                    <p className="ml-3 text-2xl text-red-500">
                                        +
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex h-32 w-full flex-row justify-between bg-white">
                            <div className="ml-2 mt-3 p-3">
                                <p className="text-2xl font-semibold">
                                    Personal Project
                                </p>
                                <p className="mt-2 text-base text-gray-400">
                                    {" "}
                                    Showcase your personal project
                                </p>
                            </div>
                            <div className="mr-2 mt-3 flex flex-row p-3">
                                <div>
                                    <img src={images.cardImage} alt="" />
                                </div>
                                <div>
                                    <p className="ml-3 text-2xl text-red-500">
                                        +
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex h-32 w-full flex-row justify-between bg-white">
                            <div className="ml-2 mt-3 p-3">
                                <p className="text-2xl font-semibold">
                                    Certificates
                                </p>
                                <p className="mt-2 text-base text-gray-400">
                                    {" "}
                                    Provides evidence of your specific expertise
                                    and skills
                                </p>
                            </div>
                            <div className="mr-2 mt-3 flex flex-row p-3">
                                <div>
                                    <img src={images.cardImage} alt="" />
                                </div>
                                <div>
                                    <p className="ml-3 text-2xl text-red-500">
                                        +
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex h-32 w-full flex-row justify-between bg-white">
                            <div className="ml-2 mt-3 p-3">
                                <p className="text-2xl font-semibold">Awards</p>
                                <p className="mt-2 text-base text-gray-400">
                                    Highlight your awards or recognitions
                                </p>
                            </div>
                            <div className="mr-2 mt-3 flex flex-row p-3">
                                <div>
                                    <img src={images.cardImage} alt="" />
                                </div>
                                <div>
                                    <p className="ml-3 text-2xl text-red-500">
                                        +
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default ProfileManagement;
