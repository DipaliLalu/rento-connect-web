export type Booking = {
  id?: number;
  customer_id?: number;
  name: string;
  contact: string;
  email: string;
  subcategory: string;
  gstin: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  active?: string;
  deleted?: string;
  category?: string;
  final_booking_price_perday?: string;
  final_booking_price_perhour?: string;
  final_quotation_upload?: any;
  reason?: string;
};

export type BookingRemark = {
  id?: string | null;
  booking_id?: string | null;
  remark?: string | null;
};