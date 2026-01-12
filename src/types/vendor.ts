export type Vendor = {
    length: number;
    id?: string | null;
    name?: string | null;
    contact?: string;
    alternativecontact?: string;
    email?: string;
    password?: string;
    category?: string;
    state?:string;
    city?:string;
    pincode?:string;
    address?: string;
    gstin?: string;
    experience?: string;
    location?: string;
    availability?: string;
    active?: string;
    deleted?: string;
    id_proof?: any | string;
    role?: string;
    data?:{category:string,location:string};

};

export type VendorRemark = {
    id?: string | null;            
    vendor_id?: string | null;            
    remark?: string | null; 
};