import { ISchema } from '@fast-api/shared/models';
import { Stack } from '@mui/material';
import { Button, Col, Drawer, Form, Input, Row, Select, Checkbox } from 'antd';
import { useEffect } from 'react';

const { Option } = Select;
const types = [
  { value: 'integer', label: 'Integer' },
  { value: 'decimal', label: 'Decimal' },
  { value: 'text', label: 'Text' },
  { value: 'password', label: 'Password' },
  { value: 'datetime', label: 'Datetime' },
];

export const NewColumnDrawer = ({
  open = false,
  onClose,
  schema,
  create,
}: {
  open: boolean;
  onClose: () => void;
  schema?: ISchema;
  create: (newSchema: ISchema, oldSchema?: ISchema) => void;
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (form && open) {
      form.setFieldsValue({
        type: schema?.type || null,
        name: schema?.name || null,
        required:
          typeof schema?.required === 'boolean' ? schema?.required : false,
        nullable:
          typeof schema?.nullable === 'boolean' ? schema?.nullable : true,
        description: schema?.description || null,
      });
    }
  }, [form, open, schema]);

  const handleCreate = (newSchema: ISchema) => {
    create(newSchema, schema);
  };

  const handleOnClose = () => {
    form.setFieldsValue({
      type: null,
      name: null,
      required: false,
      nullable: true,
      description: null,
    });
    onClose();
  };

  return (
    <Drawer
      getContainer={false}
      title={!schema ? 'Field Type' : schema?.name}
      onClose={handleOnClose}
      open={open}
      bodyStyle={{
        paddingBottom: 80,
      }}
    >
      <Form layout="vertical" form={form} onFinish={handleCreate}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="type"
              label="Field Type"
              rules={[
                {
                  required: true,
                  message: 'Please select a type',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select a type"
                optionFilterProp="children"
              >
                {types.map((type) => (
                  <Option key={type.value} value={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Field Name"
              rules={[
                {
                  required: true,
                  validator: async (rule, value) => {
                    if (!value) {
                      throw new Error('Please enter field name');
                    }

                    if (!/^[a-z\d_]+$/i.test(value)) {
                      throw new Error('Field name incorrect format');
                    }
                  },
                },
              ]}
            >
              <Input placeholder="Please enter field name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="required" valuePropName="checked">
              <Checkbox
                // onChange={onChange}
                defaultChecked
              >
                Required
              </Checkbox>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="nullable" valuePropName="checked">
              <Checkbox>Nullable</Checkbox>
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
            <Button>Cancel</Button>
            {!schema && (
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            )}
            {schema && (
              <>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Button type="primary" danger>
                  Delete
                </Button>
              </>
            )}
          </Stack>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
