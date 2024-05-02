import * as React from "react"
import Container from "@/components/layout/container";
import { Button } from "../ui/button";

const images = {
    CV : 'https://itviec.com/assets/profile/cv-d4db00ef4c885c25e437715236babd64c7cbb960ddf4771e69e55dd8169dd5ba.svg',
    PlusIcon : 'https://icons8.com/icon/1501/plus',
    cardImage : 'https://itviec.com/assets/profile/about_me_no_info-c7c9aa8f95cc149ec7646e171c59c2d261d0c9d62da0f5b1fff75886691bd8e9.svg'

}

const atrributeColor ={
    red : 'invert(21%) sepia(98%) saturate(6624%) hue-rotate(357deg) brightness(117%) contrast(116%)'
}

const ProfileManagement = () => {

    return (
    <div>
        <div className=" bg-gray-200">
            <div className="bg-white box-shadow-normal">
                <Container>
                    <ul className="nav flex flex-row align-items-center">
                        <li className="w-40 h-14 flex items-center justify-center">
                        <a class="nav-link text-nowrap active" href="/profile-cv">Profile</a>
                        </li>

                        <li className="w-40 h-14 flex items-center justify-center">
                        <a class="nav-link text-nowrap active" href="/profile-cv">Manage CVs</a>
                        </li>

                        <li className="w-40 h-14 flex items-center justify-center">
                        <a class="nav-link text-nowrap active" href="/profile-cv">Job Preferences</a>
                        </li>
                    </ul>
                </Container>
            </div>

            <Container className="grid grid-cols-4 gap-4">
                {/* left box */}
                <div className="col-span-1 mt-3">
                    <div className="w-full h-auto bg-white rounded-lg">
                        <div className="h-32 grid grid-cols-3">
                            <div className="col-span-1 flex items-center justify-center">
                                <img width="80" height="80" src="https://img.icons8.com/ios-filled/100/army-star.png" alt="army-star"/>
                            </div>
                            <div className="col-span-2 flex flex-col items-center justify-center">
                                <div>
                                    <p className="text-lg">Profile Strength</p>
                                    <p className="text-amber-500 text-lg">Poor</p>
                                    <p className="text-sm">5% completed</p>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="h-64">
                            <p className="text-base font-semibold p-3 mt-4 " >Upgrade profile to "Excellent" to unlock Download CV</p>
                            <div className="mt-1 p-2 ml-2">
                                <p className="text-blue-600 text-base mb-3">+ Add About me</p>
                                <p className="text-blue-600 text-base  mb-3">+ Add Contact Information</p>
                                <p className="text-blue-600 text-base  mb-3">+ Add Work Experience</p>
                                <p className="text-gray-600 text-base  mb-3">￬ Add More Information</p>
                            </div>
                        </div>
                        <hr/>
                        <div className="h-40">
                            <div className="h-3/5 p-3 flex flex-row justify-between">
                                <div className="w-1/4">
                                    <img src={images.CV} alt="CV image" />
                                </div>
                                <p className="w-3/4">Explore CV templates and download your CV</p>
                            </div>
                            <div className="h-2/5">
                                <div className="flex justify-center"><Button className="w-11/12">Preview and Download CV</Button></div>
                            </div>
                        </div>

                    </div>
                    
                </div>

                <div className="col-span-3 mt-3">
                    <div className="w-full h-60 grid grid-cols-6 bg-white">
                        <div className="col-span-1">
                            <div className="mt-3 p-3">
                            <img width="96" height="96" src="https://img.icons8.com/color/96/circled-user-male-skin-type-7--v1.png" alt="circled-user-male-skin-type-7--v1"/>
                            </div>
                        </div>
                        <div className="col-span-5">
                            <div className="h-2/5">
                                <div className="flex flex-row justify-between">
                                    <div className="ml-3 mt-3 p-3">
                                        <p className="text-3xl font-semibold">Wan bisaka</p>
                                        <p className="text-xl mt-3 text-gray-400">Your title</p>
                                    </div>
                                    <div className="mt-3 p-3">
                                        <img className = 'fill-blue-500' width="25" height="25" src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/25/external-compose-text-editor-inkubators-detailed-outline-inkubators.png" alt="external-compose-text-editor-inkubators-detailed-outline-inkubators"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="col-span-1 mt-2 ml-3 p-3">
                                    <p className="mb-3 text-gray-400">+ Your email</p>
                                    <p className="mb-3 text-gray-400">+ Your date of birth</p>                                    
                                    <p className="mb-3 text-gray-400">+ Your current address</p>
                                </div>

                                <div className="col-span-1 mt-2 p-3">
                                    <p className="mb-3 text-gray-400">+ Your phone number</p>
                                    <p className="mb-3 text-gray-400">+ Your gender</p>                                    
                                    <p className="mb-3 text-gray-400">+ Your personal link</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-32 mt-4 bg-white flex flex-row justify-between">
                        <div className="mt-3 p-3 ml-2">
                            <p className="text-2xl font-semibold">About me</p>
                            <p className="text-base text-gray-400 mt-2"> Introduce your strengths and years of experience</p>
                        </div>
                        <div className="mt-3 p-3 mr-2 flex flex-row">
                            <div><img src={images.cardImage} alt="" /></div>
                            <div><p className="text-2xl text-red-500 ml-3">+</p></div>
                        </div>
                    </div>

                    <div className="w-full h-32 mt-4 bg-white flex flex-row justify-between">
                        <div className="mt-3 p-3 ml-2">
                            <p className="text-2xl font-semibold">Education</p>
                            <p className="text-base text-gray-400 mt-2"> Share your background education</p>
                        </div>
                        <div className="mt-3 p-3 mr-2 flex flex-row">
                            <div><img src={images.cardImage} alt="" /></div>
                            <div><p className="text-2xl text-red-500 ml-3">+</p></div>
                        </div>
                    </div>

                    <div className="w-full h-32 mt-4 bg-white flex flex-row justify-between">
                        <div className="mt-3 p-3 ml-2">
                            <p className="text-2xl font-semibold">Work Experience</p>
                            <p className="text-base text-gray-400 mt-2"> Highlight detailed information about your job history</p>
                        </div>
                        <div className="mt-3 p-3 mr-2 flex flex-row">
                            <div><img src={images.cardImage} alt="" /></div>
                            <div><p className="text-2xl text-red-500 ml-3">+</p></div>
                        </div>
                    </div>


                    <div className="w-full h-32 mt-4 bg-white flex flex-row justify-between">
                        <div className="mt-3 p-3 ml-2">
                            <p className="text-2xl font-semibold">Skills</p>
                            <p className="text-base text-gray-400 mt-2"> Showcase your skills and proficiencies</p>
                        </div>
                        <div className="mt-3 p-3 mr-2 flex flex-row">
                            <div><img src={images.cardImage} alt="" /></div>
                            <div><p className="text-2xl text-red-500 ml-3">+</p></div>
                        </div>
                    </div>

                    <div className="w-full h-32 mt-4 bg-white flex flex-row justify-between">
                        <div className="mt-3 p-3 ml-2">
                            <p className="text-2xl font-semibold">Personal Project</p>
                            <p className="text-base text-gray-400 mt-2"> Showcase your personal project</p>
                        </div>
                        <div className="mt-3 p-3 mr-2 flex flex-row">
                            <div><img src={images.cardImage} alt="" /></div>
                            <div><p className="text-2xl text-red-500 ml-3">+</p></div>
                        </div>
                    </div>

                    <div className="w-full h-32 mt-4 bg-white flex flex-row justify-between">
                        <div className="mt-3 p-3 ml-2">
                            <p className="text-2xl font-semibold">Certificates</p>
                            <p className="text-base text-gray-400 mt-2"> Provides evidence of your specific expertise and skills</p>
                        </div>
                        <div className="mt-3 p-3 mr-2 flex flex-row">
                            <div><img src={images.cardImage} alt="" /></div>
                            <div><p className="text-2xl text-red-500 ml-3">+</p></div>
                        </div>
                    </div>

                    <div className="w-full h-32 mt-4 bg-white flex flex-row justify-between">
                        <div className="mt-3 p-3 ml-2">
                            <p className="text-2xl font-semibold">Awards</p>
                            <p className="text-base text-gray-400 mt-2">Highlight your awards or recognitions</p>
                        </div>
                        <div className="mt-3 p-3 mr-2 flex flex-row">
                            <div><img src={images.cardImage} alt="" /></div>
                            <div><p className="text-2xl text-red-500 ml-3">+</p></div>
                        </div>
                    </div>
                        
                </div>
            </Container>
        </div>
    </div>
    )
  };
  
  export default ProfileManagement;