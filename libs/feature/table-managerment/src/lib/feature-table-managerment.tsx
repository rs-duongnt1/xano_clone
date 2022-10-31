import * as React from 'react';
import { Stack } from '@mui/material';
import { useGetListTableQuery } from '@fast-api/shared/data-access';
import { useNavigate } from 'react-router-dom';
import { CreateTableDrawer } from './components/create-table-drawer';
import { List, Col, Row, Typography } from 'antd';
import { useCreateTableMutation } from '@fast-api/shared/data-access';

export const FeatureTableManagerment = () => {
  const { data: tables } = useGetListTableQuery();
  const [createTable] = useCreateTableMutation();
  const handleCreateTable = (data: any) => {
    createTable(data);
  };

  const navigate = useNavigate();
  return (
    <Stack>
      <Stack direction="row" justifyContent="flex-end" mt={2}>
        <CreateTableDrawer create={handleCreateTable} />
      </Stack>
      <Typography.Title level={3}>Table List</Typography.Title>
      <Row gutter={16}>
        {tables?.map((table: any) => (
          <Col
            span={8}
            key={table.id}
            className="cursor-pointer user-select-none"
            onClick={() => navigate(`/databases/${table.id}/contents`)}
          >
            <List
              header={
                <Typography.Title level={4}>{table.name}</Typography.Title>
              }
              bordered
              dataSource={table.schemas || []}
              locale={{ emptyText: 'No records' }}
              renderItem={(item: any) => (
                <List.Item>
                  <Typography.Text>{item.name}</Typography.Text>
                </List.Item>
              )}
            />
          </Col>
        ))}
      </Row>
    </Stack>
  );
};
