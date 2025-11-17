export type SubCategory = {
    subcategory_id?: string | null;
    category_slug?: string | null;
    subcategory_name?: string;
    slug?: string;
    heading?: string;
    description?: string;
    subcategory_image?: any | string;
    active?: string;
    deleted?: number;
    created_by?: string;
    metadata?: string;
    type?: string | null;
    metatag?: string;
};

export type MobilitySubCategory = {
    id?: string | null;
    slug?: string;
    display_name?: string;
}
