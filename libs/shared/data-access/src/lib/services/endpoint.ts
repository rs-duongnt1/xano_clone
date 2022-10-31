import { ITable, IApiEndpoint } from '@fast-api/shared/models';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const endpointApi = createApi({
  baseQuery: baseQuery,
  reducerPath: 'endpoint',
  tagTypes: [],
  endpoints: (builder) => ({
    createEndpoint: builder.mutation<IApiEndpoint, any>({
      query: (body) => ({
        url: 'endpoints',
        method: 'POST',
        body,
      }),
    }),
    getEndpoint: builder.query<IApiEndpoint, string | undefined>({
      query: (id: string) => ({
        url: `endpoints/${id}`,
      }),
    }),
    getListEndpoints: builder.query<IApiEndpoint[], void>({
      query: () => ({
        url: 'endpoints',
      }),
    }),

    updateEndpoint: builder.mutation<IApiEndpoint, any>({
      query: ({ id, dataUpdated }) => ({
        url: `endpoints/${id}`,
        method: 'PATCH',
        body: dataUpdated,
      }),
    }),
  }),
});

export const {
  useGetEndpointQuery,
  useCreateEndpointMutation,
  useGetListEndpointsQuery,
  useUpdateEndpointMutation,
} = endpointApi;
