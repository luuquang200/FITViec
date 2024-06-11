import * as React from "react";
import Container from "@/components/layout/container";

const ProfileNavbar = () => {
    return (
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
    );
};

export default ProfileNavbar;
