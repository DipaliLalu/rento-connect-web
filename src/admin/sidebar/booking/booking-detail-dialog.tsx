import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import type { Booking } from "../../../types/booking";
import BookingDetailCard from "./booking-detail-card";


type Props = {
  open: boolean;
  onClose: () => void;
  booking: Booking | null;
};

export default function BookingDetailDialog({
  open,
  onClose,
  booking,
}: Props) {
  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>

        <BookingDetailCard booking={booking} />
      </DialogContent>
    </Dialog>
  );
}
