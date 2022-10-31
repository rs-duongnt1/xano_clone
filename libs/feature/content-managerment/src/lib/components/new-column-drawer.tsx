import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Stack } from '@mui/material';
import { Button, Col, Drawer, Form, Input, Row, Select, Checkbox } from 'antd';
import React from 'react';

const { Option } = Select;
export const NewColumnDrawer = ({
  init = false,
  open = false,
  onClose,
  schema,
  create,
  onClick,
}: {
  init: boolean;
  open: boolean;
  onClose: any;
  schema: any;
  create: any;
  onClick: any;
}) => {
  const types = [
    { value: 'integer', label: 'Integer' },
    { value: 'decimal', label: 'Decimal' },
    { value: 'text', label: 'Text' },
    { value: 'password', label: 'Password' },
    { value: 'datetime', label: 'Datetime' },
  ];

  const initialValues = {
    type: schema?.type || null,
    name: schema?.name || null,
    required: typeof schema?.required === 'boolean' ? schema?.required : false,
    nullable: typeof schema?.nullable === 'boolean' ? schema?.nullable : true,
    description: schema?.description || null,
  };

  const handleCreate: any = (newSchema: any) => {
    create(newSchema, schema);
  };

  return (
    <>
      {!init && (
        <Button
          type="primary"
          shape="circle"
          onClick={onClick}
          icon={<PlusOutlined />}
        ></Button>
      )}
      {init && <SettingOutlined onClick={onClick} />}
      <Drawer
        title={!init ? 'Field Type' : schema?.name}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Form
          layout="vertical"
          initialValues={initialValues}
          onFinish={handleCreate}
        >
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
                  //   onChange={onChange}
                  //   onSearch={onSearch}
                  // filterOption={(input, option) =>
                  //   option.children.toLowerCase().includes(input.toLowerCase())
                  // }
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
                <Checkbox
                // onChange={onChange}
                >
                  Nullable
                </Checkbox>
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
                <Input.TextArea
                  rows={4}
                  placeholder="please enter description"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Stack direction="row" spacing={2}>
              <Button>Cancel</Button>
              {!init && (
                <Button type="primary" htmlType="submit">
                  Create
                </Button>
              )}
              {init && (
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
    </>
  );
};
