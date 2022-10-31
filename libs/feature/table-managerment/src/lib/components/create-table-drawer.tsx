import { PlusOutlined } from '@ant-design/icons';
import { ITable } from '@fast-api/shared/models';
import { Stack } from '@mui/material';
import { Button, Col, Drawer, Form, Input, Row } from 'antd';
import React, { useState } from 'react';

interface CreateTableDrawerProps {
  create: (table: ITable) => void;
}

export const CreateTableDrawer = ({ create }: CreateTableDrawerProps) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Add Table
      </Button>
      <Drawer
        title="Add table"
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Form layout="vertical" onFinish={create}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Table Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter table name',
                  },
                ]}
              >
                <Input placeholder="Please enter user name" />
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
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Stack>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
