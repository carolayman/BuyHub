
import { ProductReviewsResponse } from "@/types/reviews.types"; 

export async function GetProductReviews(
  productId: string,
  page: number = 1
): Promise<ProductReviewsResponse> {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews?page=${page}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || "Failed to fetch product reviews");
  }

  return payload;
}
