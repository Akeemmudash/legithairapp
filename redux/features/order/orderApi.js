
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, CREATE_ORDER_URL, ORDER_HISTORY_URL, } from "../../../utilities/apiUrl";


export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().userAuth.token;
            if (token) {
                console.log("Token:", token); // Add this line for debugging
                headers.set('Authorization', `Bearer ${token}`); // Ensure Bearer token format
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (orderDetails) => ({
                url: CREATE_ORDER_URL,
                method: 'POST',
                body: orderDetails
            })
        }),
        getOrderHistory: builder.query({
            query: () => ({
                url: ORDER_HISTORY_URL,
                method: 'GET'
            })
        }),
    })
});



export const {
    useCreateOrderMutation,
    useGetOrderHistoryQuery
} = orderApi