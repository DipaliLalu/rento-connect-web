import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type CategoryKey = "equipment" | "experts" | "mobility";

interface CategoryData {
  title: string;
  points: { title: string; desc: string }[];
  buttonText: string;
  url: string;
  imageUrl: string;
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
    url: 'services',
    imageUrl: 'Rento_Website/2_Equipment/Why-Rent-Equipment-from-Rento-Connects.png',
  },
  experts: {
    title: "Why Hire Experts from Rento Connect?",
    points: [
      { title: "Verified Professionals", desc: "Every expert on our platform is thoroughly vetted for their skills, experience, and certifications." },
      { title: "Flexible Engagement", desc: "Hire experts for short-term projects, long-term contracts, or on-demand consultations." },
      { title: "Nationwide Coverage", desc: "Access a vast network of specialists across India, ready to be deployed to your site." },
      { title: "End-to-End Support", desc: "We handle everything—from expert selection to deployment—ensuring smooth execution and reliability." },
    ],
    buttonText: "Post Your Requirement",
    url: 'services',
    imageUrl: 'Rento_Website/2_Equipment/Why-Hire-Experts-from-Rento-Connect.png',
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
    url: 'contact',
    imageUrl: 'Rento_Website/2_Equipment/Your-Partner-in-Workforce-Mobility.png'
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
          <div className="h-full w-full rounded-2xl">
            <img
              alt={data.title}
              src={data.imageUrl}
              loading="lazy"
              className="w-full h-full object-cover rounded-2xl shadow-lg"
            />

          </div>

          {/* Content */}
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold">{data.title}</h2>

            <ul className="mt-6 space-y-4 text-muted-foreground">
              {data.points.map((point, index) => (
                <li key={index} className="flex items-start group gap-2">
                  <img
                    src={'Rento_Website/2_Equipment/Right1.png'}
                    alt={'Tick Icon'}
                    className="w-8 h-8 object-contain group-hover:hidden duration-500 "
                  />

                  <img
                    src={'Rento_Website/2_Equipment/Right2.png'}
                    alt={'Tick Icon'}
                    className="w-8 h-8 object-contain hidden group-hover:block duration-500"
                  />
                  <span>
                    <span className="font-semibold text-foreground">{point.title}:</span>{" "}
                    {point.desc}
                  </span>
                </li>
              ))}
            </ul>

            <Button className="mt-5" variant={"custom"}>
              <Link to="/contact">{data.buttonText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
