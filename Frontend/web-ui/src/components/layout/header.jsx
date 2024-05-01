import { useEffect, useState } from "react";

// Assets
import Logo from "../../assets/logo-itviec.webp";

// Components
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";

const Header = () => {
    const [isActive, setIsActive] = useState(false);

    // Change header style on scroll
    useEffect(() => {
        window.addEventListener("scroll", () => {
            window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
        });
    });

    return (
        <header
            className={`bg-linear-gradient fixed z-10 flex w-full items-center justify-between border-b-2 border-muted-foreground px-8 2xl:px-40 ${isActive ? "h-[60px]" : "h-[88px]"}`}
        >
            <div className="flex space-x-6">
                <a href="/">
                    <img src={Logo} alt="Logo" className="w-[108px]" />
                </a>

                <div className="flex items-center text-lg text-background">
                    Navigation menu
                </div>
            </div>

            <ul className="flex space-x-6">
                <li>
                    <Button
                        variant="link"
                        className="h-min p-0 text-white hover:no-underline"
                    >
                        For Employers
                    </Button>
                </li>

                <li>
                    <Button
                        variant="link"
                        className="h-min p-0 text-white hover:no-underline"
                    >
                        Sign in/Sign up
                    </Button>
                </li>

                <li className="flex space-x-3 p-0">
                    <Button
                        variant="link"
                        className="h-min p-0 text-white hover:no-underline"
                    >
                        EN
                    </Button>

                    <Separator orientation="vertical" />

                    <Button
                        variant="link"
                        className="h-min p-0 text-muted-foreground hover:no-underline"
                    >
                        VI
                    </Button>
                </li>
            </ul>
        </header>
    );
};

export default Header;
