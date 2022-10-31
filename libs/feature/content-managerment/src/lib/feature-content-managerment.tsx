/*eslint @typescript-eslint/no-explicit-any: off*/
import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import {
  useDeleteMultipleContentMutation,
  useGenerateContentMutation,
  useGetContentsByTableQuery,
  useGetTableByIdQuery,
  useUpdateContentMutation,
} from '@fast-api/shared/data-access';
import { ContentTable } from './components/content-table';
import { Typography } from 'antd';
import './feature-content-managerment.scss';
import { ITableContent } from '@fast-api/shared/models';

export const FeatureContentManagerment = () => {
  const { id } = useParams();
  const {
    data: contents,
    refetch: refetchContents,
    isFetching,
  } = useGetContentsByTableQuery(id);
  const { data: table, refetch: refetchTable } = useGetTableByIdQuery(id);
  const [generate] = useGenerateContentMutation();
  const [updateContent] = useUpdateContentMutation();
  const [deleteMultipleContents] = useDeleteMultipleContentMutation();
  const generateContent = () => {
    generate(table.id).then((res) => {
      refetchContents();
    });
  };

  const handleSave = (value: any, record: ITableContent, dataIndex: string) => {
    updateContent({
      tableId: id,
      contentId: record.id,
      dataUpdated: { ...record.item, [dataIndex]: value },
    }).then((res) => {
      console.log('save success');
    });
  };

  const handleDeleteContents = (contents: ITableContent[]) => {
    deleteMultipleContents({
      tableId: id,
      contentIds: contents.map((content) => content.id),
    }).then(() => {
      refetchContents();
    });
  };

  return (
    <Stack>
      <Typography.Title level={4}>Data</Typography.Title>
      {table && (
        <ContentTable
          refetchTable={refetchTable}
          loading={isFetching}
          deleteContents={handleDeleteContents}
          contents={contents}
          table={table}
          generateContent={generateContent}
          handleSave={handleSave}
        />
      )}
    </Stack>
  );
};
