
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, UPDATE_PASSWORD_URL, UPDATE_PROFILE_URL } from "../../../utilities/apiUrl";

export const profileApi = createApi({
    reducerPath: "profileApi",
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
        updateProfile: builder.mutation({
            query: ({ name, phone_number, email }) => ({
              url: UPDATE_PROFILE_URL,
              method: 'POST',
              body: { name, phone_number, email }
            })
          }),
        updatePassword: builder.mutation({
            query: ({ oldpassword,newpassword }) => ({
              url: UPDATE_PASSWORD_URL,
              method: 'POST',
              body: { oldpassword,newpassword }
            })
          }),
          deleteAccount: builder.mutation({
            query: () => ({
              url: "user/delete-account",
              method: "GET"
            })
          })
    })
});





export const {
    useUpdateProfileMutation,
    useUpdatePasswordMutation,
    useDeleteAccountMutation
} = profileApi