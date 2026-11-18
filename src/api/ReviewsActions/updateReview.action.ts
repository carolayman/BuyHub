"use server";

import type { ReviewFormValues } from "@/types/reviews.types";
import getMyToken from "@/utilities/GetMyToken.utilities";

export async function UpdateReview(
  reviewId: string,
  values: ReviewFormValues
) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Please login to update your review.");
  }

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
    {
      method: "PUT",
      headers : {
        token: token as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      cache: "no-store",
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Failed to update review");
  }

  return true;
}