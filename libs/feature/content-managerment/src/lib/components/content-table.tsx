import { Button, Dropdown, Space, Table, Tag, Typography, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { PlusOutlined, DeleteFilled, ClearOutlined } from '@ant-design/icons';
import { NewColumnDrawer } from './new-column-drawer';
import { EditableCell } from './editable-cell';
import { EditableRow } from './editable-row';
import { Stack } from '@mui/system';
import { useUpdateTableMutation } from '@fast-api/shared/data-access';

export const ContentTable = ({
  table,
  contents,
  generateContent,
  handleSave,
  deleteContents,
  loading = false,
  refetchTable,
}: any) => {
  const [data, setData] = useState<any>([]);
  const [rowsSelected, setRowsSelected] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [updateTable] = useUpdateTableMutation();

  useEffect(() => {
    if (contents) {
      setData([
        // eslint-disable-next-line no-unsafe-optional-chaining
        ...contents?.map((content: any) => ({
          id: content.id,
          item: content.item,
          key: content.id,
        })),
      ]);
    }
  }, [contents]);

  const handleUpdateTable = (schema: any, oldSchema: any) => {
    const dataUpdated = {
      name: table.name,
      schemas: [...(table.schemas || []), schema],
    };
    if (oldSchema) {
      const newSchemas = [...table.schemas];
      const schemaIndex = table.schemas.findIndex(
        (_schema: any) => oldSchema.name === _schema.name
      );
      newSchemas[schemaIndex] = schema;
      dataUpdated.schemas = newSchemas;
    }

    updateTable({ tableId: table.id, dataUpdated }).then(() => {
      refetchTable();
      setOpenDrawer(false);
      setOpenEditDrawer(false);
    });
  };

  const tableColumns = table?.schemas?.map((schema: any) => ({
    title: (
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography.Text strong>{schema.name}</Typography.Text>
          <Tag color="magenta">{schema.type}</Tag>
        </Stack>

        <NewColumnDrawer
          schema={schema}
          open={openEditDrawer}
          onClose={() => setOpenEditDrawer(false)}
          onClick={() => setOpenEditDrawer(true)}
          create={handleUpdateTable}
          init
        />
      </Stack>
    ),
    dataIndex: schema.name,
    key: schema.name,
    render: (text: any, value: any) => {
      return <div>{value.item[schema.name]}</div>;
    },
    onCell: (record: any) => {
      return {
        record,
        width: '240px',
        dataIndex: schema.name,
        editable: true,
        handleSave,
        schema,
      };
    },
  }));

  const columns = [
    {
      title: (
        <Space>
          <Typography.Text strong>#ID</Typography.Text>
          <Tag color="magenta">integer</Tag>
        </Space>
      ),
      dataIndex: 'id',
      key: 'id',
      width: '140px',
      onCell: (record: any) => {
        return {
          record,
          dataIndex: 'id',
        };
      },
      render: (text: any) => <div>{text}</div>,
    },
    ...(tableColumns || []),
    {
      width: '50px',
      title: (
        <NewColumnDrawer
          schema={null}
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          onClick={() => setOpenDrawer(true)}
          create={handleUpdateTable}
          init={false}
        />
      ),
      dataIndex: 'new',
      key: 'new',
      fixed: 'right',
    },
  ];

  const onSelectChange = (newSelectedRowKeys: any, values: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setRowsSelected(values);
  };

  const cancelDelete = () => {
    setSelectedRowKeys([]);
    setRowsSelected([]);
  };

  const confirmedDelete = () => {
    deleteContents(rowsSelected);
    setRowsSelected([]);
  };

  return (
    <Table
      loading={loading}
      components={{
        body: {
          cell: EditableCell,
          row: EditableRow,
        },
      }}
      tableLayout="fixed"
      scroll={{ x: 'max-content', y: 600 }}
      bordered
      columns={columns}
      dataSource={data}
      rowClassName={() => 'editable-row'}
      pagination={false}
      rowSelection={{
        type: 'checkbox',
        onChange: onSelectChange,
        selectedRowKeys,
        fixed: 'left',
      }}
      title={() => (
        <Stack
          sx={{
            height: '32px',
          }}
        >
          {rowsSelected.length === 0 && (
            <Space>
              <Button icon={<ClearOutlined />} danger>
                Clear Data
              </Button>
            </Space>
          )}
          {rowsSelected.length > 0 && (
            <Space>
              <Typography.Text>
                {rowsSelected.length}{' '}
                <Typography.Text>
                  record{rowsSelected.length !== 1 && 's'}
                </Typography.Text>{' '}
                selected
              </Typography.Text>
              <Button
                type="primary"
                icon={<DeleteFilled />}
                danger
                onClick={confirmedDelete}
              >
                Delete
              </Button>
              <Button type="default" onClick={cancelDelete}>
                Cancel
              </Button>
            </Space>
          )}
        </Stack>
      )}
      footer={() => (
        <Button
          type="dashed"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={generateContent}
        ></Button>
      )}
    />
  );
};
