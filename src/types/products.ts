export type Product = {
    product_id?: string | null;
    vendor_id?: string | null;
    category?: string ;
    sub_category?: string ;
    product_name?: string;
    location?: string;
    price_hour?:  string;
    price_day?: string;
    slug?: string;
    description?: string;
    product_image?: any | string;
    active?:string;
    metadata?:string;
    metatag?:string;
    deleted?:string;
};
