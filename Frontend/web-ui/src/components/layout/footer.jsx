// Components
import { Separator } from "@/components/ui/separator";
import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";

// Assets
import Logo from "../../assets/logo-fitviec.webp";
import FooterImg from "../../assets/footer-image.svg";
import {
    Linkedin,
    Facebook,
    Youtube,
    PhoneCall,
    Mail,
    Send,
} from "lucide-react";

const aboutUsHeadings = [
    "Home",
    "About Us",
    "AI Match Service",
    "Contact Us",
    "All Jobs",
    "FAQ",
];
const campaignHeadings = ["IT Story", "Writing Contest"];
const termHeadings = [
    "Privacy Policy",
    "Operating Regulation",
    "Complaint Handling",
    "Terms & Conditions",
    "Press",
];

const Footer = () => {
    return (
        <footer className="relative bg-linear-gradient text-sm">
            <div className="absolute bottom-0 right-0">
                <img src={FooterImg} alt="Footer image" />
            </div>

            <Container className="flex flex-wrap pt-12">
                <div className="w-1/5">
                    <img src={Logo} alt="Logo" className="h-[50px]" />
                    <h1 className="text-background">Ít nhưng mà chất</h1>

                    <div className="mt-5 space-x-2">
                        <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full border-muted-foreground bg-transparent text-muted-foreground"
                        >
                            <Linkedin />
                        </Button>

                        <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full border-muted-foreground bg-transparent text-muted-foreground"
                        >
                            <Facebook />
                        </Button>

                        <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full border-muted-foreground bg-transparent text-muted-foreground"
                        >
                            <Youtube />
                        </Button>
                    </div>
                </div>

                <div className="w-1/5">
                    <h1 className="text-base font-medium text-background">
                        About Us
                    </h1>

                    <ul className="mt-2 space-y-2 text-muted-foreground">
                        {aboutUsHeadings.map((heading, index) => (
                            <li key={index}>{heading}</li>
                        ))}
                    </ul>
                </div>

                <div className="w-1/5">
                    <h1 className="text-base font-medium text-background">
                        Campaign
                    </h1>

                    <ul className="mt-2 space-y-2 text-muted-foreground">
                        {campaignHeadings.map((heading, index) => (
                            <li key={index}>{heading}</li>
                        ))}
                    </ul>
                </div>

                <div className="w-1/5">
                    <h1 className="text-base font-medium text-background">
                        Terms & Conditions
                    </h1>

                    <ul className="mt-2 space-y-2 text-muted-foreground">
                        {termHeadings.map((heading, index) => (
                            <li key={index}>{heading}</li>
                        ))}
                    </ul>
                </div>

                <div className="w-1/5">
                    <h1 className="text-base font-medium text-background">
                        Want to post a job? Contact us:
                    </h1>

                    <ul className="mt-2 space-y-2 text-muted-foreground">
                        <li>
                            <PhoneCall className="mr-2 inline" />
                            (+84) 123 345 567
                        </li>

                        <li>
                            <Mail className="mr-2 inline" />
                            Email: love@fitviec.com
                        </li>

                        <li>
                            <Send className="mr-2 inline" />
                            Submit contact information
                        </li>
                    </ul>
                </div>
            </Container>

            <Separator className="mt-12 bg-muted-foreground" />

            <Container>
                <h3 className="py-3 text-center text-xs text-muted-foreground">
                    Copyright &copy; IT VIEC SJC
                </h3>
            </Container>
        </footer>
    );
};

export default Footer;
