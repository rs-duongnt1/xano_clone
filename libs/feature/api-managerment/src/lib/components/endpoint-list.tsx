import { IApiEndpoint } from '@fast-api/shared/models';
import { Button, List, Space, Tag, Typography } from 'antd';
import {
  EditOutlined,
  SettingOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
interface EndpointListProps {
  endpoints: IApiEndpoint[];
  onEdit: (endpoint: IApiEndpoint) => void;
  onSetting: (endpoint: IApiEndpoint) => void;
  onDelete: (endpoint: IApiEndpoint) => void;
}

const EndpointItem = ({
  endpoint,
  onEdit,
  onSetting,
  onDelete,
}: {
  endpoint: IApiEndpoint;
  onEdit: (endpoint: IApiEndpoint) => void;
  onSetting: (endpoint: IApiEndpoint) => void;
  onDelete: (endpoint: IApiEndpoint) => void;
}) => {
  return (
    <List.Item style={{ height: '80px' }}>
      <Space align="center">
        <Tag color="#87d068" style={{ width: '60px', textAlign: 'center' }}>
          {endpoint.method}
        </Tag>
        <Space direction="vertical" size={0}>
          <Typography.Text strong>/{endpoint.name}</Typography.Text>
          <Typography.Text type="secondary">
            {endpoint.description}
          </Typography.Text>
        </Space>
      </Space>
      <Space>
        <Button
          icon={<EditOutlined />}
          onClick={() => onEdit(endpoint)}
          shape="circle"
        ></Button>
        <Button
          icon={<SettingOutlined />}
          type="primary"
          onClick={() => onSetting(endpoint)}
          shape="circle"
        ></Button>
        <Button
          icon={<DeleteOutlined />}
          type="primary"
          onClick={() => onDelete(endpoint)}
          shape="circle"
          danger
        ></Button>
      </Space>
    </List.Item>
  );
};

export const EndpointList = ({
  endpoints,
  onEdit,
  onSetting,
  onDelete,
}: EndpointListProps) => {
  return (
    <List
      size="large"
      bordered
      dataSource={endpoints}
      renderItem={(endpoint) => (
        <EndpointItem
          endpoint={endpoint}
          onEdit={onEdit}
          onSetting={onSetting}
          onDelete={onDelete}
        />
      )}
    />
  );
};
