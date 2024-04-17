// Components
import Container from "@/components/layout/container";
import EmployerCard from "@/components/employer-card";

import { EMPLOYERS } from "@/lib/constants";

const TopEmployerSection = () => {
    return (
        <Container className="py-16 text-center">
            <h1 className="pb-16 text-2xl font-bold text-foreground">
                Top Employers
            </h1>

            <div className="grid grid-cols-3 gap-6">
                {EMPLOYERS.map((employer, index) => (
                    <EmployerCard key={index} employer={employer} />
                ))}
            </div>
        </Container>
    );
};

export default TopEmployerSection;
