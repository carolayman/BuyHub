
export type ReviewUser = {
  _id: string;
  name: string;
};

export type ReviewType = {
  _id: string;
  review: string;
  rating: number;
  product: string;
  user: ReviewUser;
  createdAt: string;
  updatedAt: string;
};

export type ProductReviewsResponse = {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage: number | null;
  };
  data: ReviewType[];
};

export type ReviewFormValues = {
  review: string;
  rating: number;
};
