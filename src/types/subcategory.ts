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
    price_perday?: string;
    price_perhour?: string;
    display_name?: string;
    type?: string | null;
    metatag?: string;
};

export type MobilitySubCategory = {
    id?: string | null;
    slug?: string;
    display_name?: string;
}

export type Pager = {
    current_page: number;
    total: number;
    last_page: number;
}

export type SubCategoryResponse = {
    data: SubCategory[];
    pager: Pager;
}
