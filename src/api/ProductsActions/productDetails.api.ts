
export const getProductDetails = async (id: string) => {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`

    // { cache: "no-store" }
    // SSR → Fetch fresh data on EVERY request.
    // Use it when you need the latest data every time.
    // Example: social apps / frequently changing data.

    // { cache: "force-cache" }
    // SSG → Data is cached and the page is static.
    // If the data changes, you need to REBUILD the app
    // to get the new data.

    // { next: { revalidate: 60 } }
    // ISR → Revalidate the cached data every 60 seconds.
    // If the data changes, Next.js can fetch the new data
    // after the 60-second revalidation period.
  );

  const data = await response.json();
  return data;
};