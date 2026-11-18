
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Star,
  Pencil,
  Trash2,
  Check,
  X,
  MessageSquareText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import { GetProductReviews } from "@/api/ReviewsActions/getProductReviews.action";
import { AddProductReview } from "@/api/ReviewsActions/addProductReview.action";
import { UpdateReview } from "@/api/ReviewsActions/updateReview.action";
import { DeleteReview } from "@/api/ReviewsActions/deleteReview.action";

import {
  ProductReviewsResponse,
  ReviewFormValues,
  ReviewType,
} from "@/types/reviews.types";

type Props = {
  productId: string;
};

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

function Stars({
  value,
  size = 16,
  onChange,
}: {
  value: number;
  size?: number;
  onChange?: (value: number) => void;
}) {
  const [hover, setHover] = useState(0);

  if (!onChange) {
    return (
      <div
        className="flex items-center gap-0.5"
        role="img"
        aria-label={`${value} out of 5 stars`}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            fill={star <= value ? "#FFC908" : "none"}
            color={star <= value ? "#FFC908" : "#D1D5DB"}
          />
        ))}
      </div>
    );
  }

  const display = hover || value;

  return (
    <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onFocus={() => setHover(star)}
          onBlur={() => setHover(0)}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          className="rounded-md p-0.5 transition-transform hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/40"
        >
          <Star
            size={size}
            fill={star <= display ? "#FFC908" : "none"}
            color={star <= display ? "#FFC908" : "#D1D5DB"}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewSkeleton() {
  return (
    <div className="animate-pulse space-y-4 rounded-2xl border border-gray-100 bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-100" />
        <div className="space-y-2">
          <div className="h-3 w-28 rounded bg-gray-100" />
          <div className="h-3 w-20 rounded bg-gray-100" />
        </div>
      </div>
      <div className="h-3 w-24 rounded bg-gray-100" />
      <div className="h-3 w-full rounded bg-gray-100" />
      <div className="h-3 w-2/3 rounded bg-gray-100" />
    </div>
  );
}

function SummarySkeleton() {
  return (
    <div className="animate-pulse space-y-4 rounded-3xl border border-gray-100 bg-white p-6">
      <div className="h-12 w-24 rounded bg-gray-100" />
      <div className="h-4 w-28 rounded bg-gray-100" />
      <div className="space-y-3 pt-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className="h-2 w-full rounded-full bg-gray-100" />
        ))}
      </div>
    </div>
  );
}

export default function ProductReviews({ productId }: Props) {
  const { data: session } = useSession();
  const currentUserName = session?.user?.name;

  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [metadata, setMetadata] =
    useState<ProductReviewsResponse["metadata"] | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftText, setDraftText] = useState("");
  const [draftRating, setDraftRating] = useState(0);

  const [busyId, setBusyId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchReviews = useCallback(
    async (page: number = 1) => {
      try {
        setIsLoading(true);
        setError("");

        const response = await GetProductReviews(productId, page);

        setReviews(response.data);
        setMetadata(response.metadata);
        setTotalResults(response.results);
        setCurrentPage(page);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load reviews"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [productId]
  );

  useEffect(() => {
    fetchReviews(1);
  }, [fetchReviews]);

  const stats = useMemo(() => {
    const total = reviews.length;
    const counts = [0, 0, 0, 0, 0];

    let sum = 0;
    let ratedReviews = 0;

    reviews.forEach((item) => {
      const rating = item.rating ?? 0;

      if (rating >= 1 && rating <= 5) {
        counts[Math.round(rating) - 1]++;
        sum += rating;
        ratedReviews++;
      }
    });

    return {
      total,
      counts,
      average: ratedReviews ? sum / ratedReviews : 0,
    };
  }, [reviews]);

  async function submitReview() {
    if (!newReview.trim()) {
      toast.error("Please write your review.");
      return;
    }

    if (newRating < 1 || newRating > 5) {
      toast.error("Please choose a rating.");
      return;
    }

    try {
      setIsSubmitting(true);

      const values: ReviewFormValues = {
        review: newReview.trim(),
        rating: newRating,
      };

      await AddProductReview(productId, values);

      setNewReview("");
      setNewRating(0);

      toast.success("Your review has been added successfully.");
      await fetchReviews(1);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to add review"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function startEdit(item: ReviewType) {
    setEditingId(item._id);
    setDraftText(item.review ?? "");
    setDraftRating(item.rating ?? 0);
  }

  function cancelEdit() {
    setEditingId(null);
    setDraftText("");
    setDraftRating(0);
  }

  async function saveEdit(item: ReviewType) {
    if (!draftText.trim()) {
      toast.error("Please write your review.");
      return;
    }

    if (draftRating < 1 || draftRating > 5) {
      toast.error("Please choose a rating.");
      return;
    }

    try {
      setBusyId(item._id);

      await UpdateReview(item._id, {
        review: draftText.trim(),
        rating: draftRating,
      });

      setEditingId(null);
      setDraftText("");
      setDraftRating(0);

      toast.success("Your review has been updated successfully.");
      await fetchReviews(currentPage);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update review"
      );
    } finally {
      setBusyId(null);
    }
  }

  function removeReview(item: ReviewType) {
    toast(
      ({ closeToast }) => (
        <div className="w-full">
          <p className="font-semibold text-gray-900">
            Delete this review?
          </p>
          <p className="mt-1 text-sm text-gray-500">
            This action cannot be undone.
          </p>

          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={closeToast}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={async () => {
                closeToast();

                try {
                  setBusyId(item._id);

                  await DeleteReview(item._id);

                  const nextPage =
                    reviews.length === 1 && currentPage > 1
                      ? currentPage - 1
                      : currentPage;

                  toast.success("Your review has been deleted.");
                  await fetchReviews(nextPage);
                } catch (err) {
                  toast.error(
                    err instanceof Error
                      ? err.message
                      : "Failed to delete review"
                  );
                } finally {
                  setBusyId(null);
                }
              }}
              className="rounded-lg bg-red-500 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  }

  const showSkeleton = isLoading && reviews.length === 0;
  const isRefreshing = isLoading && reviews.length > 0;

  return (
    <section className="mx-auto w-[92%] max-w-6xl py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Customer Reviews
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          See what customers think about this product.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[300px_1fr] lg:gap-8">
        {showSkeleton ? (
          <SummarySkeleton />
        ) : (
          <aside className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <div className="flex items-end gap-2">
              <span className="text-5xl font-bold leading-none text-gray-900">
                {stats.average ? stats.average.toFixed(1) : "–"}
              </span>
              <span className="mb-1 text-sm text-gray-400">/ 5</span>
            </div>

            <div className="mt-3">
              <Stars value={Math.round(stats.average)} size={20} />
            </div>

            <p className="mt-2 text-sm text-gray-500">
              {totalResults || stats.total} reviews
            </p>

            <div className="mt-6 space-y-2.5">
              {[5, 4, 3, 2, 1].map((number) => {
                const count = stats.counts[number - 1];
                const percentage = stats.total
                  ? (count / stats.total) * 100
                  : 0;

                return (
                  <div
                    key={number}
                    className="flex items-center gap-2 text-xs"
                  >
                    <span className="w-3 font-medium text-gray-600">
                      {number}
                    </span>
                    <Star size={12} fill="#FFC908" color="#FFC908" />

                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-yellow-400 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <span className="w-5 text-right tabular-nums text-gray-400">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </aside>
        )}

        <div className="min-w-0 space-y-6">
          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <MessageSquareText size={20} />
              </span>

              <div>
                <h3 className="text-lg font-bold leading-tight text-gray-900">
                  Write a Review
                </h3>
                <p className="text-sm text-gray-500">
                  Share your experience with this product.
                </p>
              </div>
            </div>

            <div className="mb-4">
              <p className="mb-2 text-sm font-medium text-gray-700">
                Your Rating
              </p>

              <div className="flex items-center gap-3">
                <Stars value={newRating} size={28} onChange={setNewRating} />

                {newRating > 0 && (
                  <span className="text-sm font-medium text-gray-500">
                    {RATING_LABELS[newRating]}
                  </span>
                )}
              </div>
            </div>

            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Tell us what you think about this product..."
              rows={4}
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/40 p-4 text-sm text-gray-700 placeholder:text-gray-400 transition-colors focus:border-green-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/30"
            />

            <button
              type="button"
              onClick={submitReview}
              disabled={isSubmitting}
              className="mt-4 w-full rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-green-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>

          {showSkeleton ? (
            <div className="space-y-4">
              <ReviewSkeleton />
              <ReviewSkeleton />
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-600">
              {error}
              <button
                type="button"
                onClick={() => fetchReviews(currentPage)}
                className="ml-2 font-semibold underline"
              >
                Try again
              </button>
            </div>
          ) : (
            <div
              className={`space-y-4 transition-opacity duration-200 ${
                isRefreshing
                  ? "pointer-events-none opacity-50"
                  : "opacity-100"
              }`}
            >
              {reviews.length === 0 ? (
                <div className="flex flex-col items-center rounded-3xl border border-dashed border-gray-200 bg-gray-50/50 py-14 text-center">
                  <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                    <MessageSquareText size={22} />
                  </span>

                  <p className="font-semibold text-gray-800">
                    No reviews yet
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Be the first to share your thoughts.
                  </p>
                </div>
              ) : (
                reviews.map((item) => {
                  const name = item.user?.name || "Customer";
                  const isOwner =
                    !!currentUserName &&
                    item.user?.name === currentUserName;

                  const isEditing = editingId === item._id;
                  const isBusy = busyId === item._id;

                  return (
                    <article
                      key={item._id}
                      className={`rounded-2xl border bg-white p-5 shadow-sm transition-all ${
                        isEditing
                          ? "border-green-300 ring-4 ring-green-500/10"
                          : "border-gray-100 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-50 to-green-100 font-semibold uppercase text-green-700">
                            {name.charAt(0)}
                          </span>

                          <div className="min-w-0">
                            <div className="flex min-w-0 items-center gap-2">
                              <h3 className="truncate font-semibold text-gray-900">
                                {name}
                              </h3>

                              {isOwner && (
                                <span className="shrink-0 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-green-700">
                                  You
                                </span>
                              )}
                            </div>

                            <span className="text-xs text-gray-400">
                              {new Date(item.createdAt).toLocaleDateString(
                                undefined,
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>

                        {isOwner && !isEditing && (
                          <div className="flex shrink-0 items-center gap-1">
                            <button
                              type="button"
                              aria-label="Edit review"
                              onClick={() => startEdit(item)}
                              disabled={isBusy}
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50"
                            >
                              <Pencil size={15} />
                            </button>

                            <button
                              type="button"
                              aria-label="Delete review"
                              onClick={() => removeReview(item)}
                              disabled={isBusy}
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        )}
                      </div>

                      {isEditing ? (
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center gap-3">
                            <Stars
                              value={draftRating}
                              size={24}
                              onChange={setDraftRating}
                            />

                            {draftRating > 0 && (
                              <span className="text-sm font-medium text-gray-500">
                                {RATING_LABELS[draftRating]}
                              </span>
                            )}
                          </div>

                          <textarea
                            value={draftText}
                            onChange={(e) => setDraftText(e.target.value)}
                            rows={3}
                            className="w-full resize-none rounded-xl border border-gray-200 p-3 text-sm text-gray-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                          />

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => saveEdit(item)}
                              disabled={isBusy}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-60"
                            >
                              <Check size={15} />
                              {isBusy ? "Saving..." : "Save"}
                            </button>

                            <button
                              type="button"
                              onClick={cancelEdit}
                              disabled={isBusy}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                            >
                              <X size={15} />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="mt-4">
                            <Stars value={item.rating ?? 0} />
                          </div>

                          <p className="mt-3 break-words whitespace-pre-line text-sm leading-6 text-gray-600">
                            {item.review}
                          </p>
                        </>
                      )}
                    </article>
                  );
                })
              )}

              {metadata && metadata.numberOfPages > 1 && (
                <div className="flex items-center justify-center gap-3 pt-4">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => fetchReviews(currentPage - 1)}
                    className="inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </button>

                  <span className="tabular-nums text-sm text-gray-500">
                    {currentPage} / {metadata.numberOfPages}
                  </span>

                  <button
                    type="button"
                    disabled={currentPage === metadata.numberOfPages}
                    onClick={() => fetchReviews(currentPage + 1)}
                    className="inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
