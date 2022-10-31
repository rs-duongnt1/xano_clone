import {
  useGetEndpointQuery,
  useGetListTableQuery,
  useUpdateEndpointMutation,
} from '@fast-api/shared/data-access';
import { FunctionStack } from '@fast-api/shared/models';
import { Button, Space, Typography, Card } from 'antd';
import { useEffect, useState } from 'react';
import { AddFunctionStackDrawer } from './add-function-stack-drawer';

interface FunctionStacksProps {
  endpointId: string | undefined;
}

export const FunctionStacks = ({ endpointId }: FunctionStacksProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [updateEndpoint] = useUpdateEndpointMutation();
  const { data: tables } = useGetListTableQuery();
  const { data: endpoint } = useGetEndpointQuery(endpointId);

  const handleCreate = (data) => {
    let functionStacks: FunctionStack[] = [];
    if (endpoint?.functionStacks) {
      functionStacks = [...endpoint.functionStacks];
    }
    functionStacks.push({
      type: 'db',
      context: {
        dbo: {
          id: data.tableId,
        },
      },
      as: data.as,
      expressions: data.expressions,
    });
    updateEndpoint({
      id: Number(endpointId),
      dataUpdated: {
        functionStacks,
      },
    });
  };

  const getTableNameByTableId = (tableId: number) => {
    return tables?.find((table) => table.id === tableId)?.name;
  };

  return (
    <Space direction="vertical">
      <Typography.Title level={4}>Function Stacks</Typography.Title>
      <div>
        <Space direction="vertical">
          {endpoint?.functionStacks?.map((functionStack, index) => (
            <Space key={index}>
              <Typography.Text>{index + 1}.</Typography.Text>
              <Space>
                <Typography.Text> Get record from</Typography.Text>
                <Typography.Text mark>
                  {getTableNameByTableId(functionStack.context.dbo.id)}
                </Typography.Text>
                <Typography.Text>as</Typography.Text>
                <Typography.Text mark>{functionStack.as}</Typography.Text>
              </Space>
            </Space>
          ))}
        </Space>
      </div>
      <Button type="primary" onClick={() => setOpenDrawer(true)}>
        Add function
      </Button>
      {tables && (
        <AddFunctionStackDrawer
          tables={tables}
          open={openDrawer}
          create={handleCreate}
          close={() => setOpenDrawer(false)}
        />
      )}
    </Space>
  );
};
