/*eslint @typescript-eslint/no-explicit-any: off*/
import { Button, Space, Table, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { PlusOutlined, DeleteFilled, ClearOutlined } from '@ant-design/icons';
import { NewColumnDrawer } from './new-column-drawer';
import { EditableCell } from './editable-cell';
import { EditableRow } from './editable-row';
import { Stack } from '@mui/system';
import { useUpdateTableMutation } from '@fast-api/shared/data-access';
import { ITable, ITableContent, ISchema } from '@fast-api/shared/models';
import { ColumnsType } from 'antd/lib/table';
import { SettingOutlined } from '@ant-design/icons';
interface ContentTableProps {
  table: ITable;
  contents: ITableContent[];
  generateContent: () => void;
  handleSave: (value: any, record: ITableContent, dataIndex: string) => void;
  deleteContents: (rowsSelected: ITableContent[]) => void;
  loading: boolean;
  refetchTable: () => void;
}

interface ITableData {
  id: number;
  item: any;
}

export const ContentTable = ({
  table,
  contents,
  generateContent,
  handleSave,
  deleteContents,
  loading = false,
  refetchTable,
}: ContentTableProps) => {
  const [data, setData] = useState<ITableData[]>([]);
  const [rowsSelected, setRowsSelected] = useState<ITableContent[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [updateTable] = useUpdateTableMutation();
  const [schemaSelected, setSchemaSelected] = useState<ISchema>();

  useEffect(() => {
    if (contents) {
      setData([
        ...contents.map((content) => ({
          id: content.id,
          item: content.item,
          key: content.id,
        })),
      ]);
    }
  }, [contents]);

  const handleUpdateTable = (schema: ISchema, oldSchema?: ISchema) => {
    const dataUpdated = {
      name: table.name,
      schemas: [...(table.schemas || []), schema],
    };
    if (oldSchema) {
      const newSchemas = [...table.schemas];
      const schemaIndex = table.schemas.findIndex(
        (_schema) => oldSchema.name === _schema.name
      );
      newSchemas[schemaIndex] = schema;
      dataUpdated.schemas = newSchemas;
    }

    updateTable({ tableId: table.id, dataUpdated }).then(() => {
      refetchTable();
      setOpenDrawer(false);
    });
  };

  const tableColumns: ColumnsType<ITableData> = table?.schemas?.map(
    (schema: ISchema) => ({
      title: (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography.Text strong>{schema.name}</Typography.Text>
            <Tag color="magenta">{schema.type}</Tag>
          </Stack>

          <SettingOutlined
            onClick={() => {
              setSchemaSelected(schema);
              setOpenDrawer(true);
            }}
          />

          {/* <NewColumnDrawer
            schema={schema}
            open={openEditDrawer}
            onClose={() => setOpenEditDrawer(false)}
            onClick={() => setOpenEditDrawer(true)}
            create={handleUpdateTable}
            init
          /> */}
        </Stack>
      ),
      dataIndex: schema.name,
      key: schema.name,
      render: (value, content) => {
        return <div>{content.item[schema.name]}</div>;
      },
      onCell: (record: ITableData) => {
        return {
          record,
          width: '240px',
          dataIndex: schema.name,
          editable: true,
          handleSave,
          schema,
        };
      },
    })
  );

  const columns: ColumnsType<ITableData> = [
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
      onCell: (record: ITableData) => {
        return {
          record,
          title: 'id',
          dataIndex: 'id',
        };
      },
      render: (text: string) => <div>{text}</div>,
    },
    ...(tableColumns || []),
    {
      width: '50px',
      title: (
        <Button
          type="primary"
          shape="circle"
          onClick={() => setOpenDrawer(true)}
          icon={<PlusOutlined />}
        ></Button>
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
    <>
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
      <NewColumnDrawer
        open={openDrawer}
        schema={schemaSelected}
        onClose={() => {
          setOpenDrawer(false);
          setSchemaSelected(undefined);
        }}
        create={handleUpdateTable}
      />
    </>
  );
};
