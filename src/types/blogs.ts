export type Blogs = {
  id?: string | null;
  title?: string | null;
  description?: string | null;
  image?: any | string;
  active?: string;
  deleted?: number;
  metadata?: string;
  metatag?: string;
  slug?: string;
  created_at?: string;
  category?: string;
};

export type Pager = {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  perPage: number;
}

export type BlogsResponse = {
  data: Blogs[];
  pager: Pager;
}

export type NextPrevResponse= {
  prev: Blogs | null;
  next: Blogs | null;
}

