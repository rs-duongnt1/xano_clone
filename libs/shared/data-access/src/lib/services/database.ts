import { ITable } from '@fast-api/shared/models';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const databaseApi = createApi({
  baseQuery: baseQuery,
  reducerPath: 'database',
  tagTypes: [],
  endpoints: (builder) => ({
    getListTable: builder.query<ITable[], void>({
      query: () => ({
        url: 'tables',
      }),
    }),
    getTableById: builder.query({
      query: (tableId) => ({
        url: `tables/${tableId}`,
      }),
    }),
    updateTable: builder.mutation({
      query: ({ tableId, dataUpdated }) => ({
        method: 'PATCH',
        url: `tables/${tableId}`,
        body: dataUpdated,
      }),
    }),
    createTable: builder.mutation({
      query: (dataInserted) => ({
        method: 'POST',
        url: `tables`,
        body: dataInserted,
      }),
    }),
    getContentsByTable: builder.query({
      query: (tableId) => ({
        url: `tables/${tableId}/contents`,
      }),
    }),
    generateContent: builder.mutation({
      query: (tableId) => ({
        method: 'POST',
        url: `tables/${tableId}/contents/generate`,
      }),
    }),
    updateContent: builder.mutation({
      query: ({ tableId, contentId, dataUpdated }) => ({
        method: 'PATCH',
        url: `tables/${tableId}/contents/${contentId}`,
        body: { item: dataUpdated },
      }),
    }),
    deleteMultipleContent: builder.mutation({
      query: ({ tableId, contentIds }) => ({
        method: 'DELETE',
        url: `tables/${tableId}/contents`,
        body: contentIds,
      }),
    }),
  }),
});

export const {
  useGetListTableQuery,
  useGetTableByIdQuery,
  useGetContentsByTableQuery,
  useUpdateTableMutation,
  useCreateTableMutation,
  useGenerateContentMutation,
  useUpdateContentMutation,
  useDeleteMultipleContentMutation,
} = databaseApi;
