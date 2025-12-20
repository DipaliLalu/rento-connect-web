import { useNavigate } from "react-router-dom";
import { useGetCategory } from "../../actions/category"

function Services() {
  const { category = [] } = useGetCategory();
  const navigate=useNavigate();
  const handleClick = (slug:any) => {
    navigate(`/${slug}`)
  }
  return (
    <section className="flex flex-col gap-5 text-center mt-20">
      <h2 className="font-headline text-3xl md:text-4xl font-bold text-blue-950">Our Core Services</h2>
      <p className="text-[var(--color-muted-foreground)]">
        Everything you need for your industrial operations, all in one place.
      </p>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-6 px-4 md:px-10">
        {category.map((data) => (
          <div
            key={data.category_id}
            className="bg-white rounded-xl shadow-md border p-6 flex flex-col items-center text-center hover:shadow-xl transition hover:-translate-y-2 cursor-pointer"
            onClick={()=>handleClick(data?.slug)}
          >
            {/* Icon / Image */}
            <div className="w-20 h-20 flex items-center justify-center bg-orange-100 rounded-full mb-4">
              <img
                src={`${import.meta.env.VITE_URL}/${data.category_image}`}
                alt={data.category_name}
                className="w-20 h-14 object-contain"
              />
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
