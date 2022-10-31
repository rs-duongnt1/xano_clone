import { Button, Space } from 'antd';
import { useState } from 'react';
import { AddApiEndpointDrawer } from './components/add-api-endpoint-drawer';
import styles from './feature-api-managerment.module.scss';
import { PlusOutlined } from '@ant-design/icons';
import {
  useCreateEndpointMutation,
  useGetListEndpointsQuery,
} from '@fast-api/shared/data-access';
import { EndpointList } from './components/endpoint-list';
import { IApiEndpoint } from '@fast-api/shared/models';
import { useNavigate } from 'react-router-dom';
/* eslint-disable-next-line */
export interface FeatureApiManagermentProps {}

export function FeatureApiManagerment(props: FeatureApiManagermentProps) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const [createEndpoint] = useCreateEndpointMutation();
  const { data: endpoints } = useGetListEndpointsQuery();
  const handleCreateApiEndpoint = (data) => {
    console.log(data);
    createEndpoint(data);
  };

  const handleEditEndpoint = (endpoint: IApiEndpoint) => {
    setOpenDrawer(true);
  };

  const handleSettingEndpoint = (endpoint: IApiEndpoint) => {
    const path = window.location.pathname;
    navigate(`${path}/${endpoint.id}`);
  };

  const handleDeleteEndpoint = (endpoint: IApiEndpoint) => {};

  return (
    <div className={styles['container']}>
      <h1>Welcome to FeatureApiManagerment!</h1>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Button
          type="primary"
          onClick={() => setOpenDrawer(true)}
          icon={<PlusOutlined />}
        >
          Add API Endpoint
        </Button>
        <AddApiEndpointDrawer
          open={openDrawer}
          create={handleCreateApiEndpoint}
          close={() => setOpenDrawer(false)}
        />
        <div>
          {endpoints && (
            <EndpointList
              onEdit={handleEditEndpoint}
              onSetting={handleSettingEndpoint}
              onDelete={handleDeleteEndpoint}
              endpoints={endpoints}
            />
          )}{' '}
        </div>
      </Space>
    </div>
  );
}

export default FeatureApiManagerment;
