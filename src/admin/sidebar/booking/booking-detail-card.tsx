import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import type { Booking } from "../../../types/booking";

type Props = {
    booking: Booking;
};

export default function BookingDetailCard({ booking }: Props) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex gap-3 items-center capitalize">
                    <span>Name :</span> {booking.name}
                    {/* <Badge variant={booking.active == 1 ? "success" : "secondary"}>
            {booking.active == 1 ? "Booked" : "Pending"}
          </Badge> */}
                </CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-muted-foreground">Contact</p>
                    <p>{booking.contact}</p>
                </div>

                <div>
                    <p className="text-muted-foreground">Email</p>
                    <p>{booking.email}</p>
                </div>

                <div>
                    <p className="text-muted-foreground">Service</p>
                    <p>{booking.category}</p>
                </div>

                <div>
                    <p className="text-muted-foreground">Sub Service</p>
                    <p>{booking.subcategory}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Description</p>
                    <p>{booking.description}</p>
                </div>

                <div>
                    <p className="text-muted-foreground">Location</p>
                    <p>{booking.location}</p>
                </div>
                {booking.gstin && (
                    <div>
                        <p className="text-muted-foreground">GSTIN</p>
                        <p>{booking.gstin}</p>
                    </div>
                )}
                <div>
                    <p className="text-muted-foreground">Start Date</p>
                    <p>{booking.startDate}</p>
                </div>

                <div>
                    <p className="text-muted-foreground">End Date</p>
                    <p>{booking.endDate}</p>
                </div>

                {booking.final_booking_price_perday && (
                    <div>
                        <p className="text-muted-foreground">Price Per Day</p>
                        <p>{booking.final_booking_price_perday}</p>
                    </div>
                )}
                {booking.final_booking_price_perhour && (
                    <div>
                        <p className="text-muted-foreground">Price Per Hour</p>
                        <p>{booking.final_booking_price_perhour}</p>
                    </div>
                )}
                {booking.final_quotation_upload && (
                    <div className="col-span-2">
                        <p className="text-muted-foreground mb-2">Quotation</p>
                        <Button className="" onClick={() => window.open(`${import.meta.env.VITE_URL}/${booking.final_quotation_upload}`, "_black")}>view PDF</Button>
                        {/* <p>{booking.final_quotation_upload}</p> */}
                    </div>
                )}
                {booking.reason && (
                    <div>
                        <p className="text-muted-foreground">Reason</p>
                        <p>{booking.reason}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
