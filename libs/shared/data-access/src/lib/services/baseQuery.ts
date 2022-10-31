import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3333',
  credentials: 'include',
  prepareHeaders: (headers, { getState }: { getState: any }) => {
    const token = getState().auth?.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});
