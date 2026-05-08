

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, LOGIN_URL, SIGN_UP_URL, } from "../../../utilities/apiUrl";


export const authApi = createApi({
    reducerPath: "authapi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().userAuth.token;
            if (token) {
                headers.set('Authorization', `${token}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        // loginUser: builder.mutation({
        //     query: ({ login, password }) => ({
        //         url: LOGIN_URL,
        //         method: "POST",
        //         body: {
        //             login,
        //             password
        //         }
        //     })
        // }),
        loginUser: builder.mutation({
  query: ({ login, password }) => ({
    url: LOGIN_URL,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      login,
      password,
    },
  }),
}),

        SignUp: builder.mutation({
            query: ({
                email,
                full_name,
                phone_number,
                password,
            }) => ({
                url: SIGN_UP_URL,
                method: "POST",
                body: {
                    email,
                    full_name,
                    phone_number,
                    password,
                }
            })
        }),
    })
});





export const {
    useLoginUserMutation,
    useSignUpMutation,
} = authApi