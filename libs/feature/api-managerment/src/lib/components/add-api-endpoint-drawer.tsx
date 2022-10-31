import { ITable, Method } from '@fast-api/shared/models';
import { Stack } from '@mui/material';
import { Button, Col, Drawer, Form, Input, Row, Select } from 'antd';
const { Option } = Select;

interface AddApiEndpointDrawerProps {
  create: (table: ITable) => void;
  open: boolean;
  close: () => void;
}

export const AddApiEndpointDrawer = ({
  create,
  open,
  close,
}: AddApiEndpointDrawerProps) => {
  const methods: Method[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
  return (
    <Drawer
      title="New API Endpoint"
      onClose={close}
      open={open}
      bodyStyle={{
        paddingBottom: 80,
      }}
    >
      <Form
        layout="vertical"
        onFinish={create}
        initialValues={{
          name: null,
          method: 'GET',
        }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter name',
                },
              ]}
            >
              <Input placeholder="please enter name" />
            </Form.Item>
            <Form.Item
              name="method"
              label="Method"
              rules={[
                {
                  required: true,
                  message: 'Please enter method',
                },
              ]}
            >
              <Select>
                {methods.map((method) => (
                  <Option value={method} key={method}>
                    {method}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: false,
                  message: 'Please enter description',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="please enter description" />
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
