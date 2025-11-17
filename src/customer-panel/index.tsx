
import { TfiMenuAlt } from "react-icons/tfi";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { Button } from "../components/ui/button";
import { LuHistory } from "react-icons/lu";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Index() {
    const navigate=useNavigate();
    const handleBookings=()=>{
        navigate('/customer-dashboard/booking')
    }
    const handleBookinghistory=()=>{
        navigate('/customer-dashboard/booking-history')
    }
    return (
        <section className="">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-slate-200/30 py-5 lg:py-14 px-5 md:px-10">
                <div className="flex flex-col p-5 bg-white rounded-lg gap-4">
                    <div className="flex gap-2 items-center">
                        <TfiMenuAlt className="text-primary" size={22} />
                        <h2 className="text-2xl font-bold text-blue-950">My Bookings</h2>
                    </div>
                    <p className="text-muted-foreground">View and manage your active and upcoming service bookings.</p>
                    <Button className="w-fit bg-slate-100 text-black hover:text-white" onClick={handleBookings}>View My Bookings</Button>
                </div>
                <div className="flex flex-col p-5 bg-white rounded-lg gap-4">
                    <div className="flex gap-2 items-center">
                        <HiOutlinePlusCircle  className="text-primary" size={25} />
                        <h2 className="text-2xl font-bold text-blue-950">New Requirement</h2>
                    </div>
                    <p className="text-muted-foreground">Need to rent equipment, hire an expert or book a vehicle? Post a new requirement.</p>
                    <Button className="w-fit bg-blue-900 hover:bg-blue-800"><Link to={'/services'}>Post Requirement</Link></Button>
                </div>
                <div className="flex flex-col p-5 bg-white rounded-lg gap-4">
                    <div className="flex gap-2 items-center">
                        <LuHistory  className="text-primary" size={25} />
                        <h2 className="text-2xl font-bold text-blue-950">Booking History</h2>
                    </div>
                    <p className="text-muted-foreground">Review your past bookings and payment history.</p>
                      <Button className="w-fit bg-slate-100 text-black hover:text-white" onClick={handleBookinghistory}>View History</Button>
                </div>
            </div>
            <Outlet/>
        </section>
    )
}

export default Index
