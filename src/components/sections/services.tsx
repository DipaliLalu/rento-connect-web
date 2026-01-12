import { useNavigate } from "react-router-dom";

export const category = [
  {
    category_id: "1",
    category_name: "Equipment",
    slug: "equipment",
    title: "Heavy Equipment",
    heading: "Heavy Equipment for Rent",
    description:
      "Find and rent the right heavy machinery for your project, anywhere in India. Competitive pricing and verified vendors.",
    category_image: "/Rento_Website/1_Home_Page/Our Core Services/Heavy-Equipment1.png",
    category_hover_image: "/Rento_Website/1_Home_Page/Our Core Services/Heavy-Equipment2.png",
  },
  {
    category_id: "2",
    category_name: "Experts",
    slug: "experts",
    title: "Experts On-Demand",
    heading: "Experts On-Demand",
    description:
      "Access a nationwide network of certified and experienced industrial professionals. From PLC programmers to safety officers, find the right expert for your project.",
    category_image: "/Rento_Website/1_Home_Page/Our Core Services/Experts-On-Demand1.png",
    category_hover_image: "/Rento_Website/1_Home_Page/Our Core Services/Experts-On-Demand2.png",

  },
  {
    category_id: "3",
    category_name: "Mobility",
    slug: "mobility",
    title: "Mobility Solutions",
    heading: "Industrial Mobility Solutions",
    description:
      "Reliable, scalable, and customized transport solutions for your workforce. On-demand taxis and contract-based buses.",
    category_image: "/Rento_Website/1_Home_Page/Our Core Services/Mobility-Solutions1.png",
    category_hover_image: "/Rento_Website/1_Home_Page/Our Core Services/Mobility-Solutions2.png",

  },
];

function Services() {
  // const { category = [] } = useGetCategory();
 
  const navigate = useNavigate();
  const handleClick = (slug: any) => {
    navigate(`/${slug}`)
  }
  return (
    <section className="flex flex-col gap-5 text-center mt-12">
      <h2 className="font-headline text-3xl md:text-4xl font-bold text-blue-950">Our Core Services</h2>
      <p className="text-[var(--color-muted-foreground)]">
        Everything you need for your industrial operations, all in one place.
      </p>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-6 px-4 md:px-10">
        {category.map((data) => (
          <div
            key={data.category_id}
            className="group bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transition hover:-translate-y-2 cursor-pointer hover:border-2 hover:border-blue-900 duration-500 border-orange-600 border-2"
            onClick={() => handleClick(data?.slug)}
          >
            {/* Icon / Image */}
            <div className="w-20 h-20 flex items-center justify-center bg-orange-100 rounded-full mb-4 border-2 border-blue-900 group-hover:border-orange-600 overflow-hidden">
              <div className="group">
                <img
                  src={data.category_image}
                  alt={data.category_name}
                  className="w-20 h-20 object-contain group-hover:hidden duration-500 "
                />

                <img
                  src={data.category_hover_image}
                  alt={data.category_name}
                  className="w-20 h-20 object-contain hidden group-hover:block scale-110"
                />
              </div>

            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-blue-950">
              {data.title}
            </h3>

            {/* Description */}
            <p className="text-[var(--color-muted-foreground)] mt-2">
              {data.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
