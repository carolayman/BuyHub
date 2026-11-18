
export const getAllProducts = async () => {
const baseUrl = 'https://ecommerce.routemisr.com/api/v1/products';
const limit = 40;

const firstResponse = await fetch(`${baseUrl}?page=1&limit=${limit}`);

if (!firstResponse.ok) {
throw new Error('Failed to fetch products');
}

const firstData = await firstResponse.json();

const totalPages =
firstData.metadata?.numberOfPages ??
firstData.paginationResult?.numberOfPages ??
1;

const allProducts = [...(firstData.data ?? [])];

for (let page = 2; page <= totalPages; page++) {
const response = await fetch(
    `${baseUrl}?page=${page}&limit=${limit}`
);

if (!response.ok) {
    throw new Error(`Failed to fetch products page ${page}`);
}

const data = await response.json();
allProducts.push(...(data.data ?? []));
}

return {
...firstData,
data: allProducts,
results: allProducts.length,
};
};
