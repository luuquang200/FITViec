import React from "react";
import { Link } from "react-router-dom";

// Components
import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";

const ForEmployerSection = () => {
    return (
        <div className="bg-linear-gradient py-16 pt-16">
            <Container>
                <div className="flex items-center space-x-3">
                    <div className="w-1/2">
                        <h1 className="text-2xl font-bold text-background">
                            Find the best tech talents
                        </h1>

                        <p className="mt-4 text-background">
                            We help you to find the best tech talents for your
                            company. Post a job and get the best candidates.
                        </p>

                        <Link to="/customer/login">
                            <Button className="mt-8">
                                Sign in with Employer account
                            </Button>
                        </Link>
                    </div>

                    <div className="w-1/2">
                        <img
                            src="/hire-the-best-it.webp"
                            alt="Hire the best IT talents"
                            className="w-full"
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ForEmployerSection;
