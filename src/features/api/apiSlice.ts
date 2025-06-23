import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

// Initialize an empty API service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    // You can add default headers here
    prepareHeaders: (headers) => {
      // If your API requires authentication, you can add the token here
      // const token = localStorage.getItem('token');
      // if (token) {
      //   headers.set('authorization', `Bearer ${token}`);
      // }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export const api = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    // Example endpoint - replace with your actual endpoints
    // getExample: builder.query<ResponseType, void>({
    //   query: () => 'example',
    // }),
  }),
});

// Export hooks for usage in functional components
export const { 
  // useGetExampleQuery,
} = api;
