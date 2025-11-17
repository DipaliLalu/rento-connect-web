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
  category?:string;
};
