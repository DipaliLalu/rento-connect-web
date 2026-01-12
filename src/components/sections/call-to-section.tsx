import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function CallToAction() {
  return (
    <section className="py-16 px-10 bg-[var(--color-muted-foreground)]/10">
      <div className="text-center">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-blue-950">
          Ready to Elevate Your Industrial Operations?
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Join a growing network of businesses and service providers. Register today to
          unlock new opportunities and streamline your workflow.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
           <Button variant={"custom"}>
              <Link to={'/customer-register'}>
              Join as a Customer
              </Link>
            </Button>
            <Button variant={"custom"}>
               <Link to={'/vendor-register'}>
              Join as a Vendor
               </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
