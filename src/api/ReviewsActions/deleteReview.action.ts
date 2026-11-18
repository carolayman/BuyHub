"use server";

import getMyToken from "@/utilities/GetMyToken.utilities";

export async function DeleteReview(reviewId: string) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Please login to delete your review.");
  }

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
    {
      method: "DELETE",
      headers: {
        token : token as string,
      },
      cache: "no-store",
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Failed to delete review");
  }

  return true;
}