
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, LOGIN_URL, PRODUCT_URL, SIGNUP_URL } from  "../../../utilities/apiUrl";

export const productApi = createApi({
    reducerPath: "productapi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().userAuth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`); // Ensure Bearer token format
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        rateProduct: builder.mutation({
            query: ({ productId, rating }) => ({
                url: `user/save-and-rate-products?product_id=${productId}&rating=${rating}`,
                method: "GET"
            })
        }),
        saveProduct: builder.mutation({
            query: ({ productId }) => ({
              url: `user/save-and-rate-products?product_id=${productId}`,
              method: "GET"
            })
          }),
          fetchProducts: builder.query({
            query: ({ page }) => `user/get-products?page=${page}`
          }),
          fetchDashboards: builder.query({
            query: () => `user/user-dashboard`
          }),
          searchProducts: builder.query({
            query: (searchValue) => `user/get-products?search_value=${searchValue}`,
          }),
          fetchCategories: builder.query({
            query: () => 'user/app-category',
        }),
        getLandMark: builder.query({
          query: (state) => `user/get_landmark?state=${state}`,
      }),
    })
});





export const {
    useRateProductMutation,
    useFetchProductsQuery,
    useSaveProductMutation, 
    useSearchProductsQuery,
    useFetchCategoriesQuery,
    useFetchDashboardsQuery,
    useGetLandMarkQuery
} = productApi