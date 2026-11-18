
import { ReviewType } from "@/types/reviews.types";

export async function GetReviewById(
  reviewId: string
): Promise<ReviewType> {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || "Failed to fetch review");
  }

  return payload.data;
}
