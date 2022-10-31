import { ITable, Method } from '@fast-api/shared/models';
import { Stack } from '@mui/material';
import { Button, Col, Drawer, Form, Input, Row, Select } from 'antd';
import { QueryBuilder } from '../query-builder';
const { Option } = Select;

interface AddFunctionStackDrawerProps {
  create: (table: ITable) => void;
  open: boolean;
  close: () => void;
  tables: ITable[];
}

export const AddFunctionStackDrawer = ({
  tables,
  create,
  open,
  close,
}: AddFunctionStackDrawerProps) => {
  const [form] = Form.useForm();
  return (
    <Drawer
      size="large"
      title="Add function"
      onClose={close}
      open={open}
      bodyStyle={{
        paddingBottom: 80,
      }}
    >
      <Form
        layout="vertical"
        onFinish={create}
        form={form}
        initialValues={{
          method: 'GET',
          tableId: tables[0].id,
          as: tables[0].name,
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="tableId"
              label="Table"
              rules={[
                {
                  required: true,
                  message: 'Please enter method',
                },
              ]}
            >
              <Select>
                {tables.map((table) => (
                  <Option value={table.id} key={table.id}>
                    {table.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="as"
              label="As"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="expressions"
              label="Expressions"
              rules={[
                {
                  required: false,
                  message: 'Please enter description',
                },
              ]}
            >
              <QueryBuilder
                table={tables[0]}
                change={(value) =>
                  form.setFieldValue('expressions', JSON.parse(value))
                }
              />
              {/* <Input.TextArea rows={4} placeholder="please enter description" /> */}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Stack direction="row" spacing={2}>
            <Button onClick={close}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Stack>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
