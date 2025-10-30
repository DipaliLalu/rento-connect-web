export type Product = {
    product_id?: string | null;
    product_name?: string;
    price_hour?: number | string;
    price_day?: number | string;
    slug?: string;
    description?: string;
    product_image?: any | string;
    active?:string;
    metadata?:string;
    metatag?:string;
    deleted?:string;
};
