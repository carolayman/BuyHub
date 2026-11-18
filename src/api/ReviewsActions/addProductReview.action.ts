"use server";

import type { ReviewFormValues } from "@/types/reviews.types";
import getMyToken from "@/utilities/GetMyToken.utilities";

export async function AddProductReview(
  productId: string,
  values: ReviewFormValues
) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Please login to add a review.");
  }

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`,
    {
      method: "POST",
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      cache: "no-store",
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Failed to add product review");
  }

  return true;
}