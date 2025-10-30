import { SiTicktick } from "react-icons/si";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type CategoryKey = "equipment" | "experts" | "mobility";

interface CategoryData {
  title: string;
  points: { title: string; desc: string }[];
  buttonText: string;
}

const categoryData: Record<CategoryKey, CategoryData> = {
  equipment: {
    title: "Why Rent Equipment from Rento Connect?",
    points: [
      { title: "Vast Selection", desc: "Access a wide range of heavy machinery and equipment from a single platform." },
      { title: "Verified Suppliers", desc: "We partner with trusted, pre-screened vendors to ensure equipment quality and reliability." },
      { title: "Transparent Pricing", desc: "Get competitive rates with clear breakdowns for daily, weekly, and monthly rentals." },
      { title: "Pan-India Delivery", desc: "We facilitate equipment mobilization to your project site, wherever it is in India." },
    ],
    buttonText: "Post Your Requirement",
  },
  experts: {
    title: "Why Hire Experts from Rento Connect?",
    points: [
      { title: "Verified Professionals", desc: "Every expert on our platform is thoroughly vetted for their skills, experience, and certifications." },
      { title: "Flexible Engagement", desc: "Hire experts for short-term projects, long-term contracts, or on-demand consultations." },
      { title: "Nationwide Coverage", desc: "Access a vast network of specialists across India, ready to be deployed to your site." },
    ],
    buttonText: "Get a Custom Quote",
  },
  mobility: {
    title: "Your Partner in Workforce Mobility",
    points: [
      { title: "Customizable Routes", desc: "We design routes and timings that perfectly align with your factory or office shift schedules." },
      { title: "Professional Drivers", desc: "Our drivers are vetted, trained, and committed to safety and punctuality." },
      { title: "Vehicle Quality", desc: "All vehicles are regularly maintained and compliant with safety standards." },
      { title: "Scalable Fleet", desc: "From a single sedan to a fleet of buses, we scale our services to meet your operational demands." },
    ],
    buttonText: "Book Now",
  },
};

interface WhyHireSectionProps {
  category: CategoryKey; // restrict category to valid keys
}

export default function WhyHireSection({ category }: WhyHireSectionProps) {
  const data = categoryData[category];

  return (
    <section className="py-16 md:py-24 bg-secondary md:px-10 px-5">
      <div className="">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-xl">
            <img
              alt={data.title}
              src="https://placehold.co/600x400.png"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold">{data.title}</h2>

            <ul className="mt-6 space-y-4 text-muted-foreground">
              {data.points.map((point, index) => (
                <li key={index} className="flex items-start">
                  <SiTicktick className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span>
                    <span className="font-semibold text-foreground">{point.title}:</span>{" "}
                    {point.desc}
                  </span>
                </li>
              ))}
            </ul>

            <Button className="mt-5 bg-blue-900">
              <Link to="/contact">{data.buttonText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
