import { Space } from 'antd';
import { useParams } from 'react-router-dom';
import { FunctionStacks } from './components/settings/function-stacks';

export const FeatureApiEndpointSettings = () => {
  const { id } = useParams();
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div>Inputs</div>
      <FunctionStacks endpointId={id} />
      <div>Returns</div>
    </Space>
  );
};
